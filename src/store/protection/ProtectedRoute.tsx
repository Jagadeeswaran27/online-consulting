import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";
import { Routes } from "../../utils/Routes";
interface ProtectedRouteProps {
  element: React.ReactElement;
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to={Routes.login} />;
  }

  return element;
}
