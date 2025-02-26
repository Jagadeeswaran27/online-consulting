import { useEffect, useState } from "react";
import { fetchServices } from "../../core/services/ServiceManager";
import { FaSpinner } from "react-icons/fa";
import type { Services } from "../../types/Services";

export default function Services() {
  const [selectedService, setSelectedService] = useState(0);
  const [services, setServices] = useState<Services[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleFetchServices = async () => {
      setIsLoading(true);
      const fetchedServices = await fetchServices();
      setServices(fetchedServices.slice(0, 3));
      setIsLoading(false);
    };
    handleFetchServices();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] sm:min-h-[493px] max-h-[493px]">
        <FaSpinner className="animate-spin" />
      </div>
    );
  }

  if (!isLoading && services.length === 0) {
    return (
      <div
        className="flex justify-center items-center"
        style={{
          minHeight: "300px",
          maxHeight: "calc(100vh - 191px)",
        }}
      >
        <p className="text-gray-500 text-lg">No services available</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-center text-3xl sm:text-4xl mb-10 sm:mb-20 font-semibold">
        Our Services
      </h1>
      {services && (
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-between w-full sm:w-[90%] md:w-[80%] mx-auto my-10 min-h-[300px] sm:min-h-[373px] max-h-full sm:max-h-[373px]">
          <div className="w-full md:w-[50%] h-full">
            <img
              src={services[selectedService].thumbnail}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-[50%] flex flex-col xl:gap-5 gap-2 justify-between">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`relative px-5 py-3 cursor-pointer transition-all duration-300`}
                onClick={() => setSelectedService(index)}
              >
                <div
                  className={`absolute left-0 top-0 h-full w-[3px] transition-all duration-300 ${
                    selectedService === index
                      ? "bg-black dark:invert"
                      : "bg-transparent"
                  }`}
                ></div>

                <h1 className="font-semibold text-[20px] sm:text-[25px] lg:text-[30px] xl:text-[40px]">
                  Consult for {service.name}
                </h1>
                <p className="text-[12px] sm:text-[14px] xl:text-[18px]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
