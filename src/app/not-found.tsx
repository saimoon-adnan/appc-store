import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-28 text-center">
      <h1 className="text-3xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-ink-300">This page does not exist, or the app has been removed.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-brand-600 px-5 py-2.5 font-bold hover:bg-brand-500">Browse apps</Link>
    </div>
  );
}
