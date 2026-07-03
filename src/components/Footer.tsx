import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gold-400 rounded-lg flex items-center justify-center font-display font-bold text-navy-950 text-sm">
                SC
              </div>
              <span className="font-display font-bold text-white text-lg">
                SuratCuan<span className="text-gold-400">Pro</span>
              </span>
            </div>
            <p className="text-sm text-blue-300 leading-relaxed max-w-xs">
              Platform SaaS #1 untuk otomatisasi SPJ PNS Indonesia. Foto bon → 60 detik → SPJ rapi sesuai PMK 113/2012.
            </p>
            <p className="mt-4 text-xs text-blue-400 italic">
              &ldquo;Kami tidak menjual software. Kami menjual hak pulang jam 5 sore.&rdquo;
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 bg-navy-800 hover:bg-navy-700 rounded-lg flex items-center justify-center text-blue-300 hover:text-white transition-colors text-xs font-bold"
              >
                FB
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-navy-800 hover:bg-navy-700 rounded-lg flex items-center justify-center text-blue-300 hover:text-white transition-colors text-xs font-bold"
              >
                YT
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-navy-800 hover:bg-navy-700 rounded-lg flex items-center justify-center text-blue-300 hover:text-white transition-colors text-xs"
              >
                TK
              </a>
              <a
                href="https://wa.me/6282100000000"
                className="w-9 h-9 bg-navy-800 hover:bg-navy-700 rounded-lg flex items-center justify-center text-blue-300 hover:text-white transition-colors text-xs font-bold"
              >
                WA
              </a>
            </div>
          </div>

          {/* Produk */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Produk</h3>
            <ul className="space-y-3">
              {[
                { label: 'Cara Kerja', href: '/#cara-kerja' },
                { label: 'Fitur Lengkap', href: '/#fitur' },
                { label: 'Harga & Paket', href: '/pricing' },
                { label: 'Keamanan Data', href: '/#keamanan' },
                { label: 'Roadmap', href: '#' },
                { label: 'Status Sistem', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-blue-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Legal & Bantuan</h3>
            <ul className="space-y-3">
              {[
                { label: 'Kebijakan Privasi', href: '/privacy' },
                { label: 'Syarat & Ketentuan', href: '/terms' },
                { label: 'Pusat Bantuan', href: '#' },
                { label: 'Hubungi Kami', href: '#' },
                { label: 'Panduan PMK 113', href: '#' },
                { label: 'Blog', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-blue-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-12 pt-8 border-t border-navy-800">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-xs text-blue-400">Dipercaya & Aman:</span>
            {[
              '🔒 AES-256 Encryption',
              '🇮🇩 Compliant UU PDP',
              '🏛️ PMK 113/2012',
              '💳 Midtrans Secured',
              '☁️ NIP Tidak Tersimpan',
            ].map((badge) => (
              <span
                key={badge}
                className="text-xs bg-navy-800 text-blue-300 px-3 py-1.5 rounded-full border border-navy-700"
              >
                {badge}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-blue-500">
              © 2025 SuratCuan Pro. Hak cipta dilindungi undang-undang.
            </p>
            <p className="text-xs text-blue-500">
              Dibuat dengan ❤️ untuk ASN Indonesia · v1.0.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}