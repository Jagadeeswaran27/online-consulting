import { FaCalendarAlt, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Routes } from "../../utils/Routes";

function ZeroBookings() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold text-textHeading dark:text-white mb-8">
        Your Bookings
      </h1>
      <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-profileCard p-10 text-center">
        <div className="w-20 h-20 bg-gray-100 dark:bg-darkThemeSecondary rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCalendarAlt className="h-10 w-10 text-textMuted dark:text-textMuted-dark" />
        </div>
        <h2 className="text-2xl font-semibold text-textHeading dark:text-white mb-3">
          No Bookings Found
        </h2>
        <p className="text-textBody dark:text-textBody-dark mb-8 max-w-md mx-auto">
          You don't have any bookings yet. Schedule a consultation with one of
          our experts to get started.
        </p>
        <Link
          to={Routes.ourConsultants}
          className="inline-flex items-center bg-primaryRed hover:bg-secondaryRed text-white font-medium py-3 px-8 rounded-lg transition-colors"
        >
          <FaUserTie className="mr-2" />
          Find a Consultant
        </Link>
      </div>
    </div>
  );
}

export default ZeroBookings;
