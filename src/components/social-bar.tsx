import { FaGithub, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export default function SocialBar() {
  return (
    <section className="px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/flexin25"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/10 bg-black p-3 text-zinc-200 hover:border-zinc-300/20"
            aria-label="GitHub @flexin25"
            title="@flexin25"
          >
            <FaGithub className="h-5 w-5" aria-hidden />
            <span className="sr-only">@flexin25</span>
          </a>

          <a
            href="https://twitter.com/1mflexin_"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/10 bg-black p-3 text-zinc-200 hover:border-zinc-300/20"
            aria-label="Twitter @1mflexin_"
            title="@1mflexin_"
          >
            <FaXTwitter className="h-5 w-5" aria-hidden />
            <span className="sr-only">@1mflexin_</span>
          </a>

          <a
            href="https://instagram.com/flexin25_"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/10 bg-black p-3 text-zinc-200 hover:border-zinc-300/20"
            aria-label="Instagram @flexin25_"
            title="@flexin25_"
          >
            <FaInstagram className="h-5 w-5" aria-hidden />
            <span className="sr-only">@flexin25_</span>
          </a>
        </div>
      </div>
    </section>
  )
}
