import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import React from 'react'; // Import React

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Scientific Calculator',
  description: 'A scientific calculator built with Next.js and shadcn/ui',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}