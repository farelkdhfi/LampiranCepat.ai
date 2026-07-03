"use client";
import React from "react";

export default function BapDocumentPreview({ docConfig, spjData, logoUrl }: any) {
  // ── LOGIC GROUPING PER VENDOR ──
  const groupedByVendor = spjData.items.reduce((acc: any, item: any) => {
    const vendorName = item.penerima || "VENDOR TANPA NAMA";
    if (!acc[vendorName]) acc[vendorName] = [];
    acc[vendorName].push(item);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-8 max-w-[210mm] mx-auto print:block print:gap-0 print:m-0 print:p-0 print:w-full">
      {/* ── ITERASI PER VENDOR, BUKAN PER ITEM ── */}
      {Object.entries(groupedByVendor).map(([vendor, items]: any, index: number) => {
        
        // Hitung total nilai BAP untuk vendor ini
        const totalVendor = items.reduce((sum: number, curr: any) => sum + curr.total, 0);

        return (
          <div key={index} className="min-h-[297mm] bg-white shadow-2xl p-[20mm] text-black font-serif text-sm border border-slate-200 relative print:h-[297mm] print:w-[210mm] print:shadow-none print:border-none print:m-0 print:break-inside-avoid print:break-after-page box-border overflow-hidden">
            
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

            {/* ── JUDUL ── */}
            <div className="text-center mb-8">
              <h2 className="text-lg font-bold underline uppercase">{docConfig.bapTitle || "Berita Acara Pembayaran"}</h2>
              <p>{docConfig.bapNomor || `Nomor: 020/BAP-${String(index+1).padStart(3,'0')}/2026`}</p>
            </div>

            {/* ── ISI NARRATIVE ── */}
            <div className="text-justify leading-relaxed mb-6">
              <p className="mb-4">
                {docConfig.bapPadaHariIni || `Pada hari ini ......... tanggal ......... bulan ......... tahun 2026, kami yang bertanda tangan di bawah ini:`}
              </p>

              <table className="w-full mb-4 ml-4">
                <tbody>
                  {/* Pihak Pertama (Bendahara) */}
                  <tr>
                    <td className="w-[30px] align-top">1.</td>
                    <td className="w-[120px] py-1">Nama</td>
                    <td className="w-4 py-1">:</td>
                    <td className="py-1 font-bold">{docConfig.bendahara || "Nama Bendahara"}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="py-1">Jabatan</td>
                    <td className="py-1">:</td>
                    <td className="py-1">{docConfig.labelJabatanKanan || "Bendahara Pengeluaran"}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td colSpan={3} className="py-2">Selanjutnya disebut <b>{docConfig.bapPihakPertamaLabel || "PIHAK PERTAMA"}</b>.</td>
                  </tr>

                  <tr><td colSpan={4} className="h-4"></td></tr>

                  {/* Pihak Kedua (Vendor dari Grouping) */}
                  <tr>
                    <td className="w-[30px] align-top">2.</td>
                    <td className="py-1">Nama</td>
                    <td className="py-1">:</td>
                    <td className="py-1 font-bold uppercase">{vendor}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="py-1">Jabatan</td>
                    <td className="py-1">:</td>
                    <td className="py-1">{docConfig.bapPihakKeduaJabatan || "Pimpinan / Pemilik Toko"}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td colSpan={3} className="py-2">Selanjutnya disebut <b>{docConfig.bapPihakKeduaLabel || "PIHAK KEDUA"}</b>.</td>
                  </tr>
                </tbody>
              </table>

              <p className="mb-4">
                {docConfig.bapTeksTengah || "PIHAK PERTAMA telah melakukan pembayaran kepada PIHAK KEDUA dengan rincian sebagai berikut:"}
              </p>
            </div>

            {/* ── TABEL RINCIAN BARANG (Multi Item) ── */}
            <table className="w-full border-collapse border border-black mb-6 text-[13px]">
              <thead>
                <tr className="bg-slate-100 text-center font-bold">
                  <th className="border border-black p-2 w-10">{docConfig.hBapNo || "No"}</th>
                  <th className="border border-black p-2">{docConfig.hBapUraian || "Uraian Pembayaran"}</th>
                  <th className="border border-black p-2 w-40">{docConfig.hBapJumlah || "Jumlah (Rp)"}</th>
                </tr>
              </thead>
              <tbody>
                {/* Looping item-item milik vendor ini */}
                {items.map((itemObj: any, i: number) => (
                  <tr key={i}>
                    <td className="border border-black p-2 text-center">{i + 1}</td>
                    <td className="border border-black p-2 leading-relaxed">{itemObj.barangBap || itemObj.barang}</td>
                    <td className="border border-black p-2 text-right">{itemObj.total.toLocaleString("id-ID")}</td>
                  </tr>
                ))}
                
                {/* Row Subtotal Vendor */}
                <tr className="bg-slate-100 font-bold">
                  <td colSpan={2} className="border border-black p-2 text-center uppercase">Total Pembayaran ke Pihak Kedua</td>
                  <td className="border border-black p-2 text-right">{totalVendor.toLocaleString("id-ID")}</td>
                </tr>
              </tbody>
            </table>

            <div className="text-justify leading-relaxed mb-12">
               <p>{docConfig.bapTeksPenutup || "Demikian Berita Acara Pembayaran ini dibuat dalam rangkap yang secukupnya untuk dipergunakan sebagaimana mestinya dan penuh tanggung jawab."}</p>
            </div>

            {/* ── TANDA TANGAN ── */}
            <div className="flex justify-between text-center mt-12">
              <div className="w-[250px]">
                <p className="mb-16">{docConfig.bapPihakKeduaLabel || "PIHAK KEDUA"},</p>
                <div className="border-b border-black w-max mx-auto pb-0.5 mb-0.5">
                  <p className="font-bold uppercase">{vendor}</p>
                </div>
              </div>
              
              <div className="w-[250px]">
                <p className="mb-16">{docConfig.bapPihakPertamaLabel || "PIHAK PERTAMA"},</p>
                <div className="border-b border-black w-max mx-auto pb-0.5 mb-0.5">
                  <p className="font-bold">{docConfig.bendahara}</p>
                </div>
                <p>NIP. {docConfig.nipBendahara || docConfig.nip}</p>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}