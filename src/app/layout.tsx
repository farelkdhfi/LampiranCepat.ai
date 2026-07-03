import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LampiranCepat.ai',
  description:
    'Platform SaaS #1 untuk PNS Indonesia. Foto bon → 60 detik → Lampiran rapi sesuai PMK 113/2012. Tinggal print & tanda tangan.',
  keywords: 'SPJ otomatis, PNS, ASN, Surat Pertanggungjawaban, PMK 113',
  openGraph: {
    title: 'LampiranCepat.AI',
    description: 'Foto Bon → 60 Detik → SPJ Rapi. Tinggal Print & Tanda Tangan.',
    url: 'https://lampirancepat.ai',
    siteName: 'LampiranCepat.AI',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${syne.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}