import {
  FaClock,
  FaCalendarAlt,
  FaPhoneAlt,
  FaUserTie,
  FaVideo,
} from "react-icons/fa";
import { Booking } from "../../types/Booking";
import { Services } from "../../types/Services";
import { ConsultantUser } from "../../types/Users";
import { formatBookingDate, formatBookingTime } from "../../utils/Helper";
import { Link } from "react-router-dom";

interface UpcomingBookingsProps {
  upcomingBookings: Booking[];
  consultants: Record<string, ConsultantUser>;
  services: Record<string, Services>;
}

function UpCompingBookings({
  consultants,
  services,
  upcomingBookings,
}: UpcomingBookingsProps) {
  return (
    <>
      <h2 className="text-xl font-semibold text-textHeading dark:text-white mb-4 mt-8">
        Upcoming Consultations
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {upcomingBookings.map((booking) => {
          const consultant = consultants[booking.cid];
          const service = services[booking.sid];
          const bookingDate = booking.scheduledAt.toDate();
          const isToday =
            new Date().toDateString() === bookingDate.toDateString();

          return (
            <div
              key={booking.callId}
              className="bg-white dark:bg-darkThemeCard rounded-xl shadow-profileCard overflow-hidden border border-gray-100 dark:border-darkThemeSecondary hover:shadow-elevated transition-all duration-300"
            >
              {/* Colored header based on consultation mode */}
              <div
                className={`h-2 ${
                  booking.mode === "online"
                    ? "bg-gradient-to-r from-gradientFrom to-gradientTo"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600"
                }`}
              ></div>

              <div className="p-6">
                <div className="flex items-start space-x-4 mb-5">
                  {consultant?.photoURL ? (
                    <img
                      src={consultant.photoURL}
                      alt={consultant.userName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-darkThemeSecondary shadow-subtle"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-darkThemeSecondary flex items-center justify-center">
                      <FaUserTie className="text-gray-400 dark:text-gray-600 text-2xl" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between">
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isToday
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                          }`}
                        >
                          {isToday ? "Today" : "Upcoming"}
                        </span>
                        <span
                          className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            booking.mode === "online"
                              ? "bg-red-100 text-primaryRed dark:bg-red-900/20 dark:text-red-300"
                              : "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300"
                          }`}
                        >
                          {booking.mode === "online" ? (
                            <>
                              <FaVideo className="mr-1" /> Online
                            </>
                          ) : (
                            <>
                              <FaPhoneAlt className="mr-1" /> Offline
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-textHeading dark:text-white mt-1">
                      {consultant?.userName || "Unknown Consultant"}
                    </h3>
                  </div>
                </div>

                <div className="bg-cardBg dark:bg-cardBg-dark rounded-lg p-4 mb-5">
                  <h4 className="font-semibold text-textHeading dark:text-white mb-1">
                    {service?.name || "Consultation Service"}
                  </h4>
                  <p className="text-textBody dark:text-textBody-dark text-sm mb-3 line-clamp-2">
                    {service?.description ||
                      "Get expert advice and solutions for your needs."}
                  </p>
                  <div className="flex flex-wrap items-center text-sm text-textMuted dark:text-textMuted-dark">
                    <div className="flex items-center mr-4 mb-1">
                      <FaCalendarAlt className="mr-1.5" />
                      {formatBookingDate(booking.scheduledAt)}
                    </div>
                    <div className="flex items-center mb-1">
                      <FaClock className="mr-1.5" />
                      {formatBookingTime(booking.scheduledAt)}
                    </div>
                  </div>
                </div>

                {booking.mode === "online" && (
                  <div className="mt-4">
                    <Link
                      to={`/video-call?callId=${booking.callId}&consultantId=${booking.cid}`}
                      className="flex items-center justify-center w-full bg-primaryRed hover:bg-secondaryRed text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      <FaVideo className="mr-2" />
                      Join Video Call
                    </Link>
                  </div>
                )}

                {booking.mode === "offline" && consultant?.contact && (
                  <div className="mt-4 flex items-center text-textBody dark:text-textBody-dark">
                    <FaPhoneAlt className="mr-2 text-textMuted dark:text-textMuted-dark" />
                    <span>Contact: {consultant.contact}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UpCompingBookings;
