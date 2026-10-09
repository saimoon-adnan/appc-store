"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { AppEntry } from "@/lib/types";
import { getCategories, matchesQuery, sortByRecent } from "@/lib/apps";
import { AppCard } from "./AppCard";
import { FeaturedCard } from "./FeaturedCard";

const steps = [
  { title: "Check the details", text: "Each app page lists its version, file size, Android requirement, and screenshots." },
  { title: "Download the APK", text: "The file is the developer's own release. Appc Store does not bundle or change it." },
  { title: "Install it", text: "Android may ask you to allow installs from your browser. The download page walks you through it." },
];

export function Marketplace({ apps }: { apps: AppEntry[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const categories = useMemo(() => getCategories(apps), [apps]);
  const filtering = query.trim() !== "" || category !== "All";

  const results = useMemo(
    () => sortByRecent(apps.filter((a) => (category === "All" || a.category === category) && matchesQuery(a, query))),
    [apps, query, category]
  );
  const featured = apps.filter((a) => a.featured);
  // "Recently added" lists apps that are not already shown as featured.
  const recent = sortByRecent(featured.length > 0 ? apps.filter((a) => !a.featured) : apps);

  function reset() {
    setQuery("");
    setCategory("All");
  }

  return (
    <>
      <section className="bg-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-16 pt-14 md:grid-cols-[1.3fr_1fr] md:pb-24 md:pt-20">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Find an app. Check the details. Download the APK.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Appc Store lists every release with its version, size, and screenshots, so you know what you are installing before you download it.
            </p>
            <form role="search" onSubmit={(e) => e.preventDefault()} className="mt-8 max-w-xl">
              <label htmlFor="app-search" className="sr-only">Search apps</label>
              <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3.5 shadow-glow focus-within:ring-4 focus-within:ring-brand-200/60">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#5E2BE6" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="9" cy="9" r="6" /><path d="M14 14l4 4" />
                </svg>
                <input
                  id="app-search"
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  placeholder="Search by app name or what it does"
                  className="w-full bg-transparent text-base font-medium text-ink-900 placeholder:text-ink-400 focus:outline-none"
                  autoComplete="off"
                />
              </div>
            </form>
          </div>
          <div className="hidden justify-center md:flex">
            <Image
              src="/brand/appc-logo.png"
              alt="Appc Store logo"
              width={300}
              height={301}
              priority
              className="hero-logo h-auto w-64 drop-shadow-[0_30px_50px_rgba(20,0,80,0.55)] lg:w-72"
            />
          </div>
        </div>
      </section>

      <div id="apps" className="mx-auto max-w-6xl scroll-mt-20 px-5">
        <div className="-mx-5 mt-8 overflow-x-auto px-5 scrollbar-none">
          <div role="group" aria-label="Filter by category" className="flex w-max gap-2 pb-1">
            {[{ name: "All", count: apps.length }, ...categories].map((c) => {
              const active = category === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(c.name)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    active ? "bg-brand-600 text-white" : "bg-ink-800 text-ink-300 hover:bg-ink-700 hover:text-white"
                  }`}
                >
                  {c.name}
                  <span className={`ml-2 text-xs ${active ? "text-brand-100" : "text-ink-400"}`}>{c.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {filtering ? `${results.length} ${results.length === 1 ? "app" : "apps"} found` : ""}
        </p>

        {filtering ? (
          <section className="mt-10" aria-labelledby="results-heading">
            <h2 id="results-heading" className="text-2xl font-extrabold">
              {results.length} {results.length === 1 ? "result" : "results"}
              {category !== "All" ? ` in ${category}` : ""}
            </h2>
            {results.length > 0 ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((a) => <AppCard key={a.slug} app={a} />)}
              </div>
            ) : (
              <div className="mt-6 rounded-3xl border border-dashed border-white/15 bg-ink-900 px-6 py-14 text-center">
                <p className="text-lg font-bold">No apps match your search</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-ink-400">
                  Try a different word, or clear the search and category to see every app.
                </p>
                <button type="button" onClick={reset} className="mt-6 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold hover:bg-brand-500">
                  Show all apps
                </button>
              </div>
            )}
          </section>
        ) : (
          <>
            {featured.length > 0 && (
              <section className="mt-12" aria-labelledby="featured-heading">
                <h2 id="featured-heading" className="text-2xl font-extrabold">Featured apps</h2>
                <div className={`mt-6 grid gap-6 ${featured.length > 1 ? "lg:grid-cols-2" : ""}`}>
                  {featured.map((a) => <FeaturedCard key={a.slug} app={a} wide={featured.length === 1} />)}
                </div>
              </section>
            )}
            {recent.length > 0 && (
              <section className="mt-16" aria-labelledby="recent-heading">
                <h2 id="recent-heading" className="text-2xl font-extrabold">Recently added</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {recent.map((a) => <AppCard key={a.slug} app={a} />)}
                </div>
              </section>
            )}
          </>
        )}

        <section className="mt-20 rounded-4xl border border-white/10 bg-ink-900 p-6 sm:p-10" aria-labelledby="how-heading">
          <h2 id="how-heading" className="text-2xl font-extrabold">How downloading works</h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-extrabold">{i + 1}</span>
                <div>
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-400">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
