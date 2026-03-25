/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 50px rgba(52, 81, 255, 0.25)",
        glass: "0 18px 48px rgba(2, 6, 23, 0.16)",
      },
      backgroundSize: {
        200: "200% 200%",
      },
      animation: {
        marquee: "marquee 26s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
