import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)",
          50: "var(--primary-50)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          light: "var(--secondary-light)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)",
        },
        danger: "var(--danger)",
        info: "var(--info)",
        block: {
          motion: "var(--block-motion)",
          looks: "var(--block-looks)",
          sound: "var(--block-sound)",
          events: "var(--block-events)",
          control: "var(--block-control)",
          sensing: "var(--block-sensing)",
          operators: "var(--block-operators)",
          variables: "var(--block-variables)",
          pen: "var(--block-pen)",
          myblocks: "var(--block-myblocks)",
        },
        bg: {
          main: "var(--bg-main)",
          card: "var(--bg-card)",
          sidebar: "var(--bg-sidebar)",
          editor: "var(--bg-editor)",
          elevated: "var(--bg-elevated)",
        },
        text: {
          1: "var(--text-1)",
          2: "var(--text-2)",
          3: "var(--text-3)",
        },
        border: {
          DEFAULT: "var(--border)",
          light: "var(--border-light)",
        },
      },
      fontFamily: {
        sans: ["Nunito", "Pretendard", "-apple-system", "sans-serif"],
        code: ["Fira Code", "monospace"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        glow: "var(--shadow-glow)",
        "glow-green": "var(--shadow-glow-green)",
        "glow-amber": "var(--shadow-glow-amber)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "pop-in": "pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        "slide-up": "slide-up 0.5s ease-out",
        shake: "shake 0.3s ease-in-out",
        "bounce-in": "bounce-in 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        "star-burst": "star-burst 0.6s cubic-bezier(0.34,1.56,0.64,1)",
        shimmer: "shimmer 2s linear infinite",
        "confetti-fall": "confetti-fall 2s ease-in forwards",
        "xp-fill": "xp-fill 1s ease-out forwards",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%,100%": { boxShadow: "0 0 8px rgba(99,102,241,0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(99,102,241,0.6)" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.7)", opacity: "0" },
          "60%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shake: {
          "0%,100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "75%": { transform: "translateX(4px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "confetti-fall": {
          "0%": { transform: "translateY(-10px) rotate(0)", opacity: "1" },
          "100%": {
            transform: "translateY(100vh) rotate(720deg)",
            opacity: "0",
          },
        },
        "star-burst": {
          "0%": { transform: "scale(0) rotate(0)", opacity: "0" },
          "50%": { transform: "scale(1.3) rotate(180deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(360deg)", opacity: "1" },
        },
        "xp-fill": {
          "0%": { width: "0" },
          "100%": { width: "var(--fill)" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.15)" },
          "70%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        "glow-pulse": {
          "0%,100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
