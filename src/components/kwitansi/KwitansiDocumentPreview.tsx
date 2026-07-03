"use client";
import React from "react";

export default function KwitansiDocumentPreview({ docConfig, spjData }: any) {
  const formatRupiah = (num: number) => {
    if (!num) return "Rp. 0";
    return `Rp. ${num.toLocaleString("id-ID")}`;
  };

  return (
    <div className="flex flex-col gap-8 max-w-[210mm] mx-auto print:block print:gap-0 print:m-0 print:p-0 print:w-full">
      {spjData.items.map((item: any, index: number) => (
        <div 
          key={index} 
          className="bg-[#fcfdfc] shadow-xl p-[10mm] text-black font-sans text-sm border-2 border-gray-200 relative print:h-[297mm] print:w-[210mm] print:shadow-none print:border-none print:m-0 print:break-inside-avoid print:break-after-page box-border overflow-hidden"
        >
          
          <div className="border border-gray-400 p-6 relative min-h-[110mm] flex flex-col justify-between overflow-hidden">
            
            {/* Background Image Motif Kwitansi (Sertifikat Hijau) */}
            <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
              <img 
                src="https://tse3.mm.bing.net/th/id/OIP.4I2uCKSvrZUCCErSyixMVAHaEz?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" 
                alt="Background Kwitansi" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Kontainer untuk konten di atas background */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              
              {/* Kop Kwitansi */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-gray-800">
                  {docConfig.kwtTitle || "Kuitansi"}
                </h2>
              </div>

              {/* Body Kwitansi */}
              <table className="w-full mb-4 text-sm text-gray-800">
                <tbody>
                  <tr>
                    <td className="w-[160px] py-1.5 align-top font-semibold">{docConfig.kwtLabelNo || "No."}</td>
                    <td className="w-4 py-1.5 align-top font-semibold">:</td>
                    <td className="py-1.5 font-bold">
                      {item.noUrut || String(index + 1)} / {item.kodeRekening || "..."} / {item.kodeBPU || "BPU01"} / {docConfig.tahun || new Date().getFullYear()}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 align-top font-semibold">{docConfig.kwtLabelTerimaDari || "Telah terima dari"}</td>
                    <td className="w-4 py-1.5 align-top font-semibold">:</td>
                    <td className="py-1.5 font-bold">{docConfig.kopNamaSkpd || "SD Negeri ..."}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 align-top font-semibold">{docConfig.kwtLabelUangSejumlah || "Uang sejumlah"}</td>
                    <td className="w-4 py-1.5 align-top font-semibold">:</td>
                    <td className="py-1.5 italic font-bold capitalize">
                      {item.terbilang || "..."}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 align-top font-semibold">{docConfig.kwtLabelUntuk || "Untuk"}</td>
                    <td className="w-4 py-1.5 align-top font-semibold">:</td>
                    <td className="py-1.5 font-bold">
                      {item.penerimaKwt || item.penerima || "..."}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Box Nominal & Terlampir */}
              <div className="mb-8 mt-2 flex flex-col items-start pl-[176px]">
                <p className="text-sm font-semibold text-gray-800 mb-1">{docConfig.kwtTeksTerlampir || "(Bukti/Nota/Faktur terlampir)"}</p>
                <div className="flex items-center w-full">
                  <span className="w-[176px] -ml-[176px] font-bold text-gray-900">{docConfig.kwtLabelTerbilang || "Terbilang"}</span>
                  <div className="border-2 border-gray-800 px-4 py-1.5 min-w-[200px] font-bold text-base tracking-wide bg-white/70 backdrop-blur-[1px]">
                    {formatRupiah(item.total)}
                  </div>
                </div>
              </div>

              {/* Footer / Area Tanda Tangan */}
              <div className="grid grid-cols-3 gap-4 text-[13px] text-gray-900 font-medium mt-auto">
                <div className="flex flex-col">
                  <p className="mb-0.5">{docConfig.kwtLabelSetuju || "Setuju dibayar,"}</p>
                  <p className="mb-0.5">{docConfig.labelJabatanKiri || "Kepala Sekolah"}</p>
                  <p className="mb-14">{docConfig.kopNamaSkpd || "SD Negeri ..."}</p>
                  <div className="border-b border-gray-800 w-max pb-0.5 mb-0.5">
                    <p className="font-bold">{docConfig.kepala || "Nama Kepala Sekolah"}</p>
                  </div>
                  <p>NIP. {docConfig.nipKepala || "..."}</p>
                </div>

                <div className="flex flex-col">
                  <p className="mb-0.5">{docConfig.kwtLabelLunas || "Lunas dibayar,"} {docConfig.tanggalLunas || "..."}</p>
                  <p className="mb-14">{docConfig.labelJabatanKanan || "Bendahara"}</p>
                  <div className="border-b border-gray-800 w-max pb-0.5 mb-0.5">
                    <p className="font-bold">{docConfig.bendahara || "Nama Bendahara"}</p>
                  </div>
                  <p>NIP. {docConfig.nipBendahara || "..."}</p>
                </div>

                <div className="flex flex-col">
                  <p className="mb-0.5">{docConfig.tempat || "Tempat"}, {docConfig.tanggalKwitansi || "..."}</p>
                  <p className="mb-14">{docConfig.kwtLabelPenerima || "Penerima"}</p>
                  <div className="border-b border-gray-800 w-max pb-0.5 mb-0.5">
                    <p className="font-bold uppercase">{item.penerimaKwt || item.penerima || "Nama Penerima"}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}