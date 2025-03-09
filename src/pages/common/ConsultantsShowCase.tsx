import { useCallback, useContext, useEffect, useState } from "react";
import { FaSearch, FaSpinner, FaUserTie } from "react-icons/fa";
import ConsultantCard from "../../components/services/ConsultantCard";
import StaticConsultantList from "../../components/services/StaticConsultantList";
import { ConsultantUser } from "../../types/Users";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import {
  getAllPaginatedConsultants,
  getAllTopConsultants,
} from "../../core/services/ConsultantService";
import PrimaryAuthButton from "../../components/common/PrimaryAuthButton";
import { AuthContext } from "../../store/context/auth";
import { Link } from "react-router-dom";
import { Routes } from "../../utils/Routes";

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

  const { user } = useContext(AuthContext);
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
        {/* Become a Consultant Banner */}
        {user && user.type === "user" && (
          <div className="bg-gradient-to-r from-bannerLight to-white dark:from-darkThemeCard dark:to-darkThemeSecondary rounded-xl shadow-customLight mb-10 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center p-6 md:p-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-textHeading dark:text-white mb-3">
                  Become a Consultant
                </h2>
                <p className="text-textBody dark:text-textBody-dark mb-4">
                  Share your expertise, build your professional brand, and earn
                  by helping others. Join our growing network of consultants
                  today.
                </p>
                <div className="md:w-[20%]">
                  <Link to={Routes.becomeConsultant}>
                    <PrimaryAuthButton text="Apply Now" />
                  </Link>
                </div>
              </div>
              <div className="mt-6 md:mt-0 md:ml-6 flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-primaryRed/10 dark:bg-primaryRed/20 rounded-full flex items-center justify-center">
                  <FaUserTie className="h-16 w-16 md:h-20 md:w-20 text-primaryRed" />
                </div>
              </div>
            </div>
          </div>
        )}

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
