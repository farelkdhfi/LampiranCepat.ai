"use client";
import React, { useState } from "react";
import type { DocConfig, SpjData, SpjItem } from "@/types/spj";
import { ChevronDown, ChevronUp, Layers } from "lucide-react";

interface Props {
  docConfig: DocConfig;
  spjData: SpjData;
  onConfigEdit: (field: keyof DocConfig, value: string) => void;
  onItemEdit: (index: number, field: keyof SpjItem, value: string) => void;
}

const lbl = "block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1";
const inp = "w-full border border-slate-200 rounded-lg px-3 py-2 text-[12.5px] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800 transition-all";

export default function BastFormPanel({ docConfig, spjData, onConfigEdit, onItemEdit }: Props) {
  const [showLayoutEdit, setShowLayoutEdit] = useState(false);

  // LOGIC GROUPING UNTUK UI FORM
  const groupedItems = spjData.items.reduce((acc: any, item: any, originalIndex: number) => {
    const vendorName = item.penerima || "VENDOR TANPA NAMA";
    if (!acc[vendorName]) acc[vendorName] = [];
    acc[vendorName].push({ ...item, originalIndex });
    return acc;
  }, {});

  const totalGroups = Object.keys(groupedItems).length;

  return (
    <div className="p-5 space-y-6">
      
      {/* ── Section Identitas BAST ── */}
      <div>
        <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 border-b border-blue-100 pb-2">
          Info Berita Acara
        </p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="col-span-2">
            <label className={lbl}>Tanggal BAST (Teks Lengkap)</label>
            <input type="text" value={docConfig.bastPadaHariIni || ""} onChange={(e) => onConfigEdit("bastPadaHariIni", e.target.value)} className={inp} placeholder="Pada hari ini, tanggal 12 bulan April tahun 2026..." />
          </div>
          <div className="col-span-2">
            <label className={lbl}>Nomor BAST</label>
            <input type="text" value={docConfig.bastNomor || ""} onChange={(e) => onConfigEdit("bastNomor", e.target.value)} className={inp} placeholder="Nomor: 029/BAST/2026" />
          </div>
        </div>
      </div>

      {/* ── Accordion: Kustomisasi Teks Template ── */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <button 
          onClick={() => setShowLayoutEdit(!showLayoutEdit)}
          className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-blue-50 transition-colors"
        >
          <span className="text-xs font-black text-slate-600 uppercase tracking-widest">
            Kustomisasi Teks Template
          </span>
          {showLayoutEdit ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>
        
        {showLayoutEdit && (
          <div className="p-4 space-y-4 bg-white border-t border-slate-100">
            <div>
              <label className={lbl}>Judul Dokumen</label>
              <input type="text" value={docConfig.bastTitle || "BERITA ACARA SERAH TERIMA BARANG"} onChange={(e) => onConfigEdit("bastTitle", e.target.value)} className={inp} />
            </div>

            {/* Label Pihak 1 (Vendor) */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div className="col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">Pihak 1 (Vendor)</label>
              </div>
              <div>
                <label className={lbl}>Label Pihak 1</label>
                <input type="text" value={docConfig.bastPihakPertamaLabel || "PIHAK PERTAMA"} onChange={(e) => onConfigEdit("bastPihakPertamaLabel", e.target.value)} className={inp} />
              </div>
              <div>
                <label className={lbl}>Jabatan Pihak 1</label>
                <input type="text" value={docConfig.bastPihakPertamaJabatan || "Pimpinan / Pemilik Usaha"} onChange={(e) => onConfigEdit("bastPihakPertamaJabatan", e.target.value)} className={inp} />
              </div>
            </div>

            {/* Label Pihak 2 (Sekolah) */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div className="col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">Pihak 2 (Sekolah)</label>
              </div>
              <div>
                <label className={lbl}>Label Pihak 2</label>
                <input type="text" value={docConfig.bastPihakKeduaLabel || "PIHAK KEDUA"} onChange={(e) => onConfigEdit("bastPihakKeduaLabel", e.target.value)} className={inp} />
              </div>
            </div>

            {/* Paragraf Pembuka & Penutup */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <label className={lbl}>Paragraf Transisi (Tengah)</label>
                <textarea rows={2} value={docConfig.bastTeksTengah || ""} onChange={(e) => onConfigEdit("bastTeksTengah", e.target.value)} className={`${inp} resize-none`} />
              </div>
              <div>
                <label className={lbl}>Paragraf Penutup</label>
                <textarea rows={2} value={docConfig.bastTeksPenutup || ""} onChange={(e) => onConfigEdit("bastTeksPenutup", e.target.value)} className={`${inp} resize-none`} />
              </div>
            </div>

            {/* Header Tabel */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 mb-2">Header Tabel Rincian</label>
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1">
                  <label className={lbl}>Kolom 1</label>
                  <input type="text" value={docConfig.hBastNo || "No"} onChange={(e) => onConfigEdit("hBastNo", e.target.value)} className={inp} />
                </div>
                <div className="col-span-3">
                  <label className={lbl}>Kolom 2 (Barang)</label>
                  <input type="text" value={docConfig.hBastNamaBarang || "Nama Barang"} onChange={(e) => onConfigEdit("hBastNamaBarang", e.target.value)} className={inp} />
                </div>
                <div className="col-span-2">
                  <label className={lbl}>Kolom 3 (Jumlah)</label>
                  <input type="text" value={docConfig.hBastQty || "Jumlah"} onChange={(e) => onConfigEdit("hBastQty", e.target.value)} className={inp} />
                </div>
                <div className="col-span-2">
                  <label className={lbl}>Kolom 4 (Keterangan)</label>
                  <input type="text" value={docConfig.hBastKeterangan || "Keterangan"} onChange={(e) => onConfigEdit("hBastKeterangan", e.target.value)} className={inp} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Section Rincian BAST (Grouped) ── */}
      <div>
        <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 border-b border-blue-100 pb-2 flex items-center justify-between">
          <span>Rincian Fisik Barang</span>
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px]">{totalGroups} BAST Dihasilkan</span>
        </p>

        {/* Info Box */}
        <div className="mb-4 bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-start gap-3">
          <Layers className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 leading-relaxed">
            Hanya <strong className="font-black">{totalGroups} dokumen BAST</strong> yang akan dicetak dari total {spjData.items.length} nota.
          </p>
        </div>

        <div className="space-y-5">
          {Object.entries(groupedItems).map(([vendor, items]: any, groupIdx) => (
            <div key={groupIdx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm relative">
              
              {/* Header Group */}
              <div className="bg-slate-800 px-4 py-2.5 border-b border-slate-200 flex justify-between items-center">
                 <span className="text-xs font-bold text-white uppercase tracking-wider">{vendor}</span>
                 <span className="text-[10px] bg-slate-700 font-bold px-2 py-1 rounded-md text-slate-300 shadow-inner">
                   Menggabungkan {items.length} Nota
                 </span>
              </div>
              
              {/* Isi Item per Vendor */}
              <div className="p-4 space-y-3 bg-slate-50">
                {items.map((itemObj: any, index: number) => (
                  <div key={itemObj.originalIndex} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm relative">
                    <div className="absolute top-3 left-3 w-5 h-5 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center text-[10px] font-black border border-slate-200">
                      {index + 1}
                    </div>
                    <div className="pl-8">
                      <div className="mb-2">
                        <label className={lbl}>Nama Pihak Pertama (Vendor)</label>
                        <input
                          type="text"
                          value={itemObj.penerima || ""}
                          onChange={(e) => onItemEdit(itemObj.originalIndex, "penerima", e.target.value)}
                          className={inp}
                        />
                      </div>
                      
                      <div className="mb-2">
                        <label className={lbl}>Spesifikasi Barang</label>
                        <input
                          type="text"
                          value={itemObj.barangBast || itemObj.barang || ""}
                          onChange={(e) => onItemEdit(itemObj.originalIndex, "barangBast", e.target.value)}
                          className={inp}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className={lbl}>Volume/Qty Fisik</label>
                          <input
                            type="text"
                            value={itemObj.qtyPo || "1"} // Ambil dari qtyPo biar selaras sama Nota Pesanan
                            onChange={(e) => onItemEdit(itemObj.originalIndex, "qtyPo", e.target.value)}
                            className={inp}
                          />
                        </div>
                        <div>
                          <label className={lbl}>Keterangan Fisik</label>
                          <input
                            type="text"
                            value={itemObj.keteranganBast || "BAIK / LENGKAP"}
                            onChange={(e) => onItemEdit(itemObj.originalIndex, "keteranganBast", e.target.value)}
                            className={inp}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}