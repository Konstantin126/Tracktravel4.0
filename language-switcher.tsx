"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LanguageSwitcher({ lang }: { lang: string }) {
  const pathname = usePathname()

  // Calculate the new path for the alternate language
  const newLang = lang === "en" ? "bg" : "en"
  const newPathname = pathname.replace(`/${lang}`, `/${newLang}`)

  return (
    <Button variant="outline" size="sm" className="font-medium" asChild>
      <Link href={newPathname} prefetch={false}>
        {lang === "en" ? "БГ" : "EN"}
      </Link>
    </Button>
  )
}

