"use client";
import React from "react";

export default function PhDocumentPreview({ docConfig, spjData }: any) {
  // ── LOGIC GROUPING PER VENDOR ──
  const groupedByVendor = spjData.items.reduce((acc: any, item: any) => {
    const vendorName = item.penerima || "VENDOR TANPA NAMA";
    if (!acc[vendorName]) acc[vendorName] = [];
    acc[vendorName].push(item);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-8 max-w-[210mm] mx-auto print:block print:gap-0 print:m-0 print:p-0 print:w-full">
      {/* ── ITERASI PER VENDOR ── */}
      {Object.entries(groupedByVendor).map(([vendor, items]: any, index: number) => {
        // Hitung Grand Total Penawaran Vendor
        const totalVendor = items.reduce((sum: number, curr: any) => {
          const qty = parseFloat(curr.qtyPo || "1");
          const harga = parseInt(String(curr.hargaSatuanPo).replace(/\D/g, ""), 10) || curr.total;
          return sum + (qty * harga);
        }, 0);

        return (
          <div key={index} className="min-h-[297mm] bg-white shadow-md p-[20mm] text-black font-serif text-sm border border-gray-300 relative print:h-[297mm] print:w-[210mm] print:shadow-none print:border-none print:m-0 print:break-inside-avoid print:break-after-page box-border overflow-hidden">
            
            {/* ── KOP SURAT VENDOR (Seolah-olah dari Toko) ── */}
            <div className="border-b-[3px] border-black pb-4 mb-8 text-center">
              <h2 className="text-2xl font-black uppercase tracking-widest">{vendor}</h2>
              <p className="text-xs mt-1">Penyedia Barang dan Jasa</p>
              <p className="text-xs">{docConfig.phAlamatPenyedia || "Alamat Toko ............................"}</p>
            </div>

            {/* ── TANGGAL & TUJUAN SURAT ── */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <table className="text-sm">
                  <tbody>
                    <tr>
                      <td className="py-0.5 pr-4">Nomor</td>
                      <td className="py-0.5 pr-2">:</td>
                      <td className="py-0.5">{docConfig.phNomor || `01/PH-${String(index+1).padStart(3,'0')}/2026`}</td>
                    </tr>
                    <tr>
                      <td className="py-0.5 pr-4">Perihal</td>
                      <td className="py-0.5 pr-2">:</td>
                      <td className="py-0.5 font-bold underline">{docConfig.phPerihal || "Penawaran Harga"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-right">
                <p>{docConfig.tempat || "Tempat"}, {docConfig.phTanggal || docConfig.tanggalPo || "Tanggal..."}</p>
              </div>
            </div>

            {/* ── KEPADA YTH ── */}
            <div className="mb-8">
              <p className="mb-1">{docConfig.phKepadaLabel || "Kepada Yth."}</p>
              <p className="font-bold">{docConfig.kepala}</p>
              <p>{docConfig.labelJabatanKiri || "Pejabat Pembuat Komitmen"}</p>
              <p className="uppercase">{docConfig.kopNamaSkpd}</p>
            </div>

            {/* ── ISI SURAT ── */}
            <div className="mb-4 text-justify">
              <p>{docConfig.phTeksPembuka || "Dengan hormat, sehubungan dengan kebutuhan pengadaan barang/jasa di instansi Saudara, kami bermaksud menawarkan harga dengan rincian sebagai berikut:"}</p>
            </div>

            {/* ── TABEL PENAWARAN ── */}
            <table className="w-full border-collapse border border-black mb-6 text-[13px]">
              <thead>
                <tr className="bg-slate-100 text-center font-bold">
                  <th className="border border-black p-2 w-10">{docConfig.hPhNo || "No"}</th>
                  <th className="border border-black p-2">{docConfig.hPhNamaBarang || "Nama Barang/Jasa"}</th>
                  <th className="border border-black p-2 w-16">{docConfig.hPhQty || "Vol"}</th>
                  <th className="border border-black p-2 w-28">{docConfig.hPhHargaSatuan || "Harga Satuan"}</th>
                  <th className="border border-black p-2 w-28">{docConfig.hPhTotal || "Jumlah"}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((itemObj: any, i: number) => {
                  const qty = parseFloat(itemObj.qtyPo || "1");
                  const harga = parseInt(String(itemObj.hargaSatuanPo).replace(/\D/g, ""), 10) || itemObj.total;
                  const subtotal = qty * harga;
                  
                  return (
                    <tr key={i}>
                      <td className="border border-black p-2 text-center">{i + 1}</td>
                      <td className="border border-black p-2">{itemObj.barangPh || itemObj.barang}</td>
                      <td className="border border-black p-2 text-center font-semibold">{itemObj.qtyPo || "1"} <span className="font-normal text-xs">{itemObj.satuanPo || "Ls"}</span></td>
                      <td className="border border-black p-2 text-right">{harga.toLocaleString("id-ID")}</td>
                      <td className="border border-black p-2 text-right font-bold">{subtotal.toLocaleString("id-ID")}</td>
                    </tr>
                  )
                })}
                <tr className="bg-slate-100">
                  <td colSpan={4} className="border border-black p-2 text-center font-bold uppercase">Total Penawaran</td>
                  <td className="border border-black p-2 text-right font-bold">{totalVendor.toLocaleString("id-ID")}</td>
                </tr>
              </tbody>
            </table>

            {/* ── PENUTUP & TTD VENDOR ── */}
            <div className="mb-12 text-justify">
              <p>{docConfig.phTeksPenutup || "Besar harapan kami agar penawaran ini dapat disetujui. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih."}</p>
            </div>
            <div className="flex justify-end text-center mt-12">
              <div className="w-[250px]">
                <p className="mb-16">Hormat Kami,<br/>Penyedia Barang/Jasa</p>
                <div className="border-b border-black w-max mx-auto pb-0.5 mb-0.5">
                  <p className="font-bold uppercase">{vendor}</p>
                </div>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}