"use client"

import useSWR from "swr"
import { useEffect, useMemo, useState } from "react"
import { WiStrongWind, WiHumidity } from "react-icons/wi"
import { FaGithub, FaInstagram } from "react-icons/fa"
import { RiTwitterXFill } from "react-icons/ri"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

// Small helper to get hours/minutes/seconds in Asia/Kolkata reliably
function getKolkataHMS(d: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(d)
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value || 0)
  const hour = get("hour")
  const minute = get("minute")
  const second = get("second")
  return { hour, minute, second }
}

export function WeatherCard() {
  // Siliguri, West Bengal
  const lat = 26.7271
  const lon = 88.3953

  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const { data } = useSWR(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`,
    fetcher,
    { refreshInterval: 10 * 60 * 1000 },
  )

  const temp = data?.current?.temperature_2m as number | undefined
  const wind = data?.current?.wind_speed_10m as number | undefined
  const humidity = data?.current?.relative_humidity_2m as number | undefined

  const time = now
    ? now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "--:--:--"
  const date = now
    ? now.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
        day: "2-digit",
        month: "short",
      })
    : ""

  // Compute analog hand angles
  const { hDeg, mDeg, sDeg } = useMemo(() => {
    if (!now) return { hDeg: 0, mDeg: 0, sDeg: 0 }
    const { hour, minute, second } = getKolkataHMS(now)
    const hDeg = ((hour % 12) + minute / 60 + second / 3600) * 30 // 360/12
    const mDeg = (minute + second / 60) * 6 // 360/60
    const sDeg = second * 6
    return { hDeg, mDeg, sDeg }
  }, [now])

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-black p-4 pb-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">West Bengal</p>
          <h4 className="text-sm font-medium text-zinc-300">Siliguri</h4>
          <div className="mt-2 text-3xl font-semibold text-white">
            {temp !== undefined ? Math.round(temp) : "--"}°
            <span className="ml-1 align-top text-xs text-zinc-400">C</span>
          </div>
        </div>

        {/* Analog Watch */}
        <div className="relative h-16 w-16 shrink-0" aria-label={`Time ${time} IST`}>
          <svg viewBox="0 0 100 100" className="h-16 w-16">
            {/* dial */}
            <circle cx="50" cy="50" r="47" className="fill-black stroke-white/15" strokeWidth="2" />
            {/* hour ticks */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * Math.PI) / 6
              const r1 = 38
              const r2 = 44
              const x1 = 50 + r1 * Math.sin(angle)
              const y1 = 50 - r1 * Math.cos(angle)
              const x2 = 50 + r2 * Math.sin(angle)
              const y2 = 50 - r2 * Math.cos(angle)
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth={i % 3 === 0 ? 2.2 : 1.4}
                />
              )
            })}
            {/* hands */}
            <g strokeLinecap="round" transform="translate(50,50)">
              <line
                x1="0"
                y1="6"
                x2="0"
                y2="-22"
                className="stroke-white"
                strokeWidth="3.5"
                style={{ transform: `rotate(${hDeg}deg)` }}
              />
              <line
                x1="0"
                y1="8"
                x2="0"
                y2="-30"
                className="stroke-zinc-300"
                strokeWidth="2.4"
                style={{ transform: `rotate(${mDeg}deg)` }}
              />
              <line
                x1="0"
                y1="10"
                x2="0"
                y2="-36"
                className="stroke-cyan-400"
                strokeWidth="1.4"
                style={{ transform: `rotate(${sDeg}deg)` }}
              />
              <circle r="2.5" className="fill-emerald-400" />
            </g>
          </svg>
        </div>
      </div>

      {/* date + digital time for quick scan */}
      <div className="mt-2 flex items-center justify-between text-zinc-400">
        <span className="text-xs">{date}</span>
        <span className="font-mono text-sm text-zinc-300">{time} IST</span>
      </div>

      {/* weather stats */}
      <div className="mt-3 grid grid-cols-2 gap-3 text-zinc-300">
        <div className="flex items-center gap-2">
          <WiStrongWind className="h-5 w-5 text-cyan-400" aria-hidden />
          <span className="text-sm">{wind !== undefined ? `${Math.round(wind)} km/h` : "--"}</span>
        </div>
        <div className="flex items-center gap-2">
          <WiHumidity className="h-5 w-5 text-emerald-400" aria-hidden />
          <span className="text-sm">{humidity !== undefined ? `${humidity}%` : "--"}</span>
        </div>
      </div>

      {/* Socials inside the card */}
      <div className="mt-4 border-t border-white/10 pt-3">
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/flexin25"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 transition-colors hover:text-white"
            aria-label="GitHub @flexin25"
            title="GitHub"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          <a
            href="https://twitter.com/1mflexin_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 transition-colors hover:text-white"
            aria-label="X @1mflexin_"
            title="X (Twitter)"
          >
            <RiTwitterXFill className="h-5 w-5" />
          </a>
          <a
            href="https://instagram.com/flexin25_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 transition-colors hover:text-white"
            aria-label="Instagram @flexin25_"
            title="Instagram"
          >
            <FaInstagram className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  )
}
