import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootPage from "./pages/RootPage";
import AboutPage from "./pages/common/AboutPage";
import HomePage from "./pages/common/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import AuthContextProvider from "./store/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServicesPage from "./pages/ServicesPage";
import ProtectedRoute from "./store/protection/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";
import Dashboad from "./pages/consultants/ConsultantDashboad";
import { Routes as AppRoutes } from "./utils/Routes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProtection from "./store/protection/AdminProtection";
import RedirectAuthenticated from "./store/protection/RedirectAuthenticated";
import Error404 from "./pages/auth/Error404";
import SettingsPage from "./pages/common/SettingsPage";

export default function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoutes.home} element={<RootPage />}>
            <Route index element={<HomePage />} />
            <Route path={AppRoutes.about} element={<AboutPage />} />
            <Route
              path={AppRoutes.login}
              element={<RedirectAuthenticated element={<LoginPage />} />}
            />
            <Route
              path={AppRoutes.signup}
              element={<RedirectAuthenticated element={<SignupPage />} />}
            />
            <Route
              path={AppRoutes.services}
              element={<ProtectedRoute element={<ServicesPage />} />}
            />
            <Route
              path={AppRoutes.consultantDashboard}
              element={<ProtectedRoute element={<Dashboad />} />}
            />
            <Route
              path={AppRoutes.adminDashboard}
              element={<AdminProtection element={<AdminDashboard />} />}
            />
            <Route
              path={AppRoutes.settings}
              element={<ProtectedRoute element={<SettingsPage />} />}
            />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthContextProvider>
  );
}
