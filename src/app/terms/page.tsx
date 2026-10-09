import type { Metadata } from "next";
import { PageShell, Prose, TemplateNotice } from "@/components/PageShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Terms", description: "Terms for using Appc Store." };

export default function TermsPage() {
  return (
    <PageShell title="Terms" intro={`Last updated ${siteConfig.legalLastUpdated}`}>
      <TemplateNotice />
      <Prose>
        <p>By using {siteConfig.name} you agree to these terms. {siteConfig.name} is operated by {siteConfig.operatorName}.</p>
        <h2>Using the site</h2>
        <p>You may browse the site and download listed apps for personal use. Do not misuse the site, attempt to disrupt it, or redistribute apps in a way their developer does not allow.</p>
        <h2>Installing apps outside Google Play</h2>
        <p>Apps are distributed as APK files and are not installed through Google Play. You are responsible for deciding whether to install an app and for changes you make to your device settings to do so.</p>
        <h2>No warranty</h2>
        <p>Apps and information are provided &ldquo;as is&rdquo;, without warranties of any kind. [Have this section reviewed for your jurisdiction.]</p>
        <h2>Limitation of liability</h2>
        <p>To the extent the law allows, {siteConfig.operatorName} is not liable for losses arising from using this site or the apps it lists. [Review and adjust.]</p>
        <h2>Third-party content</h2>
        <p>Apps, names, and logos belong to their respective owners. Download files may be hosted by third parties.</p>
        <h2>Contact</h2>
        <p>Questions about these terms: <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.</p>
      </Prose>
    </PageShell>
  );
}
