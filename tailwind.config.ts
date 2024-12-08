import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], 
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          400: '#9CA3AF',
          800: '#1F2937',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
