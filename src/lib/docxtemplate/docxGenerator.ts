import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
// @ts-ignore (Abaikan warning TS karena library ini gak punya file types resmi)
import ImageModule from "docxtemplater-image-module-free";
import type { DocConfig, SpjItem } from "@/types/spj";

// Fungsi pengubah gambar Web (Base64) ke format memori Word (ArrayBuffer)
const base64Parser = (dataURL: string) => {
  const base64Regex = /^data:image\/(png|jpg|jpeg|svg|svg\+xml);base64,/;
  if (!base64Regex.test(dataURL)) return false;
  const stringBase64 = dataURL.replace(base64Regex, "");
  const binaryString = window.atob(stringBase64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

// Gambar transparan 1x1 pixel (jika user tidak upload logo)
const BLANK_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export const generateNativeDocx = async (items: SpjItem[], config: DocConfig, total: number, logoUrl: string | null) => {
  try {
    const response = await fetch("/template-document.docx");
    if (!response.ok) throw new Error("File template-spj.docx tidak ditemukan di /public");

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    const zip = new PizZip(arrayBuffer);

    // SETUP MODUL GAMBAR
    const imageOptions = {
      centered: false, // Set true kalau mau logonya otomatis rata tengah
      getImage: function (tagValue: string) {
        return base64Parser(tagValue);
      },
      getSize: function () {
        // Ukuran Logo di Word: [Lebar, Tinggi] dalam pixel. 
        // 80x80 px ini kira-kira seukuran logo KOP surat standar (2-3 cm)
        return [80, 80];
      },
    };

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      modules: [new ImageModule(imageOptions)],
    });

    // LOGIC GROUPING VENDOR 
    const groupedItems = items.reduce((acc: any, item: any) => {
      const vendorName = item.penerima || "VENDOR TANPA NAMA";
      if (!acc[vendorName]) acc[vendorName] = [];
      acc[vendorName].push(item);
      return acc;
    }, {});

    const vendorsArray = Object.keys(groupedItems).map((vendorName) => {
      const vendorItems = groupedItems[vendorName];
      const totalVendor = vendorItems.reduce((sum: number, curr: any) => {
        const qty = parseFloat(curr.qtyPo || "1");
        const harga = parseInt(String(curr.hargaSatuanPo).replace(/\D/g, ""), 10) || curr.total;
        return sum + (qty * harga);
      }, 0);

      return {
        vendor: vendorName,
        total_vendor_rp: totalVendor.toLocaleString("id-ID"),
        vendor_items: vendorItems.map((item: any, idx: number) => ({
          no: idx + 1,
          barang: item.barang,
          qty: item.qtyPo || "1",
          satuan: item.satuanPo || "Ls",
          harga_satuan_rp: item.hargaSatuanPo ? parseInt(String(item.hargaSatuanPo).replace(/\D/g, ""), 10).toLocaleString("id-ID") : item.total.toLocaleString("id-ID"),
          subtotal_rp: item.total ? item.total.toLocaleString("id-ID") : "0",
          kondisi: "BAIK",
        }))
      };
    });

    const docData = {
      ...config,

      // VARIABLE LOGO (PENTING)
      logo: logoUrl || BLANK_IMAGE,

      // KUITANSI
      kwtLabelNo: config.kwtLabelNo || "No.",
      kwtLabelTerimaDari: config.kwtLabelTerimaDari || "Telah terima dari",
      kwtLabelUangSejumlah: config.kwtLabelUangSejumlah || "Uang sejumlah",
      kwtLabelUntuk: config.kwtLabelUntuk || "Untuk",
      kwtTeksTerlampir: config.kwtTeksTerlampir || "(Bukti/Nota/Faktur terlampir)",
      kwtLabelTerbilang: config.kwtLabelTerbilang || "Terbilang",
      kwtLabelSetuju: config.kwtLabelSetuju || "Setuju dibayar,",
      kwtLabelLunas: config.kwtLabelLunas || "Lunas dibayar,",
      kwtLabelPenerima: config.kwtLabelPenerima || "Penerima",

      // -- Nota Pesanan (PO) Fallback --
      poTitle: config.poTitle || "NOTA PESANAN",
      poNomor: config.poNomor || "Nomor: 020/PO-.../2026",
      poKepadaLabel: config.poKepadaLabel || "Kepada Yth.",
      poAlamatPenyedia: config.poAlamatPenyedia || "Di Tempat",
      poTeksPembuka: config.poTeksPembuka || "Harap disediakan barang/jasa untuk keperluan instansi kami sesuai dengan rincian di bawah ini:",
      poTeksPenutup: config.poTeksPenutup || "Barang/jasa tersebut di atas agar dikirim ke alamat kami dengan kualitas yang baik dan sesuai spesifikasi.",
      hPoNo: config.hPoNo || "No",
      hPoNamaBarang: config.hPoNamaBarang || "Nama Barang/Jasa",
      hPoQty: config.hPoQty || "Vol",
      hPoHargaSatuan: config.hPoHargaSatuan || "Harga Satuan",
      hPoTotal: config.hPoTotal || "Jumlah",
      tempat: config.tempat || "Tempat",
      tanggalPo: config.tanggalPo || "Tanggal...",
      labelJabatanKiri: config.labelJabatanKiri || "Pejabat Pembuat Komitmen",

      // -- Tanda Bukti Pembayaran (TBP) Fallback --
      tbpTahunAnggaran: config.tbpTahunAnggaran || "Tahun Anggaran:",
      tbpMataAnggaran: config.tbpMataAnggaran || "Kode Rek",
      tbpTitle: config.tbpTitle || "TANDA BUKTI PEMBAYARAN",
      tbpTerimaDari: config.tbpTerimaDari || "Sudah terima dari",
      tbpPihakPertama: config.tbpPihakPertama || config.kepala || "Kepala Sekolah",
      tbpUangSebesar: config.tbpUangSebesar || "Uang Sebesar",
      tbpTerbilang: config.tbpTerbilang || "Terbilang",
      tbpUntukPembayaran: config.tbpUntukPembayaran || "Untuk Pembayaran",
      tbpLunasTgl: config.tbpLunasTgl || "Lunas Dibayar Tanggal:",
      tbpPenerimaUang: config.tbpPenerimaUang || "Penerima Uang",
      tanggalTbp: config.tanggalTbp || "Tanggal...",

      // -- Berita Acara Pembayaran (BAP) Fallback --
      bapTitle: config.bapTitle || "BERITA ACARA PEMBAYARAN",
      bapNomor: config.bapNomor || "Nomor: 020/BAP-.../2026",
      bapPadaHariIni: config.bapPadaHariIni || "Pada hari ini ......... tanggal ......... bulan ......... tahun 2026, kami yang bertanda tangan di bawah ini:",
      bapPihakPertamaLabel: config.bapPihakPertamaLabel || "PIHAK PERTAMA",
      bapPihakKeduaJabatan: config.bapPihakKeduaJabatan || "Pimpinan / Pemilik Toko",
      bapPihakKeduaLabel: config.bapPihakKeduaLabel || "PIHAK KEDUA",
      bapTeksTengah: config.bapTeksTengah || "PIHAK PERTAMA telah melakukan pembayaran kepada PIHAK KEDUA dengan rincian sebagai berikut:",
      hBapNo: config.hBapNo || "No",
      hBapUraian: config.hBapUraian || "Uraian Pembayaran",
      hBapJumlah: config.hBapJumlah || "Jumlah (Rp)",
      bapTeksPenutup: config.bapTeksPenutup || "Demikian Berita Acara Pembayaran ini dibuat dalam rangkap yang secukupnya untuk dipergunakan sebagaimana mestinya dan penuh tanggung jawab.",

      // -- Berita Acara Serah Terima (BAST) Fallback --
      bastTitle: config.bastTitle || "BERITA ACARA SERAH TERIMA BARANG",
      bastNomor: config.bastNomor || "Nomor: 020/BAST-.../2026",
      bastPadaHariIni: config.bastPadaHariIni || "Pada hari ini ......... tanggal ......... bulan ......... tahun 2026, kami yang bertanda tangan di bawah ini:",
      bastPihakPertamaJabatan: config.bastPihakPertamaJabatan || "Pimpinan / Pemilik Toko",
      bastPihakPertamaLabel: config.bastPihakPertamaLabel || "PIHAK PERTAMA",
      bastPihakKeduaLabel: config.bastPihakKeduaLabel || "PIHAK KEDUA",
      bastTeksTengah: config.bastTeksTengah || "PIHAK PERTAMA telah menyerahkan barang/pekerjaan kepada PIHAK KEDUA dan PIHAK KEDUA telah menerima barang/pekerjaan tersebut dengan rincian sebagai berikut:",
      hBastNo: config.hBastNo || "No",
      hBastNamaBarang: config.hBastNamaBarang || "Nama Barang/Pekerjaan",
      hBastQty: config.hBastQty || "Jumlah",
      hBastKeterangan: config.hBastKeterangan || "Keterangan",
      bastTeksPenutup: config.bastTeksPenutup || "Demikian Berita Acara Serah Terima ini dibuat dalam rangkap secukupnya untuk dipergunakan sebagaimana mestinya.",

      // -- Berita Acara Penerimaan Barang (BAPB) Fallback --
      bapbTitle: config.bapbTitle || "BERITA ACARA PENERIMAAN BARANG",
      bapbNomor: config.bapbNomor || "Nomor: 030/BAPB-.../2026",
      bapbPadaHariIni: config.bapbPadaHariIni || "Pada hari ini ......... tanggal ......... bulan ......... tahun 2026, kami yang bertanda tangan di bawah ini:",
      bapbPihakPertamaJabatan: config.bapbPihakPertamaJabatan || "Pimpinan / Pemilik Toko",
      bapbPihakPertamaLabel: config.bapbPihakPertamaLabel || "PIHAK PERTAMA",
      bapbPihakKeduaNama: config.bapbPihakKeduaNama || "Nama Panitia Pemeriksa",
      bapbPihakKeduaJabatan: config.bapbPihakKeduaJabatan || "Panitia Penerima Hasil Pekerjaan",
      bapbPihakKeduaLabel: config.bapbPihakKeduaLabel || "PIHAK KEDUA",
      bapbTeksTengah: config.bapbTeksTengah || "Berdasarkan Nota Pesanan, PIHAK KEDUA telah melakukan pemeriksaan fisik terhadap barang yang dikirimkan oleh PIHAK PERTAMA dengan hasil sebagai berikut:",
      hBapbNo: config.hBapbNo || "No",
      hBapbNamaBarang: config.hBapbNamaBarang || "Nama / Spesifikasi Barang",
      hBapbQty: config.hBapbQty || "Jumlah",
      hBapbKondisi: config.hBapbKondisi || "Kondisi",
      bapbTeksPenutup: config.bapbTeksPenutup || "Demikian Berita Acara Penerimaan Barang ini dibuat untuk dipergunakan sebagaimana mestinya.",

      total_semua_rp: total.toLocaleString("id-ID"),

      items_satuan: items.map((item, index) => ({
        no_urut: index + 1,
        penerima: item.penerima || "Vendor",
        barang: item.barang,
        total_rp: item.total ? item.total.toLocaleString("id-ID") : "0",
        terbilang: item.terbilang || "...",
        kode_rekening: item.kodeRekening || "-",
      })),

      vendors: vendorsArray,
    };

    doc.render(docData);

    const out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    saveAs(out, `Dokumen_SPJ_${config.kopNamaSkpd.replace(/\s+/g, "_")}.docx`);

  } catch (error: any) {
    console.error("DOCX Error Asli:", error);
    if (error.properties && error.properties.errors instanceof Array) {
      const errorMessages = error.properties.errors.map((err: any) => err.properties.explanation || err.message).join("\n");
      alert("ADA TYPO DI TEMPLATE WORD:\n\n" + errorMessages);
    } else {
      alert("Gagal membuat DOCX. Cek console log.");
    }
  }
};