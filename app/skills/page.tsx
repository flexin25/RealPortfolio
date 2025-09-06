"use client"

import { HeaderNav } from "@/components/header-nav"
import { TechBlocks } from "@/components/tech-blocks"
import { motion } from "framer-motion"

export default function SkillsPage() {
  return (
    <main>
      <HeaderNav />
      <section className="px-6 pb-24 pt-28 md:px-12 lg:px-20">
        <header className="mb-8">
          <p className="text-sm tracking-widest text-zinc-500 uppercase">Capabilities</p>
          <h1 className="text-pretty text-4xl font-semibold text-white md:text-5xl">Skills & Stack</h1>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <TechBlocks />
        </motion.div>
      </section>
    </main>
  )
}
