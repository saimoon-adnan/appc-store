import Link from "next/link";
import type { AppEntry } from "@/lib/types";
import { AppIcon } from "./AppIcon";
import { SampleBadge } from "./SampleBadge";

export function AppCard({ app }: { app: AppEntry }) {
  return (
    <article className="group relative flex flex-col rounded-3xl border border-white/10 bg-ink-800 p-5 shadow-card transition hover:border-brand-400/50 hover:bg-ink-700/60">
      <div className="flex items-start gap-4">
        <AppIcon src={app.icon} name={app.name} size={64} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold">
            <Link href={`/apps/${app.slug}`} className="after:absolute after:inset-0 after:rounded-3xl after:content-['']">
              {app.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm font-semibold text-brand-300">{app.category}</p>
        </div>
        {app.placeholder && <SampleBadge />}
      </div>
      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-ink-300">{app.shortDescription}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-semibold text-ink-400">Version {app.version}</span>
        <span className="rounded-full bg-brand-600 px-4 py-1.5 text-sm font-bold text-white transition group-hover:bg-brand-500">
          View details
        </span>
      </div>
    </article>
  );
}
