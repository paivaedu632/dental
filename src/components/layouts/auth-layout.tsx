import { Inter } from "next/font/google"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}

// Auth-specific metadata
export const authMetadata = {
  title: "Dental Analytics - Authentication",
  description: "Sign up or sign in to your Dental Analytics account to access comprehensive dental practice analytics and management tools.",
}
