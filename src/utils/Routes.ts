export const Routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  about: "/about",
  services: "/services",
  service: "/services/:id",
  serviceConsultantProfile: "/services/:id/profile/:cid",
  ourConsultantsProfile: "/our-consultants/profile/:cid",
  becomeConsultant: "/become-consultant",
  adminDashboard: "/admin-dashboard",
  consultantDashboard: "/consultant-dashboard",
  ourConsultants: "/our-consultants",
  userDashboard: "/user-dashboard",
  settings: "/settings",
  booking: "/booking",
  videoCall: "/video-call",
  yourBookings: "/your-bookings",
};

export const AdminRoutes = {
  services: "services",
  consultants: "consultants",
  applications: "applications",
  manageConsultant: "consultant/:id",
};
