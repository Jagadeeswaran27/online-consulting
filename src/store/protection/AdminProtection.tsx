import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";
import { Routes } from "../../utils/Routes";
import NProgress from "nprogress";
interface AdminProtectionProps {
  element: React.ReactElement;
}

export default function AdminProtection({ element }: AdminProtectionProps) {
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

  if (!user || user.type !== "admin") {
    return <Navigate to={Routes.login} />;
  }

  return element;
}
