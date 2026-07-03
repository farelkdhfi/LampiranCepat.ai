"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Settings,
  Camera,
  CheckSquare,
  Printer,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Image from "next/image";
// Sesuaikan path jika perlu
import LogoImage from '@/assets/images/logo.png'

const steps = [
  {
    id: 1,
    icon: <Settings className="w-8 h-8" />,
    title: "Isi Nama Sekolah",
    description: "Cukup isi nama instansi dan pejabat satu kali saja. Datanya akan otomatis tersimpan di laptop Anda tanpa perlu bikin akun.",
    color: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-500/30",
    visual: (
      <div className="space-y-3 w-full">
        <div className="h-2 w-12 bg-blue-200 rounded-full mb-4"></div>
        <div className="bg-white p-3 rounded-lg border border-slate-100 flex items-center gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0"></div>
          <div className="h-3 w-3/4 bg-slate-100 rounded-full"></div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-100 flex items-center gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0"></div>
          <div className="h-3 w-1/2 bg-slate-100 rounded-full"></div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    icon: <Camera className="w-8 h-8" />,
    title: "Masukkan Foto Nota",
    description: "Upload foto struk belanja Anda. Sistem pintar kami akan langsung membaca nama toko, rincian barang, dan harganya secara otomatis.",
    color: "from-indigo-500 to-indigo-600",
    shadow: "shadow-indigo-500/30",
    visual: (
      <div className="grid grid-cols-2 gap-3 w-full">
        <div className="aspect-[3/4] bg-white rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center relative overflow-hidden shadow-sm">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50"></div>
           <Camera className="w-8 h-8 text-slate-300" />
        </div>
        <div className="aspect-[3/4] bg-white rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center relative overflow-hidden shadow-sm">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50"></div>
           <Camera className="w-8 h-8 text-slate-300" />
        </div>
      </div>
    )
  },
  {
    id: 3,
    icon: <CheckSquare className="w-8 h-8" />,
    title: "Periksa Hasilnya",
    description: "Cek kembali tulisan barang dan harga. Hebatnya, jika ada banyak nota dari toko yang sama, sistem otomatis menggabungkannya!",
    color: "from-cyan-500 to-cyan-600",
    shadow: "shadow-cyan-500/30",
    visual: (
      <div className="space-y-3 w-full bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-400">TOKO MAKMUR</span>
          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Otomatis Digabung</span>
        </div>
        <div className="flex justify-between items-center text-sm pt-1">
          <span className="text-slate-500 font-medium text-xs">Buku Tulis & ATK</span>
          <span className="font-bold text-slate-800 text-xs">Rp 150.000</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 font-medium text-xs">Kertas HVS</span>
          <span className="font-bold text-slate-800 text-xs">Rp 50.000</span>
        </div>
      </div>
    )
  },
  {
    id: 4,
    icon: <Printer className="w-8 h-8" />,
    title: "Download & Cetak",
    description: "Selesai! Anda akan mendapatkan 8 dokumen lengkap (Kwitansi, BAST, dll) berbentuk PDF yang rapi. File langsung terhapus demi keamanan.",
    color: "from-teal-500 to-teal-600",
    shadow: "shadow-teal-500/30",
    visual: (
      <div className="flex flex-col items-center justify-center h-full py-4 w-full">
        <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-3">
          <Printer className="w-8 h-8 text-teal-500" />
        </div>
        <div className="h-2 w-24 bg-slate-200 rounded-full mb-2"></div>
        <div className="h-2 w-16 bg-slate-100 rounded-full"></div>
      </div>
    )
  }
];

export default function TutorialPageMinimalist() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-900 selection:text-white pb-12 relative overflow-hidden flex flex-col">
      
      {/* ─── CONTINUOUS BACKGROUND ELEMENTS ──────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]"></div>
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[60%] bg-blue-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[50%] bg-cyan-300/10 rounded-full blur-[120px]"></div>
      </div>

      {/* ─── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 py-3"
          : "bg-transparent py-5"
      }`}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className={`flex items-center gap-2 transition-colors text-sm font-bold ${isScrolled ? 'text-slate-500 hover:text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}>
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Link>
          <div className="flex items-center gap-2">
            <Image src={LogoImage} alt="logo" className="w-auto h-6 opacity-90" />
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              LampiranCepat<span className="text-blue-500">.ai</span>
            </span>
          </div>
        </div>
      </nav>

      {/* ─── MAIN CONTENT AREA ──────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center pt-24 px-4 sm:px-6 relative z-10 w-full max-w-4xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-[10px] font-semibold uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5 text-blue-600" /> Panduan Penggunaan
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-2">
            Hanya 4 Langkah Mudah
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Ikuti petunjuk di bawah ini untuk merapikan laporan Anda.
          </p>
        </div>

        {/* ─── STEP CARD CAROUSEL ───────────────────────────────────────── */}
        <div className="w-full bg-white/80 backdrop-blur-md rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden flex flex-col min-h-[420px]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-1 p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12"
            >
              {/* Teks Deskripsi */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold mb-5">
                  Langkah {steps[currentStep].id} dari 4
                </div>
                <div className={`w-14 h-14 mx-auto md:mx-0 rounded-2xl bg-gradient-to-br ${steps[currentStep].color} text-white flex items-center justify-center mb-5 shadow-lg ${steps[currentStep].shadow}`}>
                  {steps[currentStep].icon}
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-3">
                  {steps[currentStep].title}
                </h2>
                <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
                  {steps[currentStep].description}
                </p>
              </div>

              {/* Visual Mockup */}
              <div className="w-full md:w-72 shrink-0 bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-center justify-center">
                {steps[currentStep].visual}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ─── NAVIGATION CONTROLS ────────────────────────────────────── */}
          <div className="bg-slate-50/80 border-t border-slate-100 p-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Dots Indicator */}
            <div className="flex items-center gap-2 order-2 sm:order-1">
              {steps.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300'}`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Sebelumnya
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
                >
                  Selanjutnya <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href="/main"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md shadow-blue-600/30"
                >
                  Selesai & Mulai <ShieldCheck className="w-4 h-4" />
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}