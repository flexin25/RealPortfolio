"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TechBlocks } from "@/components/tech-blocks"
import { HeaderNav } from "@/components/header-nav"
import { WeatherCard } from "@/components/weather-card"
import ProjectsGrid from "@/components/projects-grid"
import { QuoteBox } from "@/components/quote-box"

export default function HomePage() {
  const [available] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thanks for your message! I'll get back to you soon.",
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <main>
      <HeaderNav />

      <section className="relative min-h-[50vh] px-6 pb-12 pt-24 md:px-12 lg:px-20">
        <div className="flex max-w-3xl flex-col gap-4">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">Portfolio / 2025</p>
          <motion.h1
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-pretty text-4xl font-semibold leading-snug text-zinc-900 dark:text-white md:text-6xl"
          >
            Abhishek Bardhan
            <span className="block text-base font-normal text-muted-foreground md:text-lg">
              Tech enthusiast • Rookie developer • 19 • TIU Kolkata '28
            </span>
          </motion.h1>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            I build sleek, blacked‑out interfaces with thoughtful motion using Next.js, React and Tailwind CSS.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-card-foreground">
              <span className={cn("h-2 w-2 rounded-full", available ? "bg-emerald-400" : "bg-muted")} aria-hidden />
              {available ? "Available for work" : "Booked"}
            </span>
            <Link href="/skills">
              <Button className="rounded-full bg-cyan-500 px-5 text-black hover:bg-cyan-400">View Skills</Button>
            </Link>
            <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground">
              Get in touch
            </Link>
          </div>

          <motion.div
            id="toolkit"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-6"
          >
            <TechBlocks compact />
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12 lg:px-20">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Projects</h2>
        </div>
        <ProjectsGrid />
      </section>

      {/* About */}
      <section id="about" className="px-6 pb-20 md:px-12 lg:px-20">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-balance text-2xl font-semibold text-card-foreground">About</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
            I'm Abhishek, a self-taught developer exploring web technologies and system basics. I enjoy building
            minimal, accessible UI and learning by shipping small, polished projects. Currently studying at TIU Kolkata
            ('28) and open to collaborations, internships, and freelance work.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 pb-28 md:px-12 lg:px-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 md:col-span-2">
            <h2 className="text-2xl font-semibold text-card-foreground">Get in touch</h2>
            <p className="mt-2 text-muted-foreground">
              Send me a message and I'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm text-card-foreground">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-card-foreground">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-card-foreground">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell me about your idea…"
                  className="h-28 w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-cyan-500/50"
                />
              </div>

              {submitStatus.type && (
                <div
                  className={cn(
                    "rounded-lg p-3 text-sm",
                    submitStatus.type === "success"
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-400",
                  )}
                >
                  {submitStatus.message}
                </div>
              )}

              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-cyan-500 px-5 text-black hover:bg-cyan-400 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-2 text-sm font-medium text-card-foreground">Siliguri Weather</h3>
            <div className="pb-2">
              <WeatherCard />
            </div>
            <div className="mt-4">
              <QuoteBox />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
