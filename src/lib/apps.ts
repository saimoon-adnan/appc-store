import { apps } from "@/data/apps";
import type { AppEntry } from "./types";

export function getAllApps(): AppEntry[] {
  return apps;
}

export function getApp(slug: string): AppEntry | undefined {
  return apps.find((a) => a.slug === slug);
}

export function sortByRecent(list: AppEntry[]): AppEntry[] {
  return [...list].sort((a, b) => b.addedDate.localeCompare(a.addedDate));
}

export function getCategories(list: AppEntry[]): { name: string; count: number }[] {
  const map = new Map<string, number>();
  list.forEach((a) => map.set(a.category, (map.get(a.category) ?? 0) + 1));
  return [...map.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name));
}

/** Every word typed must appear in the app's name, descriptions, category, or features. */
export function matchesQuery(app: AppEntry, query: string): boolean {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const haystack = [app.name, app.shortDescription, app.description, app.category, ...app.features]
    .join(" ")
    .toLowerCase();
  return words.every((w) => haystack.includes(w));
}

export function formatDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

export function apkFileName(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const last = new URL(url, "https://placeholder.local").pathname.split("/").filter(Boolean).pop();
    return last ? decodeURIComponent(last) : undefined;
  } catch {
    return undefined;
  }
}
