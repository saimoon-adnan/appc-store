import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppIcon } from "@/components/AppIcon";
import { apkFileName, getAllApps, getApp } from "@/lib/apps";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllApps().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const app = getApp(params.slug);
  return {
    title: app ? `Download ${app.name}` : "Download",
    robots: { index: false },
  };
}

const steps = [
  { title: "Download the file", text: "Tap the download button. Your browser may ask you to confirm that you want to keep an APK file." },
  { title: "Open the APK", text: "Open it from your browser's download notification, or find it in the Files or Downloads app." },
  { title: "Allow the install if asked", text: "If Android blocks the install, tap Settings and turn on \"Allow from this source\" for your browser or file manager. The wording differs between phones." },
  { title: "Tap Install, then Open", text: "When it finishes, open the app. You can turn the unknown-sources setting off again afterwards." },
];

export default function DownloadPage({ params }: Props) {
  const app = getApp(params.slug);
  if (!app) notFound();

  const file = apkFileName(app.downloadUrl);

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-400">
        <Link href="/" className="hover:text-white">Apps</Link>
        <span aria-hidden="true"> / </span>
        <Link href={`/apps/${app.slug}`} className="hover:text-white">{app.name}</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page" className="text-white">Download</span>
      </nav>

      <section className="bg-hero mt-6 overflow-hidden rounded-4xl p-6 sm:p-8" aria-labelledby="dl-h">
        <div className="flex items-center gap-5">
          <AppIcon src={app.icon} name={app.name} size={80} />
          <div>
            <h1 id="dl-h" className="text-2xl font-extrabold sm:text-3xl">Download {app.name}</h1>
            <p className="mt-1 font-bold text-brand-100">Version {app.version} for Android</p>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 rounded-2xl bg-black/25 p-5 text-sm sm:grid-cols-3">
          <div className="sm:col-span-1"><dt className="text-white/70">File</dt><dd className="mt-0.5 break-all font-bold">{file ?? "APK file"}</dd></div>
          {app.fileSize && <div><dt className="text-white/70">Size</dt><dd className="mt-0.5 font-bold">{app.fileSize}</dd></div>}
          {app.minimumAndroidVersion && <div><dt className="text-white/70">Requires</dt><dd className="mt-0.5 font-bold">{app.minimumAndroidVersion}</dd></div>}
        </dl>

        {app.placeholder && (
          <p className="mt-4 rounded-xl bg-amber-300/15 p-3 text-sm text-amber-100 ring-1 ring-amber-200/30">
            This is a placeholder app. Its download link is not a real file yet.
          </p>
        )}

        {app.downloadUrl ? (
          <a
            href={app.downloadUrl}
            download={file}
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-extrabold text-brand-700 shadow-glow transition hover:bg-brand-50 sm:w-auto"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 2v9M5.5 8L9 11.5 12.5 8M3 14.5h12" /></svg>
            Download APK{app.fileSize ? ` (${app.fileSize})` : ""}
          </a>
        ) : (
          <p className="mt-6 font-bold">The download link for this version has not been added yet.</p>
        )}
      </section>

      {app.sha256 && (
        <section className="mt-6 rounded-3xl border border-white/10 bg-ink-900 p-6" aria-labelledby="sha-h">
          <h2 id="sha-h" className="text-lg font-extrabold">File checksum (SHA-256)</h2>
          <p className="mt-2 text-sm text-ink-300">Published by the developer. You can compare it with the checksum of the file you downloaded.</p>
          <code className="mt-3 block break-all rounded-xl bg-ink-800 p-3 text-xs">{app.sha256}</code>
        </section>
      )}

      <section className="mt-6 rounded-3xl border border-white/10 bg-ink-900 p-6" aria-labelledby="warn-h">
        <h2 id="warn-h" className="text-lg font-extrabold">Why Android may show a warning</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-300">
          This app is not installed from Google Play, so Android treats it as coming from an unknown source and may ask for your permission first. That is normal for any APK you download outside an app store. Only install apps from developers you trust.
        </p>
      </section>

      <section className="mt-6" aria-labelledby="steps-h">
        <h2 id="steps-h" className="text-xl font-extrabold">How to install</h2>
        <ol className="mt-5 space-y-4">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-2xl bg-ink-800 p-5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-extrabold">{i + 1}</span>
              <div>
                <h3 className="font-bold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-300">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm text-ink-400">On a computer? Open this page on your Android phone, or copy the downloaded file to your phone and open it there.</p>
      </section>

      <p className="mt-10">
        <Link href={`/apps/${app.slug}`} className="font-bold text-brand-300 hover:underline">Back to {app.name}</Link>
      </p>
    </div>
  );
}
