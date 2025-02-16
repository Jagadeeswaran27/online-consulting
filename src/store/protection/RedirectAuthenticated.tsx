import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";
import { Routes } from "../../utils/Routes";
interface RedirectAuthenticatedProps {
  element: React.ReactElement;
}

export default function RedirectAuthenticated({
  element,
}: RedirectAuthenticatedProps) {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Navigate to={Routes.home} />;
  }
  return element;
}
