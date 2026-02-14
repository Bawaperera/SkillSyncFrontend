'use client'

import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/lib/auth/AuthContext'
import { ModalProvider } from '@/lib/context/ModalContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
