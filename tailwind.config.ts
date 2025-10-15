import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "serif"], // H1 only - elegance + authority
        heading: ["var(--font-poppins)", "sans-serif"], // H2-H6 - modern, friendly
        body: ["var(--font-inter)", "sans-serif"], // Body text - maximum readability
        sans: ["var(--font-inter)", "sans-serif"], // Default sans-serif
      },
      colors: {
        brand: {
          primary: "#FF6B9D", // Hot Pink - main brand color
          "primary-light": "#FFB3C6", // For hover states, backgrounds
          "primary-dark": "#E5578A", // For pressed states
          cta: "#FFDAB9", // Peach/Coral - CTA buttons and highlights
          "cta-hover": "#FFC89A", // CTA hover state
          secondary: "#8B4566", // Burgundy - authority, testimonials
          "secondary-light": "#A05577", // Secondary hover
          accent: "#FFF5EE", // Seashell - warm neutral backgrounds
          "border-light": "#F5E5E0", // Subtle borders
          success: "#A8D5BA", // Progress indicators
          text: "#2C2C2C", // Dark gray - main body text
          bg: "#FFFFFF", // White background
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;