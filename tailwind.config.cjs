/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f97316",
        "primary-foreground": "#ffffff",
        accent: "#f97316",
        "accent-strong": "#ea580c",
        background: "#020617",
        foreground: "#e5e7eb",
        muted: "#020617",
      },
      borderRadius: {
        '2xl': '1rem',
      },
      padding: {
        '7': '1.75rem',
      },
    },
  },
  plugins: [],
};

