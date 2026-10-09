import type { AppEntry } from "@/lib/types";

/**
 * THE APP CATALOG
 * ----------------
 * Every app on the site comes from this list. Add an object to publish a new app,
 * edit an object to update one. See README.md for the full walkthrough.
 */
export const apps: AppEntry[] = [
  {
    slug: "carteview",
    name: "CarteView",
    shortDescription: "Explore food through engaging video menus.",
    description:
      "CarteView brings restaurant menus to life with engaging food videos. Explore dishes, discover menu items, and view prices before deciding what to order. It offers a more visual and convenient way to experience restaurant menus.\n\nWhether you're exploring a restaurant's digital menu or discovering new dishes, CarteView helps you see what is on the menu before making your choice. Restaurants can showcase their food through video-based menus, creating a more engaging experience for customers.",
    icon: "/apps/carteview/icon.png",
    screenshots: [
      { src: "/apps/carteview/screenshot-1-preview.jpg", alt: "CarteView menu preview showing a burger dish video with its name, description, price and category" },
      { src: "/apps/carteview/screenshot-2-menu.jpg", alt: "CarteView menu list with dish videos, descriptions, prices and category filters" },
      { src: "/apps/carteview/screenshot-3-dashboard.jpg", alt: "CarteView dashboard with menu status, scan count, active items and quick actions" },
      { src: "/apps/carteview/screenshot-4-qr-display.jpg", alt: "CarteView table display screen with a QR code and poster styles" },
      { src: "/apps/carteview/screenshot-5-analytics.jpg", alt: "CarteView monthly analytics report with scans, item views and daily activity" },
      { src: "/apps/carteview/screenshot-6-menu-drawer.jpg", alt: "CarteView side menu with rewards, sharing, updates and support" },
      { src: "/apps/carteview/screenshot-7-profile.jpg", alt: "CarteView restaurant profile screen" },
      { src: "/apps/carteview/screenshot-8-login.jpg", alt: "CarteView log in and sign up screen" },
    ],
    category: "Food & Drink",
    version: "1.3.0",
    addedDate: "2026-10-07",
    lastUpdated: "2026-10-09",
    fileSize: "18.6 MB",
    minimumAndroidVersion: "Android 7.0 or later",
    downloadUrl: "/apps/carteview/carteview-1.3.0.apk",
    // SHA-256 of carteview-1.3.0.apk, calculated from the file in this project.
    sha256: "5a102fb32a4ed1cd711a12f959ea4724302bb4fe314a89b0645520ebb475aa32",
    permissions: [
      "Camera",
      "Microphone and audio settings",
      "Internet and network state",
      "Run at device startup",
      "Foreground service",
      "Keep the device awake",
    ],
    features: [
      "Video-based menus: explore food through engaging videos",
      "Restaurant discovery: find restaurants and their offerings",
      "Digital QR menus: open restaurant menus through QR codes where supported",
      "Menu and pricing: see available dishes, descriptions, and prices",
      "Visual food discovery: see dishes before deciding what to order",
    ],
    changelog: [
      {
        version: "1.3.0",
        date: "2026-10-07",
        notes: [
          "Introducing CarteView.",
          "Explore video-based restaurant menus.",
          "Discover dishes and browse available menu details.",
          "Enjoy a more visual way to explore food.",
        ],
      },
    ],
    developer: { name: "CarteView Team" },
    supportEmail: "carteviewsupport@gmail.com",
    featured: true,
  },
];
