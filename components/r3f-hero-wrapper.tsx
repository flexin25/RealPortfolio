"use client"
import dynamic from "next/dynamic"

// Avoid SSR issues by dynamically importing the Canvas scene
const R3fHero = dynamic(() => import("./r3f-hero"), { ssr: false })

export function R3fHeroWrapper() {
  return <R3fHero />
}

// re-export a tag used in the homepage for clarity
export default R3fHero
