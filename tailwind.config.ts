import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F4F1FF",
          100: "#E8E2FF",
          200: "#D0C6FF",
          300: "#B3A3FF",
          400: "#9477FF",
          500: "#7448F5",
          600: "#5E2BE6",
          700: "#4A1FC4",
          800: "#361690",
          900: "#22105E",
        },
        ink: {
          950: "#101012",
          900: "#161619",
          800: "#1E1E23",
          700: "#2A2A31",
          600: "#3A3A43",
          400: "#9A9AA6",
          300: "#B9B9C4",
        },
        mist: "#E8F6FF",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: { "4xl": "2rem" },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 12px 32px -12px rgba(0,0,0,0.6)",
        glow: "0 18px 50px -12px rgba(116,72,245,0.55)",
      },
    },
  },
  plugins: [],
};
export default config;
