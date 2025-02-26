import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Services } from "../../types/Services";
import { ConsultantUser } from "../../types/Auth";
import { fetchService } from "../../core/services/ServiceManager";
import { FaSpinner, FaUserCircle, FaStar } from "react-icons/fa";
import PrimaryAuthButton from "../../components/common/PrimaryAuthButton";

export default function ServicePage() {
  const [service, setService] = useState<Services | null>(null);
  const [consultants, setConsultants] = useState<ConsultantUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const handleFetchService = async () => {
      setIsLoading(true);
      if (!id) return;
      const response = await fetchService(id);
      setService(response);

      setConsultants([
        {
          userName: "Dr. John Smith",
          email: "john.smith@example.com",
          uid: "u1",
          type: "consultant",
          photoURL: "https://randomuser.me/api/portraits/men/32.jpg",
          cid: "c1",
          bio: "Specialized in cognitive behavioral therapy with over 10 years of experience.",
          experience: "10+ years",
        },
        {
          userName: "Dr. Emily Johnson",
          email: "emily.j@example.com",
          uid: "u2",
          type: "consultant",
          photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
          cid: "c2",
          bio: "Expert in family counseling and relationship guidance.",
          experience: "8 years",
        },
        {
          userName: "Dr. Michael Chen",
          email: "m.chen@example.com",
          uid: "u3",
          type: "consultant",
          cid: "c3",
          photoURL: "https://randomuser.me/api/portraits/women/68.jpg",
          bio: "Specialized in trauma recovery and stress management techniques.",
          experience: "12 years",
        },
        // {
        //   userName: "Dr. Sarah Williams",
        //   email: "sarah.w@example.com",
        //   uid: "u4",
        //   type: "consultant",
        //   photoURL: "https://randomuser.me/api/portraits/women/68.jpg",
        //   cid: "c4",
        //   bio: "Focusing on youth development and educational psychology.",
        //   experience: "7 years",
        // },
      ]);

      setIsLoading(false);
    };

    handleFetchService();
  }, [id]);

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
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-bannerLight to-white dark:from-darkThemeSecondary dark:to-darkTheme py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white text-textHeading">
                {service.name}
              </h1>
              <p className="text-textBody dark:text-textBody-dark text-lg">
                {service.description}
              </p>
              <div className="md:w-[40%] my-4">
                <PrimaryAuthButton isSmall={true} text="Book a Consultation" />
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src={service.thumbnail}
                alt={service.name}
                className="rounded-lg shadow-customLight w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Top Consultants Section */}
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 dark:text-white text-textHeading">
          Top Consultants
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {consultants.map((consultant) => (
            <div
              key={consultant.cid}
              className="bg-white dark:bg-darkThemeCard rounded-xl shadow-customLight p-6 "
            >
              <div className="flex items-center mb-4">
                {consultant.photoURL ? (
                  <img
                    src={consultant.photoURL}
                    alt={consultant.userName}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                ) : (
                  <FaUserCircle className="w-16 h-16 text-gray-400 dark:text-gray-600 mr-4" />
                )}
                <div>
                  <h3 className="font-bold text-textHeading dark:text-white">
                    {consultant.userName}
                  </h3>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="text-textStar mr-1"
                        size={14}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-textBody dark:text-textBody-dark mb-3 text-sm">
                {consultant.bio}
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-medium text-textMuted dark:text-textMuted-dark">
                  Experience: {consultant.experience}
                </span>
                <button className="text-primaryRed hover:text-secondaryRed font-medium text-sm transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-white dark:bg-darkThemeSecondary border border-primaryRed text-primaryRed hover:bg-primaryRed hover:text-white font-medium py-2 px-8 rounded-lg transition-colors">
            View All Consultants
          </button>
        </div>
      </div>
    </div>
  );
}
