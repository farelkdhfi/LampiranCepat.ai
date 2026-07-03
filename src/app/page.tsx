"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link'
import {
  Database,
  Zap,
  ShieldCheck,
  CheckCircle,
  Menu,
  X,
  FileText,
  UploadCloud,
  Cpu,
  BarChart3,
  Building2,
  Users,
  ScanText,
  AlertTriangle,
  Printer
} from "lucide-react";
// Pastikan path asset ini benar sesuai struktur project Anda
import LogoImage from '@/assets/images/logo.png'
import HeroImage from '@/assets/images/hero.png'
import HIWImage from '@/assets/images/HIWImage.png'
import Image from "next/image";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efek navbar blur saat di-scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-900 selection:text-white relative">

      {/* ─── NAVBAR ──────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-slate-200"
            : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Image src={LogoImage} alt="logo" className="w-auto h-8" />
            <span className={`text-xl font-semibold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              LampiranCepat<span className="text-blue-500">.ai</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#fitur" className={`text-sm font-bold transition-colors ${isScrolled ? 'text-slate-600 hover:text-blue-700' : 'text-white/80 hover:text-white'}`}>Fitur</a>
            <a href="#cara-kerja" className={`text-sm font-bold transition-colors ${isScrolled ? 'text-slate-600 hover:text-blue-700' : 'text-white/80 hover:text-white'}`}>Cara Kerja</a>
            <Link href='/main' className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md ${isScrolled ? 'bg-blue-900 text-white hover:bg-blue-800' : 'bg-white text-blue-900 hover:bg-slate-50'}`}>
              Coba Gratis
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-slate-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-slate-900' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg py-4 px-6 flex flex-col gap-4 overflow-y-auto max-h-[90vh]">
            <a href="#fitur" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 font-bold py-2 border-b border-slate-100">Fitur</a>
            <a href="#cara-kerja" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 font-bold py-2 border-b border-slate-100">Cara Kerja</a>
            <Link href='/main' onClick={() => setIsMobileMenuOpen(false)} className="bg-blue-900 text-white px-6 py-3 rounded-lg font-bold mt-2 w-full text-center">Mulai Gunakan Gratis</Link>
          </div>
        )}
      </nav>

      {/* ─── HERO SECTION ────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
            <SparklesIcon className="w-4 h-4 text-amber-400" />
            Platform AI Otomasi Dokumen Pengadaan (100% Gratis)
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-[1.1] mb-6">
            Dari Foto Struk ke Lampiran Pengadaan <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Dalam Hitungan Menit
            </span>
          </h1>

          <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed opacity-90">
            Unggah tumpukan struk Anda sekaligus, biarkan AI membaca data dan menghasilkan 8 jenis dokumen lampiran pengadaan siap cetak — lengkap dengan agregasi otomatis per vendor.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href='/tutorial' className="w-full sm:w-auto px-8 py-4 bg-white text-blue-950 rounded-xl font-semibold text-sm tracking-wider uppercase hover:bg-slate-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2">
              <UploadCloud className="w-5 h-5" /> Mulai Ekstrak Data
            </Link>
          </div>
        </div>

        {/* Hero Image / Dashboard Mockup with Floating Visualizations */}
        <div className="max-w-6xl mx-auto px-6 mt-16 md:mt-24 relative z-10">
          
          {/* Elemen dekoratif abstrak untuk kedalaman */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl pointer-events-none animate-pulse delay-700"></div>

          {/* Floating Card 1: AI Reading */}
          <div className="absolute -left-4 md:-left-12 top-10 md:top-20 z-20 animate-float pointer-events-none">
            <div className="bg-white border border-slate-100 p-3 md:p-4 rounded-2xl shadow-2xl flex items-center gap-3 md:gap-4 max-w-[200px] md:max-w-xs">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <ScanText className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-bold text-slate-800">AI Ekstrak Data</p>
                <p className="text-[10px] md:text-xs text-slate-500 mt-0.5 leading-tight">Membaca vendor, tanggal, & item otomatis.</p>
              </div>
            </div>
          </div>

          {/* Floating Card 2: Validation */}
          <div className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-20 animate-float-delay-1 pointer-events-none">
            <div className="bg-white border border-slate-100 p-3 md:p-4 rounded-2xl shadow-2xl flex items-center gap-3 md:gap-4 max-w-[200px] md:max-w-xs">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-bold text-slate-800">Grouping Toko</p>
                <p className="text-[10px] md:text-xs text-slate-500 mt-0.5 leading-tight">Otomatis menggabungkan nota dari toko yang sama.</p>
              </div>
            </div>
          </div>

          {/* Floating Card 3: Ready to Print */}
          <div className="absolute -left-2 md:-left-8 bottom-10 md:bottom-16 z-20 animate-float-delay-2 pointer-events-none">
            <div className="bg-white border border-slate-100 p-3 md:p-4 rounded-2xl shadow-2xl flex items-center gap-3 md:gap-4 max-w-[180px] md:max-w-xs">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <Printer className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-bold text-slate-800">Siap Cetak</p>
                <p className="text-[10px] md:text-xs text-slate-500 mt-0.5 leading-tight">8 dokumen pengadaan jadi dalam 1 klik.</p>
              </div>
            </div>
          </div>

          {/* Original Image Container */}
          <div className="rounded-2xl md:rounded-[2rem] bg-white/5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl p-2 md:p-4 relative z-10">
            <div className="bg-slate-900 rounded-xl md:rounded-3xl overflow-hidden border border-slate-700 shadow-inner">
              <Image
                src={HeroImage}
                alt="LampiranCepat.ai Dashboard Mockup"
                className="w-full h-auto opacity-90 object-cover aspect-[16/10]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ──────────────────────────────────────────────────── */}
      <section className="py-10 bg-white border-b border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">Dibangun untuk menyederhanakan tugas bendahara BOS</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
            <Building2 className="w-10 h-10 md:w-12 md:h-12 text-slate-700" />
            <BarChart3 className="w-10 h-10 md:w-12 md:h-12 text-slate-700" />
            <Database className="w-10 h-10 md:w-12 md:h-12 text-slate-700" />
            <Users className="w-10 h-10 md:w-12 md:h-12 text-slate-700" />
          </div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ──────────────────────────────────────────────── */}
      <section id="fitur" className="py-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-4">Solusi Tepat untuk Bendahara BOS</h2>
            <p className="text-slate-500 text-lg">Dirancang khusus untuk menyulap tumpukan struk belanja menjadi 8 dokumen pengadaan yang sesuai standar dan siap dilampirkan.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<UploadCloud className="w-6 h-6 text-blue-600" />}
              title="Batch Upload hingga 20 Struk"
              description="Foto langsung dari kamera HP atau upload dari galeri. Mendukung format JPG, PNG, HEIC, dan PDF — proses puluhan nota sekaligus."
            />
            <FeatureCard
              icon={<Cpu className="w-6 h-6 text-blue-600" />}
              title="OCR AI untuk Struk Indonesia"
              description="Membaca nota kontan tulis tangan, struk minimarket pudar, hingga cap toko dengan tingkat akurasi tinggi berkat model Gemini 2.5."
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6 text-blue-600" />}
              title="8 Jenis Dokumen Eksekusi"
              description="Kwitansi, Tanda Bukti Pembayaran (TBP), Nota Pesanan, BAP, BAST, BAPB, Penawaran Harga, hingga Faktur dalam sekali klik."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6 text-blue-600" />}
              title="Zero Penyimpanan Permanen"
              description="Tidak ada database permanen. Seluruh file diproses di memori dan dihapus otomatis dalam 60 menit. Data keuangan instansi Anda 100% aman."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-blue-600" />}
              title="Agregasi Vendor Otomatis"
              description="Upload banyak nota dari toko yang sama? AI otomatis merangkumnya menjadi satu Berita Acara (BAP, BAST, BAPB) agar rapi secara birokrasi."
            />
            <FeatureCard
              icon={<CheckCircle className="w-6 h-6 text-blue-600" />}
              title="Review Interaktif Real-Time"
              description="Tampilan split-screen interaktif. Ubah form di panel kiri, dan preview dokumen PDF di panel kanan akan ter-update secara langsung."
            />
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="cara-kerja" className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-4">Merapikan Lampiran Kini Semudah Mengambil Foto</h2>
                <p className="text-slate-500 text-lg">Empat langkah sederhana dari nota berantakan menjadi bundel dokumen ZIP rapi.</p>
              </div>

              <div className="space-y-6">
                <StepItem number="01" title="Foto & Upload Struk" desc="Foto struk belanja atau nota kontan. Batch hingga 20 struk sekaligus per sesi kerja." />
                <StepItem number="02" title="AI Baca & Ekstrak Data" desc="Sistem cerdas membaca nama toko, tanggal, dan merangkum rincian item. Struk toko yang sama otomatis digabung." />
                <StepItem number="03" title="Koreksi di Form Interaktif" desc="Cek hasil bacaan AI. Ubah nominal atau perbaiki nama barang langsung dari panel editor yang tersinkronisasi." />
                <StepItem number="04" title="Generate & Download PDF" desc="Satu klik menghasilkan hingga 8 jenis dokumen PDF siap cetak untuk setiap transaksi pengadaan Anda." />
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 transform translate-x-4 translate-y-4 rounded-2xl opacity-10"></div>
                <Image
                  src={HIWImage}
                  alt="Proses Akuntansi Digital"
                  className="relative rounded-2xl shadow-2xl object-cover w-full h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-semibold tracking-tight text-white">
                LampiranCepat<span className="text-blue-500">.ai</span>
              </span>
            </div>
            <p className="text-sm max-w-xs leading-relaxed mb-6">
              Platform AI otomasi dokumen lampiran pengadaan untuk Bendahara BOS di seluruh Indonesia. Menyederhanakan tumpukan nota menjadi dokumen siap lapor secara gratis.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Produk</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#fitur" className="hover:text-blue-400 transition-colors">Fitur OCR AI</a></li>
              <li><a href="#fitur" className="hover:text-blue-400 transition-colors">Keamanan Data</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Perusahaan</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-white/10 text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 LampiranCepat.ai - All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <span className="text-red-500">♥</span>
            <span>for better accountability.</span>
          </div>
        </div>
      </footer>

      {/* ── ADDED CSS FOR ANIMATIONS ── */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delay-1 {
          0%, 100% { transform: translateY(-50%); }
          50% { transform: translateY(calc(-50% - 10px)); }
        }
        @keyframes float-delay-2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delay-1 {
          animation: float-delay-1 4s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-float-delay-2 {
          animation: float-delay-2 4s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

// ─── KOMPONEN BANTUAN (UTILITY COMPONENTS) ─────────────────────────────

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(30,58,138,0.08)] transition-all group">
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 [&>svg]:group-hover:text-white transition-all transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function StepItem({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 mt-1">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm border-2 border-blue-200">
          {number}
        </div>
      </div>
      <div>
        <h4 className="text-xl font-bold text-slate-800 mb-1">{title}</h4>
        <p className="text-slate-500 text-sm md:text-base">{desc}</p>
      </div>
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}