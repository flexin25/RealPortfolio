"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiGo,
  SiDocker,
  SiGithubactions,
  SiVercel,
  SiPostman,
  SiFigma,
} from "react-icons/si"
import { VscBeaker } from "react-icons/vsc"

type Tech = { name: string; group: "frontend" | "backend" | "devops" | "tools" }
const tech: Tech[] = [
  { name: "React", group: "frontend" },
  { name: "Next.js", group: "frontend" },
  { name: "TypeScript", group: "frontend" },
  { name: "Tailwind", group: "frontend" },

  { name: "Node.js", group: "backend" },
  { name: "Python", group: "backend" },
  { name: "Go", group: "backend" },

  { name: "Docker", group: "devops" },
  { name: "GitHub Actions", group: "devops" },
  { name: "Vercel", group: "devops" },

  { name: "Postman", group: "tools" },
  { name: "Playwright", group: "tools" },
  { name: "Figma", group: "tools" },
]

const icons: Record<string, React.ReactNode> = {
  React: <SiReact className="h-4 w-4 text-cyan-400" />,
  "Next.js": <SiNextdotjs className="h-4 w-4 text-zinc-200" />,
  TypeScript: <SiTypescript className="h-4 w-4 text-cyan-400" />,
  Tailwind: <SiTailwindcss className="h-4 w-4 text-cyan-400" />,
  "Node.js": <SiNodedotjs className="h-4 w-4 text-emerald-400" />,
  Python: <SiPython className="h-4 w-4 text-emerald-400" />,
  Go: <SiGo className="h-4 w-4 text-cyan-400" />,
  Docker: <SiDocker className="h-4 w-4 text-cyan-400" />,
  "GitHub Actions": <SiGithubactions className="h-4 w-4 text-zinc-200" />,
  Vercel: <SiVercel className="h-4 w-4 text-zinc-200" />,
  Postman: <SiPostman className="h-4 w-4 text-zinc-200" />,
  Playwright: <VscBeaker className="h-4 w-4 text-zinc-200" />,
  Figma: <SiFigma className="h-4 w-4 text-zinc-200" />,
}

export function TechBlocks({ compact = false }: { compact?: boolean }) {
  const groups: { key: Tech["group"]; label: string }[] = [
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "devops", label: "DevOps" },
    { key: "tools", label: "Tools" },
  ]

  return (
    <div className={cn("grid gap-4", compact ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-4")}> 
      {groups.map((g, gi) => (
        <motion.div
          key={g.key}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: gi * 0.05, duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-10%" }}
          className="rounded-2xl border border-border bg-white dark:bg-black p-4"
        >
          <h3 className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">{g.label}</h3>
          <div className="grid grid-cols-2 gap-2">
            {tech
              .filter((t) => t.group === g.key)
              .map((t, idx) => (
                <motion.div
                  key={t.name}
                  initial={{ y: 6, scale: 0.96, opacity: 0 }}
                  whileInView={{ y: 0, scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: 0.04 * idx, type: "spring", stiffness: 240, damping: 20 }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-zinc-100 dark:bg-black px-3 py-2 text-center text-sm text-zinc-800 dark:text-zinc-200 transition-transform hover:-translate-y-0.5"
                >
                  <span aria-hidden>{icons[t.name]}</span>
                  <span>{t.name}</span>
                </motion.div>
              ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
