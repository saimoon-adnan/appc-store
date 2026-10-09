export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24" role="status" aria-live="polite">
      <div className="h-8 w-56 animate-pulse rounded-full bg-ink-800" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => <div key={i} className="h-44 animate-pulse rounded-3xl bg-ink-800" />)}
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
