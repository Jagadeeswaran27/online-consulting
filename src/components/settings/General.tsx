import { useState } from "react";
import Theme from "./Theme";

export default function General() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleNotificationsChange = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <div className="space-y-8 ">
      {/* Theme Preferences */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Theme Preferences</h2>
        <div className="flex items-center gap-4">
          <label
            htmlFor="theme"
            className="text-sm font-semibold text-gray-500"
          >
            Select Theme
          </label>
          <Theme />
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <div className="flex items-center gap-4">
          <label
            htmlFor="notifications"
            className="text-sm font-semibold text-gray-500"
          >
            Enable Notifications
          </label>
          <input
            type="checkbox"
            id="notifications"
            checked={notificationsEnabled}
            onChange={handleNotificationsChange}
            className="h-5 w-5 rounded-lg border-gray-300 focus:ring-primaryRed"
          />
        </div>
      </div>

      {/* Other Settings */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Other Settings</h2>
        //Other Settings
      </div>
    </div>
  );
}
