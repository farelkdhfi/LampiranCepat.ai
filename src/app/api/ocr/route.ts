import { REF_REKENING_ARKAS } from "@/lib/referensiKodeArkas/ref_kode_rekening_ARKAS";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");



const refString = JSON.stringify(REF_REKENING_ARKAS, null, 2);

/**
 * Heuristically estimate AI confidence (0–1) based on field completeness.
 */
function estimateConfidence(data: Record<string, unknown>): number {
  let score = 0;
  const checks: [unknown, number][] = [
    [data.penerima, 0.2],
    [data.tanggal, 0.2],
    [data.total, 0.2],
    [data.barang, 0.2],
    [data.kodeRekening, 0.1],
    [data.terbilang, 0.1],
  ];
  for (const [val, weight] of checks) {
    if (val && String(val).trim().length > 0 && val !== 0) score += weight;
  }
  if (typeof data.total === "number" && data.total > 0 && data.total < 1_000_000_000) {
    score = Math.min(1, score + 0.05);
  }
  return parseFloat(score.toFixed(2));
}

/**
 * Robustly extract a JSON object from a potentially messy AI response string.
 */
function extractJSON(text: string): Record<string, unknown> {
  const stripped = text.replace(/```(?:json)?/gi, "").replace(/```/g, "");
  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Tidak ditemukan JSON dalam respons AI.");
  }
  const jsonString = stripped.slice(start, end + 1);
  try {
    return JSON.parse(jsonString);
  } catch {
    const cleaned = jsonString
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"');
    return JSON.parse(cleaned);
  }
}

// ─── Prompt ───────────────────────────────────────────────────────────────────

