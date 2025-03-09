import { FieldValue, Timestamp } from "firebase/firestore";
import { Theme } from "../types/Settings";

export const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

export const formatTimestamp = (timestamp: Timestamp | FieldValue): string => {
  if (!timestamp) return "N/A";

  if (timestamp instanceof Timestamp) {
    const date = timestamp.toDate();
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString();
  }

  return "Pending";
};
