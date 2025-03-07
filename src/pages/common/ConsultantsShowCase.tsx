import { useCallback, useEffect, useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import ConsultantCard from "../../components/services/ConsultantCard";
import StaticConsultantList from "../../components/services/StaticConsultantList";
import { ConsultantUser } from "../../types/Users";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import {
  getAllPaginatedConsultants,
  getAllTopConsultants,
} from "../../core/services/ConsultantService";

export default function ConsultantsShowCase() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [topConsultants, setTopConsultants] = useState<ConsultantUser[]>([]);
  const [allConsultants, setAllConsultants] = useState<ConsultantUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isLoadingConsultants, setIsLoadingConsultants] =
    useState<boolean>(false);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadConsultants = useCallback(async () => {
    if (!hasMore || isLoadingConsultants) return;

    setIsLoadingConsultants(true);
    const { consultants: newConsultants, lastDoc: newLastDoc } =
      await getAllPaginatedConsultants(lastDoc);

    if (newConsultants.length === 0) {
      setHasMore(false);
    } else {
      setAllConsultants((prev) => [...prev, ...newConsultants]);
      setLastDoc(newLastDoc);
    }

    setIsLoadingConsultants(false);
  }, [lastDoc, hasMore, isLoadingConsultants]);

  useEffect(() => {
    const handleFetchService = async () => {
      setIsLoading(true);
      const consultants = await getAllTopConsultants();
      setTopConsultants(consultants);
      loadConsultants();
      setIsLoading(false);
    };

    handleFetchService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredConsultants = [...topConsultants, ...allConsultants].filter(
    (consultant) => {
      return consultant.userName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-81px)]">
        <FaSpinner size={40} className="animate-spin text-primaryRed" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search consultants"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 dark:border-darkThemeSecondary rounded-lg bg-white dark:bg-darkThemeCard text-textBody dark:text-textBody-dark focus:outline-none "
            />
            <div className="absolute left-3 top-[17px] text-textMuted dark:text-textMuted-dark">
              <FaSearch />
            </div>
          </div>
        </div>

        {searchTerm && filteredConsultants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredConsultants.map((consultant) => (
              <div
                key={consultant.cid}
                className="bg-white dark:bg-darkThemeCard rounded-xl shadow-customLight p-6 "
              >
                <ConsultantCard consultant={consultant} />
              </div>
            ))}
          </div>
        ) : (
          <StaticConsultantList
            topConsultants={topConsultants}
            allConsultants={allConsultants}
            hasMore={hasMore}
            isLoading={isLoadingConsultants}
            loadMore={loadConsultants}
            showViewConsultants={() => {}}
            closeViewConsultants={() => {}}
          />
        )}
      </div>
    </div>
  );
}
