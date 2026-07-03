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

export default function TbpFormPanel({ docConfig, spjData, onConfigEdit, onItemEdit }: Props) {
  const [showLayoutEdit, setShowLayoutEdit] = useState(false);

  return (
    <div className="p-5 space-y-6">
      
      {/* ── Section Identitas TBP ── */}
      <div>
        <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 border-b border-blue-100 pb-2">
          Info Bukti Pembayaran
        </p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className={lbl}>Tanggal TBP</label>
            <input type="text" value={docConfig.tanggalTbp || ""} onChange={(e) => onConfigEdit("tanggalTbp", e.target.value)} className={inp} placeholder="26 Januari 2026" />
          </div>
          <div>
            <label className={lbl}>Nama Pihak Pertama (Pemberi)</label>
            <input type="text" value={docConfig.tbpPihakPertama || ""} onChange={(e) => onConfigEdit("tbpPihakPertama", e.target.value)} className={inp} />
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
            {/* Header Box (Kanan Atas) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>Judul Dokumen</label>
                <input type="text" value={docConfig.tbpTitle || "TANDA BUKTI PEMBAYARAN"} onChange={(e) => onConfigEdit("tbpTitle", e.target.value)} className={inp} />
              </div>
              <div className="space-y-2">
                <div>
                  <label className={lbl}>Label Tahun</label>
                  <input type="text" value={docConfig.tbpTahunAnggaran || "Tahun Anggaran:"} onChange={(e) => onConfigEdit("tbpTahunAnggaran", e.target.value)} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Label Kode Rek.</label>
                  <input type="text" value={docConfig.tbpMataAnggaran || "Mata Anggaran"} onChange={(e) => onConfigEdit("tbpMataAnggaran", e.target.value)} className={inp} />
                </div>
              </div>
            </div>

            {/* Label Body */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 mb-2">Label Formulir</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lbl}>Baris 1 (Penerima)</label>
                  <input type="text" value={docConfig.tbpTerimaDari || "Sudah terima dari"} onChange={(e) => onConfigEdit("tbpTerimaDari", e.target.value)} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Baris 2 (Uang Sebesar)</label>
                  <input type="text" value={docConfig.tbpUangSebesar || "Uang Sebesar"} onChange={(e) => onConfigEdit("tbpUangSebesar", e.target.value)} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Baris 3 (Terbilang)</label>
                  <input type="text" value={docConfig.tbpTerbilang || "Terbilang"} onChange={(e) => onConfigEdit("tbpTerbilang", e.target.value)} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Baris 4 (Uraian)</label>
                  <input type="text" value={docConfig.tbpUntukPembayaran || "Untuk Pembayaran"} onChange={(e) => onConfigEdit("tbpUntukPembayaran", e.target.value)} className={inp} />
                </div>
              </div>
            </div>

            {/* Footer / Tanda Tangan */}
            <div className="pt-2 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lbl}>TTD Tengah (Lunas)</label>
                  <input type="text" value={docConfig.tbpLunasTgl || "Lunas dibayar tanggal:"} onChange={(e) => onConfigEdit("tbpLunasTgl", e.target.value)} className={inp} />
                </div>
                <div>
                  <label className={lbl}>TTD Kanan (Penerima)</label>
                  <input type="text" value={docConfig.tbpPenerimaUang || "Penerima Uang"} onChange={(e) => onConfigEdit("tbpPenerimaUang", e.target.value)} className={inp} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Section Rincian Item (Dari OCR) ── */}
      <div>
        <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 border-b border-blue-100 pb-2 flex items-center justify-between">
          <span>Data Transaksi / Nota</span>
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px]">{spjData.items.length} Bukti</span>
        </p>
        
        <div className="space-y-4">
          {spjData.items.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-sm relative">
              <div className="absolute -top-2.5 -left-2.5 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-black shadow-md border-2 border-white">
                {idx + 1}
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3 mt-1">
                <div>
                  <label className={lbl}>Kode Rekening</label>
                  <input
                    type="text"
                    value={item.kodeRekening || ""}
                    onChange={(e) => onItemEdit(idx, "kodeRekening", e.target.value)}
                    className={inp}
                    placeholder="5.1.02..."
                  />
                </div>
                <div>
                  <label className={lbl}>Nominal Terbilang (Huruf)</label>
                  <input
                    type="text"
                    value={item.terbilang || ""}
                    onChange={(e) => onItemEdit(idx, "terbilang", e.target.value)}
                    className={inp}
                    placeholder="Satu juta rupiah"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className={lbl}>Nama Penerima Uang (Vendor)</label>
                  <input
                    type="text"
                    value={item.penerimaTbp || item.penerima || ""}
                    onChange={(e) => onItemEdit(idx, "penerimaTbp", e.target.value)}
                    className={inp}
                    placeholder="Toko Buku Makmur"
                  />
                </div>
                <div>
                  <label className={lbl}>Uraian Pembayaran</label>
                  <textarea
                    rows={2}
                    value={item.barangTbp || item.barang || ""}
                    onChange={(e) => onItemEdit(idx, "barangTbp", e.target.value)}
                    className={`${inp} resize-none`}
                    placeholder="Pembelian ATK..."
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