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
        formInput: "0px 1px 3px rgba(0,0,0,0.05)",
        elevated: "0px 8px 24px rgba(0,0,0,0.12)",
        subtle: "0px 1px 2px rgba(0,0,0,0.04)",
        highlight: "0px 0px 0px 3px rgba(237,42,79,0.15)",
        callControls: "0px 4px 16px rgba(0,0,0,0.15)",
        videoPanel: "0px 8px 32px rgba(0,0,0,0.18)",
      },
      colors: {
        primaryRed: "#ed2a4f",
        secondaryRed: "#c32140",
        softRed: "#f8d7de",
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
        formBorder: {
          DEFAULT: "#e5e7eb", // gray-200
          dark: "#374151", // gray-700
          focus: "#ed2a4f", // primaryRed
        },
        formBg: {
          DEFAULT: "#ffffff",
          dark: "#262626",
          selected: "#f9fafb",
          selectedDark: "#1f1f1f",
        },
        // New gradient colors
        gradientFrom: {
          DEFAULT: "#ed2a4f",
          dark: "#c32140",
        },
        gradientTo: {
          DEFAULT: "#f05d7b",
          dark: "#a41d36",
        },
        callControl: {
          DEFAULT: "#f3f4f6",
          dark: "#333333",
          hover: "#e5e7eb",
          darkHover: "#404040",
          active: "#ed2a4f",
          activeHover: "#c32140",
        },
        videoOverlay: "rgba(0, 0, 0, 0.5)",
        callBackground: {
          DEFAULT: "#f9fafb",
          dark: "#171717",
        },
      },
      borderWidth: {
        3: "3px",
      },
      backgroundImage: {
        "profile-gradient": "linear-gradient(135deg, #ed2a4f 0%, #f05d7b 100%)",
        "dark-gradient": "linear-gradient(135deg, #262626 0%, #1a1a1a 100%)",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spin: "spin 1s linear infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.5,
          },
        },
        spin: {
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
