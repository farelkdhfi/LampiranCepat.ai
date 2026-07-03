"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Building2, UploadCloud, ShieldCheck, CheckCircle2 } from "lucide-react";

import Header from "@/components/Header";
import type { DocConfig, SpjData, SpjItem } from "@/types/spj";

import TbpDocumentPreview from "@/components/tbp/TbpDocumentPreview";
import TbpFormPanel from "@/components/tbp/TbpFormPanel";

import { EmptyState, FileList } from "@/components/InputAndUpload";
import { generateNativeDocx } from "@/lib/docxtemplate/docxGenerator";
import { DEFAULT_DOC_CONFIG } from "@/lib/defaultConfig";

import KwitansiDocumentPreview from "@/components/kwitansi/KwitansiDocumentPreview";
import KwitansiFormPanel from "@/components/kwitansi/KwitansiFormPanel";

import NotaPesananFormPanel from "@/components/notaPesanan/NotaPesananFormPanel";
import NotaPesananDocumentPreview from "@/components/notaPesanan/NotaPesananDocumentPreview";

import BapFormPanel from "@/components/beritaAcaraPembayaran/BapFormPanel";
import BapDocumentPreview from "@/components/beritaAcaraPembayaran/BapDocumentPreview";

import BastFormPanel from "@/components/beritaAcaraSerahTerima/BastFormPanel";
import BastDocumentPreview from "@/components/beritaAcaraSerahTerima/BastDocumentPreview";

import BapbFormPanel from "@/components/beritaAcaraPenerimaanBarang/BapbFormPanel";
import BapbDocumentPreview from "@/components/beritaAcaraPenerimaanBarang/BapbDocumentPreview";

import PhFormPanel from "@/components/penawaranHarga/PhFormPanel";
import PhDocumentPreview from "@/components/penawaranHarga/PhDocumentPreview";

import FakturDocumentPreview from "@/components/faktur/FakturDocumentPreview";
import FakturFormPanel from "@/components/faktur/FakturFormPanel";

type PreviewTab = "ph" | "po" | "faktur" | "kwt" | "tbp" | "bapb" | "bast" | "bap";

// ─── Constants & Common Styles ────────────────────────────────────────────────

const MAX_FILES = 20;

const styles = {
  btn: "px-4 py-2 text-sm font-bold rounded-md transition-all shadow-sm",
  badge: "text-[10px] font-semibold px-2 py-0.5 rounded ml-2 uppercase tracking-widest",
  editable: "outline-none hover:bg-blue-50 focus:bg-blue-100 transition-colors border-b border-dashed border-transparent hover:border-gray-300 cursor-text px-1",
  editableTable: "outline-none hover:bg-blue-50 focus:bg-blue-100 transition-colors cursor-text px-1",
  editableBlock: "outline-none hover:bg-blue-50 focus:bg-blue-100 transition-colors cursor-text px-1 rounded",
};

const MENU_TABS = [
  { id: "kwt", label: "Kwitansi" },
  { id: "po", label: "Nota Pesanan" },
  { id: "tbp", label: "Tanda Bukti Pembayaran" },
  { id: "bap", label: "Berita Acara Pembayaran" },
  { id: "bast", label: "BA Serah Terima" },
  { id: "bapb", label: "BA Penerimaan Barang" },
  { id: "faktur", label: "Faktur" },
  { id: "ph", label: "Penawaran Harga" },
] as const;

// ─── Page component ───────────────────────────────────────────────────────────

