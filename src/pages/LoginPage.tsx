import { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Routes } from "../utils/Routes";
import { Icons } from "../resources/Icons";
import PrimaryAuthButton from "../components/common/PrimaryAuthButton";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{
        minHeight: "calc(100vh - 80px)",
        maxHeight: "calc(100vh - 80px)",
      }}
    >
      <div className="w-full max-w-md p-8 rounded-xl bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.2)]">
        <h2 className=" text-3xl font-semibold text-center mb-6">
          Welcome Back
        </h2>

        <form className="flex flex-col gap-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-4 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-10 py-3 border border-gray-600 rounded-lg focus:outline-none "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-10 py-3 border border-gray-600 rounded-lg focus:outline-none "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-3 top-4 text-gray-400 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </div>
          </div>

          <PrimaryAuthButton text="Login" />

          <div className="flex justify-between text-sm mt-2">
            <Link to="#" className=" hover:text-[#ed2a4f]">
              Forgot password?
            </Link>
            <span>
              Don't have an account?{" "}
              <Link
                to={Routes.signup}
                className="text-[#ed2a4f] font-medium hover:underline"
              >
                Sign Up
              </Link>
            </span>
          </div>

          <div className="flex items-center ">
            <hr className="flex-grow border-t border-gray-500" />
            <span className="mx-2 text-gray-700">or</span>
            <hr className="flex-grow border-t border-gray-500" />
          </div>

          <div className="flex items-center justify-center">
            <img
              src={Icons.google}
              alt="google"
              className="w-10 h-10 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
