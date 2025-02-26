import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RootPage from "./pages/RootPage";
import AboutPage from "./pages/common/AboutPage";
import HomePage from "./pages/common/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import AuthContextProvider from "./store/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServicesPage from "./pages/common/ServicesPage";
import ProtectedRoute from "./store/protection/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";
import Dashboad from "./pages/consultants/ConsultantDashboad";
import { AdminRoutes, Routes as AppRoutes } from "./utils/Routes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProtection from "./store/protection/AdminProtection";
import RedirectAuthenticated from "./store/protection/RedirectAuthenticated";
import Error404 from "./pages/auth/Error404";
import SettingsPage from "./pages/common/SettingsPage";
import Permissions from "./components/permissions/Permissions";
import ManageServices from "./pages/admin/ManageServices";
import ManageConsultants from "./pages/admin/ManageConsultants";
import PendingApplications from "./pages/admin/PendingApplications";
import ManageConsultant from "./pages/admin/ManageConsultant";
import LoadingWrapper from "./components/common/LoadingWrapper";
import ServicePage from "./pages/common/ServicePage";

export default function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Permissions />
        <Routes>
          <Route path={AppRoutes.home} element={<RootPage />}>
            <Route index element={<HomePage />} />
            <Route
              path={AppRoutes.about}
              element={<LoadingWrapper element={<AboutPage />} />}
            />
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
              element={
                <ProtectedRoute
                  element={<LoadingWrapper element={<ServicesPage />} />}
                />
              }
            />
            <Route
              path={AppRoutes.service}
              element={
                <ProtectedRoute
                  element={<LoadingWrapper element={<ServicePage />} />}
                />
              }
            />
            <Route
              path={AppRoutes.consultantDashboard}
              element={<ProtectedRoute element={<Dashboad />} />}
            />
            <Route
              path={AppRoutes.adminDashboard}
              element={<AdminProtection element={<AdminDashboard />} />}
            >
              <Route
                index
                element={<Navigate to={AdminRoutes.services} replace />}
              />
              <Route path={AdminRoutes.services} element={<ManageServices />} />
              <Route
                path={AdminRoutes.consultants}
                element={<ManageConsultants />}
              />
              <Route
                path={AdminRoutes.applications}
                element={<PendingApplications />}
              />
              <Route
                path={AdminRoutes.manageConsultant}
                element={<ManageConsultant />}
              />
            </Route>
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