export default function SpjPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [spjData, setSpjData] = useState<SpjData | null>(null);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState<PreviewTab>("kwt");

  const [docConfig, setDocConfig] = useState<DocConfig>(DEFAULT_DOC_CONFIG);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const [printMode, setPrintMode] = useState<"semua" | "satuan">("semua");

  // ─── LocalStorage: Auto-Save Identitas Instansi ─────────────────────────────
  useEffect(() => {
    const savedConfig = localStorage.getItem("lampiranCepatConfig");
    const savedLogo = localStorage.getItem("lampiranCepatLogo");
    if (savedConfig) setDocConfig(JSON.parse(savedConfig));
    if (savedLogo) setLogoUrl(savedLogo);
  }, []);

  const handleGlobalConfigChange = (field: keyof DocConfig, value: string) => {
    setSaveStatus("saving");
    const newConfig = { ...docConfig, [field]: value };
    setDocConfig(newConfig);
    localStorage.setItem("lampiranCepatConfig", JSON.stringify(newConfig));
    setTimeout(() => setSaveStatus("saved"), 800);
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setLogoUrl(base64);
      localStorage.setItem("lampiranCepatLogo", base64);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleLogoRemove = () => {
    setLogoUrl(null);
    localStorage.removeItem("lampiranCepatLogo");
  };

  // ─── File upload ────────────────────────────────────────────────────────────

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selectedFiles = Array.from(e.target.files);

    if (files.length + selectedFiles.length > MAX_FILES) {
      alert(`Maksimal ${MAX_FILES} berkas per sesi.`);
      return;
    }
    setFiles((prev) => [...prev, ...selectedFiles]);
    e.target.value = "";
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleReset = () => {
    if (confirm("Apakah Anda yakin ingin memulai sesi baru? Data nota akan dihapus, tetapi identitas instansi tetap tersimpan.")) {
      setFiles([]);
      setSpjData(null);
      setHasUnsavedChanges(false);
    }
  };

  // ─── Batch process ──────────────────────────────────────────────────────────

  const handleProcess = async () => {
    if (files.length === 0) {
      alert("Upload minimal 1 nota terlebih dahulu.");
      return;
    }
    setIsProcessing(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/ocr", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Gagal memproses data. Coba lagi.");
      }

      const data: SpjData = await res.json();

      const mappedData = {
        ...data,
        items: data.items.map((item, index) => ({
          ...item,
          order: index + 1,
          noUrut: String(index + 1),
          kodeBPU: "BPU01",
          kodeRekening: item.kodeRekening || "",
          terbilang: item.terbilang || "",

          barangKwt: item.barang,
          penerimaKwt: item.penerima,
          barangTbp: item.barang,
          penerimaTbp: item.penerima,

          barangPo: item.barang,
          qtyPo: item.qtyPo,
          satuanPo: item.satuanPo,
          hargaSatuanPo: item.hargaSatuanPo,

          barangBap: item.barang,
          barangBast: item.barang,
          keteranganBast: "Baik / Lengkap",
          barangBapb: item.barang,
          kondisiBapb: "Baik / Sesuai",
          barangPh: item.barang,
          barangFaktur: item.barang,
        })),
      };

      setSpjData(mappedData);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan.";
      alert(`Gagal: ${message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // ─── Editable Handlers ──────────────────────────────────────────────────────

  const handleConfigEdit = (field: keyof DocConfig, value: string) => {
    setDocConfig((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleItemEdit = (index: number, field: keyof SpjItem, value: string) => {
    if (!spjData) return;
    const newItems = [...spjData.items];

    if (field === "total") {
      const numericValue = parseInt(value.replace(/\D/g, ""), 10) || 0;
      newItems[index] = { ...newItems[index], [field]: numericValue };
      const newTotal = newItems.reduce((sum, item) => sum + item.total, 0);
      setSpjData({ ...spjData, items: newItems, total: newTotal });
    } else {
      newItems[index] = { ...newItems[index], [field]: value };
      setSpjData({ ...spjData, items: newItems });
    }
    setHasUnsavedChanges(true);
  };

  const handleSaveEdits = () => {
    setHasUnsavedChanges(false);
  };

  // ─── Download Handling (Tanpa Login) ────────────────────────────────────────

  // ─── Download Handling (Tanpa API Backend) ────────────────────────────────────────

  const handleDownloadClick = async (format: "pdf" | "docx", scope: "semua" | "satuan" = "semua") => {
    if (!spjData || spjData.items.length === 0) {
      alert("Tidak ada data untuk di-download.");
      return;
    }
    if (hasUnsavedChanges) {
      const confirmSave = confirm("Ada perubahan teks yang belum disave. Lanjut download?");
      if (!confirmSave) return;
    }

    if (format === "pdf") {
      setPrintMode(scope);

      // 1. Deteksi apakah user menggunakan HP / Tablet
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      // 2. Jika pakai HP, kasih tutorial singkat biar gak bingung
      if (isMobile) {
        alert("💡 TIPS MENGUNDUH DI HP:\n\nPada layar selanjutnya, ketuk pilihan Printer di bagian atas, lalu pilih 'Simpan sebagai PDF' (Save as PDF) untuk mengunduh dokumen.");
      }
      
      setTimeout(() => {
        window.print();
      }, 300);
      
    } else {
      await generateNativeDocx(spjData.items, docConfig, spjData.total, logoUrl);
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="h-screen bg-slate-50 flex flex-col text-slate-800 font-sans overflow-hidden print:h-auto print:bg-white print:overflow-visible print:block">

      {/* ── HEADER ── */}
      <div className="print:hidden">
        <Header
          styles={styles}
          spjData={spjData}
          hasUnsavedChanges={hasUnsavedChanges}
          handleSaveEdits={handleSaveEdits}
          handleDownloadClick={handleDownloadClick}
          handleReset={handleReset}
          handleFileChange={handleFileChange}
          isProcessing={isProcessing}
          handleProcess={handleProcess}
          files={files}
        />
      </div>
      
      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 overflow-hidden flex relative print:overflow-visible print:block">
        <AnimatePresence mode="wait">
          {spjData ? (
            <motion.div 
              key="editor"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex w-full print:block"
            >
              {/* ── LEFT PANEL: Form input ── */}
              <aside className="w-[380px] xl:w-[420px] shrink-0 flex flex-col bg-white border-r border-slate-200 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative print:hidden">
                <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Form Editor
                  </span>
                  {hasUnsavedChanges && (
                    <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full animate-pulse">
                      Belum Disimpan
                    </span>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto">
                  {activeTab === "tbp" && <TbpFormPanel docConfig={docConfig} spjData={spjData} onConfigEdit={handleConfigEdit} onItemEdit={handleItemEdit} />}
                  {activeTab === "kwt" && <KwitansiFormPanel docConfig={docConfig} spjData={spjData} onConfigEdit={handleConfigEdit} onItemEdit={handleItemEdit} />}
                  {activeTab === "po" && <NotaPesananFormPanel docConfig={docConfig} spjData={spjData} onConfigEdit={handleConfigEdit} onItemEdit={handleItemEdit} />}
                  {activeTab === "bap" && <BapFormPanel docConfig={docConfig} spjData={spjData} onConfigEdit={handleConfigEdit} onItemEdit={handleItemEdit} />}
                  {activeTab === "bast" && <BastFormPanel docConfig={docConfig} spjData={spjData} onConfigEdit={handleConfigEdit} onItemEdit={handleItemEdit} />}
                  {activeTab === "bapb" && <BapbFormPanel docConfig={docConfig} spjData={spjData} onConfigEdit={handleConfigEdit} onItemEdit={handleItemEdit} />}
                  {activeTab === "ph" && <PhFormPanel docConfig={docConfig} spjData={spjData} onConfigEdit={handleConfigEdit} onItemEdit={handleItemEdit} />}
                  {activeTab === "faktur" && <FakturFormPanel docConfig={docConfig} spjData={spjData} onConfigEdit={handleConfigEdit} onItemEdit={handleItemEdit} />}
                </div>
              </aside>

              {/* ── RIGHT PANEL: Preview dokumen ── */}
              <section className={`flex-1 flex flex-col bg-slate-100 relative print:bg-white print:block ${printMode === "semua" ? "print:hidden" : ""}`}>
                <div className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-20 flex flex-col print:hidden">
                  <div className="px-2 py-3 flex flex-wrap justify-center gap-1.5">
                    {MENU_TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as PreviewTab)}
                        className={`px-4 py-2 text-[11px] font-bold rounded-xl uppercase tracking-wider transition-all ${activeTab === tab.id
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto pt-8 pb-16 px-4 print:p-0 print:overflow-visible print:block">
                  <div id="pdf-preview-satuan" className="print:block">
                    {activeTab === "tbp" && <TbpDocumentPreview docConfig={docConfig} spjData={spjData} logoUrl={logoUrl} />}
                    {activeTab === "kwt" && <KwitansiDocumentPreview docConfig={docConfig} spjData={spjData} logoUrl={logoUrl} />}
                    {activeTab === "po" && <NotaPesananDocumentPreview docConfig={docConfig} spjData={spjData} logoUrl={logoUrl} />}
                    {activeTab === "bap" && <BapDocumentPreview docConfig={docConfig} spjData={spjData} logoUrl={logoUrl} />}
                    {activeTab === "bast" && <BastDocumentPreview docConfig={docConfig} spjData={spjData} logoUrl={logoUrl} />}
                    {activeTab === "bapb" && <BapbDocumentPreview docConfig={docConfig} spjData={spjData} logoUrl={logoUrl} />}
                    {activeTab === "ph" && <PhDocumentPreview docConfig={docConfig} spjData={spjData} logoUrl={logoUrl} />}
                    {activeTab === "faktur" && <FakturDocumentPreview docConfig={docConfig} spjData={spjData} logoUrl={logoUrl} />}
                  </div>
                </div>
              </section>
            </motion.div>

          ) : (
            /* ══════════════════════════════════════════════════════════════════
                Fase 1 & 2: SETUP INSTANSI & UPLOAD NOTA
            ══════════════════════════════════════════════════════════════════ */
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 overflow-y-auto px-6 py-8"
            >
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* ── LEFT COLUMN: Form Identitas Instansi ── */}
                <div className="lg:col-span-5 flex flex-col gap-6">

                  {/* Header Kartu */}
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-800 tracking-tight flex items-center gap-2">
                      <Building2 className="w-6 h-6 text-blue-600" /> Profil Instansi
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      Data ini akan jadi cetakan untuk kop dan tanda tangan. Tersimpan otomatis di laptop Anda.
                    </p>
                  </div>

                  {/* Kartu Form */}
                  <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-xl shadow-slate-200/40 relative overflow-hidden">
                    {/* Indikator Save */}
                    <div className="absolute top-6 right-6 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
                      {saveStatus === "saving" && <span className="text-amber-500 flex items-center gap-1"><Save className="w-3.5 h-3.5 animate-spin" /> Menyimpan...</span>}
                      {saveStatus === "saved" && <span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Tersimpan</span>}
                      {saveStatus === "idle" && <span className="text-slate-400 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Data Lokal</span>}
                    </div>

                    <div className="space-y-4 mt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Pemerintah / Daerah</label>
                          <input type="text" value={docConfig.kopNamaPemerintah} onChange={(e) => handleGlobalConfigChange("kopNamaPemerintah", e.target.value)} placeholder="Misal: PEMERINTAH KAB. GARUT" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nama Instansi / SKPD</label>
                          <input type="text" value={docConfig.kopNamaSkpd} onChange={(e) => handleGlobalConfigChange("kopNamaSkpd", e.target.value)} placeholder="Misal: DINAS PENDIDIKAN" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Alamat Lengkap (Kop Surat)</label>
                        <input type="text" value={docConfig.kopAlamat} onChange={(e) => handleGlobalConfigChange("kopAlamat", e.target.value)} placeholder="Jalan Merdeka No. 1..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                      </div>

                      <div className="border-t border-slate-100 my-4"></div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nama Kepala / KPA</label>
                          <input type="text" value={docConfig.kepala} onChange={(e) => handleGlobalConfigChange("kepala", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">NIP Kepala</label>
                          <input type="text" value={docConfig.nipKepala} onChange={(e) => handleGlobalConfigChange("nipKepala", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nama Bendahara</label>
                          <input type="text" value={docConfig.bendahara} onChange={(e) => handleGlobalConfigChange("bendahara", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">NIP Bendahara</label>
                          <input type="text" value={docConfig.nipBendahara} onChange={(e) => handleGlobalConfigChange("nipBendahara", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                      </div>

                      <div className="border-t border-slate-100 my-4"></div>

                      {/* Logo Upload */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Logo Daerah / Instansi</label>
                        <div className="flex items-center gap-4">
                          {logoUrl ? (
                            <div className="relative w-16 h-16 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-center p-1">
                              <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                              <button onClick={handleLogoRemove} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-red-600 shadow-sm">×</button>
                            </div>
                          ) : (
                            <div className="w-16 h-16 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 flex items-center justify-center">
                              <Building2 className="w-6 h-6 text-slate-300" />
                            </div>
                          )}
                          <label className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors border border-slate-200">
                            Pilih Logo Image
                            <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── RIGHT COLUMN: File Upload & List ── */}
                <div className="lg:col-span-7 flex flex-col gap-6">

                  <div>
                    <h2 className="text-2xl font-semibold text-slate-800 tracking-tight flex items-center gap-2">
                      <UploadCloud className="w-6 h-6 text-blue-600" /> Upload Nota Belanja
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      Foto struk atau nota kontan Anda. AI akan merangkum dan mengekstrak datanya.
                    </p>
                  </div>

                  <div className="flex-1 bg-white border border-slate-200 rounded-[2rem] p-6 shadow-xl shadow-slate-200/40 relative">
                    {files.length === 0 ? (
                      <EmptyState onFileChange={handleFileChange} />
                    ) : (
                      <FileList
                        files={files}
                        maxFiles={MAX_FILES}
                        onFileChange={handleFileChange}
                        onRemoveFile={handleRemoveFile}
                        onClearAll={() => setFiles([])}
                        isProcessing={isProcessing}
                      />
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* ── HIDDEN RENDERER UNTUK DOWNLOAD SEMUA (BUNDLE) ── */}
        {spjData && (
          <div className={`hidden ${printMode === "semua" ? "print:block" : "print:hidden"}`}>
            <div className="w-[210mm] mx-auto bg-white pt-8 print:pt-0 print:m-0 print:w-full print:block">
              <KwitansiDocumentPreview docConfig={docConfig} spjData={spjData} logoUrl={logoUrl} />
              <TbpDocumentPreview docConfig={docConfig} spjData={spjData} logoUrl={logoUrl} />
              <NotaPesananDocumentPreview docConfig={docConfig} spjData={spjData} logoUrl={logoUrl} />
              <BapDocumentPreview docConfig={docConfig} spjData={spjData} logoUrl={logoUrl} />
              <BastDocumentPreview docConfig={docConfig} spjData={spjData} logoUrl={logoUrl} />
              <BapbDocumentPreview docConfig={docConfig} spjData={spjData} logoUrl={logoUrl} />
              <PhDocumentPreview docConfig={docConfig} spjData={spjData} logoUrl={logoUrl} />
              <FakturDocumentPreview docConfig={docConfig} spjData={spjData} logoUrl={logoUrl} />
            </div>
          </div>
        )}
      </main>

    </div>
  );
}