import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { DemoBookingModal } from "@/components/marketing/DemoBookingModal"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SkillSync - AI-Powered Talent Alignment Platform',
  description: 'Connecting students, employers, and universities in Sri Lanka\'s tech sector through AI-driven skill matching and analytics.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>
          {children}
          <DemoBookingModal />
        </Providers>
      </body>
    </html>
  )
}
