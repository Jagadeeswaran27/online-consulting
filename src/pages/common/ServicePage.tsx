import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Services } from "../../types/Services";
import { ConsultantUser } from "../../types/Users";
import { fetchService } from "../../core/services/ServiceManager";
import { FaSpinner, FaSearch } from "react-icons/fa";
import { fetchConsultantsByService } from "../../core/services/ConsultantService";
import ConsultantCard from "../../components/services/ConsultantCard";
import ServiceHeader from "../../components/services/ServiceHeader";
import StaticConsultantList from "../../components/services/StaticConsultantList";

export default function ServicePage() {
  const [service, setService] = useState<Services | null>(null);
  const [consultants, setConsultants] = useState<ConsultantUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isViewAllConsultants, setIsViewAllConsultants] =
    useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const handleFetchService = async () => {
      setIsLoading(true);
      if (!id) return;
      const response = await fetchService(id);
      const consultants = await fetchConsultantsByService(id);
      setService(response);

      setConsultants(consultants);

      setIsLoading(false);
    };

    handleFetchService();
  }, [id]);

  const filteredConsultants = consultants.filter((consultant) => {
    return consultant.userName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const topConsultants = [...consultants]
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 3);

  const allConsultants = consultants.filter((c) => !topConsultants.includes(c));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-81px)]">
        <FaSpinner size={40} className="animate-spin text-primaryRed" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-81px)]">
        <p className="text-lg text-textMuted">Service not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-darkTheme min-h-screen">
      <ServiceHeader service={service} />
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
            isViewAllConsultants={isViewAllConsultants}
            showViewConsultants={() => setIsViewAllConsultants(true)}
            closeViewConsultants={() => setIsViewAllConsultants(false)}
          />
        )}
      </div>
    </div>
  );
}
