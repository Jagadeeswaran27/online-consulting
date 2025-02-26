import { NavLink, Outlet } from "react-router-dom";
import { FiSettings, FiUsers, FiFileText } from "react-icons/fi";
import { useState } from "react";

export default function AdminDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className="flex flex-col md:flex-row relative"
      style={{
        minHeight: "calc(100vh - 81px)",
        maxHeight: "calc(100vh - 81px)",
      }}
    >
      {/* Mobile Header */}

      {/* Sidebar - hidden on mobile, visible on medium screens and up */}
      <div
        className={`
          border-gray-500 border-r-2 
          w-full md:w-[250px] lg:w-[20%]
          ${
            mobileMenuOpen
              ? "block absolute z-10 bg-white dark:bg-darkThemePrimary h-full"
              : "hidden"
          } md:block
        `}
      >
        <div className="pl-8 p-6 border-b-2 border-gray-500">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </div>
        <nav className="mt-6">
          <NavLink
            to="/admin-dashboard/services"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 transition-colors duration-200 ${
                isActive ? "text-primaryRed" : "hover:text-primaryRed"
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            <FiSettings className="w-5 h-5" />
            <span className="ml-3">Manage Services</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/consultants"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 transition-colors duration-200 ${
                isActive ? "text-primaryRed" : "hover:text-primaryRed"
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            <FiUsers className="w-5 h-5" />
            <span className="ml-3">Manage Consultants</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/applications"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 transition-colors duration-200 ${
                isActive ? "text-primaryRed" : "hover:text-primaryRed"
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            <FiFileText className="w-5 h-5" />
            <span className="ml-3">Pending Applications</span>
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Mobile tabs navigation */}
        <div className="md:hidden overflow-x-auto hide-scrollbar px-4 py-4 border-b border-gray-500">
          <div className="flex space-x-4">
            <NavLink
              to="/admin-dashboard/services"
              className={({ isActive }) =>
                `whitespace-nowrap px-3 py-1 rounded-full ${
                  isActive
                    ? "bg-primaryRed text-white"
                    : "bg-gray-200 dark:bg-darkThemeSecondary"
                }`
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/admin-dashboard/consultants"
              className={({ isActive }) =>
                `whitespace-nowrap px-3 py-1 rounded-full ${
                  isActive
                    ? "bg-primaryRed text-white"
                    : "bg-gray-200 dark:bg-darkThemeSecondary"
                }`
              }
            >
              Consultants
            </NavLink>
            <NavLink
              to="/admin-dashboard/applications"
              className={({ isActive }) =>
                `whitespace-nowrap px-3 py-1 rounded-full ${
                  isActive
                    ? "bg-primaryRed text-white"
                    : "bg-gray-200 dark:bg-darkThemeSecondary"
                }`
              }
            >
              Applications
            </NavLink>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-4 md:py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
