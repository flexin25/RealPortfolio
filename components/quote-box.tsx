"use client"

import { motion } from "framer-motion"

export function QuoteBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-xl border border-border bg-card p-4"
    >
      <blockquote className="text-center">
        <p className="text-sm font-medium leading-relaxed text-card-foreground italic">
          "Find what you love and let it kill you"
        </p>
        <footer className="mt-2">
          <cite className="text-xs text-muted-foreground not-italic">— Charles Bukowski</cite>
        </footer>
      </blockquote>
    </motion.div>
  )
}
