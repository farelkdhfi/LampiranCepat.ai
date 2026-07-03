"use client";
import React from "react";

export default function NotaPesananDocumentPreview({ docConfig, spjData, logoUrl }: any) {
  return (
    <div className="flex flex-col gap-8 max-w-[210mm] mx-auto print:block print:gap-0 print:m-0 print:p-0 print:w-full">
      {spjData.items.map((item: any, index: number) => {
        // Kalkulasi ulang total berdasarkan QTY * Harga Satuan
        const qty = parseFloat(item.qtyPo || "1");
        const harga = parseInt(String(item.hargaSatuanPo).replace(/\D/g, ""), 10) || item.total;
        const subtotal = qty * harga;

        return (
          <div key={index} className="min-h-[297mm] bg-white shadow-md p-[20mm] text-black font-serif text-sm border border-gray-300 relative print:h-[297mm] print:w-[210mm] print:shadow-none print:border-none print:m-0 print:break-inside-avoid print:break-after-page box-border overflow-hidden">
            
            {/* ── KOP SURAT ── */}
            <div className="flex items-center border-b-[3px] border-black pb-4 mb-8">
              <div className="w-20 shrink-0 flex justify-center">
                {logoUrl && <img src={logoUrl} alt="Logo" className="w-16 h-16 object-contain" />}
              </div>
              <div className="flex-1 text-center pr-20">
                <h3 className="text-lg font-bold uppercase tracking-wider">{docConfig.kopNamaPemerintah}</h3>
                <h2 className="text-xl font-black uppercase tracking-widest">{docConfig.kopNamaSkpd}</h2>
                <p className="text-xs mt-1">{docConfig.kopAlamat || "Jalan Pendidikan No. 1"}</p>
              </div>
            </div>

            {/* ── JUDUL & KEPADA YTH ── */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-lg font-bold underline uppercase">{docConfig.poTitle || "Nota Pesanan"}</h2>
                <p>{docConfig.poNomor || `Nomor: 020/PO-${String(index+1).padStart(3,'0')}/2026`}</p>
              </div>
              <div className="w-[250px] border border-gray-400 p-3 bg-slate-50">
                <p className="mb-1 text-xs text-gray-600">{docConfig.poKepadaLabel || "Kepada Yth."}</p>
                <p className="font-bold uppercase">{item.penerima || docConfig.poPenyedia || "Nama Vendor"}</p>
                <p className="text-xs mt-1">{docConfig.poAlamatPenyedia || "Di Tempat"}</p>
              </div>
            </div>

            {/* ── ISI SURAT ── */}
            <div className="mb-4 text-justify">
              <p>{docConfig.poTeksPembuka || "Harap disediakan barang/jasa untuk keperluan instansi kami sesuai dengan rincian di bawah ini:"}</p>
            </div>

            {/* ── TABEL PESANAN ── */}
            <table className="w-full border-collapse border border-black mb-6 text-[13px]">
              <thead>
                <tr className="bg-slate-100 text-center font-bold">
                  <th className="border border-black p-2 w-10">{docConfig.hPoNo || "No"}</th>
                  <th className="border border-black p-2">{docConfig.hPoNamaBarang || "Nama Barang/Jasa"}</th>
                  <th className="border border-black p-2 w-16">{docConfig.hPoQty || "Vol"}</th>
                  <th className="border border-black p-2 w-28">{docConfig.hPoHargaSatuan || "Harga Satuan"}</th>
                  <th className="border border-black p-2 w-28">{docConfig.hPoTotal || "Jumlah"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 text-center">1</td>
                  <td className="border border-black p-2">{item.barangPo || item.barang}</td>
                  <td className="border border-black p-2 text-center font-semibold">{item.qtyPo} <span className="font-normal text-xs">{item.satuanPo}</span></td>
                  <td className="border border-black p-2 text-right">{harga.toLocaleString("id-ID")}</td>
                  <td className="border border-black p-2 text-right font-bold">{subtotal.toLocaleString("id-ID")}</td>
                </tr>
                {/* Baris Total */}
                <tr className="bg-slate-100">
                  <td colSpan={4} className="border border-black p-2 text-center font-bold uppercase">Total Pesanan</td>
                  <td className="border border-black p-2 text-right font-bold">{subtotal.toLocaleString("id-ID")}</td>
                </tr>
              </tbody>
            </table>

            {/* ── PENUTUP ── */}
            <div className="mb-12 text-justify">
              <p>{docConfig.poTeksPenutup || "Barang/jasa tersebut di atas agar dikirim ke alamat kami dengan kualitas yang baik dan sesuai spesifikasi."}</p>
            </div>

            {/* ── TANDA TANGAN ── */}
            <div className="flex justify-between text-center mt-12">
              <div className="w-[250px]">
                <p className="mb-16">Menerima Pesanan,<br/>Penyedia Barang/Jasa</p>
                <div className="border-b border-black w-max mx-auto pb-0.5 mb-0.5">
                  <p className="font-bold uppercase">{item.penerima || docConfig.poPenyedia || "Nama Vendor"}</p>
                </div>
              </div>
              
              <div className="w-[250px]">
                <p className="mb-16">{docConfig.tempat || "Tempat"}, {docConfig.tanggalPo || "Tgl..."}<br/>{docConfig.labelJabatanKiri || "Pejabat Pembuat Komitmen"}</p>
                <div className="border-b border-black w-max mx-auto pb-0.5 mb-0.5">
                  <p className="font-bold">{docConfig.kepala}</p>
                </div>
                <p>NIP. {docConfig.nipKepala}</p>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}