/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      colors: {
        primaryRed: "#ed2a4f",
        bannerDark: "#aea7bf",
        bannerLight: "#ccc7d6",
      },
    },
  },
  plugins: [],
};
