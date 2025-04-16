export type SettingsTabs =
  | "Profile"
  | "General"
  | "Ratings & Reviews"
  | "Liked Consultants"
  | "Past Bookings";

export type Theme = "light" | "dark";

export type ContactPreference = "online" | "offline";

export type GeneralSettings = {
  country: string;
  contactPreference: ContactPreference;
};
