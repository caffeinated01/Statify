/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Noto Sans", "sans-serif"],
    },
    extend: {
      colors: {
        "bg-primary": "#121213",
        "bg-secondary": "#1b1a1b",
      },
    },
  },
  plugins: [],
};
