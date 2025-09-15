"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function HeaderNav() {
  const pathname = usePathname()

  const lastY = useRef(0)
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const goingDown = y > lastY.current
      setHidden(goingDown && y > 80) // desktop-only via md: classes below
      lastY.current = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { href: "/", label: "Home" },
    { href: "/skills", label: "Skills" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Get in touch" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 md:fixed md:inset-x-0 md:top-0 z-50 mx-auto max-w-screen-2xl px-4 pt-4 transition-all duration-300",
        hidden ? "md:-translate-y-full md:opacity-0" : "md:translate-y-0 md:opacity-100",
      )}
    >
      <nav
        role="navigation"
        aria-label="Primary"
        className="mx-auto flex h-12 items-center justify-between rounded-full border border-border bg-white dark:bg-card backdrop-blur-sm px-4 md:h-14"
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="sr-only">Home</span>
          <div className="h-2 w-2 rounded-full bg-cyan-500 dark:bg-cyan-400" aria-hidden />
          <span className="text-sm font-semibold text-zinc-800 dark:text-card-foreground">Abhishek Bardhan</span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm text-zinc-700 dark:text-card-foreground/80 hover:text-zinc-900 dark:hover:text-card-foreground transition-colors",
                    pathname === l.href && "text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-400/10 font-semibold",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
