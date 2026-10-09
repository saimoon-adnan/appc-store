import Link from "next/link";
import { Logo } from "./Logo";
import { siteConfig } from "@/lib/site";

const cols = [
  { title: "Appc Store", links: [{ href: "/about", label: "About" }, { href: "/contact", label: "Contact" }] },
  { title: "Legal", links: [{ href: "/privacy", label: "Privacy Policy" }, { href: "/terms", label: "Terms" }] },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-ink-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-400">{siteConfig.tagline}</p>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="text-sm font-bold text-white">{c.title}</h2>
            <ul className="mt-3 space-y-2">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-400 transition hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-ink-400">
        &copy; {new Date().getFullYear()} Appc Store. Apps are provided by their developers and installed at your own discretion.
      </div>
    </footer>
  );
}
