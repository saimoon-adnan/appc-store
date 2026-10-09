# Appc Store

A marketplace and download site for Android apps, built with Next.js 14, TypeScript, and Tailwind CSS.
No backend, database, or paid service. Every app comes from one data file.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build && npm start
```

Requires Node.js 18.17 or newer.

## Project layout

```
src/data/apps.ts        The app catalog (CarteView). Edit this to add or change apps.
src/lib/site.ts         Site name, support email, operator name, site URL.
src/lib/types.ts        The AppEntry fields and what each one means.
src/app/                Pages: home, /apps/[slug], /apps/[slug]/download, about, contact, privacy, terms.
src/components/         Reusable UI.
public/brand/           Appc logo and social-share image.
public/img/             Background artwork (hero-bg.svg, detail-bg.svg). Swap these files to restyle.
public/apps/<slug>/     Each app's icon and screenshots.
```

## Quick deploy on Netlify (drag and drop)

The zip has two folders: `deploy/` is the finished website, `source/` is the code.

1. Unzip, then open **app.netlify.com/drop** and drag the **`deploy`** folder onto the page.
2. Netlify gives you a `.netlify.app` link. Rename it in Site settings if you like.

To change something later, edit `source/`, then run:

```bash
cd source
npm install
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app NEXT_OUTPUT=export npm run build
```

(Windows PowerShell: `$env:NEXT_PUBLIC_SITE_URL="https://your-site.netlify.app"; $env:NEXT_OUTPUT="export"; npm run build`.)
Drag the new `out` folder to Netlify. Do not forget `NEXT_PUBLIC_SITE_URL`, otherwise links in the sitemap and social previews point to a placeholder address.

## Deploy on Vercel

Import the repository so that **`package.json` is at the root of what Vercel builds**.

- Framework Preset: **Next.js** (also pinned in `vercel.json`)
- Root Directory: the folder that contains `package.json` (leave blank if it is the repository root)
- Build Command, Output Directory, Install Command: leave on the defaults (do not override)
- Do **not** set a `NEXT_OUTPUT` environment variable on Vercel. That variable is only for static hosts such as Netlify drag and drop.
- Optional: set `NEXT_PUBLIC_SITE_URL` to your domain, for example `https://appcstore.vercel.app`.

## Before you launch

1. `src/lib/site.ts`: check `supportEmail`, `operatorName`, and `legalLastUpdated`. Optionally set `githubUrl`.
2. Set `NEXT_PUBLIC_SITE_URL` (for example `https://appc.yourdomain.com`) in your host's environment settings. It is used for canonical links, the sitemap, and social previews.
3. CarteView is already listed. Its APK, icon, and screenshots are in `public/apps/carteview/`.
4. Edit `src/app/privacy/page.tsx` and `src/app/terms/page.tsx`. They are templates with `[bracketed]` gaps and must be reviewed before you publish.
5. Edit the About page text if you want your own wording.

## Add a new app

1. Create `public/apps/<slug>/` and add `icon.png` (512x512 recommended) and screenshots such as `screenshot-1.png` (portrait phone screenshots, roughly 1080x2340, or smaller).
2. Copy an entry in `src/data/apps.ts`, then change the fields:

```ts
{
  slug: "my-app",                       // becomes /apps/my-app
  name: "My App",
  shortDescription: "One line shown on cards.",
  description: "Paragraph one.\n\nParagraph two.",
  icon: "/apps/my-app/icon.png",
  screenshots: [{ src: "/apps/my-app/screenshot-1.png", alt: "Describe what the screen shows" }],
  category: "Tools",                    // filter chips are built from these automatically
  version: "1.0.0",
  addedDate: "2026-10-07",              // drives "Recently added"
  lastUpdated: "2026-10-07",
  fileSize: "18 MB",                    // leave out any field you do not know
  minimumAndroidVersion: "Android 8.0 or later",
  downloadUrl: "https://github.com/<user>/<repo>/releases/download/v1.0.0/my-app-1.0.0.apk",
  sha256: "optional checksum",          // shown on the download page if present
  features: ["Feature one", "Feature two"],
  changelog: [{ version: "1.0.0", date: "2026-10-07", notes: ["First release."] }],
  developer: { name: "Your Name", website: "https://example.com" },
  featured: true,                       // shows in the Featured section
}
```

3. Commit and push. The site rebuilds and the new page appears.

Only fields you fill in are displayed. Nothing is invented: there are no ratings, download counts, or reviews.

## Update an app

Edit its entry: bump `version`, set `lastUpdated`, update `fileSize` and `downloadUrl`, and add a new item at the top of `changelog`.

## Replace screenshots or icons

Overwrite the files in `public/apps/<slug>/` (keep the same names), or add new files and update the `screenshots` array. Update the `alt` text so it describes the screen.

## Host APK files on GitHub Releases

The APK for CarteView is currently stored inside the site (`public/apps/carteview/`), which is fine for one small app. Larger or many apps are better on GitHub Releases, so the repository stays small.

1. In a repository for the app (it can be a separate one), open **Releases**, then **Draft a new release**.
2. Create a tag such as `v1.0.0`, attach the `.apk` file, and publish.
3. Copy the asset link: `https://github.com/<user>/<repo>/releases/download/v1.0.0/<file>.apk`.
4. Paste it into `downloadUrl`.

To get a checksum: `sha256sum my-app-1.0.0.apk` (macOS: `shasum -a 256 my-app-1.0.0.apk`).

Release assets on a private repository cannot be downloaded by visitors. Use a public repository.

## Publish a new APK version

1. Build and sign the release APK.
2. Create a new GitHub Release with the new APK attached.
3. Update the app's entry in `src/data/apps.ts` (version, date, size, link, changelog).
4. Push. The host rebuilds automatically.

## Deploy for free

**Vercel (simplest)**: import the GitHub repository at vercel.com, keep the defaults, add `NEXT_PUBLIC_SITE_URL`, deploy.

**Netlify**: import the repository; Netlify detects Next.js automatically.

**Static hosting (GitHub Pages, Cloudflare Pages)**: build a fully static site with

```bash
NEXT_OUTPUT=export npm run build     # output is in ./out
```

Upload the `out/` folder, or point the host's build command at the line above with `out` as the output directory. For GitHub Pages under a sub-path you will also need to set `basePath` in `next.config.mjs`.

Check each provider's current free-tier limits before launch.

## Design notes

Colors, spacing, and type follow the supplied reference: a violet gradient header, a dark body, rounded cards, and a stats row with Version, Category, Size, and so on. Brand colors are in `tailwind.config.ts` (`brand` and `ink`). Font: Plus Jakarta Sans, bundled locally through `@fontsource-variable`, so there are no requests to Google Fonts. Background artwork is kept as separate files in `public/img/` so you can swap it without touching code.

## Honesty rules built into the site

The download page does not claim that files are scanned or verified. It only shows a checksum if you supply one. An app marked `placeholder: true` shows a visible badge.
