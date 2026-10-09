export interface Screenshot {
  src: string; // e.g. "/apps/my-app/screenshot-1.png"
  alt: string;
}

export interface ChangelogEntry {
  version: string;
  date: string; // ISO date, e.g. "2026-10-01"
  notes: string[];
}

export interface AppEntry {
  slug: string; // used in the URL: /apps/<slug>
  name: string;
  shortDescription: string;
  description: string; // separate paragraphs with a blank line
  icon: string;
  screenshots: Screenshot[];
  category: string;
  version: string;
  addedDate: string; // ISO date, used for "Recently added"
  lastUpdated?: string; // ISO date
  fileSize?: string; // e.g. "24.5 MB" (leave out if unknown)
  minimumAndroidVersion?: string; // e.g. "Android 8.0 or later"
  downloadUrl?: string; // direct APK link (GitHub Releases recommended)
  sha256?: string; // optional: SHA-256 of the APK, shown on the download page
  permissions?: string[]; // plain-language list of Android permissions the APK requests
  features: string[];
  changelog: ChangelogEntry[];
  developer: { name: string; website?: string };
  privacyPolicyUrl?: string; // falls back to the Appc Store privacy page
  supportEmail?: string; // falls back to siteConfig.supportEmail
  featured?: boolean;
  /** Set to true on demo entries. Shows a "Sample" badge. Remove when you replace them. */
  placeholder?: boolean;
}
