/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette
        "brand-surface": "#F3FBF7",
        "brand-pale": "#E6F6EF",
        "brand-primary": "#059669",
        "brand-primaryDark": "#047857",
        // Ink palette
        "ink-base": "#0b3b2e",
        "ink-muted": "rgba(11,59,46,0.65)",
      },
      borderColor: {
        "card-border": "#D1FAE5",
      },
      boxShadow: {
        card: "0 8px 20px rgba(16,185,129,0.08)",
      },
    },
  },
  plugins: [],
};
