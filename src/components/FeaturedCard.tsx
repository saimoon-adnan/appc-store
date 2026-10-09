import Image from "next/image";
import Link from "next/link";
import type { AppEntry } from "@/lib/types";
import { AppIcon } from "./AppIcon";

export function FeaturedCard({ app, wide = false }: { app: AppEntry; wide?: boolean }) {
  const shots = app.screenshots.slice(0, wide ? 4 : 3);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-4xl border border-white/10 shadow-card">
      <div className={`bg-hero px-6 pt-6 sm:px-8 sm:pt-8 ${wide ? "md:grid md:grid-cols-[1fr_1.35fr] md:items-center md:gap-10" : ""}`}>
        <div className={wide ? "md:pb-8" : ""}>
          <div className="flex items-center gap-4">
            <AppIcon src={app.icon} name={app.name} size={wide ? 88 : 72} />
            <div className="min-w-0">
              <h3 className={`truncate font-extrabold ${wide ? "text-3xl" : "text-2xl"}`}>
                <Link href={`/apps/${app.slug}`} className="after:absolute after:inset-0 after:content-['']">
                  {app.name}
                </Link>
              </h3>
              <p className="text-sm font-bold text-brand-100">{app.category}</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">{app.shortDescription}</p>
          {wide && (
            <span className="mt-6 hidden w-fit rounded-full bg-white px-6 py-3 text-sm font-extrabold text-brand-700 shadow-glow md:inline-block">
              View details
            </span>
          )}
        </div>
        <div className="mt-5 flex h-56 items-end gap-3 overflow-hidden sm:h-72 md:mt-6 md:h-80">
          {shots.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={s.alt}
              width={360}
              height={800}
              sizes="(min-width: 1024px) 170px, 30vw"
              className={`w-[31%] rounded-t-2xl border border-white/20 shadow-lg transition duration-300 group-hover:-translate-y-2 ${wide ? "md:w-[23%]" : ""} ${i % 2 === 1 ? "translate-y-3" : "translate-y-6"}`}
            />
          ))}
        </div>
      </div>
      <div className={`flex items-center justify-between bg-ink-800 px-6 py-4 ${wide ? "md:hidden" : ""}`}>
        <span className="text-sm font-semibold text-ink-300">Version {app.version}</span>
        <span className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-brand-700">View details</span>
      </div>
      {wide && (
        <div className="hidden items-center justify-between bg-ink-800 px-8 py-4 md:flex">
          <span className="text-sm font-semibold text-ink-300">Version {app.version}</span>
        </div>
      )}
    </article>
  );
}
