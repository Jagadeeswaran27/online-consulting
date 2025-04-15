import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import NProgress from "nprogress";
import { Navigate } from "react-router-dom";
import { Routes } from "../../utils/Routes";

interface ConsultantProtectionProps {
  element: React.ReactElement;
}

function ConsultantProtection({ element }: ConsultantProtectionProps) {
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

  if (!user || user.type !== "consultant") {
    return <Navigate to={Routes.home} />;
  }

  return element;
}

export default ConsultantProtection;
