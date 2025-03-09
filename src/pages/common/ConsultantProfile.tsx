import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchConsultantServices,
  fetchConsultantById,
} from "../../core/services/ConsultantService";
import { ConsultantUser } from "../../types/Users";
import { FaSpinner, FaCalendarAlt, FaPhone } from "react-icons/fa";
import { Images } from "../../resources/Images";
import { Services } from "../../types/Services";
import { Routes } from "../../utils/Routes";
import ConsultantRatings from "../../components/services/ConsultantRatings";
import ConsultantProfileCard from "../../components/services/ConsultantProfileCard";

export default function ConsultantProfile() {
  const [consultant, setConsultant] = useState<ConsultantUser | null>(null);
  const [services, setServices] = useState<Services[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [servicesLoading, setServicesLoading] = useState<boolean>(false);
  const { id, cid } = useParams<{ id?: string; cid: string }>();
  const navigate = useNavigate();

  const fetchConsultant = useCallback(async () => {
    if (!cid && id) return;
    setIsLoading(true);
    try {
      const response = await fetchConsultantById(cid!);
      setConsultant(response);

      if (response?.services && response.services.length > 0) {
        setServicesLoading(true);
        const servicesData = await fetchConsultantServices(response.services);
        setServices(servicesData);
        setServicesLoading(false);
      }
    } catch (error) {
      console.error("Error fetching consultant:", error);
    } finally {
      setIsLoading(false);
    }
  }, [cid, id]);

  useEffect(() => {
    fetchConsultant();
  }, [fetchConsultant]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-81px)]">
        <FaSpinner size={40} className="animate-spin text-primaryRed" />
      </div>
    );
  }

  if (!consultant) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-81px)]">
        <p className="text-lg text-textMuted dark:text-textMuted-dark">
          Consultant not found
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-darkTheme min-h-screen pb-12">
      <div
        style={{
          backgroundImage: `url(${Images.profileBg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0% 10%",
        }}
        className="h-40 md:h-96 w-full bg-cover"
      ></div>

      <div className="container mx-auto max-w-6xl px-4 -mt-16 md:-mt-24">
        <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-profileCard mb-8">
          <div className="p-6 md:p-8">
            <ConsultantProfileCard consultant={consultant} />

            <div className="mt-6 flex justify-center md:hidden">
              <button className="w-full px-6 py-3 bg-primaryRed hover:bg-secondaryRed text-white rounded-lg font-medium transition-colors shadow-md">
                Book Consultation
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-customLight p-6 md:p-8">
              <h2 className="text-xl font-bold text-textHeading dark:text-white mb-4">
                About
              </h2>
              <p className="text-textBody dark:text-textBody-dark whitespace-pre-line">
                {consultant.bio || "No biography provided."}
              </p>
            </div>

            <ConsultantRatings cid={cid!} />
          </div>

          <div className="space-y-8">
            {/* Services section */}
            <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-customLight p-6">
              <h2 className="text-xl font-bold text-textHeading dark:text-white mb-4">
                Services
              </h2>

              {servicesLoading ? (
                <div className="flex justify-center py-8">
                  <FaSpinner
                    size={24}
                    className="animate-spin text-primaryRed"
                  />
                </div>
              ) : services && services.length > 0 ? (
                <div className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex gap-3 p-3 hover:bg-cardBg dark:hover:bg-darkThemeSecondary rounded-lg transition-colors cursor-pointer"
                      onClick={() =>
                        navigate(`${Routes.services}/${service.id}`)
                      }
                    >
                      <img
                        src={service.thumbnail || Images.placeholderImage}
                        alt={service.name}
                        className="w-16 h-16 object-cover rounded-md"
                        onError={(e) => {
                          e.currentTarget.src = Images.placeholderImage;
                        }}
                      />
                      <div>
                        <h4 className="font-medium text-textHeading dark:text-white">
                          {service.name}
                        </h4>
                        <p className="text-sm text-textMuted dark:text-textMuted-dark line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-textMuted dark:text-textMuted-dark">
                  No services available.
                </p>
              )}
            </div>

            {/* Experience highlight */}
            <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-customLight p-6">
              <h2 className="text-xl font-bold text-textHeading dark:text-white mb-4">
                Experience
              </h2>
              <div className="flex items-center gap-3 p-4 bg-cardBg dark:bg-darkThemeSecondary rounded-lg">
                <div className="w-12 h-12 bg-primaryRed bg-opacity-10 rounded-full flex items-center justify-center">
                  <FaCalendarAlt className="text-primaryRed" size={20} />
                </div>
                <div>
                  <p className="text-textMuted dark:text-textMuted-dark text-sm">
                    Years of Experience
                  </p>
                  <p className="text-xl font-bold text-textHeading dark:text-white">
                    {consultant.experience}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-darkThemeCard rounded-xl shadow-customLight p-6">
              <h2 className="text-xl font-bold text-textHeading dark:text-white mb-4">
                Contact Information
              </h2>
              <div className="flex items-center gap-3 p-4 bg-cardBg dark:bg-darkThemeSecondary rounded-lg">
                <div className="w-12 h-12 bg-primaryRed bg-opacity-10 rounded-full flex items-center justify-center">
                  <FaPhone className="text-primaryRed" size={20} />
                </div>
                <div>
                  <p className="text-textMuted dark:text-textMuted-dark text-sm">
                    Contact
                  </p>
                  <p className="text-xl font-bold text-textHeading dark:text-white break-words">
                    {consultant.contact || "No contact information provided."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
