import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";
import { Routes } from "../../utils/Routes";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/loading.json";
interface AdminProtectionProps {
  element: React.ReactElement;
}

export default function AdminProtection({ element }: AdminProtectionProps) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{
          minHeight: "calc(100vh - 80px)",
          maxHeight: "calc(100vh - 80px)",
        }}
      >
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          className="w-48 h-48 md:w-72 md:h-72"
        />
      </div>
    );
  }

  if (!user || user.type !== "admin") {
    return <Navigate to={Routes.login} />;
  }

  return element;
}
