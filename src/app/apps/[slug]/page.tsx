import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppIcon } from "@/components/AppIcon";
import { SampleBadge } from "@/components/SampleBadge";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { ShareButton } from "@/components/ShareButton";
import { formatDate, getAllApps, getApp } from "@/lib/apps";
import { siteConfig } from "@/lib/site";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllApps().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const app = getApp(params.slug);
  if (!app) return { title: "App not found" };
  const title = `${app.name} for Android`;
  return {
    title,
    description: app.shortDescription,
    alternates: { canonical: `/apps/${app.slug}` },
    openGraph: {
      type: "website",
      title: `${title} | ${siteConfig.name}`,
      description: app.shortDescription,
      url: `/apps/${app.slug}`,
      images: [{ url: app.screenshots[0]?.src ?? app.icon, alt: `${app.name} screenshot` }],
    },
  };
}

export default function AppPage({ params }: Props) {
  const app = getApp(params.slug);
  if (!app) notFound();

  const facts = [
    { label: "Version", value: app.version },
    { label: "Category", value: app.category },
    { label: "Size", value: app.fileSize },
    { label: "Requires", value: app.minimumAndroidVersion },
    { label: "Updated", value: formatDate(app.lastUpdated) },
    { label: "Developer", value: app.developer.name },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  const supportEmail = app.supportEmail ?? siteConfig.supportEmail;
  const privacyHref = app.privacyPolicyUrl ?? "/privacy";
  const privacyExternal = privacyHref.startsWith("http");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.shortDescription,
    applicationCategory: app.category,
    operatingSystem: app.minimumAndroidVersion ?? "Android",
    softwareVersion: app.version,
    author: { "@type": "Person", name: app.developer.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-detail">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-8">
          <nav aria-label="Breadcrumb" className="text-sm text-white/75">
            <Link href="/" className="hover:text-white">Apps</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page" className="font-semibold text-white">{app.name}</span>
          </nav>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <AppIcon src={app.icon} name={app.name} size={128} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{app.name}</h1>
                {app.placeholder && <SampleBadge />}
              </div>
              <p className="mt-1 text-lg font-bold text-brand-100">{app.category}</p>
              <p className="mt-2 max-w-xl text-white/85">{app.shortDescription}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {app.downloadUrl ? (
                  <Link href={`/apps/${app.slug}/download`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-extrabold text-brand-700 shadow-glow transition hover:bg-brand-50">
                    <DownloadIcon /> Download for Android
                  </Link>
                ) : (
                  <span className="inline-flex rounded-full bg-white/20 px-6 py-3 font-bold text-white/80" aria-disabled="true">
                    Download not available yet
                  </span>
                )}
                <ShareButton title={`${app.name} on Appc Store`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-white/10 bg-ink-900">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-5 px-5 py-6 sm:grid-cols-3 lg:flex lg:justify-between">
          {facts.map((f) => (
            <div key={f.label} className="px-2 text-center lg:flex-1 lg:border-r lg:border-white/10 lg:last:border-r-0">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-400">{f.label}</dt>
              <dd className="mt-1 text-sm font-bold sm:text-base">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mx-auto max-w-6xl px-5">
        {app.screenshots.length > 0 && (
          <section className="mt-12" aria-labelledby="shots-h">
            <h2 id="shots-h" className="text-2xl font-extrabold">Screenshots</h2>
            <div className="mt-5"><ScreenshotGallery shots={app.screenshots} appName={app.name} /></div>
          </section>
        )}

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-12">
            <section aria-labelledby="about-h">
              <h2 id="about-h" className="text-2xl font-extrabold">About this app</h2>
              <div className="mt-4 max-w-prose space-y-4 leading-relaxed text-ink-300">
                {app.description.split(/\n\s*\n/).map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>

            {app.features.length > 0 && (
              <section aria-labelledby="feat-h">
                <h2 id="feat-h" className="text-2xl font-extrabold">Key features</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {app.features.map((f) => (
                    <li key={f} className="flex gap-3 rounded-2xl bg-ink-800 p-4 text-sm font-semibold">
                      <svg className="mt-0.5 shrink-0 text-brand-300" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 9.5l3.2 3L14 5.5" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {app.permissions && app.permissions.length > 0 && (
              <section aria-labelledby="perm-h">
                <h2 id="perm-h" className="text-2xl font-extrabold">Permissions</h2>
                <p className="mt-3 max-w-prose text-sm text-ink-300">Android permissions listed in the app&apos;s APK. Android will ask you to approve some of them when you use the app.</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {app.permissions.map((p) => (
                    <li key={p} className="rounded-full bg-ink-800 px-3 py-1.5 text-sm font-semibold">{p}</li>
                  ))}
                </ul>
              </section>
            )}

            {app.changelog.length > 0 && (
              <section aria-labelledby="log-h">
                <h2 id="log-h" className="text-2xl font-extrabold">What&apos;s new</h2>
                <ol className="mt-4 space-y-6">
                  {app.changelog.map((c) => (
                    <li key={c.version} className="border-l-2 border-brand-600 pl-5">
                      <p className="font-bold">Version {c.version} <span className="ml-2 text-sm font-medium text-ink-400">{formatDate(c.date)}</span></p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-300">
                        {c.notes.map((n) => <li key={n}>{n}</li>)}
                      </ul>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          <aside aria-labelledby="dev-h" className="h-fit rounded-3xl border border-white/10 bg-ink-900 p-6">
            <h2 id="dev-h" className="text-lg font-extrabold">Developer and support</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div><dt className="text-ink-400">Developer</dt><dd className="font-bold">{app.developer.name}</dd></div>
              {app.developer.website && (
                <div><dt className="text-ink-400">Website</dt><dd><a className="font-bold text-brand-300 underline-offset-2 hover:underline" href={app.developer.website} target="_blank" rel="noopener noreferrer">{app.developer.website.replace(/^https?:\/\//, "")}</a></dd></div>
              )}
              <div><dt className="text-ink-400">Support</dt><dd><a className="font-bold text-brand-300 underline-offset-2 hover:underline" href={`mailto:${supportEmail}?subject=${encodeURIComponent(app.name + " support")}`}>{supportEmail}</a></dd></div>
              <div><dt className="text-ink-400">Privacy</dt><dd>
                {privacyExternal ? (
                  <a className="font-bold text-brand-300 underline-offset-2 hover:underline" href={privacyHref} target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                ) : (
                  <Link className="font-bold text-brand-300 underline-offset-2 hover:underline" href={privacyHref}>Privacy Policy</Link>
                )}
              </dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 2v9M5.5 8L9 11.5 12.5 8M3 14.5h12" />
    </svg>
  );
}
