import type { Metadata } from "next";
import { PageShell, Prose } from "@/components/PageShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "How to reach Appc Store for support or questions." };

export default function ContactPage() {
  return (
    <PageShell title="Contact" intro="Questions about an app, a download, or this site.">
      <Prose>
        <p>The quickest way to reach us is by email:</p>
        <p>
          <a className="inline-block rounded-full bg-brand-600 px-5 py-2.5 !text-white no-underline hover:bg-brand-500" href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
        </p>
        <p>When you write about an app, include its name, the version, and your Android version. That helps us find the problem faster.</p>
        {siteConfig.githubUrl && (
          <p>You can also open an issue on <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
        )}
      </Prose>
    </PageShell>
  );
}
