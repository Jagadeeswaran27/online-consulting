import { useContext, useState } from "react";
import { FcNext } from "react-icons/fc";
import { AuthContext } from "../../store/context/auth";
import { logout } from "../../core/services/AuthService";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../utils/Routes";
import { SettingsTabs } from "../../types/Settings";
import Profile from "../../components/settings/Profile";
import General from "../../components/settings/General";
import { Images } from "../../resources/Images";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabs>("Profile");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate(Routes.login);
  };

  const handleSelectTab = (tab: SettingsTabs) => {
    setActiveTab(tab);
  };

  return (
    <div
      className="flex flex-row relative"
      style={{
        minHeight: "calc(100vh - 81px)",
        maxHeight: "calc(100vh - 81px)",
      }}
    >
      {/* Sidebar - always visible on desktop, hidden on mobile (controlled by parent layout) */}
      <div
        className={`
          border-gray-500 border-r-2 pt-4 
          w-[250px] lg:w-[20%]
          hidden md:block
        `}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Settings</h2>
        </div>
        <div className="space-y-4">
          <div
            onClick={() => handleSelectTab("Profile")}
            className={`cursor-pointer px-4 pl-8 py-2 pb-4 border-b-2 border-gray-500 `}
          >
            <div className="flex gap-3 items-center">
              <img
                className="rounded-full object-cover object-top h-12 w-12 sm:h-16 sm:w-[92px]"
                src={user?.photoURL || Images.defaultAvatar}
                alt="User Profile"
                onError={(e) => {
                  e.currentTarget.src = Images.defaultAvatar;
                }}
              />
              <div>
                <p
                  className={`${activeTab === "Profile" && "text-primaryRed"}`}
                >
                  {user?.userName}
                </p>
                <p className="text-xs my-1">View Profile</p>
              </div>
              <FcNext className="mr-4 ml-auto" />
            </div>
          </div>
          <div
            onClick={() => handleSelectTab("General")}
            className={`cursor-pointer px-4 pl-8 py-1 hover:text-primaryRed ${
              activeTab === "General" && "text-primaryRed"
            }`}
          >
            General
          </div>
          <div
            onClick={() => handleSelectTab("Ratings & Reviews")}
            className={`cursor-pointer px-4 pl-8 py-1 hover:text-primaryRed ${
              activeTab === "Ratings & Reviews" && "text-primaryRed"
            }`}
          >
            Ratings & Reviews
          </div>
          <div
            onClick={() => handleSelectTab("Liked Consultants")}
            className={`cursor-pointer px-4 pl-8 py-1 hover:text-primaryRed ${
              activeTab === "Liked Consultants" && "text-primaryRed"
            }`}
          >
            Liked Consultants
          </div>
          <div
            onClick={() => handleSelectTab("Bookings")}
            className={`cursor-pointer px-4 pl-8 py-1 hover:text-primaryRed ${
              activeTab === "Bookings" && "text-primaryRed"
            }`}
          >
            Bookings
          </div>
          <div
            onClick={handleLogout}
            className="cursor-pointer px-4 pl-8 py-1 hover:text-primaryRed"
          >
            Logout
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Mobile-only settings tabs */}
        <div className="md:hidden mb-6">
          <h1 className="text-2xl font-semibold mb-4">{activeTab}</h1>
          <div className="flex overflow-x-auto space-x-4 pb-3 hide-scrollbar">
            <button
              onClick={() => handleSelectTab("Profile")}
              className={`whitespace-nowrap px-3 py-1 rounded-full ${
                activeTab === "Profile"
                  ? "bg-primaryRed text-white"
                  : "bg-gray-200 dark:bg-darkThemeSecondary"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => handleSelectTab("General")}
              className={`whitespace-nowrap px-3 py-1 rounded-full ${
                activeTab === "General"
                  ? "bg-primaryRed text-white"
                  : "bg-gray-200 dark:bg-darkThemeSecondary"
              }`}
            >
              General
            </button>
            <button
              onClick={() => handleSelectTab("Ratings & Reviews")}
              className={`whitespace-nowrap px-3 py-1 rounded-full ${
                activeTab === "Ratings & Reviews"
                  ? "bg-primaryRed text-white"
                  : "bg-gray-200 dark:bg-darkThemeSecondary"
              }`}
            >
              Ratings & Reviews
            </button>
            <button
              onClick={() => handleSelectTab("Liked Consultants")}
              className={`whitespace-nowrap px-3 py-1 rounded-full ${
                activeTab === "Liked Consultants"
                  ? "bg-primaryRed text-white"
                  : "bg-gray-200 dark:bg-darkThemeSecondary"
              }`}
            >
              Liked Consultants
            </button>
            <button
              onClick={() => handleSelectTab("Bookings")}
              className={`whitespace-nowrap px-3 py-1 rounded-full ${
                activeTab === "Bookings"
                  ? "bg-primaryRed text-white"
                  : "bg-gray-200 dark:bg-darkThemeSecondary"
              }`}
            >
              Bookings
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div></div>
        <h1 className="text-2xl font-semibold hidden md:block mb-6">
          {activeTab}
        </h1>
        {activeTab === "Profile" && <Profile user={user!} />}
        {activeTab === "General" && <General />}
        {activeTab === "Ratings & Reviews" && (
          <div>Ratings & Reviews Content</div>
        )}
        {activeTab === "Liked Consultants" && (
          <div>Liked Consultants Content</div>
        )}
        {activeTab === "Bookings" && <div>Bookings Content</div>}
      </div>
    </div>
  );
}
