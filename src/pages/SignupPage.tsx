import { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "../utils/Routes";
import PrimaryAuthButton from "../components/common/PrimaryAuthButton";
import { Icons } from "../resources/Icons";
import { googleLogin, signup } from "../core/services/AuthService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!email.includes("@")) newErrors.email = "Invalid email address";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";
    if (!password) newErrors.password = "Password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleGoogleSignup = async () => {
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

  const handleSignup = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTimeout(() => setErrors({}), 3000);
      return;
    }
    setIsLoading(true);
    const isSuccess = await signup(email, password, username);
    if (isSuccess) {
      toast.success("Check Your Email for Verification", {
        position: "bottom-right",
      });
      navigate(Routes.login);
    } else {
      toast.error("Signup failed", {
        position: "bottom-right",
      });
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 rounded-xl bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.2)]">
        <h2 className=" text-3xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <form className="flex flex-col gap-4" onKeyDown={handleKeyPress}>
          <div className="relative">
            <FaUser className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              className="w-full px-10 py-3 border border-gray-600 rounded-lg focus:outline-none "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
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

          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-10 py-3 border border-gray-600 rounded-lg focus:outline-none "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div
              className="absolute right-3 top-4 text-gray-400 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <FaEyeSlash size={20} />
              ) : (
                <FaEye size={20} />
              )}
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <PrimaryAuthButton
            text="Sign Up"
            onClick={handleSignup}
            isLoading={isLoading}
          />

          <div className="flex justify-end text-sm mt-2">
            <span>
              Already have an account?{" "}
              <Link
                to={Routes.login}
                className="text-[#ed2a4f] font-medium hover:underline"
              >
                Login
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
              onClick={handleGoogleSignup}
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
