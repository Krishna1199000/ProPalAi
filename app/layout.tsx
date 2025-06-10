import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import { ToastProvider } from "@/components/providers/toast-provider"
import { SessionProvider } from "@/components/providers/session-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pro Pal AI - Your AI Assistant',
  description: 'Experience the future of AI assistance with Pro Pal AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="propal-theme"
          >
            <AuthProvider>
              {children}
              <ToastProvider />
            </AuthProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}