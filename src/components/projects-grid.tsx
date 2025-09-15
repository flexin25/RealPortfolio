"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { SiNextdotjs, SiReact, SiTailwindcss } from "react-icons/si"
import type { ReactNode } from "react"

const projects = [
  {
    title: "Pomodoro Timer",
    desc: "25/5 focus cycles with sound and keyboard shortcuts.",
    stack: ["Next.js", "React", "Tailwind"],
    href: "#",
  },
  {
    title: "Weather API",
    desc: "Siliguri weather using Open‑Meteo with cache and SWR.",
    stack: ["Next.js", "React", "Tailwind"],
    href: "#",
  },
  {
    title: "URL Shortener",
    desc: "Tiny links with analytics via API routes.",
    stack: ["Next.js", "React", "Tailwind"],
    href: "#",
  },
]

const stackIcon: Record<string, ReactNode> = {
  "Next.js": <SiNextdotjs className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-200" />,
  React: <SiReact className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />,
  Tailwind: <SiTailwindcss className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />,
}

export default function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <motion.article
          key={p.title}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.35, delay: i * 0.04, ease: "easeOut" }}
          className="group flex h-40 flex-col justify-between rounded-md border border-border bg-white dark:bg-black p-4"
        >
          <div>
            <h3 className="text-zinc-800 dark:text-white">{p.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{p.desc}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 text-xs text-zinc-700 dark:text-zinc-300"
                >
                  <span aria-hidden>{stackIcon[s]}</span>
                  {s}
                </span>
              ))}
            </div>
            <Link href={p.href} className="text-sm text-cyan-600 dark:text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
              View
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  )
}
