"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-5 py-28 text-center">
      <h1 className="text-3xl font-extrabold">Something went wrong</h1>
      <p className="mt-3 text-ink-300">The page could not load. Try again, or go back to the app list.</p>
      <div className="mt-8 flex justify-center gap-3">
        <button type="button" onClick={reset} className="rounded-full bg-brand-600 px-5 py-2.5 font-bold hover:bg-brand-500">Try again</button>
        <Link href="/" className="rounded-full bg-ink-800 px-5 py-2.5 font-bold hover:bg-ink-700">Browse apps</Link>
      </div>
    </div>
  );
}
