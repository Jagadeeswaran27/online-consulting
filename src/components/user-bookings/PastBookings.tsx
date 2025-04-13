import { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaPhoneAlt,
  FaStar,
  FaStarHalfAlt,
  FaUserTie,
  FaVideo,
} from "react-icons/fa";
import { addRating } from "../../core/services/RatingService";
import { Booking } from "../../types/Booking";
import { Services } from "../../types/Services";
import { ConsultantUser } from "../../types/Users";
import { formatBookingDate, formatBookingTime } from "../../utils/Helper";
import { auth } from "../../core/config/Firebase";

interface PastBookingsProps {
  pastBookings: Booking[];
  consultants: Record<string, ConsultantUser>;
  services: Record<string, Services>;
}

function PastBookings({
  pastBookings,
  consultants,
  services,
}: PastBookingsProps) {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [hoveredRatings, setHoveredRatings] = useState<Record<string, number>>(
    {}
  );
  const [ratedBookings, setRatedBookings] = useState<Record<string, boolean>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, string>>({});

  const handleRatingHover = (bookingId: string, rating: number) => {
    setHoveredRatings((prev) => ({ ...prev, [bookingId]: rating }));
  };

  const handleRatingClick = (
    bookingId: string,
    rating: number,
    position: "left" | "right"
  ) => {
    const actualRating =
      position === "left" ? Math.floor(rating) + 0.5 : rating;
    setRatings((prev) => ({ ...prev, [bookingId]: actualRating }));
  };

  const handleCommentChange = (bookingId: string, comment: string) => {
    setComments((prev) => ({ ...prev, [bookingId]: comment }));
  };

  const handleSubmitRating = async (bookingId: string, cid: string) => {
    if (!ratings[bookingId]) return;

    try {
      setIsSubmitting((prev) => ({ ...prev, [bookingId]: true }));

      await addRating(cid, {
        rating: ratings[bookingId],
        comment: comments[bookingId],
        uid: auth.currentUser?.uid || "",
      });

      setRatedBookings((prev) => ({ ...prev, [bookingId]: true }));
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [bookingId]: false }));
    }
  };

  const renderStars = (
    currentRating: number,
    maxRating: number,
    bookingId: string,
    interactive = true
  ) => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      const leftHalfProps = interactive
        ? {
            onMouseEnter: () => handleRatingHover(bookingId, i - 0.5),
            onClick: () => handleRatingClick(bookingId, i, "left"),
            cursor: "pointer",
          }
        : {};

      const rightHalfProps = interactive
        ? {
            onMouseEnter: () => handleRatingHover(bookingId, i),
            onClick: () => handleRatingClick(bookingId, i, "right"),
            cursor: "pointer",
          }
        : {};

      if (currentRating >= i) {
        stars.push(
          <div key={i} className="relative text-2xl mx-1">
            <FaStar className="text-textStar" />
            <div className="absolute inset-0 flex">
              <div className="w-1/2 h-full opacity-0" {...leftHalfProps} />
              <div className="w-1/2 h-full opacity-0" {...rightHalfProps} />
            </div>
          </div>
        );
      } else if (currentRating >= i - 0.5) {
        stars.push(
          <div key={i} className="relative text-2xl mx-1">
            <FaStarHalfAlt className="text-textStar" />
            <div className="absolute inset-0 flex">
              <div className="w-1/2 h-full opacity-0" {...leftHalfProps} />
              <div className="w-1/2 h-full opacity-0" {...rightHalfProps} />
            </div>
          </div>
        );
      } else {
        stars.push(
          <div key={i} className="relative text-2xl mx-1">
            <FaStar className="text-gray-300 dark:text-gray-600" />
            <div className="absolute inset-0 flex">
              <div className="w-1/2 h-full opacity-0" {...leftHalfProps} />
              <div className="w-1/2 h-full opacity-0" {...rightHalfProps} />
            </div>
          </div>
        );
      }
    }

    return stars;
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-textHeading dark:text-white mb-4 mt-8">
        Past Consultations
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pastBookings.map((booking) => {
          const consultant = consultants[booking.cid];
          const service = services[booking.sid];
          const bookingId = booking.callId;
          const currentRating =
            hoveredRatings[bookingId] || ratings[bookingId] || 0;
          const hasRated = ratedBookings[bookingId];
          const isRatingSubmitting = isSubmitting[bookingId];

          return (
            <div
              key={bookingId}
              className="bg-white dark:bg-darkThemeCard rounded-xl shadow-subtle overflow-hidden border border-gray-100 dark:border-darkThemeSecondary opacity-80"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-5">
                  {consultant?.photoURL ? (
                    <img
                      src={consultant.photoURL}
                      alt={consultant.userName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-darkThemeSecondary shadow-subtle grayscale"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-darkThemeSecondary flex items-center justify-center">
                      <FaUserTie className="text-gray-400 dark:text-gray-600 text-2xl" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        Completed
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-textHeading dark:text-white mt-1">
                      {consultant?.userName || "Unknown Consultant"}
                    </h3>
                  </div>
                </div>

                {/* Existing booking details */}
                <div className="bg-cardBg dark:bg-cardBg-dark rounded-lg p-4 mb-2">
                  <h4 className="font-semibold text-textHeading dark:text-white mb-1">
                    {service?.name || "Consultation Service"}
                  </h4>
                  <p className="text-textBody dark:text-textBody-dark text-sm mb-3 line-clamp-2">
                    {service?.description || "Expert advice and solutions."}
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

                {/* Existing mode info */}
                <div className="flex items-center text-sm text-textMuted dark:text-textMuted-dark mt-2 mb-4">
                  <span
                    className={`flex items-center ${
                      booking.mode === "online"
                        ? "text-primaryRed"
                        : "text-indigo-600 dark:text-indigo-400"
                    }`}
                  >
                    {booking.mode === "online" ? (
                      <>
                        <FaVideo className="mr-1" /> Video Call
                      </>
                    ) : (
                      <>
                        <FaPhoneAlt className="mr-1" /> Phone Consultation
                      </>
                    )}
                  </span>
                </div>

                {/* Rating Section */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-darkThemeSecondary">
                  {hasRated ? (
                    <div className="text-center">
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-2">
                        Thank you for your feedback!
                      </p>
                      <div className="flex justify-center">
                        {renderStars(ratings[bookingId], 5, bookingId, false)}
                      </div>
                      {comments[bookingId] && (
                        <div className="mt-3 p-3 bg-gray-50 dark:bg-darkThemeSecondary rounded-md text-sm text-textBody dark:text-textBody-dark">
                          <p className="italic">"{comments[bookingId]}"</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium text-textHeading dark:text-white mb-2 text-center">
                        How was your consultation?
                      </p>

                      {/* Star Rating */}
                      <div
                        className="flex justify-center mb-3"
                        onMouseLeave={() => handleRatingHover(bookingId, 0)}
                      >
                        {renderStars(currentRating, 5, bookingId)}
                      </div>

                      {/* Comment Section - only show when a rating is selected */}
                      {ratings[bookingId] > 0 && (
                        <div className="mb-3">
                          <textarea
                            className="w-full p-3 border border-formBorder dark:border-formBorder-dark rounded-md bg-white dark:bg-formBg-dark text-textBody dark:text-textBody-dark focus:outline-none focus:ring-2 focus:ring-primaryRed text-sm resize-none transition"
                            placeholder="Share your experience with this consultation (optional)"
                            rows={3}
                            value={comments[bookingId] || ""}
                            onChange={(e) =>
                              handleCommentChange(bookingId, e.target.value)
                            }
                          ></textarea>
                        </div>
                      )}

                      {/* Submit Button */}
                      {ratings[bookingId] > 0 && (
                        <button
                          className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors 
                            ${
                              isRatingSubmitting
                                ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                                : "bg-primaryRed hover:bg-secondaryRed text-white"
                            }`}
                          onClick={() =>
                            handleSubmitRating(bookingId, booking.cid)
                          }
                          disabled={isRatingSubmitting}
                        >
                          {isRatingSubmitting
                            ? "Submitting..."
                            : "Submit Rating"}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PastBookings;
