import { useState, useCallback } from "react";
import Theme from "./Theme";
import PrimaryAuthButton from "../common/PrimaryAuthButton";

export default function General() {
  const [notificationStatus, setNotificationStatus] = useState(
    Notification.permission
  );

  const requestNotifications = useCallback(async () => {
    try {
      const permission = await Notification.requestPermission();
      setNotificationStatus(permission);
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  }, []);

  return (
    <div className="space-y-8">
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
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                notificationStatus === "granted"
                  ? "bg-green-500"
                  : notificationStatus === "denied"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            />
            <span className="text-sm font-medium">
              {notificationStatus === "granted"
                ? "Notifications are enabled"
                : notificationStatus === "denied"
                ? "Notifications are blocked"
                : "Notifications not set up"}
            </span>
          </div>

          {notificationStatus !== "granted" &&
            notificationStatus !== "denied" && (
              <div className="w-[230px]">
                <PrimaryAuthButton
                  text="Enable Notifications"
                  onClick={requestNotifications}
                />
              </div>
            )}

          <p className="text-sm text-gray-500">
            {notificationStatus === "denied"
              ? "Please enable notifications in your browser settings to receive updates."
              : "Enable notifications to receive important updates and messages."}
          </p>
        </div>
      </div>

      {/* Other Settings */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Other Settings</h2>
        {/* Other settings can be added here */}
      </div>
    </div>
  );
}
