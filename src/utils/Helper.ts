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

export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 10; hour <= 17; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 17 && minute === 30) continue;

      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      const time = `${formattedHour}:${formattedMinute}`;
      slots.push(time);
    }
  }
  return slots;
};

export const getTimeFromTimestamp = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export function generateCallId(length = 6) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}

export const formatBookingDate = (timestamp: Timestamp) => {
  if (!timestamp) return "N/A";
  const date = timestamp.toDate();
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const formatBookingTime = (timestamp: Timestamp) => {
  if (!timestamp) return "N/A";
  const date = timestamp.toDate();
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

export const isUpcoming = (timestamp: Timestamp) => {
  if (!timestamp) return false;
  const now = new Date();
  const timestampDate = timestamp.toDate();
  const adjustedTimestamp = new Date(timestampDate.getTime() + 30 * 60 * 1000);
  return adjustedTimestamp > now;
};
