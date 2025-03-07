import { FaSpinner } from "react-icons/fa";
import { ConsultantUser } from "../../types/Users";
import ConsultantCard from "./ConsultantCard";

interface StaticConsultantListProps {
  topConsultants: ConsultantUser[];
  allConsultants: ConsultantUser[];
  isViewAllConsultants: boolean;
  hasMore: boolean;
  isLoading: boolean;
  sid: string;
  loadMore: () => void;
  showViewConsultants: () => void;
  closeViewConsultants: () => void;
}
export default function StaticConsultantList({
  topConsultants,
  allConsultants,
  isViewAllConsultants,
  hasMore,
  isLoading,
  sid,
  loadMore,
  showViewConsultants,
  closeViewConsultants,
}: StaticConsultantListProps) {
  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold mb-8 dark:text-white text-textHeading">
        Top Consultants
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {topConsultants.map((consultant) => (
          <div
            key={consultant.cid}
            className="bg-white dark:bg-darkThemeCard rounded-xl shadow-customLight p-6 "
          >
            <ConsultantCard sid={sid} consultant={consultant} />
          </div>
        ))}
      </div>

      {!isViewAllConsultants && allConsultants.length > 0 && (
        <div className="mt-12 text-center">
          <button
            onClick={showViewConsultants}
            className="bg-white dark:bg-darkThemeSecondary border border-primaryRed text-primaryRed hover:bg-primaryRed hover:text-white font-medium py-2 px-8 rounded-lg transition-colors"
          >
            View All Consultants
          </button>
        </div>
      )}

      {isViewAllConsultants && allConsultants.length > 0 && (
        <div className="py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 dark:text-white text-textHeading">
            All Consultants
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allConsultants.map((consultant) => (
              <div
                key={consultant.cid}
                className="bg-white dark:bg-darkThemeCard rounded-xl shadow-customLight p-6 "
              >
                <ConsultantCard sid={sid} consultant={consultant} />
              </div>
            ))}
          </div>

          {isLoading && (
            <div className="flex justify-center my-5">
              <FaSpinner size={40} className="animate-spin text-primaryRed" />
            </div>
          )}

          <div className="mt-12 flex items-start gap-3 justify-center">
            <button
              onClick={closeViewConsultants}
              className="bg-white dark:bg-darkThemeSecondary border border-primaryRed text-primaryRed hover:bg-primaryRed hover:text-white font-medium py-2 px-8 rounded-lg transition-colors"
            >
              Hide All Consultants
            </button>
            {hasMore && !isLoading && (
              <button
                onClick={loadMore}
                className="bg-white dark:bg-darkThemeSecondary border border-primaryRed text-primaryRed hover:bg-primaryRed hover:text-white font-medium py-2 px-8 rounded-lg transition-colors"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
