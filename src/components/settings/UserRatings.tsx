import { useEffect, useState } from "react";
import { RatingsMapping } from "../../types/Ratings";
import { fetchUserRatings } from "../../core/services/RatingService";
import { FaChevronDown, FaSpinner, FaTimesCircle } from "react-icons/fa";
import { format } from "date-fns";
import RenderStars from "../services/RenderStars";
import { fetchConsultantById } from "../../core/services/ConsultantService";
import { ConsultantUser } from "../../types/Users";

function UserRatings() {
  const [ratings, setRatings] = useState<RatingsMapping[]>([]);
  const [loading, setLoading] = useState(true);
  const [consultants, setConsultants] = useState<
    Record<string, ConsultantUser>
  >({});
  const [expandedRating, setExpandedRating] = useState<string | null>(null);

  console.log(ratings);

  useEffect(() => {
    const loadRatings = async () => {
      try {
        setLoading(true);
        const userRatings = await fetchUserRatings();

        const sortedRatings = [...userRatings].sort(
          (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
        );

        setRatings(sortedRatings);

        const consultantData: Record<string, ConsultantUser> = {};
        for (const rating of sortedRatings) {
          if (!consultantData[rating.cid]) {
            const consultant = await fetchConsultantById(rating.cid);
            if (consultant) {
              consultantData[rating.cid] = consultant;
            }
          }
        }
        setConsultants(consultantData);
      } catch (error) {
        console.error("Error loading ratings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRatings();
  }, []);

  const toggleExpandRating = (ratingId: string) => {
    if (expandedRating === ratingId) {
      setExpandedRating(null);
    } else {
      setExpandedRating(ratingId);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <FaSpinner size={24} className="animate-spin text-primaryRed" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold dark:text-white">
        Your Ratings & Reviews
      </h2>

      {ratings.length === 0 ? (
        <div className="bg-white dark:bg-darkThemeCard rounded-lg p-6 border border-gray-200 dark:border-darkThemeSecondary">
          <p className="text-textMuted dark:text-textMuted-dark text-center">
            You haven't rated any consultants yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-bannerDark">
            You have provided {ratings.length} rating
            {ratings.length !== 1 ? "s" : ""} to consultants.
          </p>

          {ratings.map((rating) => {
            const consultant = consultants[rating.cid];
            const timestamp = rating.timestamp.toDate();

            return (
              <div
                key={rating.rid}
                className="bg-white dark:bg-darkThemeCard rounded-xl shadow-customLight p-4 border border-gray-100 dark:border-darkThemeSecondary hover:shadow-elevated transition-shadow duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden mt-1">
                      {consultant?.photoURL ? (
                        <img
                          src={consultant.photoURL}
                          alt={consultant.userName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-profile-gradient dark:bg-dark-gradient flex items-center justify-center text-white">
                          {consultant?.userName.charAt(0).toUpperCase() || "C"}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-medium text-textHeading dark:text-white">
                        {consultant?.userName || "Unknown Consultant"}
                      </h3>
                      <div className="flex items-center mt-1">
                        <RenderStars rating={rating.rating} />
                        <span className="ml-2 text-sm text-textMuted dark:text-textMuted-dark">
                          {format(timestamp, "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpandRating(rating.rid)}
                    className="text-textMuted dark:text-textMuted-dark hover:text-primaryRed"
                  >
                    {expandedRating === rating.rid ? (
                      <FaTimesCircle size={16} />
                    ) : (
                      <FaChevronDown size={16} />
                    )}
                  </button>
                </div>

                <div
                  className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedRating === rating.rid
                      ? "max-h-96 opacity-100"
                      : "max-h-12 line-clamp-2 opacity-90"
                  }`}
                >
                  <p className="text-textBody dark:text-textBody-dark text-sm">
                    {rating.comment || "No comment provided."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserRatings;
