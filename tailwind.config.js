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
        profileCard: "0px 4px 12px rgba(0,0,0,0.08)",
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
        textHeading: "#1f2937",
        textBody: {
          DEFAULT: "#4b5563", // gray-600
          dark: "#d1d5db", // gray-300 for dark mode
        },
        textMuted: {
          DEFAULT: "#6b7280", // gray-500
          dark: "#9ca3af", // gray-400 for dark mode
        },
        textStar: "#eab308", // yellow-500
        cardBg: {
          DEFAULT: "#f9fafb", // gray-50
          dark: "#1F1F1F",
        },
        reviewCard: {
          DEFAULT: "#f3f4f6", // gray-100
          dark: "#262626",
        },
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
