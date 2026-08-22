/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gem: {
          ruby: "#ff2a6d",
          sapphire: "#05d9e8",
          emerald: "#00f59b",
          amethyst: "#9d4edd",
          amber: "#ff9e00",
          dark: "#0b0f19",
          card: "#131b2e",
          cardHover: "#1c2642",
          border: "#243256",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 15px rgba(255, 42, 109, 0.3)" },
          "100%": { boxShadow: "0 0 25px rgba(5, 217, 232, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
