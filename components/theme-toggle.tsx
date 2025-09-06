"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="h-9 w-9 rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <div className="h-4 w-4" />
      </button>
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-colors hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-zinc-400 transition-transform hover:rotate-12" />
      ) : (
        <Moon className="h-4 w-4 text-zinc-400 transition-transform hover:-rotate-12" />
      )}
    </button>
  )
}
