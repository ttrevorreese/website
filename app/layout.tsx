import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Nav } from "@/components/nav"
import { PhotoProtection } from "@/components/photo-protection"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Trevor Reese — Photographer & Engineer",
  description: "Portfolio of Trevor Reese — software engineer and travel photographer.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}
    >
      <body className="bg-background text-foreground font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <PhotoProtection />
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
