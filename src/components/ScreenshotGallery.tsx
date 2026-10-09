"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Screenshot } from "@/lib/types";

export function ScreenshotGallery({ shots, appName }: { shots: Screenshot[]; appName: string }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active !== null && !d.open) d.showModal();
    if (active === null && d.open) d.close();
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % shots.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + shots.length) % shots.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, shots.length]);

  function close() {
    setActive(null);
    lastFocus.current?.focus();
  }

  if (shots.length === 0) return null;

  return (
    <>
      <ul className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 scrollbar-none" aria-label={`${appName} screenshots`}>
        {shots.map((s, i) => (
          <li key={s.src} className="w-44 shrink-0 snap-start sm:w-52">
            <button
              type="button"
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setActive(i);
              }}
              className="block w-full overflow-hidden rounded-3xl border border-white/10 transition hover:border-brand-400"
              aria-label={`Enlarge screenshot ${i + 1} of ${shots.length}`}
            >
              <Image src={s.src} alt={s.alt} width={360} height={800} sizes="208px" className="h-auto w-full" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(e) => { if (e.target === dialogRef.current) close(); }}
        aria-label={`${appName} screenshot viewer`}
        className="m-auto max-h-[92vh] w-[min(92vw,420px)] overflow-visible bg-transparent p-0 backdrop:bg-black/80"
      >
        {active !== null && (
          <div className="relative">
            <Image src={shots[active].src} alt={shots[active].alt} width={360} height={800} sizes="420px" className="mx-auto max-h-[80vh] w-auto rounded-3xl" />
            <div className="mt-4 flex items-center justify-between gap-3">
              <button type="button" onClick={() => setActive((active - 1 + shots.length) % shots.length)} className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold hover:bg-white/25">Previous</button>
              <span className="text-sm text-ink-300">{active + 1} of {shots.length}</span>
              <button type="button" onClick={() => setActive((active + 1) % shots.length)} className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold hover:bg-white/25">Next</button>
            </div>
            <button type="button" onClick={close} className="absolute -top-3 right-0 grid h-9 w-9 -translate-y-full place-items-center rounded-full bg-white/15 hover:bg-white/25" aria-label="Close viewer">
              <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" /></svg>
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
