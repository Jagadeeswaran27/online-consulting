import { useNavigate } from "react-router-dom";
import { Images } from "../../resources/Images";
import { Services } from "../../types/Services";
import PrimaryAuthButton from "../common/PrimaryAuthButton";
import { Routes } from "../../utils/Routes";

interface ServiceCardProps {
  service: Services;
}
export default function ServiceCard({ service }: ServiceCardProps) {
  const navigate = useNavigate();
  const handleExplore = () => {
    navigate(`${Routes.services}/${service.id}`);
  };
  return (
    <div className="bg-white dark:bg-darkThemeCard shadow-customLight rounded-lg overflow-hidden">
      <img
        src={service.thumbnail || Images.placeholderImage}
        alt={service.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-primaryRed mb-2">
          {service.name}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {service.description}
        </p>
        <PrimaryAuthButton onClick={handleExplore} text="Explore" />
      </div>
    </div>
  );
}
