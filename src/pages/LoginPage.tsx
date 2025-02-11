import { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "../utils/Routes";
import { Icons } from "../resources/Icons";
import PrimaryAuthButton from "../components/common/PrimaryAuthButton";
import { googleLogin, login } from "../core/services/AuthService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!email) newErrors.email = "Email is required";
    if (!email.includes("@")) newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const success = await googleLogin();
    if (success) {
      toast.success("Login successful", {
        position: "bottom-right",
      });
      navigate(Routes.home);
    }
    setIsLoading(false);
  };

  const handleLogin = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTimeout(() => setErrors({}), 3000);
      return;
    }
    setIsLoading(true);
    const success = await login(email, password);
    if (success && success?.user.emailVerified) {
      toast.success("Login successful", {
        position: "bottom-right",
      });
      navigate(Routes.home);
    } else if (success && !success?.user.emailVerified) {
      toast.error("Please verify your email", {
        position: "bottom-right",
      });
    } else {
      toast.error("Invalid Credentials", {
        position: "bottom-right",
      });
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
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

        <form className="flex flex-col gap-4" onKeyDown={handleKeyPress}>
          <div className="relative">
            <FaUser className="absolute left-3 top-4 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-10 py-3 border border-gray-600 rounded-lg focus:outline-none "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <PrimaryAuthButton
            text="Login"
            isLoading={isLoading}
            onClick={handleLogin}
          />

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
              onClick={handleGoogleLogin}
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
