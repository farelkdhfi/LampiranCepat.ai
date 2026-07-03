"use client";
import React, { useState } from "react";
import type { DocConfig, SpjData, SpjItem } from "@/types/spj";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  docConfig: DocConfig;
  spjData: SpjData;
  onConfigEdit: (field: keyof DocConfig, value: string) => void;
  onItemEdit: (index: number, field: keyof SpjItem, value: string) => void;
}

const lbl = "block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1";
const inp = "w-full border border-slate-200 rounded-lg px-3 py-2 text-[12.5px] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800 transition-all";

export default function NotaPesananFormPanel({ docConfig, spjData, onConfigEdit, onItemEdit }: Props) {
  const [showLayoutEdit, setShowLayoutEdit] = useState(false);

  return (
    <div className="p-5 space-y-6">
      
      {/* ── Section Identitas Nota ── */}
      <div>
        <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 border-b border-blue-100 pb-2">
          Info Nota Pesanan
        </p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className={lbl}>Tanggal Pemesanan</label>
            <input type="text" value={docConfig.tanggalPo || ""} onChange={(e) => onConfigEdit("tanggalPo", e.target.value)} className={inp} placeholder="10 Januari 2026" />
          </div>
          <div>
            <label className={lbl}>Nomor Surat</label>
            <input type="text" value={docConfig.poNomor || ""} onChange={(e) => onConfigEdit("poNomor", e.target.value)} className={inp} placeholder="Nomor: 027/PO/2026" />
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
            {/* Header & Kepada */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>Judul Dokumen</label>
                <input type="text" value={docConfig.poTitle || "NOTA PESANAN"} onChange={(e) => onConfigEdit("poTitle", e.target.value)} className={inp} />
              </div>
              <div>
                <label className={lbl}>Label "Kepada Yth."</label>
                <input type="text" value={docConfig.poKepadaLabel || "Kepada Yth."} onChange={(e) => onConfigEdit("poKepadaLabel", e.target.value)} className={inp} />
              </div>
            </div>

            {/* Paragraf Pembuka & Penutup */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <label className={lbl}>Paragraf Pembuka</label>
                <textarea rows={2} value={docConfig.poTeksPembuka || ""} onChange={(e) => onConfigEdit("poTeksPembuka", e.target.value)} className={`${inp} resize-none`} />
              </div>
              <div>
                <label className={lbl}>Paragraf Penutup</label>
                <textarea rows={2} value={docConfig.poTeksPenutup || ""} onChange={(e) => onConfigEdit("poTeksPenutup", e.target.value)} className={`${inp} resize-none`} />
              </div>
            </div>

            {/* Header Tabel */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 mb-2">Header Tabel Pesanan</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lbl}>Kolom 1 (No)</label>
                  <input type="text" value={docConfig.hPoNo || "No."} onChange={(e) => onConfigEdit("hPoNo", e.target.value)} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Kolom 2 (Barang)</label>
                  <input type="text" value={docConfig.hPoNamaBarang || "Nama Barang"} onChange={(e) => onConfigEdit("hPoNamaBarang", e.target.value)} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Kolom 3 (Volume)</label>
                  <input type="text" value={docConfig.hPoQty || "Volume"} onChange={(e) => onConfigEdit("hPoQty", e.target.value)} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Kolom 4 (Harga)</label>
                  <input type="text" value={docConfig.hPoHargaSatuan || "Harga Satuan"} onChange={(e) => onConfigEdit("hPoHargaSatuan", e.target.value)} className={inp} />
                </div>
                <div className="col-span-2">
                  <label className={lbl}>Kolom 5 (Total)</label>
                  <input type="text" value={docConfig.hPoTotal || "Jumlah"} onChange={(e) => onConfigEdit("hPoTotal", e.target.value)} className={inp} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Section Rincian Item (Dari OCR) ── */}
      <div>
        <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 border-b border-blue-100 pb-2 flex items-center justify-between">
          <span>Data Pesanan Vendor</span>
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px]">{spjData.items.length} Nota</span>
        </p>
        
        <div className="space-y-4">
          {spjData.items.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-sm relative">
              <div className="absolute -top-2.5 -left-2.5 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-black shadow-md border-2 border-white">
                {idx + 1}
              </div>
              
              <div className="space-y-3 mt-1">
                <div>
                  <label className={lbl}>Nama Spesifikasi Barang / Jasa</label>
                  <input
                    type="text"
                    value={item.barangPo || ""}
                    onChange={(e) => onItemEdit(idx, "barangPo", e.target.value)}
                    className={inp}
                    placeholder="Kertas HVS A4 80gr..."
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className={lbl}>Qty</label>
                    <input
                      type="text"
                      value={item.qtyPo || ""}
                      onChange={(e) => onItemEdit(idx, "qtyPo", e.target.value)}
                      className={inp}
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label className={lbl}>Satuan</label>
                    <input
                      type="text"
                      value={item.satuanPo || ""}
                      onChange={(e) => onItemEdit(idx, "satuanPo", e.target.value)}
                      className={inp}
                      placeholder="Rim"
                    />
                  </div>
                  <div>
                    <label className={lbl}>Harga Satuan</label>
                    <input
                      type="text"
                      value={item.hargaSatuanPo || ""}
                      onChange={(e) => onItemEdit(idx, "hargaSatuanPo", e.target.value)}
                      className={inp}
                      placeholder="55000"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}