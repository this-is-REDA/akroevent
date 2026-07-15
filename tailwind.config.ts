import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#FF1744",
          gold: "#FFD54F",
          dark: "#0A0A12",
          secondary: "#12121E",
          card: "#1A1A2A",
        },
        luxury: {
          bg: "#0A0A12",
          surface: "#12121E",
          card: "#1A1A2A",
          border: "rgba(255,255,255,0.1)",
          muted: "#D4D4DE",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-bebas)", "system-ui", "sans-serif"],
        brittany: ['"Brittany Signature"', "cursive"],
      },
      borderRadius: {
        DEFAULT: "0px",
        sm: "2px",
        md: "4px",
      },
      boxShadow: {
        "glow-red": "0 0 40px rgba(255, 34, 56, 0.45), 0 0 80px rgba(255, 34, 56, 0.2)",
        "glow-red-sm": "0 0 20px rgba(255, 34, 56, 0.35)",
        "glow-gold": "0 0 30px rgba(232, 197, 71, 0.35)",
        card: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
        "card-hover": "0 16px 48px rgba(0, 0, 0, 0.5), 0 0 40px rgba(232, 25, 44, 0.1)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "marquee-fast": "marquee 22s linear infinite",
        "marquee-clients": "marquee 30s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        aurora: "aurora 12s ease-in-out infinite",
        "gradient-shift": "gradient-shift 4s ease infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 34, 56, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 34, 56, 0.55)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(2%, -2%) scale(1.05)" },
          "66%": { transform: "translate(-1%, 1%) scale(0.98)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
    },
  },
  plugins: [],
};

export default config;
