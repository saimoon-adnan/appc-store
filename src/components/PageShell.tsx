export function PageShell({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <>
      <section className="bg-detail">
        <div className="mx-auto max-w-3xl px-5 py-14">
          <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
          {intro && <p className="mt-3 max-w-xl text-lg text-white/85">{intro}</p>}
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-5 py-12">{children}</div>
    </>
  );
}

export function TemplateNotice() {
  return (
    <p className="mb-8 rounded-2xl bg-amber-300/10 p-4 text-sm text-amber-100 ring-1 ring-amber-200/30">
      <strong>Template.</strong> This text is a starting point, not legal advice. Review it, replace anything in [square brackets], and have it checked for your situation before you publish the site.
    </p>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4 leading-relaxed text-ink-300 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-white [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_a]:font-bold [&_a]:text-brand-300 [&_a]:underline-offset-2 hover:[&_a]:underline">
      {children}
    </div>
  );
}
