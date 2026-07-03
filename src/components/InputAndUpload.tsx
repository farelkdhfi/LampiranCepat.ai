"use client";
import { ChangeEvent, useState, useEffect } from "react";
import { 
  FileText, 
  X, 
  Plus, 
  Trash2, 
  Sparkles, 
  Image as ImageIcon,
  UploadCloud,
  Loader2,
  ShieldCheck,
  FileSearch
} from "lucide-react";

const DEFAULT_MAX_FILES = 10;

// ─── FilePreviewCard ───────────────────────────────────────────────────────────
function FilePreviewCard({ file, index, onRemove, disabled }: { file: File; index: number; onRemove: (index: number) => void; disabled?: boolean; }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const isPdf = file.type === "application/pdf";

  useEffect(() => {
    if (isPdf) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file, isPdf]);

  return (
    <div className={`group relative bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ${disabled ? "opacity-50" : "hover:border-blue-400 hover:shadow-[0_8px_30px_rgba(30,58,138,0.08)] hover:-translate-y-0.5"}`}>
      <div className="relative w-full aspect-[4/3] bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
        {isPdf ? (
          <div className="flex flex-col items-center justify-center text-blue-900/50">
            <FileText className="w-10 h-10 mb-2 stroke-[1.5]" />
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">Dokumen PDF</span>
          </div>
        ) : previewUrl ? (
          <img src={previewUrl} alt={file.name} className="w-full h-full object-cover" draggable={false} />
        ) : (
          <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
        )}
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/70 backdrop-blur-md text-white rounded-[4px] text-[10px] font-bold shadow-sm tracking-widest">
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </div>
        {!disabled && (
          <button onClick={() => onRemove(index)} className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur border border-red-100 text-red-600 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 hover:border-red-200 shadow-sm">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="px-3 py-3 bg-white">
        <p className="text-xs font-semibold text-slate-800 truncate mb-1.5" title={file.name}>{file.name}</p>
        <div className="flex items-center justify-between">
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] border uppercase tracking-wider ${isPdf ? "bg-red-50 border-red-100 text-red-700" : "bg-blue-50 border-blue-100 text-blue-800"}`}>
            {isPdf ? "PDF" : "IMAGE"}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
        </div>
      </div>
    </div>
  );
}

// ─── ProcessingState ───────────────────────────────────────────────────────────
function ProcessingState({ fileCount }: { fileCount: number }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 p-10 bg-slate-50/50">
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl bg-white shadow-lg shadow-blue-900/5 flex items-center justify-center border border-blue-100">
          <FileSearch className="w-8 h-8 text-blue-700 animate-pulse" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center border-2 border-white text-white shadow-md">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Memproses Data Terpadu</h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
          Sistem sedang mengekstrak informasi dari <span className="text-blue-700 font-bold">{fileCount} dokumen</span>. Mohon tunggu sesaat hingga proses verifikasi selesai.
        </p>
      </div>
      <div className="w-80 space-y-3 mt-4">
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full animate-progress-line" style={{ width: '50%' }} />
        </div>
        <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">
          <span>Memindai OCR</span>
          <span className="text-blue-600 animate-pulse">Verifikasi Data...</span>
        </div>
      </div>
      <style>{`
        @keyframes progress-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-progress-line { animation: progress-line 2s infinite ease-in-out; }
      `}</style>
    </div>
  );
}

// ─── EmptyState ────────────────────────────────────────────────────────────────
export function EmptyState({ onFileChange }: any) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl transition-colors hover:bg-slate-100/50 hover:border-blue-300">
      <div className="w-20 h-20 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center shadow-sm mb-6">
        <UploadCloud className="w-8 h-8 text-blue-700" />
      </div>
      <div className="text-center mb-8">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Pusat Unggah Dokumen SPJ</h2>
        <p className="text-slate-500 mt-2 text-sm max-w-md mx-auto leading-relaxed">
          Unggah pindaian kuitansi atau nota fisik Anda. Sistem akan memproses dan mengonversi dokumen menjadi laporan digital.
        </p>
        <div className="flex items-center justify-center gap-4 mt-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Terenkripsi Aman</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <span>Maksimal {DEFAULT_MAX_FILES} Berkas</span>
        </div>
      </div>
      <label className="cursor-pointer">
        <div className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3.5 rounded-lg transition-all flex items-center gap-2.5 shadow-md shadow-blue-900/20 active:scale-[0.98]">
          <Plus className="w-5 h-5" />
          <span>Pilih Berkas Sekarang</span>
        </div>
        <input type="file" accept="image/*,application/pdf" multiple onChange={onFileChange} className="hidden" />
      </label>
      <p className="text-xs text-slate-400 mt-5 font-medium">Format yang didukung: JPG, PNG, dan PDF</p>
    </div>
  );
}

// ─── FileList ──────────────────────────────────────────────────────────────────
export function FileList({ files, maxFiles = DEFAULT_MAX_FILES, onFileChange, onRemoveFile, onClearAll, isProcessing = false }: any) {
  if (isProcessing) return <ProcessingState fileCount={files.length} />;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/30 p-6 lg:p-8 rounded-xl border border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-200 pb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-3">
              Berkas Terlampir
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-md">{files.length}</span>
            </h2>
            <p className="text-sm text-slate-500 mt-1">Pastikan seluruh data pada nota terbaca dengan jelas.</p>
          </div>
          <div className="flex items-center gap-3">
            {files.length < maxFiles && (
              <label className="cursor-pointer flex items-center gap-2 text-sm font-semibold text-blue-700 bg-white border border-slate-300 hover:border-blue-400 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all shadow-sm">
                <Plus className="w-4 h-4" /> Tambah Berkas
                <input type="file" accept="image/*,application/pdf" multiple onChange={onFileChange} className="hidden" />
              </label>
            )}
            <button onClick={onClearAll} className="flex items-center gap-2 text-sm font-semibold text-red-600 bg-white border border-slate-300 hover:border-red-400 hover:bg-red-50 px-4 py-2 rounded-lg transition-all shadow-sm">
              <Trash2 className="w-4 h-4" /> Reset Antrean
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {files.map((file: any, idx: number) => (
            <FilePreviewCard key={`${file.name}-${idx}`} file={file} index={idx} onRemove={onRemoveFile} />
          ))}
        </div>
      </div>
    </div>
  );
}