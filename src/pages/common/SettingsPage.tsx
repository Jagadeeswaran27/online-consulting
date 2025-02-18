import { useContext, useState } from "react";
import { FcNext } from "react-icons/fc";
import { AuthContext } from "../../store/context/auth";
import { logout } from "../../core/services/AuthService";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../utils/Routes";
import { SettingsTabs } from "../../types/Settings";
import Profile from "../../components/settings/Profile";
import General from "../../components/settings/General";

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

  console.log(user);

  return (
    <div
      className="flex "
      style={{
        minHeight: "calc(100vh - 80px)",
        maxHeight: "calc(100vh - 80px)",
      }}
    >
      <div className=" border-gray-500 border-r-2 pt-4 w-[20%]">
        <div className="p-4">
          <h2 className="text-xl font-bold">Settings</h2>
        </div>
        <div className="space-y-4">
          <div
            onClick={() => handleSelectTab("Profile")}
            className={`cursor-pointer pl-8 py-2 pb-4 border-b-2 border-gray-500 `}
          >
            <div className="flex gap-3 items-center">
              <img
                className="rounded-full h-16 w-16"
                src={user!.photoURL}
                alt="User Profile"
              />
              <div>
                <p
                  className={`${activeTab === "Profile" && "text-primaryRed"}`}
                >
                  {user?.userName}
                </p>
                <p className="text-xs">View Profile</p>
              </div>
              <FcNext className="text-primaryRed" />
            </div>
          </div>
          <div
            onClick={() => handleSelectTab("General")}
            className={`cursor-pointer pl-8 py-1 hover:text-primaryRed ${
              activeTab === "General" && "text-primaryRed"
            }`}
          >
            General
          </div>
          <div
            onClick={() => handleSelectTab("Ratings & Reviews")}
            className={`cursor-pointer pl-8 py-1 hover:text-primaryRed ${
              activeTab === "Ratings & Reviews" && "text-primaryRed"
            }`}
          >
            Ratings & Reviews
          </div>
          <div
            onClick={() => handleSelectTab("Liked Consultants")}
            className={`cursor-pointer pl-8 py-1 hover:text-primaryRed ${
              activeTab === "Liked Consultants" && "text-primaryRed"
            }`}
          >
            Liked Consultants
          </div>
          <div
            onClick={() => handleSelectTab("Bookings")}
            className={`cursor-pointer pl-8 py-1 hover:text-primaryRed ${
              activeTab === "Bookings" && "text-primaryRed"
            }`}
          >
            Bookings
          </div>
          <div
            onClick={handleLogout}
            className="cursor-pointer pl-8 py-1 hover:text-primaryRed"
          >
            Logout
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold">{activeTab}</h1>
        <div className="mt-4">
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
    </div>
  );
}
