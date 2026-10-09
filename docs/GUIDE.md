# Appc Store guide

## Before you launch

1. `src/lib/site.ts`: check `supportEmail`, `operatorName`, and `legalLastUpdated`. Optionally set `githubUrl`.
2. In Vercel, set `NEXT_PUBLIC_SITE_URL` to your site address (for example `https://appcstore.vercel.app`). It is used for the sitemap and social previews.
3. Review `src/app/privacy/page.tsx` and `src/app/terms/page.tsx`. They are templates with `[bracketed]` gaps.

## Add a new app

1. Create `public/apps/<slug>/` and add:
   - `icon.png` (512x512 recommended)
   - screenshots, such as `screenshot-1.jpg` (portrait phone screenshots)
   - the APK, if you store it in the site (see "Where to keep APK files")
2. Copy the CarteView entry in `src/data/apps.ts` and change its fields:

```ts
{
  slug: "my-app",                       // becomes /apps/my-app
  name: "My App",
  shortDescription: "One line shown on cards.",
  description: "Paragraph one.\n\nParagraph two.",
  icon: "/apps/my-app/icon.png",
  screenshots: [{ src: "/apps/my-app/screenshot-1.jpg", alt: "Describe what the screen shows" }],
  category: "Tools",                    // category chips are built from these automatically
  version: "1.0.0",
  addedDate: "2026-10-07",              // drives "Recently added"
  lastUpdated: "2026-10-07",
  fileSize: "18 MB",                    // leave out any field you do not know
  minimumAndroidVersion: "Android 8.0 or later",
  downloadUrl: "/apps/my-app/my-app-1.0.0.apk",
  sha256: "optional checksum",          // shown on the download page if present
  permissions: ["Camera", "Internet"],  // optional, plain-language list
  features: ["Feature one", "Feature two"],
  changelog: [{ version: "1.0.0", date: "2026-10-07", notes: ["First release."] }],
  developer: { name: "Your Name", website: "https://example.com" },
  supportEmail: "support@example.com",  // optional, falls back to site.ts
  featured: true,                       // show in the Featured section
}
```

3. Commit and push. Vercel redeploys automatically.

Only fields you fill in are displayed.

## Update an app (new APK version)

1. Put the new APK in `public/apps/<slug>/`.
2. Edit its entry in `src/data/apps.ts`: update `version`, `lastUpdated`, `fileSize`, `downloadUrl`, `sha256`, and add a new item at the top of `changelog`.
3. Commit and push.

Get a checksum with `sha256sum file.apk` (macOS: `shasum -a 256 file.apk`, Windows PowerShell: `Get-FileHash file.apk`). If you do not want to show one, remove the `sha256` line. Do not leave an old checksum in place.

## Replace screenshots or icons

Overwrite the files in `public/apps/<slug>/`, or add new files and update the `screenshots` array. Keep the `alt` text accurate.

## Where to keep APK files

For a few small apps, keeping the APK in `public/apps/<slug>/` is fine. For larger or many apps, upload each APK to a GitHub Release and use that asset link as `downloadUrl` (`https://github.com/<user>/<repo>/releases/download/v1.0.0/<file>.apk`). The release repository must be public. GitHub does not accept single files over 100 MB in a normal commit.

## Deploy on Vercel

- Framework Preset: Next.js (also pinned in `vercel.json`)
- Root Directory: the folder that contains `package.json` (blank if it is the repository root)
- Build Command, Output Directory, Install Command: leave on defaults
- Do not set a `NEXT_OUTPUT` environment variable on Vercel

Then every `git push` to the main branch deploys automatically.

## Static hosting (optional)

For Netlify drag and drop, GitHub Pages, or Cloudflare Pages:

```bash
NEXT_OUTPUT=export npm run build     # output is in ./out
```

On Windows PowerShell: `$env:NEXT_OUTPUT="export"; npm run build`. Upload the `out` folder.

## Design notes

Colors, spacing, and type follow the supplied reference: a violet gradient header, a dark body, rounded cards, and a stats row. Brand colors are in `tailwind.config.ts`. Font: Plus Jakarta Sans, bundled locally. Background artwork is kept as separate files in `public/img/` so it can be swapped without touching code.
