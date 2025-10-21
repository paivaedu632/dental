import type { Metadata } from "next"
import "./globals.css"
import { Plus_Jakarta_Sans } from "next/font/google"

const inter = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "DentalFlow",
  description: "Minimal landing page",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
