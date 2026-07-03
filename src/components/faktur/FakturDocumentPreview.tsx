"use client";
import React from "react";

export default function FakturDocumentPreview({ docConfig, spjData, logoUrl }: any) {
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
        // Hitung Grand Total khusus untuk vendor ini
        const totalVendor = items.reduce((sum: number, curr: any) => {
          const qty = parseFloat(curr.qtyPo || "1");
          const harga = parseInt(String(curr.hargaSatuanPo).replace(/\D/g, ""), 10) || curr.total;
          return sum + (qty * harga);
        }, 0);

        return (
          <div key={index} className="min-h-[148mm] bg-white shadow-md p-[20mm] text-black font-serif text-sm border border-gray-300 relative print:h-[297mm] print:w-[210mm] print:shadow-none print:border-none print:m-0 print:break-inside-avoid print:break-after-page box-border overflow-hidden">
            
            {/* ── HEADER FAKTUR ── */}
            <div className="flex justify-between items-end border-b-[3px] border-black pb-4 mb-6">
              <div>
                {/* Logo Toko (Opsional, pake logo instansi sementara atau biarin kosong) */}
                <h2 className="text-3xl font-black uppercase tracking-widest text-slate-800">{vendor}</h2>
                <p className="text-xs mt-1 text-gray-600">Penyedia Barang dan Jasa</p>
                <p className="text-xs">{docConfig.fakturAlamatPenyedia || "Alamat Toko ............................"}</p>
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold uppercase tracking-widest text-gray-400">{docConfig.fakturTitle || "FAKTUR"}</h1>
                <p className="font-bold text-gray-800 mt-2">No: {docConfig.fakturNomor || `INV/${String(index+1).padStart(3,'0')}/2026`}</p>
                <p className="text-sm">Tanggal: {docConfig.fakturTanggal || docConfig.tanggalTbp || "..."}</p>
              </div>
            </div>

            {/* ── KEPADA YTH ── */}
            <div className="mb-8 w-[300px] border border-gray-300 p-3 bg-slate-50">
              <p className="mb-1 text-xs text-gray-500">{docConfig.fakturKepadaLabel || "Kepada Yth."}</p>
              <p className="font-bold uppercase">{docConfig.kepala}</p>
              <p className="text-xs">{docConfig.labelJabatanKiri || "Pejabat Pembuat Komitmen"}</p>
              <p className="text-xs uppercase mt-1">{docConfig.kopNamaSkpd}</p>
            </div>

            {/* ── TABEL FAKTUR ── */}
            <table className="w-full border-collapse border border-black mb-6 text-[13px]">
              <thead>
                <tr className="bg-slate-100 text-center font-bold">
                  <th className="border border-black p-2 w-10">{docConfig.hFakturNo || "No"}</th>
                  <th className="border border-black p-2">{docConfig.hFakturNamaBarang || "Nama Barang/Jasa"}</th>
                  <th className="border border-black p-2 w-16">{docConfig.hFakturQty || "Qty"}</th>
                  <th className="border border-black p-2 w-28">{docConfig.hFakturHargaSatuan || "Harga Satuan"}</th>
                  <th className="border border-black p-2 w-28">{docConfig.hFakturTotal || "Jumlah"}</th>
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
                      <td className="border border-black p-2">{itemObj.barangFaktur || itemObj.barang}</td>
                      <td className="border border-black p-2 text-center font-semibold">{itemObj.qtyPo || "1"} <span className="font-normal text-xs">{itemObj.satuanPo || "Ls"}</span></td>
                      <td className="border border-black p-2 text-right">{harga.toLocaleString("id-ID")}</td>
                      <td className="border border-black p-2 text-right font-bold">{subtotal.toLocaleString("id-ID")}</td>
                    </tr>
                  )
                })}
                {/* Baris Grand Total */}
                <tr className="bg-slate-100">
                  <td colSpan={4} className="border border-black p-2 text-right font-bold uppercase pr-4">Grand Total</td>
                  <td className="border border-black p-2 text-right font-black text-slate-800">{totalVendor.toLocaleString("id-ID")}</td>
                </tr>
              </tbody>
            </table>

            {/* ── TANDA TANGAN VENDOR ── */}
            <div className="flex justify-end text-center mt-12">
              <div className="w-[200px]">
                <p className="mb-16">Hormat Kami,<br/>Penyedia Barang/Jasa</p>
                <div className="border-b border-black w-max mx-auto pb-0.5 mb-0.5">
                  <p className="font-bold uppercase">{vendor}</p>
                </div>
              </div>
            </div>

            {/* ── FOOTER PENUTUP ── */}
            {docConfig.fakturTeksPenutup && (
              <div className="mt-8 text-center text-xs italic text-gray-500">
                <p>{docConfig.fakturTeksPenutup}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}