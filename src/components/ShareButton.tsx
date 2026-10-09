"use client";

import { useState } from "react";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled or clipboard unavailable */
    }
  }

  return (
    <button type="button" onClick={share} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/25">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 10V2M5 5l3-3 3 3M3 9v4h10V9" />
      </svg>
      <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
    </button>
  );
}
