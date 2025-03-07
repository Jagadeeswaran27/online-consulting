export const Routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  about: "/about",
  services: "/services",
  service: "/services/:id",
  serviceConsultantProfile: "/services/:id/profile/:cid",
  consultantSignup: "/consultant-signup",
  adminDashboard: "/admin-dashboard",
  consultantDashboard: "/consultant-dashboard",
  ourConsultants: "/our-consultants",
  userDashboard: "/user-dashboard",
  settings: "/settings",
};

export const AdminRoutes = {
  services: "services",
  consultants: "consultants",
  applications: "applications",
  manageConsultant: "consultant/:id",
};
