# Appc Store

**Appc Store** is a website for sharing Android apps. Each app gets its own page with a description, screenshots, version details, and a direct APK download, so people can see what an app is before they install it, instead of receiving a raw file link.

Live site: https://appcstore.vercel.app

## What you can do on the site

- Browse apps on the home page, with featured and recently added sections
- Search by app name or description, and filter by category
- Open an app page to see its screenshots, key features, version, file size, minimum Android version, last updated date, permissions, and what's new
- Download the APK from a dedicated download page that explains the Android "unknown source" warning and walks through installation
- Read the About, Contact, Privacy Policy, and Terms pages

Appc Store only shows information that is actually available. It has no ratings, review counts, or download counters, and it does not claim that files have been scanned or verified. If a SHA-256 checksum is provided for an APK, it is shown on the download page.

## Apps currently listed

| App | Category | Version |
| --- | --- | --- |
| CarteView | Food & Drink | 1.3.0 |

CarteView is a restaurant video-menu app: explore dishes through videos, see descriptions and prices, and open menus through QR codes.

## Built with

- [Next.js 14](https://nextjs.org/) (App Router) and TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- No backend, database, or paid service. All apps come from one data file.

## Run it locally

You need Node.js 18.17 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other commands:

```bash
npm run lint     # check the code
npm run build    # production build
npm start        # run the production build
```

## Project structure

```
src/data/apps.ts      The app catalog. Add or edit apps here.
src/lib/site.ts       Site name, support email, site URL.
src/lib/types.ts      What each app field means.
src/app/              Pages (home, app details, download, about, contact, privacy, terms).
src/components/       Reusable UI components.
public/brand/         Appc Store logo and social preview image.
public/img/           Background artwork. Replace these files to restyle.
public/apps/<slug>/   Each app's icon, screenshots, and APK.
docs/GUIDE.md         Step-by-step guide for adding and updating apps.
```

## Deploy

The site is set up for Vercel (free tier works). Import the repository, keep the Next.js defaults, and deploy. Every push to the main branch deploys automatically. Details are in [docs/GUIDE.md](docs/GUIDE.md).

## Adding or updating an app

Edit `src/data/apps.ts`, add the app's files under `public/apps/<slug>/`, and push. The full walkthrough is in [docs/GUIDE.md](docs/GUIDE.md).

## Notes

- The Privacy Policy and Terms pages are templates. Review and edit them before relying on them.
- Apps are provided by their developers and installed outside Google Play. Only install apps from developers you trust.