const PROMPT = `Baca bukti pembayaran/kuitansi/nota ini dengan teliti.

Balas HANYA dengan satu objek JSON valid. Tidak ada teks lain, tidak ada markdown.

Format wajib:
{
  "penerima": "Nama toko, vendor, atau individu penerima uang (string)",
  "tanggal": "DD-MM-YYYY (string, format Indonesia)",
  "total": 150000,
  "barang": "Deskripsi lengkap barang atau jasa yang dibeli (string)",
  "kodeRekening": "Pilih SATU kode referensi yang paling relevan dengan jenis barang",
  "terbilang": "Ubah angka total menjadi teks huruf bahasa Indonesia huruf kecil semua",
  "qty": "Berapa banyak barangnya? Angka saja (contoh: 2)",
  "satuan": "Satuan barangnya (contoh: rim, buah, pcs, box, ls)",
  "hargaSatuan": 75000
}

Daftar Referensi Kode Rekening:
${refString}

Aturan penting:
- "total" dan "hargaSatuan" harus berupa angka murni (integer), TANPA tanda Rp atau titik.
- "qty" isikan dengan angka atau string angka. Jika di struk tidak ada volume yang jelas, asumsikan "1".
- "satuan" isikan dengan satuan unitnya. Jika tidak jelas atau berupa jasa borongan, isikan "Ls" (Lumpsum).
- "tanggal" dalam format DD-MM-YYYY.
- "penerima" adalah nama pihak yang MENERIMA uang.
- "barang" berisi rincian pembelian.
- "kodeRekening" WAJIB diisi persis dengan salah satu kode dari Daftar Referensi di atas.
- "terbilang" adalah ejaan dari total.
- Jika ada lebih dari satu jenis barang di struk, gabungkan saja nama barangnya di field "barang", tapi untuk "qty" isi "1", "satuan" isi "Paket/Ls", dan "hargaSatuan" samakan dengan "total". (Ini untuk menyederhanakan data).`;
// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "File tidak ditemukan dalam request." },
        { status: 400 }
      );
    }

    const items: any[] = [];
    let grandTotal = 0;
    let hasPerjalananDinas = false;

    for (const file of files) {
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        console.warn(`Tipe file tidak didukung dilewati: ${file.name} (${file.type})`);
        continue; 
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Data = buffer.toString("base64");
      const mimeType = file.type;

      let data: Record<string, unknown> | null = null;
      let confidence = 0;

      // ── Primary: Gemini ─────────────────────────────────────────────────────
      try {
        console.log(`🚀 Jalur Utama: Gemini 2.5 Flash memproses ${file.name}...`);

        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 1024, // Agak dinaikin karena output JSON-nya nambah field
          },
        });

        const result = await model.generateContent([
          { inlineData: { data: base64Data, mimeType } },
          PROMPT,
        ]);

        const text = result.response.text();
        data = extractJSON(text);
        confidence = estimateConfidence(data);

        console.log(`✅ Gemini sukses untuk ${file.name} — confidence heuristik: ${confidence}`);

      } catch (primaryError: unknown) {
        const msg = primaryError instanceof Error ? primaryError.message : String(primaryError);
        console.warn(`⚠️ Gemini gagal untuk ${file.name}:`, msg, "→ Beralih ke OpenRouter...");

        // ── Fallback: OpenRouter ───────────────────────────────────────────────
        try {
          const openRouterRes = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://spjcepat.ai",
                "X-Title": "SPJcepat",
              },
              body: JSON.stringify({
                model: "google/gemini-2.5-flash-lite",
                temperature: 0.1,
                messages: [
                  {
                    role: "user",
                    content: [
                      { type: "text", text: PROMPT },
                      {
                        type: "image_url",
                        image_url: { url: `data:${mimeType};base64,${base64Data}` },
                      },
                    ],
                  },
                ],
              }),
            }
          );

          if (!openRouterRes.ok) {
            const errBody = await openRouterRes.text().catch(() => "");
            throw new Error(`OpenRouter error ${openRouterRes.status}: ${errBody.slice(0, 200)}`);
          }

          const orData = await openRouterRes.json();
          const textFallback: string = orData.choices?.[0]?.message?.content ?? "";

          data = extractJSON(textFallback);
          confidence = estimateConfidence(data) * 0.9;

          console.log(`✅ OpenRouter sukses (fallback) untuk ${file.name}`);
        } catch (fallbackError: unknown) {
          const fallbackMsg = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
          console.error(`❌ SEMUA JALUR AI GAGAL untuk ${file.name}:`, fallbackMsg);
        }
      }

      // Collect item if data extraction was successful
      if (data) {
        const itemPenerima = data.penerima || "";
        const itemTanggal = data.tanggal || "";
        const itemTotal = typeof data.total === "number" ? data.total : 0;
        const itemBarang = String(data.barang || "");
        const itemKodeRekening = String(data.kodeRekening || "");
        const itemTerbilang = String(data.terbilang || "");

        items.push({
          penerima: itemPenerima,
          tanggal: itemTanggal,
          total: itemTotal,
          barang: itemBarang,
          kodeRekening: itemKodeRekening,
          terbilang: itemTerbilang,      

          // DATA UNTUK PO
          qtyPo: String(data.qty || "1"), 
          satuanPo: String(data.satuan || "Ls"),
          hargaSatuanPo: typeof data.hargaSatuan === "number" ? String(data.hargaSatuan) : String(itemTotal),
          
          
          confidence: parseFloat(confidence.toFixed(2)),
          fileName: file.name
        });

        grandTotal += itemTotal;

        if (/(hotel|transport|tiket|pesawat|kereta|travel|penginapan|bensin|tol)/i.test(itemBarang)) {
          hasPerjalananDinas = true;
        }
      } else {
        items.push({
          penerima: "",
          tanggal: "",
          total: 0,
          barang: "GAGAL DIPROSES",
          kodeRekening: "",
          terbilang: "",
          confidence: 0,
          fileName: file.name
        });
      }
    }

    return NextResponse.json({
      items,
      total: grandTotal,
      jenis_spj: hasPerjalananDinas ? "perjalanan_dinas" : "belanja"
    });

  } catch (criticalError: unknown) {
    const msg = criticalError instanceof Error ? criticalError.message : "Unknown error";
    console.error("❌ GAGAL MEMPROSES REQUEST:", msg);

    return NextResponse.json(
      {
        error: "Terjadi kesalahan sistem saat memproses berkas. Coba lagi nanti.",
      },
      { status: 500 }
    );
  }
}