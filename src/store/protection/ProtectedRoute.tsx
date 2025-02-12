import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";
import { Routes } from "../../utils/Routes";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/loading.json";
interface ProtectedRouteProps {
  element: React.ReactElement;
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { user, loading } = useContext(AuthContext);
  const [delay, setDelay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setDelay(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || delay) {
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

  if (!user) {
    return <Navigate to={Routes.login} />;
  }

  return element;
}
