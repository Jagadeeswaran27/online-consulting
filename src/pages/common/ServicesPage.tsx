import { useEffect, useState } from "react";
import { Services } from "../../types/Services";
import { FaSpinner } from "react-icons/fa";
import { fetchServices } from "../../core/services/ServiceManager";
import ServiceCard from "../../components/services/ServiceCard";

export default function ServicesPage() {
  const [services, setServices] = useState<Services[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleFetchServices = async () => {
      setIsLoading(true);
      const fetchedServices = await fetchServices();
      setServices(fetchedServices);
      setIsLoading(false);
    };
    handleFetchServices();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-81px)]">
        <FaSpinner
          size={40}
          className="animate-spin"
          style={{ color: "#ed2a4f" }}
        />
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center">
        <p className="text-gray-500 text-lg">
          No services available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-12 ">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
