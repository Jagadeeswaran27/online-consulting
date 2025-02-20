import { useState, useCallback, useEffect } from "react";
import Theme from "./Theme";
import PrimaryAuthButton from "../common/PrimaryAuthButton";
import Switch from "../common/Switch";
import CountrySelect from "../common/CountrySelect";
import { ContactPreference, GeneralSettings } from "../../types/Settings";
import {
  changeContactPreference,
  changeCountry,
  fetchUserGeneralSettings,
} from "../../core/services/SettingsServices";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

export default function General() {
  const [notificationStatus, setNotificationStatus] = useState(
    Notification.permission
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const [generalSettings, setGeneralSettings] =
    useState<GeneralSettings | null>();
  const [contactMode, setContactMode] = useState<ContactPreference>(
    generalSettings?.contactPreference || "online"
  );
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    generalSettings?.country || null
  );

  useEffect(() => {
    const fetchGeneralSettings = async () => {
      const settings = await fetchUserGeneralSettings();
      setGeneralSettings(settings);
      setContactMode(settings?.contactPreference || "online");
      setSelectedCountryCode(settings?.country || null);
    };
    fetchGeneralSettings();
  }, []);

  const requestNotifications = useCallback(async () => {
    try {
      const permission = await Notification.requestPermission();
      setNotificationStatus(permission);
    } catch (error) {
      console.error("Error requesting notifications:", error);
    }
  }, []);

  const handleDownloadData = async () => {
    setIsDownloading(true);
    // try {
    //   const db = getFirestore();
    //   const userDataQuery = query(
    //     collection(db, "userData"),
    //     where("userId", "==", user.uid)
    //   );
    //   const querySnapshot = await getDocs(userDataQuery);
    //   const userData = {};
    //   querySnapshot.forEach((doc) => {
    //     userData[doc.id] = doc.data();
    //   });
    //   // Create and download file
    //   const dataStr = JSON.stringify(userData);
    //   const dataBlob = new Blob([dataStr], { type: "application/json" });
    //   const url = URL.createObjectURL(dataBlob);
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.download = `my-data-${new Date().toISOString()}.json`;
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    //   URL.revokeObjectURL(url);
    // } catch (error) {
    //   console.error("Error downloading data:", error);
    // } finally {
    // }
    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };

  const handleChangeCountry = async () => {
    const success = await changeCountry(selectedCountryCode!);
    if (success) {
      toast.success("Country changed successfully", {
        position: "bottom-right",
      });
    } else {
      toast.error("Error changing country", {
        position: "bottom-right",
      });
    }
  };

  const handleChangeContactMode = async (contactMode: ContactPreference) => {
    setContactMode(contactMode);
    const success = await changeContactPreference(contactMode);
    if (success) {
      setContactMode(contactMode);
      toast.success("Contact mode updated successfully", {
        position: "bottom-right",
      });
    } else {
      toast.error("Failed to update contact mode", {
        position: "bottom-right",
      });
      setContactMode((prev) => prev);
    }
  };

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

      {/* Country Selection */}
      {generalSettings ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-gray-100">
            Location Settings
          </h2>
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Your Country
            </label>
            <CountrySelect
              onSave={handleChangeCountry}
              value={selectedCountryCode}
              onChange={setSelectedCountryCode}
            />
          </div>
        </div>
      ) : (
        <FaSpinner className="animate-spin" />
      )}

      {/* Contact Mode Preference */}
      {generalSettings && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Contact Preference</h2>
          <div className="bg-white dark:bg-darkThemeCard rounded-lg p-4 border border-gray-200 dark:border-darkThemeSecondary max-w-[400px]">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-8 ">
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Availability Mode
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-bannerDark">
                    This will determine how you can be contacted by consultants.
                  </p>
                </div>
                <Switch
                  checked={contactMode === "online"}
                  onChange={(checked) =>
                    handleChangeContactMode(checked ? "online" : "offline")
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    contactMode === "online" ? "bg-primaryRed" : "bg-gray-400"
                  }`}
                />
                <span className="text-sm font-medium dark:text-gray-300">
                  {contactMode === "online" ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Data */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Data</h2>
        <div className="max-w-md">
          <p className="text-sm text-gray-500 mb-4">
            Download a copy of your personal data in JSON format.
          </p>
          <div className="w-[230px]">
            <PrimaryAuthButton
              text={"Download"}
              isLoading={isDownloading}
              onClick={handleDownloadData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
