import { NavLink, Outlet } from "react-router-dom";
import { FiSettings, FiUsers, FiFileText } from "react-icons/fi";

export default function AdminDashboard() {
  return (
    <div
      className="flex"
      style={{
        minHeight: "calc(100vh - 81px)",
        maxHeight: "calc(100vh - 81px)",
      }}
    >
      {/* Sidebar */}
      <div className="border-gray-500 border-r-2 w-[20%]">
        <div className="pl-8 p-6 border-b-2 border-gray-500">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </div>
        <nav className="mt-6">
          <NavLink
            to="/admin-dashboard/services"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 transition-colors duration-200 ${
                isActive ? " text-primaryRed " : "hover:text-primaryRed"
              }`
            }
          >
            <FiSettings className="w-5 h-5" />
            <span className="ml-3">Manage Services</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/consultants"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 transition-colors duration-200 ${
                isActive ? " text-primaryRed " : "hover:text-primaryRed"
              }`
            }
          >
            <FiUsers className="w-5 h-5" />
            <span className="ml-3">Manage Consultants</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/applications"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 transition-colors duration-200 ${
                isActive ? " text-primaryRed " : "hover:text-primaryRed"
              }`
            }
          >
            <FiFileText className="w-5 h-5" />
            <span className="ml-3">Pending Applications</span>
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-8 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
