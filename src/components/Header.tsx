"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "/#apps", label: "Apps" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-4 py-2 text-sm font-semibold text-ink-300 transition hover:bg-white/10 hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10 sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 px-5 pb-4 sm:hidden">
          <ul className="flex flex-col pt-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-base font-semibold text-ink-300 hover:bg-white/10 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
