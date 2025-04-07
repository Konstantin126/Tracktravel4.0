import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { getDictionary } from "./dictionaries"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  // Ensure we have a valid lang parameter
  const lang = params.lang === "bg" ? "bg" : "en"
  const dict = getDictionary(lang)

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  }
}

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "bg" }]
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  // Ensure we have a valid lang parameter
  const lang = params.lang === "bg" ? "bg" : "en"

  return (
    <html lang={lang}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

