import { useEffect, useState } from "react";
import { auth } from "../../core/config/Firebase";
import {
  fetchConsultantById,
  getConsultantRatings,
  getUserName,
} from "../../core/services/ConsultantService";
import { fetchConsultantBookings } from "../../core/services/BookingService";
import { fetchService as getServiceDetails } from "../../core/services/ServiceManager";
import { Booking } from "../../types/Booking";
import { ConsultantUser } from "../../types/Users";
import { Services } from "../../types/Services";
import { RatingsWithUserName } from "../../types/Ratings";
import {
  FaSpinner,
  FaStar,
  FaCalendarAlt,
  FaThumbsUp,
  FaUser,
  FaClock,
  FaVideo,
  FaPhoneAlt,
  FaChartLine,
} from "react-icons/fa";
import { isUpcoming } from "../../utils/Helper";
import { formatBookingDate, formatBookingTime } from "../../utils/Helper";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Images } from "../../resources/Images";
import RenderStars from "../../components/services/RenderStars";

const ConsultantDashboard = () => {
  const [consultant, setConsultant] = useState<ConsultantUser | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Record<string, Services>>({});
  const [ratings, setRatings] = useState<RatingsWithUserName[]>([]);
  const [loading, setLoading] = useState(true);
  const [kudosUserNames, setKudosUserNames] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        // Fetch consultant profile
        const consultantData = await fetchConsultantById(user.uid);
        if (consultantData) {
          setConsultant(consultantData);

          // Fetch ratings
          const consultantRatings = await getConsultantRatings(user.uid);
          setRatings(consultantRatings);

          // Fetch bookings
          const consultantBookings = await fetchConsultantBookings(user.uid);
          if (consultantBookings) {
            const sortedBookings = [...consultantBookings].sort(
              (a, b) => b.scheduledAt.toMillis() - a.scheduledAt.toMillis()
            );
            setBookings(sortedBookings);

            // Fetch service details for each booking
            const serviceData: Record<string, Services> = {};
            for (const booking of sortedBookings) {
              if (!serviceData[booking.sid]) {
                const service = await getServiceDetails(booking.sid);
                if (service) {
                  serviceData[booking.sid] = service;
                }
              }
            }
            setServices(serviceData);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Error loading consultant dashboard:", err);
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  useEffect(() => {
    const fetchKudosUserNames = async () => {
      if (consultant?.kudos && consultant.kudos.length > 0) {
        const kudosNames: Record<string, string> = {};
        for (const userId of consultant.kudos) {
          const name = await getUserName(userId);
          kudosNames[userId] = name || "Unknown User";
        }
        setKudosUserNames(kudosNames);
      }
    };

    if (consultant) {
      fetchKudosUserNames();
    }
  }, [consultant]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-81px)] bg-gray-50 dark:bg-darkTheme">
        <FaSpinner size={40} className="animate-spin text-primaryRed mb-4" />
      </div>
    );
  }

  if (!consultant) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-81px)] bg-gray-50 dark:bg-darkTheme">
        <div className="text-xl text-textHeading dark:text-white">
          Consultant profile not found
        </div>
      </div>
    );
  }

  const upcomingBookings = bookings.filter((booking) =>
    isUpcoming(booking.scheduledAt)
  );
  const pastBookings = bookings.filter(
    (booking) => !isUpcoming(booking.scheduledAt)
  );

  return (
    <div className="bg-gray-50 dark:bg-darkTheme min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-textHeading dark:text-white">
              Consultant Dashboard
            </h1>
            <p className="text-textMuted dark:text-textMuted-dark">
              Welcome back, {consultant.userName}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="bg-white dark:bg-darkThemeCard rounded-full shadow-subtle px-4 py-2 flex items-center">
              <FaChartLine className="text-primaryRed mr-2" />
              <span
                title="Based on avgerage ratings"
                className="text-textHeading dark:text-white font-medium"
              >
                Performance: {consultant.avgRating.toFixed(1)}/5.0
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-customLight p-6 hover:shadow-elevated transition-shadow duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-textMuted dark:text-textMuted-dark mb-1">
                  Upcoming Sessions
                </p>
                <h3 className="text-3xl font-bold text-textHeading dark:text-white">
                  {upcomingBookings.length}
                </h3>
              </div>
              <div className="p-3 bg-softRed dark:bg-primaryRed dark:bg-opacity-20 rounded-full">
                <FaCalendarAlt className="text-primaryRed text-xl" />
              </div>
            </div>
            <div className="mt-4 text-sm text-primaryRed font-medium">
              Next session:{" "}
              {upcomingBookings.length > 0
                ? formatBookingDate(upcomingBookings[0].scheduledAt)
                : "No upcoming sessions"}
            </div>
          </div>

          <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-customLight p-6 hover:shadow-elevated transition-shadow duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-textMuted dark:text-textMuted-dark mb-1">
                  Total Sessions
                </p>
                <h3 className="text-3xl font-bold text-textHeading dark:text-white">
                  {pastBookings.length}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20 rounded-full">
                <FaUser className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
            </div>
            <div className="mt-4 text-sm text-blue-600 dark:text-blue-400 font-medium">
              Client satisfaction:{" "}
              {consultant.avgRating >= 4
                ? "High"
                : consultant.avgRating >= 3
                ? "Average"
                : "Needs improvement"}
            </div>
          </div>

          <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-customLight p-6 hover:shadow-elevated transition-shadow duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-textMuted dark:text-textMuted-dark mb-1">
                  Reviews
                </p>
                <h3 className="text-3xl font-bold text-textHeading dark:text-white">
                  {consultant.reviewCount}
                </h3>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20 rounded-full">
                <FaStar className="text-textStar text-xl" />
              </div>
            </div>
            <div className="mt-4 text-sm text-yellow-600 dark:text-yellow-400 font-medium">
              Average rating: {consultant.avgRating.toFixed(1)}/5.0
            </div>
          </div>

          <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-customLight p-6 hover:shadow-elevated transition-shadow duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-textMuted dark:text-textMuted-dark mb-1">
                  Kudos
                </p>
                <h3 className="text-3xl font-bold text-textHeading dark:text-white">
                  {consultant.kudos?.length || 0}
                </h3>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 dark:bg-opacity-20 rounded-full">
                <FaThumbsUp className="text-green-600 dark:text-green-400 text-xl" />
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600 dark:text-green-400 font-medium">
              Client appreciation
            </div>
          </div>
        </div>

        {/* Consultant Profile Card */}
        <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-profileCard p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              {consultant.photoURL ? (
                <img
                  src={consultant.photoURL}
                  alt={consultant.userName}
                  className="w-full h-full rounded-full object-cover border-3 border-primaryRed shadow-subtle"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-profile-gradient dark:bg-dark-gradient flex items-center justify-center text-white text-3xl shadow-subtle">
                  {consultant.userName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-textHeading dark:text-white mb-2">
                    {consultant.userName}
                  </h1>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center mr-4">
                      <FaStar className="text-textStar mr-1" />
                      <span className="text-textHeading dark:text-white font-medium">
                        {consultant.avgRating.toFixed(1)}
                      </span>
                      <span className="text-textMuted dark:text-textMuted-dark ml-1">
                        ({consultant.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 md:mt-0 flex flex-wrap gap-2">
                  {consultant.services.map(
                    (serviceId) =>
                      services[serviceId] && (
                        <span
                          key={serviceId}
                          className="bg-gray-100 dark:bg-darkThemeSecondary text-textMuted dark:text-textMuted-dark px-3 py-1 rounded-full text-sm"
                        >
                          {services[serviceId].name}
                        </span>
                      )
                  )}
                </div>
              </div>
              <p className="text-textBody dark:text-textBody-dark line-clamp-2">
                {consultant.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <h2 className="text-xl font-semibold text-textHeading dark:text-white mb-4">
          Upcoming Sessions
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {upcomingBookings.length === 0 ? (
            <div className="col-span-3 bg-white dark:bg-darkThemeCard rounded-xl shadow-customLight p-6 text-center">
              <p className="text-textMuted dark:text-textMuted-dark">
                You don't have any upcoming sessions scheduled.
              </p>
            </div>
          ) : (
            upcomingBookings.map((booking) => {
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
                    <div className="flex items-start justify-between mb-5">
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

                    <div className="bg-cardBg dark:bg-cardBg-dark rounded-lg p-4 mb-5">
                      <div className="flex items-center mb-3">
                        <img
                          src={service?.thumbnail || Images.placeholderImage}
                          alt={service?.name}
                          className="w-10 h-10 rounded-md object-cover mr-3"
                          onError={(e) => {
                            e.currentTarget.src = Images.placeholderImage;
                          }}
                        />
                        <div>
                          <h4 className="font-semibold text-textHeading dark:text-white">
                            {service?.name || "Consultation Service"}
                          </h4>
                          <p className="text-xs text-textMuted dark:text-textMuted-dark">
                            User ID: {booking.uid.substring(0, 8)}...
                          </p>
                        </div>
                      </div>

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

                    {booking.mode === "offline" && (
                      <div className="mt-4 flex items-center text-textBody dark:text-textBody-dark">
                        <FaPhoneAlt className="mr-2 text-textMuted dark:text-textMuted-dark" />
                        <span>Contact client directly</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Recent Sessions & Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Sessions */}
          <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-profileCard p-6">
            <h2 className="text-xl font-semibold text-textHeading dark:text-white mb-4">
              Recent Sessions
            </h2>

            {pastBookings.length === 0 ? (
              <p className="text-textMuted dark:text-textMuted-dark py-4">
                You haven't completed any sessions yet.
              </p>
            ) : (
              <div className="space-y-4">
                {pastBookings.slice(0, 5).map((booking) => (
                  <div
                    key={booking.callId}
                    className="border border-formBorder dark:border-formBorder-dark rounded-lg p-3 hover:bg-cardBg dark:hover:bg-darkThemeSecondary transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`p-2 rounded-md mr-3 ${
                            booking.mode === "online"
                              ? "bg-red-100 dark:bg-red-900/20"
                              : "bg-blue-100 dark:bg-blue-900/20"
                          }`}
                        >
                          {booking.mode === "online" ? (
                            <FaVideo
                              className={`${
                                booking.mode === "online"
                                  ? "text-primaryRed"
                                  : "text-blue-600 dark:text-blue-400"
                              }`}
                            />
                          ) : (
                            <FaPhoneAlt
                              className={`${
                                booking.mode === "offline"
                                  ? "text-primaryRed"
                                  : "text-blue-600 dark:text-blue-400"
                              }`}
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-textHeading dark:text-white">
                            {services[booking.sid]?.name || "Consultation"}
                          </h4>
                          <p className="text-xs text-textMuted dark:text-textMuted-dark">
                            {format(
                              booking.scheduledAt.toDate(),
                              "MMM d, yyyy • h:mm a"
                            )}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-darkThemeSecondary rounded-full text-textMuted dark:text-textMuted-dark">
                        {booking.mode}
                      </span>
                    </div>
                  </div>
                ))}

                {pastBookings.length > 5 && (
                  <div className="text-center pt-2">
                    <button className="text-primaryRed hover:text-secondaryRed font-medium text-sm">
                      View All Sessions
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Recent Reviews */}
          <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-profileCard p-6">
            <h2 className="text-xl font-semibold text-textHeading dark:text-white mb-4">
              Recent Reviews
            </h2>

            {ratings.length === 0 ? (
              <p className="text-textMuted dark:text-textMuted-dark py-4">
                You don't have any reviews yet.
              </p>
            ) : (
              <div className="space-y-4">
                {ratings.slice(0, 4).map((rating) => (
                  <div
                    key={rating.rid}
                    className="border border-formBorder dark:border-formBorder-dark rounded-lg p-4 hover:bg-cardBg dark:hover:bg-darkThemeSecondary transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-profile-gradient dark:bg-dark-gradient flex items-center justify-center text-white text-sm">
                          {rating.userName.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-2">
                          <h3 className="font-medium text-textHeading dark:text-white text-sm">
                            {rating.userName}
                          </h3>
                          <p className="text-xs text-textMuted dark:text-textMuted-dark">
                            {format(rating.timestamp.toDate(), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <RenderStars rating={rating.rating} />
                      </div>
                    </div>
                    <p className="text-sm text-textBody dark:text-textBody-dark line-clamp-2">
                      {rating.comment}
                    </p>
                  </div>
                ))}

                {ratings.length > 4 && (
                  <div className="text-center pt-2">
                    <button className="text-primaryRed hover:text-secondaryRed font-medium text-sm">
                      View All Reviews
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Kudos Section */}
        {consultant?.kudos && consultant.kudos.length > 0 && (
          <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-profileCard p-6">
            <h2 className="text-xl font-semibold text-textHeading dark:text-white mb-4">
              Kudos from Users
            </h2>
            <div className="flex flex-wrap gap-2">
              {consultant.kudos.map((userId, index) => (
                <div
                  key={index}
                  className="bg-softRed dark:bg-darkThemeSecondary rounded-full px-4 py-2 flex items-center"
                >
                  <FaThumbsUp className="text-primaryRed mr-2" />
                  <span className="text-textBody dark:text-textBody-dark">
                    {kudosUserNames[userId] || "Loading..."}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultantDashboard;
