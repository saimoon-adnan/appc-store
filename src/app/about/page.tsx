import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, Prose } from "@/components/PageShell";

export const metadata: Metadata = { title: "About", description: "What Appc Store is and how it works." };

export default function AboutPage() {
  return (
    <PageShell title="About Appc Store" intro="A simple place to find an Android app, see what it does, and download it.">
      <Prose>
        <p>Appc Store is an independent platform for sharing Android apps. Instead of passing around a raw APK link, each app gets its own page with a description, screenshots, version details, and a clear download and install guide.</p>
        <h2>What you will find here</h2>
        <ul>
          <li>The app&apos;s current version, file size, and the Android version it needs, when the developer has provided them.</li>
          <li>Screenshots of the real interface.</li>
          <li>A list of what changed in each release.</li>
          <li>Developer and support details.</li>
        </ul>
        <h2>How downloads work</h2>
        <p>Appc Store does not modify the apps it lists. Download buttons point to the developer&apos;s own release files. Because apps are installed outside Google Play, Android may ask for permission during install. The download page for each app explains the steps.</p>
        <h2>Questions</h2>
        <p>Found a problem with a listing or a download? <Link href="/contact">Get in touch</Link>.</p>
      </Prose>
    </PageShell>
  );
}
