import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Palette - Sophisticated Neutrals
        ink: "#0A0B0D",
        charcoal: "#1C1E23",
        graphite: "#2A2D35",
        stone: "#52555E",
        // Cream & Whites - Luxury Touch
        ivory: "#FFFEF9",
        pearl: "#FAF8F3",
        champagne: "#F5F0E8",
        linen: "#EDE7DC",
        // Accent Colors - Subtle Luxury
        cognac: "#964B3C",
        "champagne-gold": "#C9B585",
        sage: "#7A8471",
        "midnight-blue": "#2C3E50",
      },
      fontFamily: {
        serif: ["var(--font-crimson)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "-apple-system", "sans-serif"],
        display: ["var(--font-grotesk)", "-apple-system", "sans-serif"],
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2.5rem",
        xl: "4rem",
        "2xl": "6rem",
        "3xl": "8rem",
      },
      maxWidth: {
        container: "1400px",
      },
      transitionTimingFunction: {
        "ease-out-custom": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "ease-in-out-custom": "cubic-bezier(0.645, 0.045, 0.355, 1)",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scrollDown: {
          "0%": { top: "-100%", opacity: "0" },
          "10%": { opacity: "1" },
          "50%": { top: "100%", opacity: "1" },
          "51%": { opacity: "0" },
          "100%": { top: "100%", opacity: "0" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "fade-in": "fadeIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "scroll-down": "scrollDown 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
