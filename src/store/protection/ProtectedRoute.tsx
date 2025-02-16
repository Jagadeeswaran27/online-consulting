import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";
import { Routes } from "../../utils/Routes";
import Lottie from "lottie-react";
import { Animations } from "../../resources/Animations";
interface ProtectedRouteProps {
  element: React.ReactElement;
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {
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
          animationData={Animations.loadingAnimation}
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
