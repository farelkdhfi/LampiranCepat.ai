"use client";
import React from "react";

export default function TbpDocumentPreview({ docConfig, spjData, logoUrl }: any) {
  const formatRupiah = (num: number) => {
    if (!num) return "Rp. 0,-";
    return `Rp. ${num.toLocaleString("id-ID")},-`;
  };

  return (
    <div className="flex flex-col gap-8 max-w-[210mm] mx-auto print:block print:gap-0 print:m-0 print:p-0 print:w-full">
      {spjData.items.map((item: any, index: number) => (
        <div 
          key={index} 
          className="bg-white shadow-md p-[15mm] text-black font-serif text-sm border border-gray-300 relative print:h-[297mm] print:w-[210mm] print:shadow-none print:border-none print:m-0 print:break-inside-avoid print:break-after-page box-border overflow-hidden"
        >
          
          {/* Header Kwitansi */}
          <div className="flex justify-between items-start mb-6 border-b-2 border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              {logoUrl && <img src={logoUrl} alt="Logo" className="w-16 h-16 object-contain" />}
              <div>
                <h3 className="font-bold text-base uppercase leading-tight">{docConfig.kopNamaPemerintah}</h3>
                <p className="text-sm font-semibold uppercase">{docConfig.kopNamaSkpd}</p>
              </div>
            </div>
            <div className="text-right border border-black p-2 min-w-[150px]">
              <p className="text-xs font-bold border-b border-black pb-1 mb-1">{docConfig.tbpTahunAnggaran || "Tahun Anggaran:"} {docConfig.tahun || new Date().getFullYear()}</p>
              <p className="text-xs">No. BKU : ....................</p>
              <p className="text-xs">{docConfig.tbpMataAnggaran || "Kode Rek"} : <span className="font-mono font-bold">{item.kodeRekening || "..."}</span></p>
            </div>
          </div>

          {/* Judul */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-black uppercase tracking-widest underline underline-offset-4">{docConfig.tbpTitle || "TANDA BUKTI PEMBAYARAN"}</h2>
          </div>

          {/* Body Kwitansi */}
          <table className="w-full mb-6">
            <tbody>
              <tr>
                <td className="w-[200px] py-2 align-top">{docConfig.tbpTerimaDari || "Sudah terima dari"}</td>
                <td className="w-4 py-2 align-top">:</td>
                <td className="py-2 font-bold uppercase">{docConfig.tbpPihakPertama || docConfig.kepala || "Kepala Sekolah"}</td>
              </tr>
              <tr>
                <td className="py-2 align-top">{docConfig.tbpUangSebesar || "Uang Sebesar"}</td>
                <td className="w-4 py-2 align-top">:</td>
                <td className="py-2">
                  <div className="border-2 border-slate-300 bg-slate-50 px-4 py-1.5 font-bold text-lg inline-block shadow-inner">
                    {formatRupiah(item.total)}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-2 align-top">{docConfig.tbpTerbilang || "Terbilang"}</td>
                <td className="w-4 py-2 align-top">:</td>
                <td className="py-2 italic font-bold text-slate-700 capitalize">
                   ({item.terbilang || "..."} rupiah)
                </td>
              </tr>
              <tr>
                <td className="py-2 align-top">{docConfig.tbpUntukPembayaran || "Untuk Pembayaran"}</td>
                <td className="w-4 py-2 align-top">:</td>
                <td className="py-2 leading-relaxed border-b border-dotted border-gray-400">
                  {item.barangTbp || item.barang} (Sesuai nota tanggal: {item.tanggal})
                </td>
              </tr>
            </tbody>
          </table>

          {/* Footer & TTD Kwitansi */}
          <div className="flex justify-between mt-12">
            <div className="text-center w-1/3">
              <p className="mb-16">Setuju Dibayar,<br/>{docConfig.labelJabatanKiri || "Pengguna Anggaran"}</p>
              <div className="border-b border-black w-max mx-auto pb-0.5 mb-0.5">
                <p className="font-bold">{docConfig.kepala}</p>
              </div>
              <p>NIP. {docConfig.nipKepala}</p>
            </div>
            
            <div className="text-center w-1/3">
              <p className="mb-16">{docConfig.tbpLunasTgl || "Lunas Dibayar Tanggal:"}<br/>{docConfig.labelJabatanKanan || "Bendahara Pengeluaran"}</p>
              <div className="border-b border-black w-max mx-auto pb-0.5 mb-0.5">
                <p className="font-bold">{docConfig.bendahara}</p>
              </div>
              <p>NIP. {docConfig.nipBendahara || docConfig.nip}</p>
            </div>

            <div className="text-center w-1/3">
              <p className="mb-16">{docConfig.tempat || "Tempat"}, {docConfig.tanggalTbp || "Tgl..."}<br/>{docConfig.tbpPenerimaUang || "Penerima Uang"}</p>
              <div className="border-b border-black w-max mx-auto pb-0.5 mb-0.5">
                <p className="font-bold uppercase">{item.penerimaTbp || item.penerima}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}