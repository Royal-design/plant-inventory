import type { Metadata } from 'next'
import './globals.css'
import { poppins } from '@/app/fonts/fonts'
import { Navbar } from '@/components/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { ShowModal } from '@/components/ShowModal'
import ReduxProvider from '@/redux/ReduxProvider'

export const metadata: Metadata = {
  title: 'Auth',
  description: 'A simple next auth project',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <Navbar />
            <ShowModal />
            {children}
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
