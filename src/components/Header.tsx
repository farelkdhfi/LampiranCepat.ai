'use client'

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  FileText,
  FileDown,
  RotateCcw,
  Plus,
  Sparkles,
  Loader2,
  Database,
  ChevronRight,
  Download,
  X,
  Files
} from "lucide-react";

import LogoImage from '@/assets/images/logo.png'
import LogoPDF from '@/assets/images/pdf.png'
import LogoWORD from '@/assets/images/word.png'
import LogoBatchPDF from '@/assets/images/pdfBatch.png'
import Image from "next/image";

export default function Header({
  spjData,
  hasUnsavedChanges,
  handleSaveEdits,
  handleDownloadClick,
  handleReset,
  handleFileChange,
  isProcessing,
  handleProcess,
  files
}: any) {
  // State untuk mengontrol Modal Export
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative bg-gradient-to-r from-slate-900 via-blue-950 to-blue-900 px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md shrink-0 z-20 border-b border-blue-800/50"
      >
        {/* Background Decoration (Mesh tipis) */}
        <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500 rounded-full blur-[80px]" />
          <div className="absolute top-0 right-0 w-96 h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_100%)]" />
        </div>

        {/* ── Brand ── */}
        <div className="relative flex items-center gap-2">
          <Image src={LogoImage} alt="logo" className="w-8 h-auto" />
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-semibold text-white tracking-tight flex items-center leading-none">
              LampiranCepat<span className="text-blue-400">.ai</span>
            </h1>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="relative flex items-center gap-3 flex-wrap justify-end">
          {spjData ? (
            <>
              <AnimatePresence>
                {hasUnsavedChanges && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={handleSaveEdits}
                    className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-md shadow-amber-500/20"
                  >
                    <Save className="w-4 h-4" /> SIMPAN PERUBAHAN
                  </motion.button>
                )}
              </AnimatePresence>

              {/* ── Tombol Unduh Utama (Membuka Modal) ── */}
              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-5 py-2 rounded-xl text-xs font-semibold transition-all shadow-lg shadow-blue-500/30"
              >
                <Download className="w-4 h-4" /> UNDUH HASIL
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-slate-800 hover:bg-red-500/80 text-slate-300 hover:text-white border border-slate-700 hover:border-red-500 px-4 py-2 rounded-xl text-xs font-bold transition-all"
              >
                <RotateCcw className="w-4 h-4" /> MULAI ULANG
              </button>
            </>
          ) : (
            <>
              <label className={`cursor-pointer flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${isProcessing ? "opacity-30 pointer-events-none" : ""}`}>
                <Plus className="w-4 h-4" /> TAMBAH NOTA
                <input type="file" accept="image/*,application/pdf" multiple onChange={handleFileChange} disabled={isProcessing} className="hidden" />
              </label>

              <button
                onClick={handleProcess}
                disabled={isProcessing || files.length === 0}
                className={`group flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold tracking-widest transition-all shadow-lg disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none ${isProcessing ? "bg-slate-800" : "bg-white text-blue-900 hover:bg-blue-50"}`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-blue-400" /> MEMPROSES...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-blue-600 group-hover:rotate-12 transition-transform" /> PROSES AI ({files.length})
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </motion.header>

      {/* ── MODAL PILIHAN EXPORT DENGAN FRAMER MOTION ── */}
      <AnimatePresence>
        {showExportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop dengan blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExportModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Box Modal - Diubah menjadi lebih lebar dengan 2 kolom */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl overflow-hidden relative z-10 flex flex-col md:flex-row"
            >
              
              {/* Kolom Kiri - Panel Instruksi (Elegan & Modern) */}
              <div className="md:w-5/12 bg-linear-to-bl from-blue-800 to-blue-500 p-8 flex flex-col justify-between relative overflow-hidden">
                {/* Dekorasi Cahaya Blur */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-inner">
                    <Download className="w-6 h-6 text-blue-300" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">Pilih Format Unduhan</h2>
                  <p className="text-blue-100/80 text-sm leading-relaxed mb-8">
                    Dokumen pengadaan Anda telah berhasil diproses. Silakan pilih format file yang paling sesuai dengan kebutuhan pelaporan atau pengarsipan Anda saat ini.
                  </p>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 bg-blue-500/20 p-2 rounded-xl border border-blue-500/30">
                        <Files className="w-4 h-4 text-blue-300" />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-semibold">Format PDF (Rekomendasi)</h4>
                        <p className="text-blue-200/70 text-xs mt-1 leading-relaxed">Pilih PDF untuk dokumen final yang tidak dapat diedit. Cocok untuk langsung dicetak, dijilid, atau diserahkan.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 bg-blue-500/20 p-2 rounded-xl border border-blue-500/30">
                        <FileText className="w-4 h-4 text-blue-300" />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-semibold">Format Word</h4>
                        <p className="text-blue-200/70 text-xs mt-1 leading-relaxed">Gunakan format .docx jika Anda membutuhkan pengeditan lanjutan seperti mengubah tata letak, margin, atau logo.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan - Opsi Export */}
              <div className="md:w-7/12 p-8 bg-slate-50/50 flex flex-col relative">
                {/* Tombol Tutup */}
                <button
                  onClick={() => setShowExportModal(false)}
                  className="absolute top-6 right-6 w-9 h-9 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="mb-6 pt-1">
                  <h3 className="text-lg font-bold text-slate-800">Opsi Ekspor</h3>
                  <p className="text-sm text-slate-500 mt-1">Klik salah satu opsi di bawah ini untuk memulai unduhan.</p>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Opsi 1: Download Full Bundle (PDF) */}
                  <button
                    onClick={() => {
                      handleDownloadClick("pdf");
                      setShowExportModal(false);
                    }}
                    className="relative flex items-center gap-5 w-full p-5 bg-white hover:bg-blue-50/60 rounded-2xl border-2 border-slate-100 hover:border-blue-400 transition-all duration-300 group shadow-sm hover:shadow-md text-left overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/0 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Image
                      src={LogoBatchPDF}
                      alt="PDF Bundle"
                      className="w-14 h-auto relative z-10 drop-shadow-sm group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-slate-800 group-hover:text-blue-800 text-base">Unduh Semua (Bundle PDF)</p>
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wide">FAVORIT</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5 leading-relaxed">Gabungan lengkap seluruh dokumen menjadi satu file yang siap cetak.</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors relative z-10 shrink-0">
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600" />
                    </div>
                  </button>

                  {/* Opsi 2: Download Satuan (PDF) */}
                  <button
                    onClick={() => {
                      handleDownloadClick("pdf", "satuan");
                      setShowExportModal(false);
                    }}
                    className="relative flex items-center gap-5 w-full p-5 bg-white hover:bg-indigo-50/60 rounded-2xl border-2 border-slate-100 hover:border-indigo-400 transition-all duration-300 group shadow-sm hover:shadow-md text-left overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 via-indigo-50/0 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Image
                      src={LogoPDF}
                      alt="PDF Satuan"
                      className="w-14 h-auto relative z-10 drop-shadow-sm group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 relative z-10">
                      <p className="font-bold text-slate-800 group-hover:text-indigo-800 text-base mb-1">Unduh Halaman Ini Saja</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5 leading-relaxed">Hanya mengekspor pratinjau dokumen yang sedang Anda buka di layar.</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-indigo-100 flex items-center justify-center transition-colors relative z-10 shrink-0">
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600" />
                    </div>
                  </button>

                  <div className="flex items-center gap-4 my-2">
                    <div className="h-px bg-slate-200 flex-1"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100/50 px-3 py-1 rounded-full">Alternatif Format</span>
                    <div className="h-px bg-slate-200 flex-1"></div>
                  </div>

                  {/* Opsi 3: Download Word (Bisa Diedit) */}
                  <button
                    onClick={() => {
                      handleDownloadClick("docx");
                      setShowExportModal(false);
                    }}
                    className="relative flex items-center gap-5 w-full p-5 bg-white hover:bg-slate-100 rounded-2xl border-2 border-slate-100 hover:border-slate-300 transition-all duration-300 group shadow-sm text-left overflow-hidden"
                  >
                    <Image
                      src={LogoWORD}
                      alt="Word"
                      className="w-14 h-auto relative z-10 drop-shadow-sm group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 relative z-10">
                      <p className="font-bold text-slate-700 group-hover:text-slate-900 text-base mb-1">Unduh Mentahan Word</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5 leading-relaxed">Ekspor dalam format .docx jika Anda membutuhkan pengeditan tata letak secara manual.</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-slate-200 flex items-center justify-center transition-colors relative z-10 shrink-0">
                      <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                    </div>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}