"use client";
import React from "react";

export default function BapbDocumentPreview({ docConfig, spjData, logoUrl }: any) {
  const groupedByVendor = spjData.items.reduce((acc: any, item: any) => {
    const vendorName = item.penerima || "VENDOR TANPA NAMA";
    if (!acc[vendorName]) acc[vendorName] = [];
    acc[vendorName].push(item);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-8 max-w-[210mm] mx-auto print:block print:gap-0 print:m-0 print:p-0 print:w-full">
      {Object.entries(groupedByVendor).map(([vendor, items]: any, index: number) => (
        <div 
          key={index} 
          className="min-h-[297mm] bg-white shadow-2xl p-[20mm] text-black font-serif text-sm border border-slate-200 relative pb-40 print:h-[297mm] print:w-[210mm] print:shadow-none print:border-none print:m-0 print:break-inside-avoid print:break-after-page box-border overflow-hidden"
        >
          
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
            <h2 className="text-lg font-bold underline uppercase">{docConfig.bapbTitle || "Berita Acara Penerimaan Barang"}</h2>
            <p>{docConfig.bapbNomor || `Nomor: 030/BAPB-${String(index + 1).padStart(3, '0')}/2026`}</p>
          </div>

          {/* ── ISI NARRATIVE ── */}
          <div className="text-justify leading-relaxed mb-6">
            <p className="mb-4">
              {docConfig.bapbPadaHariIni || `Pada hari ini ......... tanggal ......... bulan ......... tahun 2026, kami yang bertanda tangan di bawah ini:`}
            </p>

            <table className="w-full mb-4 ml-4">
              <tbody>
                <tr>
                  <td className="w-[30px] align-top">1.</td>
                  <td className="w-[120px] py-1">Nama</td>
                  <td className="w-4 py-1">:</td>
                  <td className="py-1 font-bold uppercase">{vendor}</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-1">Jabatan</td>
                  <td className="py-1">:</td>
                  <td className="py-1">{docConfig.bapbPihakPertamaJabatan || "Pimpinan / Pemilik Toko"}</td>
                </tr>
                <tr>
                  <td></td>
                  <td colSpan={3} className="py-2">Selanjutnya disebut <b>{docConfig.bapbPihakPertamaLabel || "PIHAK PERTAMA"}</b>.</td>
                </tr>

                <tr><td colSpan={4} className="h-4"></td></tr>

                <tr>
                  <td className="w-[30px] align-top">2.</td>
                  <td className="py-1">Nama</td>
                  <td className="py-1">:</td>
                  <td className="py-1 font-bold">{docConfig.bapbPihakKeduaNama || "Nama Panitia Pemeriksa"}</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-1">Jabatan</td>
                  <td className="py-1">:</td>
                  <td className="py-1">{docConfig.bapbPihakKeduaJabatan || "Panitia Penerima Hasil Pekerjaan"}</td>
                </tr>
                <tr>
                  <td></td>
                  <td colSpan={3} className="py-2">Selanjutnya disebut <b>{docConfig.bapbPihakKeduaLabel || "PIHAK KEDUA"}</b>.</td>
                </tr>
              </tbody>
            </table>

            <p className="mb-4">{docConfig.bapbTeksTengah || "Berdasarkan Nota Pesanan, PIHAK KEDUA telah melakukan pemeriksaan fisik terhadap barang yang dikirimkan oleh PIHAK PERTAMA dengan hasil sebagai berikut:"}</p>
          </div>

          {/* ── TABEL PEMERIKSAAN BARANG ── */}
          <table className="w-full border-collapse border border-black mb-6 text-[13px]">
            <thead>
              <tr className="bg-slate-100 text-center font-bold">
                <th className="border border-black p-2 w-10">{docConfig.hBapbNo || "No"}</th>
                <th className="border border-black p-2">{docConfig.hBapbNamaBarang || "Nama / Spesifikasi Barang"}</th>
                <th className="border border-black p-2 w-24">{docConfig.hBapbQty || "Jumlah"}</th>
                <th className="border border-black p-2 w-32">{docConfig.hBapbKondisi || "Kondisi"}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((itemObj: any, i: number) => (
                <tr key={i}>
                  <td className="border border-black p-2 text-center">{i + 1}</td>
                  <td className="border border-black p-2">{itemObj.barangBapb || itemObj.barang}</td>
                  <td className="border border-black p-2 text-center font-semibold">{itemObj.qtyPo || "1"} <span className="font-normal text-xs">{itemObj.satuanPo || "Ls"}</span></td>
                  <td className="border border-black p-2 text-center font-bold text-green-700">{itemObj.kondisiBapb || "BAIK"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ── PENUTUP ── */}
          <div className="mb-12 text-justify">
            <p>{docConfig.bapbTeksPenutup || "Demikian Berita Acara Penerimaan Barang ini dibuat untuk dipergunakan sebagaimana mestinya."}</p>
          </div>

          {/* ── TANDA TANGAN PIHAK 1 & 2 ── */}
          <div className="flex justify-between text-center mt-8">
            <div className="w-[250px]">
              <p className="mb-16">{docConfig.bapbPihakPertamaLabel || "PIHAK PERTAMA"},</p>
              <div className="border-b border-black w-max mx-auto pb-0.5 mb-0.5">
                <p className="font-bold uppercase">{vendor}</p>
              </div>
            </div>
            
            <div className="w-[250px]">
              <p className="mb-16">{docConfig.bapbPihakKeduaLabel || "PIHAK KEDUA"},</p>
              <div className="border-b border-black w-max mx-auto pb-0.5 mb-0.5">
                <p className="font-bold">{docConfig.bapbPihakKeduaNama || "Nama Panitia"}</p>
              </div>
              <p>NIP. ................................</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}