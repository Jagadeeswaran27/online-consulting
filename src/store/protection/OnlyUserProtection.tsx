import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import NProgress from "nprogress";
import { Navigate } from "react-router-dom";
import { Routes } from "../../utils/Routes";

// Configure NProgress
NProgress.configure({
  minimum: 0.3,
  trickleSpeed: 200,
  showSpinner: false,
});

interface OnlyUserProtectionProps {
  element: React.ReactElement;
}

function OnlyUserProtection({ element }: OnlyUserProtectionProps) {
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

  if (!user || user.type !== "user") {
    return <Navigate to={Routes.home} />;
  }

  return element;
}

export default OnlyUserProtection;
