import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";
import { Routes } from "../../utils/Routes";
import NProgress from "nprogress";

// Configure NProgress
NProgress.configure({
  minimum: 0.3,
  trickleSpeed: 200,
  showSpinner: false,
});

interface ProtectedRouteProps {
  element: React.ReactElement;
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.set(0.9);
      setTimeout(() => {
        NProgress.done();
      }, 200);
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to={Routes.login} />;
  }

  return element;
}
