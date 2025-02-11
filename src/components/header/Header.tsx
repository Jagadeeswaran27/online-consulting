import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../../resources/Icons";
import { Routes } from "../../utils/Routes";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/context/auth";
import { MdPerson, MdMenu, MdClose } from "react-icons/md";
import { logout } from "../../core/services/AuthService";

export default function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(Routes.login);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center px-10 sticky top-0 z-10 bg-white shadow-md">
      <div className="flex gap-10 font-semibold items-center">
        <div className="w-12 h-20 max-md:hidden">
          <img src={Icons.logo2} alt="logo" className="w-full h-full" />
        </div>
        <div className="md:hidden flex items-center w-12 h-20">
          <button onClick={toggleMenu}>
            {!isMenuOpen && <MdMenu size={30} />}
          </button>
        </div>
        <nav className="hidden md:flex gap-10">
          <p className="hover:text-primaryRed cursor-pointer transition-all duration-300">
            <Link to={Routes.home}>Home</Link>
          </p>
          <p className="hover:text-primaryRed cursor-pointer transition-all duration-300">
            Services
          </p>
          <p className="hover:text-primaryRed cursor-pointer transition-all duration-300">
            <Link to={Routes.about}>About Us</Link>
          </p>
          <p className="hover:text-primaryRed cursor-pointer transition-all duration-300">
            Contact Us
          </p>
        </nav>
      </div>
      <div className="hidden md:flex gap-10 items-center">
        {user ? (
          <>
            <MdPerson size={30} />
            <p className="text-lg font-semibold">Hello, {user.userName}</p>
            <button
              className="bg-primaryRed text-white py-2 px-5 font-semibold hover:bg-black hover:text-white transition-all duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to={Routes.login}
              className="bg-primaryRed text-white py-2 px-5 font-semibold hover:bg-black hover:text-white transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to={Routes.signup}
              className="text-primaryRed border-primaryRed border-2 py-[6px] px-3 font-semibold hover:bg-black hover:border-black hover:text-white transition-all duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white shadow-lg z-20 px-5">
          <div className="flex justify-between items-center mb-5">
            <div className="w-12 pt-5">
              <img src={Icons.logo2} alt="logo" className="w-full h-full" />
            </div>
            <button onClick={toggleMenu}>
              <MdClose size={30} />
            </button>
          </div>
          <nav className="flex flex-col gap-5">
            <p className="hover:text-primaryRed cursor-pointer transition-all duration-300">
              <Link to={Routes.home} onClick={toggleMenu}>
                Home
              </Link>
            </p>
            <p className="hover:text-primaryRed cursor-pointer transition-all duration-300">
              Services
            </p>
            <p className="hover:text-primaryRed cursor-pointer transition-all duration-300">
              <Link to={Routes.about} onClick={toggleMenu}>
                About Us
              </Link>
            </p>
            <p className="hover:text-primaryRed cursor-pointer transition-all duration-300">
              Contact Us
            </p>
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <MdPerson size={30} />
                  <p className="text-lg font-semibold">
                    Hello, {user.userName}
                  </p>
                </div>
                <button
                  className="bg-primaryRed text-white py-2 px-5 font-semibold hover:bg-black hover:text-white transition-all duration-300"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to={Routes.login}
                  className="bg-primaryRed text-white py-2 px-5 font-semibold hover:bg-black hover:text-white transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to={Routes.signup}
                  className="text-primaryRed border-primaryRed border-2 py-[6px] px-3 font-semibold hover:bg-black hover:border-black hover:text-white transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
