"use client";
import React from "react";

export default function BastDocumentPreview({ docConfig, spjData, logoUrl }: any) {
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
      {Object.entries(groupedByVendor).map(([vendor, items]: any, index: number) => (
        <div key={index} className="min-h-[297mm] bg-white shadow-2xl p-[20mm] text-black font-serif text-sm border border-slate-200 relative pb-40 print:h-[297mm] print:w-[210mm] print:shadow-none print:border-none print:m-0 print:break-inside-avoid print:break-after-page box-border overflow-hidden">
          
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
            <h2 className="text-lg font-bold underline uppercase">{docConfig.bastTitle || "Berita Acara Serah Terima Barang"}</h2>
            <p>{docConfig.bastNomor || `Nomor: 020/BAST-${String(index + 1).padStart(3, '0')}/2026`}</p>
          </div>

          {/* ── ISI NARRATIVE ── */}
          <div className="text-justify leading-relaxed mb-6">
            <p className="mb-4">
              {docConfig.bastPadaHariIni || `Pada hari ini ......... tanggal ......... bulan ......... tahun 2026, kami yang bertanda tangan di bawah ini:`}
            </p>

            <table className="w-full mb-4 ml-4">
              <tbody>
                {/* Pihak Pertama (Vendor) */}
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
                  <td className="py-1">{docConfig.bastPihakPertamaJabatan || "Pimpinan / Pemilik Toko"}</td>
                </tr>
                <tr>
                  <td></td>
                  <td colSpan={3} className="py-2">Selanjutnya disebut <b>{docConfig.bastPihakPertamaLabel || "PIHAK PERTAMA"}</b>.</td>
                </tr>

                <tr><td colSpan={4} className="h-4"></td></tr>

                {/* Pihak Kedua (Pejabat/Sekolah) */}
                <tr>
                  <td className="w-[30px] align-top">2.</td>
                  <td className="py-1">Nama</td>
                  <td className="py-1">:</td>
                  <td className="py-1 font-bold">{docConfig.kepala || "Kepala Sekolah"}</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-1">Jabatan</td>
                  <td className="py-1">:</td>
                  <td className="py-1">{docConfig.labelJabatanKiri || "Kuasa Pengguna Anggaran"}</td>
                </tr>
                <tr>
                  <td></td>
                  <td colSpan={3} className="py-2">Selanjutnya disebut <b>{docConfig.bastPihakKeduaLabel || "PIHAK KEDUA"}</b>.</td>
                </tr>
              </tbody>
            </table>

            <p className="mb-4">{docConfig.bastTeksTengah || "PIHAK PERTAMA telah menyerahkan barang/pekerjaan kepada PIHAK KEDUA dan PIHAK KEDUA telah menerima barang/pekerjaan tersebut dengan rincian sebagai berikut:"}</p>
          </div>

          {/* ── TABEL RINCIAN BARANG ── */}
          <table className="w-full border-collapse border border-black mb-6 text-[13px]">
            <thead>
              <tr className="bg-slate-100 text-center font-bold">
                <th className="border border-black p-2 w-10">{docConfig.hBastNo || "No"}</th>
                <th className="border border-black p-2">{docConfig.hBastNamaBarang || "Nama Barang/Pekerjaan"}</th>
                <th className="border border-black p-2 w-24">{docConfig.hBastQty || "Jumlah"}</th>
                <th className="border border-black p-2 w-32">{docConfig.hBastKeterangan || "Keterangan"}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((itemObj: any, i: number) => (
                <tr key={i}>
                  <td className="border border-black p-2 text-center">{i + 1}</td>
                  <td className="border border-black p-2">{itemObj.barangBast || itemObj.barang}</td>
                  <td className="border border-black p-2 text-center font-semibold">{itemObj.qtyPo || "1"} <span className="font-normal text-xs">{itemObj.satuanPo || "Ls"}</span></td>
                  <td className="border border-black p-2 text-center">{itemObj.keteranganBast || "BAIK / LENGKAP"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ── PENUTUP ── */}
          <div className="mb-12 text-justify">
            <p>{docConfig.bastTeksPenutup || "Demikian Berita Acara Serah Terima ini dibuat dalam rangkap secukupnya untuk dipergunakan sebagaimana mestinya."}</p>
          </div>

          {/* ── TANDA TANGAN PIHAK 1 & 2 ── */}
          <div className="flex justify-between text-center mt-8">
            <div className="w-[250px]">
              <p className="mb-16">{docConfig.bastPihakPertamaLabel || "PIHAK PERTAMA"},</p>
              <div className="border-b border-black w-max mx-auto pb-0.5 mb-0.5">
                <p className="font-bold uppercase">{vendor}</p>
              </div>
            </div>
            
            <div className="w-[250px]">
              <p className="mb-16">{docConfig.bastPihakKeduaLabel || "PIHAK KEDUA"},</p>
              <div className="border-b border-black w-max mx-auto pb-0.5 mb-0.5">
                <p className="font-bold">{docConfig.kepala}</p>
              </div>
              <p>NIP. {docConfig.nipKepala}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}