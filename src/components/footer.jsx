import { SiNextdotjs, SiTailwindcss, SiReact } from "react-icons/si"
import { VscSymbolColor } from "react-icons/vsc"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-zinc-400">
            Built with{" "}
            <span className="inline-flex items-center gap-1 text-zinc-200">
              <SiNextdotjs aria-hidden className="h-4 w-4" /> Next.js
            </span>{" "}
            •{" "}
            <span className="inline-flex items-center gap-1 text-zinc-200">
              <SiReact aria-hidden className="h-4 w-4" /> React
            </span>{" "}
            •{" "}
            <span className="inline-flex items-center gap-1 text-zinc-200">
              <SiTailwindcss aria-hidden className="h-4 w-4" /> Tailwind CSS
            </span>{" "}
            •{" "}
            <span className="inline-flex items-center gap-1 text-zinc-200">
              <VscSymbolColor aria-hidden className="h-4 w-4" /> shadcn/ui
            </span>
          </p>
          <p className="text-sm text-zinc-500">© 2025 Abhishek Bardhan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
