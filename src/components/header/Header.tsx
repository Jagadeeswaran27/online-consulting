import { Link, useNavigate, useLocation } from "react-router-dom";
import { Icons } from "../../resources/Icons";
import { Routes } from "../../utils/Routes";
import { useContext, useState, useEffect } from "react";
import { MdPerson, MdMenu, MdClose, MdLogout } from "react-icons/md";
import { logout } from "../../core/services/AuthService";
import { AuthContext } from "../../store/context/auth";

export default function Header() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes or when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-toggle")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [location.pathname, isMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate(Routes.login);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center px-4 sm:px-6 md:px-10 sticky top-0 z-10 dark:bg-darkTheme dark:border-gray-500 dark:border-b-[1px] bg-white shadow-md h-20">
      <div className="flex gap-4 sm:gap-6 md:gap-10 font-semibold items-center">
        <div className="w-10 h-16 sm:w-12 sm:h-20 flex items-center">
          <img src={Icons.logo2} alt="logo" className="w-full h-auto" />
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="menu-toggle p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
          >
            {!isMenuOpen && (
              <MdMenu size={24} className="text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
        <nav className="hidden md:flex gap-6 lg:gap-10">
          <Link
            to={Routes.home}
            className="hover:text-primaryRed cursor-pointer transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to={Routes.about}
            className="hover:text-primaryRed cursor-pointer transition-all duration-300"
          >
            About Us
          </Link>
          <Link
            to={Routes.services}
            className="hover:text-primaryRed cursor-pointer transition-all duration-300"
          >
            Services
          </Link>
          <p className="hover:text-primaryRed cursor-pointer transition-all duration-300">
            Our Consultants
          </p>
        </nav>
      </div>
      {!loading && (
        <div className="hidden md:flex gap-4 lg:gap-6 items-center">
          {user ? (
            <>
              <div className="flex items-center">
                <MdPerson
                  size={24}
                  className="text-gray-700 dark:text-gray-300"
                />
                <p className="text-base lg:text-lg ml-2 font-semibold truncate max-w-[120px] lg:max-w-full">
                  {user.type === "admin"
                    ? "Hello, Admin"
                    : "Hello, " + user.userName}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-primaryRed hover:underline transition-all duration-300"
              >
                <MdLogout size={20} className="mr-1" /> Logout
              </button>
              {location.pathname !== Routes.settings && (
                <Link to={Routes.settings} className="ml-2">
                  <img
                    src={Icons.settings}
                    alt="settings"
                    className="w-6 h-6 dark:invert hover:rotate-90 transition-all duration-500"
                  />
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                to={Routes.login}
                className="bg-primaryRed text-white py-1.5 px-3 lg:py-2 lg:px-5 font-semibold hover:bg-secondaryRed hover:text-white transition-all duration-300 text-sm lg:text-base rounded-sm"
              >
                Login
              </Link>
              <Link
                to={Routes.signup}
                className="text-primaryRed border-primaryRed border-2 py-[5px] px-2 lg:py-[6px] lg:px-4 font-semibold hover:bg-secondaryRed hover:border-secondaryRed hover:text-white transition-all duration-300 text-sm lg:text-base rounded-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}

      {/* Mobile Menu with transition */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-darkTheme shadow-lg z-20 transition-transform duration-300 mobile-menu ${
          isMenuOpen ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center px-6 py-2 border-b dark:border-gray-700">
            <div className="w-10 h-16">
              <img
                src={Icons.logo2}
                alt="logo"
                className="w-full h-full object-contain"
              />
            </div>
            <button
              onClick={toggleMenu}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
            >
              <MdClose size={24} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          <nav className="flex flex-col px-6 py-8 gap-5">
            <Link
              to={Routes.home}
              onClick={toggleMenu}
              className="text-lg hover:text-primaryRed pb-1  transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to={Routes.services}
              onClick={toggleMenu}
              className="text-lg hover:text-primaryRed pb-1  transition-all duration-300"
            >
              Services
            </Link>
            <Link
              to={Routes.about}
              onClick={toggleMenu}
              className="text-lg hover:text-primaryRed pb-1  transition-all duration-300"
            >
              About Us
            </Link>
            <Link
              to="#"
              onClick={toggleMenu}
              className="text-lg hover:text-primaryRed pb-1  transition-all duration-300"
            >
              Our Consultants
            </Link>
            <Link
              to="#"
              onClick={toggleMenu}
              className="text-lg hover:text-primaryRed pb-1  transition-all duration-300"
            >
              Contact Us
            </Link>
          </nav>

          <div className="mt-auto px-6 py-6 border-t dark:border-gray-700">
            {user ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <MdPerson
                    size={24}
                    className="text-gray-700 dark:text-gray-300"
                  />
                  <p className="text-lg font-semibold">
                    {user.type === "admin"
                      ? "Hello, Admin"
                      : "Hello, " + user.userName}
                  </p>
                </div>
                <div className="flex gap-3">
                  {location.pathname !== Routes.settings && (
                    <Link
                      to={Routes.settings}
                      onClick={toggleMenu}
                      className="flex-1 bg-darkThemeSecondary dark:bg-darkThemeSecondary text-white py-2 px-5 font-semibold rounded-md text-center"
                    >
                      Settings
                    </Link>
                  )}
                  <button
                    className="flex-1 bg-primaryRed text-white py-2 px-5 font-semibold rounded-md hover:bg-secondaryRed transition-all duration-300"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to={Routes.login}
                  className="bg-primaryRed text-white py-2 px-5 font-semibold rounded-md text-center hover:bg-secondaryRed transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to={Routes.signup}
                  className="text-primaryRed border-primaryRed border-2 py-2 px-5 font-semibold rounded-md text-center hover:bg-secondaryRed hover:border-secondaryRed hover:text-white transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
