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

export default function FakturFormPanel({ docConfig, spjData, onConfigEdit, onItemEdit }: Props) {
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
      
      {/* ── Section Identitas Faktur ── */}
      <div>
        <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 border-b border-blue-100 pb-2">
          Info Faktur Penjualan
        </p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="col-span-2">
            <label className={lbl}>Tanggal Faktur</label>
            <input type="text" value={docConfig.fakturTanggal || ""} onChange={(e) => onConfigEdit("fakturTanggal", e.target.value)} className={inp} placeholder="12 April 2026" />
          </div>
          <div className="col-span-2">
            <label className={lbl}>Nomor Faktur (Default)</label>
            <input type="text" value={docConfig.fakturNomor || ""} onChange={(e) => onConfigEdit("fakturNomor", e.target.value)} className={inp} placeholder="INV/016/2026" />
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>Judul Dokumen</label>
                <input type="text" value={docConfig.fakturTitle || "FAKTUR"} onChange={(e) => onConfigEdit("fakturTitle", e.target.value)} className={inp} />
              </div>
              <div>
                <label className={lbl}>Label "Kepada Yth."</label>
                <input type="text" value={docConfig.fakturKepadaLabel || "Kepada Yth."} onChange={(e) => onConfigEdit("fakturKepadaLabel", e.target.value)} className={inp} />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className={lbl}>Teks Penutup (Bawah)</label>
              <textarea rows={2} value={docConfig.fakturTeksPenutup || ""} onChange={(e) => onConfigEdit("fakturTeksPenutup", e.target.value)} className={`${inp} resize-none`} placeholder="Pembayaran dapat ditransfer..." />
            </div>

            {/* Header Tabel */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 mb-2">Header Tabel Faktur</label>
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1">
                  <label className={lbl}>Kolom 1</label>
                  <input type="text" value={docConfig.hFakturNo || "No"} onChange={(e) => onConfigEdit("hFakturNo", e.target.value)} className={inp} />
                </div>
                <div className="col-span-3">
                  <label className={lbl}>Kolom 2 (Barang)</label>
                  <input type="text" value={docConfig.hFakturNamaBarang || "Nama Barang/Jasa"} onChange={(e) => onConfigEdit("hFakturNamaBarang", e.target.value)} className={inp} />
                </div>
                <div className="col-span-2">
                  <label className={lbl}>Kolom 3 (Qty)</label>
                  <input type="text" value={docConfig.hFakturQty || "Qty"} onChange={(e) => onConfigEdit("hFakturQty", e.target.value)} className={inp} />
                </div>
                <div className="col-span-2">
                  <label className={lbl}>Kolom 4 (Harga)</label>
                  <input type="text" value={docConfig.hFakturHargaSatuan || "Harga Satuan"} onChange={(e) => onConfigEdit("hFakturHargaSatuan", e.target.value)} className={inp} />
                </div>
                <div className="col-span-4">
                  <label className={lbl}>Kolom 5 (Total)</label>
                  <input type="text" value={docConfig.hFakturTotal || "Jumlah"} onChange={(e) => onConfigEdit("hFakturTotal", e.target.value)} className={inp} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Section Rincian Faktur (Grouped) ── */}
      <div>
        <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 border-b border-blue-100 pb-2 flex items-center justify-between">
          <span>Rincian Pembelian</span>
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px]">{totalGroups} Faktur Dihasilkan</span>
        </p>

        {/* Info Box */}
        <div className="mb-4 bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-start gap-3">
          <Layers className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 leading-relaxed">
            Hanya <strong className="font-black">{totalGroups} dokumen Faktur</strong> yang akan dicetak karena AI telah menggabungkan nota dari toko yang sama.
          </p>
        </div>

        <div className="space-y-5">
          {Object.entries(groupedItems).map(([vendor, items]: any, groupIdx) => (
            <div key={groupIdx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm relative">
              
              {/* Header Group */}
              <div className="bg-slate-800 px-4 py-2.5 border-b border-slate-200 flex justify-between items-center">
                 <span className="text-xs font-bold text-white uppercase tracking-wider">{vendor}</span>
                 <span className="text-[10px] bg-slate-700 font-bold px-2 py-1 rounded-md text-slate-300 shadow-inner">
                   {items.length} Item
                 </span>
              </div>
              
              {/* Isi Item per Vendor */}
              <div className="p-4 space-y-3 bg-slate-50">
                
                {/* Opsi Edit Alamat Toko Khusus Grup Ini */}
                <div className="mb-4">
                  <label className={lbl}>Alamat Toko (Header Faktur)</label>
                  <textarea 
                    rows={2} 
                    value={docConfig.fakturAlamatPenyedia || ""} 
                    onChange={(e) => onConfigEdit("fakturAlamatPenyedia", e.target.value)} 
                    className={`${inp} resize-none bg-white`} 
                    placeholder="Jl. Raya No. 123..." 
                  />
                </div>

                <div className="border-t border-slate-200 mb-2"></div>

                {items.map((itemObj: any, index: number) => (
                  <div key={itemObj.originalIndex} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm relative mt-2">
                    <div className="absolute top-3 left-3 w-5 h-5 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center text-[10px] font-black border border-slate-200">
                      {index + 1}
                    </div>
                    <div className="pl-8">
                      <div className="mb-2">
                        <label className={lbl}>Nama Toko / Vendor</label>
                        <input
                          type="text"
                          value={itemObj.penerima || ""}
                          onChange={(e) => onItemEdit(itemObj.originalIndex, "penerima", e.target.value)}
                          className={inp}
                        />
                      </div>
                      
                      <div className="mb-2">
                        <label className={lbl}>Nama Barang / Jasa</label>
                        <input
                          type="text"
                          value={itemObj.barangFaktur || itemObj.barang || ""}
                          onChange={(e) => onItemEdit(itemObj.originalIndex, "barangFaktur", e.target.value)}
                          className={inp}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className={lbl}>Qty</label>
                          <input
                            type="text"
                            value={itemObj.qtyPo || "1"} 
                            onChange={(e) => onItemEdit(itemObj.originalIndex, "qtyPo", e.target.value)}
                            className={inp}
                          />
                        </div>
                        <div>
                          <label className={lbl}>Satuan</label>
                          <input
                            type="text"
                            value={itemObj.satuanPo || "Ls"}
                            onChange={(e) => onItemEdit(itemObj.originalIndex, "satuanPo", e.target.value)}
                            className={inp}
                          />
                        </div>
                        <div>
                          <label className={lbl}>Harga</label>
                          <input
                            type="text"
                            value={itemObj.hargaSatuanPo || itemObj.total}
                            onChange={(e) => onItemEdit(itemObj.originalIndex, "hargaSatuanPo", e.target.value)}
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