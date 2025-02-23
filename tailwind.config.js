/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        customLight: "0px 2px 10px rgba(0,0,0,0.2)",
      },
      colors: {
        primaryRed: "#ed2a4f",
        secondaryRed: "#c32140",
        bannerDark: "#aea7bf",
        bannerLight: "#ccc7d6",
        darkTheme: "#171717",
        darkThemeSecondary: "#262626",
        darkThemeCard: "#1F1F1F",
        toastDark: "#262626",
      },
    },
  },
  plugins: [],
};
