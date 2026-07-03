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

export default function KwitansiFormPanel({ docConfig, spjData, onConfigEdit, onItemEdit }: Props) {
  const [showLayoutEdit, setShowLayoutEdit] = useState(false);

  return (
    <div className="p-5 space-y-6">
      
      {/* ── Section Tanggal & Dokumen ── */}
      <div>
        <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 border-b border-blue-100 pb-2">
          Info Kwitansi
        </p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className={lbl}>Tahun Anggaran</label>
            <input type="text" value={docConfig.tahun || ""} onChange={(e) => onConfigEdit("tahun", e.target.value)} className={inp} placeholder="2026" />
          </div>
          <div>
            <label className={lbl}>Tempat / Kota</label>
            <input type="text" value={docConfig.tempat || ""} onChange={(e) => onConfigEdit("tempat", e.target.value)} className={inp} placeholder="Bandung" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lbl}>Tanggal Kwitansi (Kanan)</label>
            <input type="text" value={docConfig.tanggalKwitansi || ""} onChange={(e) => onConfigEdit("tanggalKwitansi", e.target.value)} className={inp} placeholder="12 April 2026" />
          </div>
          <div>
            <label className={lbl}>Tanggal Lunas (Tengah)</label>
            <input type="text" value={docConfig.tanggalLunas || ""} onChange={(e) => onConfigEdit("tanggalLunas", e.target.value)} className={inp} placeholder="14 April 2026" />
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
          <div className="p-4 space-y-3 bg-white border-t border-slate-100">
            <div>
              <label className={lbl}>Judul Dokumen</label>
              <input type="text" value={docConfig.kwtTitle || "Kuitansi"} onChange={(e) => onConfigEdit("kwtTitle", e.target.value)} className={inp} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>Label Kolom 1</label>
                <input type="text" value={docConfig.kwtLabelNo || "No."} onChange={(e) => onConfigEdit("kwtLabelNo", e.target.value)} className={inp} />
              </div>
              <div>
                <label className={lbl}>Label Kolom 2</label>
                <input type="text" value={docConfig.kwtLabelTerimaDari || "Telah terima dari"} onChange={(e) => onConfigEdit("kwtLabelTerimaDari", e.target.value)} className={inp} />
              </div>
              <div>
                <label className={lbl}>Label Kolom 3</label>
                <input type="text" value={docConfig.kwtLabelUangSejumlah || "Uang sejumlah"} onChange={(e) => onConfigEdit("kwtLabelUangSejumlah", e.target.value)} className={inp} />
              </div>
              <div>
                <label className={lbl}>Label Kolom 4</label>
                <input type="text" value={docConfig.kwtLabelUntuk || "Untuk"} onChange={(e) => onConfigEdit("kwtLabelUntuk", e.target.value)} className={inp} />
              </div>
            </div>
            
            <div className="pt-2 border-t border-slate-100">
              <label className={lbl}>Teks Terlampir</label>
              <input type="text" value={docConfig.kwtTeksTerlampir || "(Bukti/Nota/Faktur terlampir)"} onChange={(e) => onConfigEdit("kwtTeksTerlampir", e.target.value)} className={inp} />
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
              <div>
                <label className={lbl}>TTD Kiri</label>
                <input type="text" value={docConfig.kwtLabelSetuju || "Setuju dibayar,"} onChange={(e) => onConfigEdit("kwtLabelSetuju", e.target.value)} className={inp} />
              </div>
              <div>
                <label className={lbl}>TTD Tengah</label>
                <input type="text" value={docConfig.kwtLabelLunas || "Lunas dibayar,"} onChange={(e) => onConfigEdit("kwtLabelLunas", e.target.value)} className={inp} />
              </div>
              <div>
                <label className={lbl}>TTD Kanan</label>
                <input type="text" value={docConfig.kwtLabelPenerima || "Penerima"} onChange={(e) => onConfigEdit("kwtLabelPenerima", e.target.value)} className={inp} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Section Rincian Item (Dari OCR) ── */}
      <div>
        <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 border-b border-blue-100 pb-2 flex items-center justify-between">
          <span>Data Rincian Belanja</span>
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px]">{spjData.items.length} Item</span>
        </p>
        
        <div className="space-y-4">
          {spjData.items.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-sm relative">
              <div className="absolute -top-2.5 -left-2.5 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-black shadow-md border-2 border-white">
                {idx + 1}
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3 mt-1">
                <div>
                  <label className={lbl}>No. Urut / Referensi</label>
                  <div className="flex gap-1.5">
                    <input type="text" value={item.noUrut || ""} onChange={(e) => onItemEdit(idx, "noUrut", e.target.value)} className={`${inp} w-16 text-center`} placeholder="1" />
                    <input type="text" value={item.kodeBPU || ""} onChange={(e) => onItemEdit(idx, "kodeBPU", e.target.value)} className={inp} placeholder="BPU01" />
                  </div>
                </div>
                <div>
                  <label className={lbl}>Kode Rekening (ARKAS)</label>
                  <input type="text" value={item.kodeRekening || ""} onChange={(e) => onItemEdit(idx, "kodeRekening", e.target.value)} className={inp} placeholder="5.1.02..." />
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className={lbl}>Untuk (Uraian Belanja)</label>
                  <input
                    type="text"
                    value={item.penerimaKwt || ""}
                    onChange={(e) => onItemEdit(idx, "penerimaKwt", e.target.value)}
                    className={inp}
                    placeholder="Pembayaran ATK..."
                  />
                </div>
                <div>
                  <label className={lbl}>Nominal Terbilang (Huruf)</label>
                  <textarea
                    rows={2}
                    value={item.terbilang || ""}
                    onChange={(e) => onItemEdit(idx, "terbilang", e.target.value)}
                    className={`${inp} resize-none`}
                    placeholder="Seratus lima puluh ribu rupiah"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}