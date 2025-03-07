import { useCallback, useEffect, useState } from "react";
import { RatingsWithUserName } from "../../types/Ratings";
import { getPaginatedConsultantRatings } from "../../core/services/ConsultantService";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import RenderStars from "./RenderStars";
import { formatDistanceToNow } from "date-fns";
import { FaSpinner } from "react-icons/fa";

interface ConsultantRatingsProps {
  cid: string;
}
export default function ConsultantRatings({ cid }: ConsultantRatingsProps) {
  const [ratings, setRatings] = useState<RatingsWithUserName[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchRatings = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    const { ratings: newRatings, lastDoc: newLastDoc } =
      await getPaginatedConsultantRatings(cid, lastDoc);

    if (newRatings.length === 0) {
      setHasMore(false);
    } else {
      setRatings((prev) => [...prev, ...newRatings]);
      setLastDoc(newLastDoc);
    }
    setLoading(false);
  }, [cid, hasMore, loading, lastDoc]);

  useEffect(() => {
    fetchRatings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  return (
    <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-customLight p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-textHeading dark:text-white mb-4">
          Client Reviews ({ratings?.length || 0})
        </h2>
        {hasMore && (
          <button
            onClick={fetchRatings}
            className="text-primaryRed cursor-pointer hover:underline"
          >
            View More
          </button>
        )}
      </div>

      {ratings && ratings.length > 0 ? (
        <div className="space-y-6">
          {ratings.map((rating, index) => (
            <div
              key={index}
              className="p-4 bg-reviewCard dark:bg-reviewCard-dark rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex gap-1 mb-1">
                    {<RenderStars rating={rating.rating} />}
                  </div>
                  <h4 className="font-medium text-textHeading dark:text-white">
                    {rating.userName}
                  </h4>
                </div>
                <span className="text-sm text-textMuted dark:text-textMuted-dark">
                  {rating.timestamp
                    ? formatDistanceToNow(rating.timestamp.toDate(), {
                        addSuffix: true,
                      })
                    : ""}
                </span>
              </div>
              <p className="mt-2 text-textBody dark:text-textBody-dark">
                {rating.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-textMuted dark:text-textMuted-dark">
          No reviews yet.
        </p>
      )}
      {loading && (
        <div className="flex justify-center my-5">
          <FaSpinner size={40} className="animate-spin text-primaryRed" />
        </div>
      )}
    </div>
  );
}
