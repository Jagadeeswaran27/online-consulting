import { useState, useEffect, useCallback } from "react";
import { fetchConsultants } from "../../core/services/ConsultantService";
import { ConsultantUser } from "../../types/Users";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { FaSpinner } from "react-icons/fa";
import { Images } from "../../resources/Images";
import { Link } from "react-router-dom";

const ConsultantsList = () => {
  const [consultants, setConsultants] = useState<ConsultantUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const filteredConsultants = consultants.filter((consultant) =>
    consultant.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadConsultants = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    const { consultants: newConsultants, lastDoc: newLastDoc } =
      await fetchConsultants(lastDoc);

    if (newConsultants.length === 0) {
      setHasMore(false);
    } else {
      setConsultants((prev) => [...prev, ...newConsultants]);
      setLastDoc(newLastDoc);
    }

    setLoading(false);
  }, [lastDoc, hasMore, loading]);

  useEffect(() => {
    loadConsultants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold dark:text-white">
          Manage Consultants
        </h2>
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search consultants"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-400 
                       dark:border-gray-700 dark:bg-darkThemeSecondary 
                       dark:text-white focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-darkThemeCard rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-darkThemeSecondary">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Consultant
                </th>
                <th className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Bio
                </th>
                <th className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredConsultants.map((consultant) => (
                <tr key={consultant.cid}>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                        <img
                          className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"
                          src={consultant.photoURL || Images.placeholderImage}
                          alt=""
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              Images.placeholderImage;
                          }}
                        />
                      </div>
                      <div className="ml-2 md:ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {consultant.userName}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate max-w-[120px] md:max-w-none">
                          {consultant.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white line-clamp-2 max-w-[200px] md:max-w-md">
                      {consultant.bio}
                    </div>
                  </td>
                  <td className="table-cell px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {consultant.experience} years
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-4 text-right text-sm font-medium">
                    <Link
                      to={`/admin-dashboard/consultant/${consultant.cid}`}
                      className="text-primaryRed hover:text-secondaryRed"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center mt-6">
          <FaSpinner size={24} className="animate-spin text-primaryRed" />
        </div>
      )}

      {hasMore && !loading && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadConsultants}
            className="bg-primaryRed hover:bg-secondaryRed text-white px-6 py-2 rounded-lg transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsultantsList;
