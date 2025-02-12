import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootPage from "./pages/RootPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthContextProvider from "./store/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServicesPage from "./pages/ServicesPage";
import ProtectedRoute from "./store/protection/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";
export default function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<RootPage />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/services"
              element={<ProtectedRoute element={<ServicesPage />} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthContextProvider>
  );
}
