import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../../resources/Icons";
import { Routes } from "../../utils/Routes";
import { useContext } from "react";
import { AuthContext } from "../../store/context/auth";
import { MdPerson } from "react-icons/md";
import { logout } from "../../core/services/AuthService";
export default function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate(Routes.login);
  };
  return (
    <header className="flex justify-between items-center px-10 sticky top-0 z-10 bg-white shadow-md">
      <div className="flex gap-10 font-semibold  items-center">
        <div className="w-12 h-20">
          <img src={Icons.logo2} alt="logo" className="w-full h-full" />
        </div>
        <p className="hover:text-primaryRed cursor-pointer transition-all duration-300 ">
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
      </div>
      {user && (
        <div className="flex gap-3 items-center">
          <MdPerson size={30} />
          <p className="text-lg font-semibold">Hello, {user.userName}</p>
          <button
            className="bg-primaryRed text-white py-2 px-5 font-semibold hover:bg-black hover:text-white transition-all duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

      {!user && (
        <div className="flex gap-10">
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
        </div>
      )}
    </header>
  );
}
