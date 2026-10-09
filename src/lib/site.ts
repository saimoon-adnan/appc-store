/**
 * Site-wide settings. Edit these before launching.
 */
export const siteConfig = {
  name: "Appc Store",
  tagline: "Android apps you can download straight from the developer.",
  description:
    "Appc Store lists Android apps with their screenshots, version details, and direct APK downloads, so you can see what you are installing before you download it.",
  // Set NEXT_PUBLIC_SITE_URL in your host's environment settings once you have a domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://appc.example.com",
  // Replace with the address you want visitors to write to.
  supportEmail: "adnansaimoon@gmail.com",
  // TODO: optional. Leave "" to hide.
  githubUrl: "",
  // TODO: shown on legal pages. Replace with your real name or business name.
  operatorName: "Appc Store",
  legalLastUpdated: "2026-10-07",
};
