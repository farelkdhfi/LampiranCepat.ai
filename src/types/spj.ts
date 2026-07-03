export interface SpjItem {
  penerima: string;
  tanggal: string;
  barang: string;
  total: number;
  fileName?: string;
  order?: number;
  groupId?: string;

  // KWITANSI & TBP (Cluster 1)
  noUrut?: string;
  kodeBPU?: string;
  kodeRekening?: string;
  terbilang?: string;
  barangKwt?: string;
  penerimaKwt?: string;
  barangTbp?: string;
  penerimaTbp?: string;

  // BAP
  barangBap?: string;

  // CLUSTER PENGADAAN (PO, PH, Faktur, BAST, BAPB)
  qtyPo?: string;
  satuanPo?: string;
  hargaSatuanPo?: string;

  barangPo?: string;
  barangPh?: string;
  barangFaktur?: string;
  
  barangBast?: string;
  keteranganBast?: string;
  
  barangBapb?: string;
  kondisiBapb?: string;
}

export interface SpjData {
  items: SpjItem[];
  total: number;
  jenis_spj: string;
}

export interface DocConfig {
  // ── IDENTITAS UMUM (Kop Surat & TTD Umum) ──
  kopNamaPemerintah: string;
  kopNamaSkpd: string;
  kopAlamat: string;
  kopTelepon: string;
  
  tahun: string;
  tempat: string;
  
  labelJabatanKiri: string;
  kepala: string;
  nipKepala: string;
  
  labelJabatanKanan: string;
  bendahara: string;
  nipBendahara: string;
  nip: string; // Alias untuk fallback

  // ── 1. KWITANSI ──
  kwtTitle: string;
  kwtLabelNo: string;
  kwtLabelTerimaDari: string;
  kwtTerimaDari: string;
  kwtLabelUangSejumlah: string;
  kwtLabelUntuk: string;
  kwtLabelTerbilang: string;
  kwtTeksTerlampir: string;
  kwtLabelSetuju: string;
  kwtLabelLunas: string;
  kwtLabelPenerima: string;
  namaSekolah: string;
  namaKepsek: string;
  tanggalKwitansi: string;
  tanggalLunas: string;

  // ── 2. TANDA BUKTI PEMBAYARAN (TBP) ──
  tbpTitle: string;
  tbpTahunAnggaran: string;
  tbpMataAnggaran: string;
  tbpTerimaDari: string;
  tbpPihakPertama: string;
  tbpUangSebesar: string;
  tbpTerbilang: string;
  tbpUntukPembayaran: string;
  tbpLunasTgl: string;
  tbpPenerimaUang: string;
  tanggalTbp?: string;

  // ── 3. BERITA ACARA PEMBAYARAN (BAP) ──
  bapTitle: string;
  bapNomor: string;
  bapPadaHariIni: string;
  bapPihakPertamaLabel: string;
  bapPihakKeduaLabel: string;
  bapPihakKeduaNama: string;
  bapPihakKeduaJabatan: string;
  bapTeksTengah: string;
  hBapNo: string;
  hBapUraian: string;
  hBapJumlah: string;
  bapTeksPenutup: string;

  // ── 4. NOTA PESANAN (PO) ──
  poTitle: string;
  poNomor: string;
  poKepadaLabel: string;
  poPenyedia: string;
  poAlamatPenyedia: string;
  poTeksPembuka: string;
  hPoNo: string;
  hPoNamaBarang: string;
  hPoQty: string;
  hPoHargaSatuan: string;
  hPoTotal: string;
  poTeksPenutup: string;
  tanggalPo?: string;

  // ── 5. BERITA ACARA SERAH TERIMA (BAST) ──
  bastTitle: string;
  bastNomor: string;
  bastPadaHariIni: string;
  bastPihakPertamaLabel: string;
  bastPihakPertamaNama: string;
  bastPihakPertamaJabatan: string;
  bastPihakKeduaLabel: string;
  bastPihakKeduaNama: string;
  bastPihakKeduaJabatan: string;
  bastTeksTengah: string;
  hBastNo: string;
  hBastNamaBarang: string;
  hBastQty: string;
  hBastKeterangan: string;
  bastTeksPenutup: string;

  // ── 6. BERITA ACARA PENERIMAAN BARANG (BAPB) ──
  bapbTitle: string;
  bapbNomor: string;
  bapbPadaHariIni: string;
  bapbPihakPertamaLabel: string;
  bapbPihakPertamaNama: string;
  bapbPihakPertamaJabatan: string;
  bapbPihakKeduaLabel: string;
  bapbPihakKeduaNama: string;
  bapbPihakKeduaJabatan: string;
  bapbTeksTengah: string;
  hBapbNo: string;
  hBapbNamaBarang: string;
  hBapbQty: string;
  hBapbKondisi: string;
  bapbTeksPenutup: string;

  // ── 7. PENAWARAN HARGA (PH) ──
  phTitle: string;
  phNomor: string;
  phTanggal: string;
  phPerihal: string;
  phKepadaLabel: string;
  phPenyedia: string;
  phAlamatPenyedia: string;
  phTeksPembuka: string;
  hPhNo: string;
  hPhNamaBarang: string;
  hPhQty: string;
  hPhHargaSatuan: string;
  hPhTotal: string;
  phTeksPenutup: string;

  // ── 8. FAKTUR / INVOICE ──
  fakturTitle: string;
  fakturNomor: string;
  fakturTanggal: string;
  fakturKepadaLabel: string;
  fakturPenyedia: string;
  fakturAlamatPenyedia: string;
  hFakturNo: string;
  hFakturNamaBarang: string;
  hFakturQty: string;
  hFakturHargaSatuan: string;
  hFakturTotal: string;
  fakturTeksPenutup: string;
} 