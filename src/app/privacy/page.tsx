import type { Metadata } from "next";
import { PageShell, Prose, TemplateNotice } from "@/components/PageShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Appc Store handles information." };

export default function PrivacyPage() {
  return (
    <PageShell title="Privacy Policy" intro={`Last updated ${siteConfig.legalLastUpdated}`}>
      <TemplateNotice />
      <Prose>
        <p>This policy explains how {siteConfig.name}, operated by {siteConfig.operatorName}, handles information when you visit this website.</p>
        <h2>Information we collect</h2>
        <p>This site does not require an account and does not ask you to submit personal details to browse or download apps. [Edit this section if you add analytics, forms, or other tools. Name each tool and what it collects.]</p>
        <h2>Hosting and logs</h2>
        <p>Our hosting provider and file host (for example GitHub) may keep standard server logs, such as IP address, browser type, and the pages or files requested. [Name your providers and link to their policies.]</p>
        <h2>Cookies and local storage</h2>
        <p>[State whether the site uses cookies or similar technologies. If it uses none, say so.]</p>
        <h2>Apps listed on Appc Store</h2>
        <p>Each app is provided by its developer and has its own data practices. Check the app&apos;s own privacy policy, linked from its page, before installing.</p>
        <h2>Contact</h2>
        <p>Privacy questions: <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.</p>
        <h2>Changes</h2>
        <p>We may update this policy. The date at the top shows the latest revision.</p>
      </Prose>
    </PageShell>
  );
}
