import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ConsultantUser } from "../../types/Users";
import {
  fetchConsultantById,
  fetchConsultantServices,
} from "../../core/services/ConsultantService";
import { Images } from "../../resources/Images";
import { FaSpinner, FaArrowLeft } from "react-icons/fa";
import { Services } from "../../types/Services";
import PrimaryAuthButton from "../../components/common/PrimaryAuthButton";

export default function ManageConsultant() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [consultant, setConsultant] = useState<ConsultantUser | null>(null);
  const [services, setServices] = useState<Services[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingServices, setLoadingServices] = useState(false);

  useEffect(() => {
    const loadConsultant = async () => {
      if (!id) return;
      setLoading(true);
      const data = await fetchConsultantById(id);
      setConsultant(data);
      setLoading(false);
    };

    loadConsultant();
  }, [id]);

  const handleFetchServices = async () => {
    if (!consultant) return;
    setLoadingServices(true);
    const services = await fetchConsultantServices(consultant.services);
    setServices(services);
    setLoadingServices(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner size={24} className="animate-spin text-primaryRed" />
      </div>
    );
  }

  if (!consultant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600 dark:text-gray-400">
          Consultant not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 md:px-4 pb-4 md:pb-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 md:mb-6 flex items-center gap-2 text-primaryRed hover:text-secondaryRed transition-colors"
      >
        <FaArrowLeft size={16} />
        <span>Back</span>
      </button>

      <div className="bg-white shadow-customLight flex flex-col items-start gap-3 md:gap-5 dark:bg-darkThemeCard rounded-lg p-3 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
          <div className="flex flex-col items-center md:w-1/3">
            <img
              src={consultant.photoURL || Images.placeholderImage}
              alt={consultant.userName}
              className="w-32 h-32 md:w-64 md:h-64 object-cover rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = Images.placeholderImage;
              }}
            />
            <div className="mt-4 text-center">
              <h2 className="text-xl md:text-2xl font-bold dark:text-white">
                {consultant.userName}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                {consultant.email}
              </p>
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-4 md:space-y-6">
            <div className="space-y-2 md:space-y-4">
              <h3 className="text-lg md:text-xl font-semibold dark:text-white">
                Professional Details
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-3 md:p-4 bg-gray-50 dark:bg-darkThemeSecondary rounded-lg">
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    Experience
                  </p>
                  <p className="text-base md:text-lg font-medium dark:text-white">
                    {consultant.experience} years
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2 md:space-y-4">
              <h3 className="text-lg md:text-xl font-semibold dark:text-white">
                Biography
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                {consultant.bio}
              </p>
            </div>
          </div>
        </div>
        <div className="my-2 md:my-5 w-full">
          {!services && (
            <div className="flex justify-end items-center mt-2 md:mt-4 mb-3 md:mb-6 mr-2 md:mr-4">
              <div className="w-[150px]">
                <PrimaryAuthButton
                  onClick={handleFetchServices}
                  text={"Show Services"}
                />
              </div>
            </div>
          )}

          {loadingServices && (
            <div className="flex justify-center py-4 md:py-8">
              <FaSpinner size={24} className="animate-spin text-primaryRed" />
            </div>
          )}
          {services && services.length > 0 && (
            <h3 className="text-lg md:text-xl font-semibold dark:text-white">
              Services
            </h3>
          )}

          {!loadingServices && services && services.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mx-0 md:mx-5 mt-3 md:mt-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="dark:bg-darkThemeSecondary rounded-lg p-3 md:p-4 transition-all duration-300 shadow-customLight"
                >
                  <div className="flex gap-3 md:gap-4">
                    <img
                      src={service.thumbnail || Images.placeholderImage}
                      alt={service.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = Images.placeholderImage;
                      }}
                    />
                    <div>
                      <h4 className="font-semibold text-base md:text-lg dark:text-white">
                        {service.name}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loadingServices && services && services.length === 0 && (
            <p className="text-gray-600 dark:text-gray-400 text-center py-4">
              No services found for this consultant.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
