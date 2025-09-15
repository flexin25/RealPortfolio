import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Abhishek Bardhan - Portfolio",
  description: "Creative Full-Stack Developer | Crafting Seamless Web Experiences",
  icons: {
    icon: "/loco.jpeg"
  }
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
