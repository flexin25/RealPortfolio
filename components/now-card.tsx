"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"

function formatTime(d: Date) {
  const hh = String(d.getHours()).padStart(2, "0")
  const mm = String(d.getMinutes()).padStart(2, "0")
  const ss = String(d.getSeconds()).padStart(2, "0")
  return `${hh}:${mm}:${ss}`
}

export function NowCard({ className }: { className?: string }) {
  const [now, setNow] = useState<Date>(() => new Date())

  // Asia/Kolkata time without external libs
  const kolkataDate = useMemo(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "short",
    })
    // Extract parts to build a Date-like display
    const parts = fmt.formatToParts(now)
    const get = (type: string) => parts.find((p) => p.type === type)?.value || ""
    const label = `${get("weekday")}`
    const time = `${get("hour")}:${get("minute")}:${get("second")}`
    const date = `${get("day")}-${get("month")}-${get("year")}`
    return { label, time, date }
  }, [now])

  // Day progress (Kolkata)
  const dayProgress = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata" })
    // Convert 'now' to Kolkata milliseconds by formatting and re-parsing
    const iso = new Date(formatter.format(now)) // local parse fallback
    const h = now.getUTCHours() // fallback path; we will compute from now directly
    // Simpler and robust: compute seconds of day from time string
    const [hh, mm, ss] = kolkataDate.time.split(":").map((v) => Number.parseInt(v, 10))
    const seconds = hh * 3600 + mm * 60 + ss
    return seconds / 86400
  }, [now, kolkataDate.time])

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      aria-label="Current time in Kolkata"
      className={cn(
        "rounded-md border border-zinc-800 bg-black p-4",
        "flex items-center justify-between gap-4",
        "shadow-none",
        className,
      )}
    >
      <div className="min-w-0">
        <p className="text-xs text-zinc-500">Now — Kolkata</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-white tabular-nums">{kolkataDate.time}</p>
        <p className="mt-0.5 text-xs text-zinc-500">
          {kolkataDate.label} • {kolkataDate.date}
        </p>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-900">
          <div
            className="h-full bg-cyan-500 transition-[width] duration-500 ease-out"
            style={{ width: `${Math.max(2, Math.min(100, Math.round(dayProgress * 100)))}%` }}
          />
        </div>
      </div>

      {/* Seconds sweep */}
      <div className="relative hidden h-16 w-16 items-center justify-center rounded-md border border-zinc-800 bg-black sm:flex">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border border-zinc-800" />
        </div>
        <div
          className="origin-bottom rounded-full bg-emerald-500"
          style={{
            height: 24,
            width: 2,
            transform: `rotate(${(now.getSeconds() / 60) * 360}deg) translateY(-8px)`,
            transition: "transform 0.6s cubic-bezier(0.2,0.8,0.2,1)",
          }}
        />
      </div>
    </div>
  )
}
