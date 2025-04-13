import { FaAngleRight } from "react-icons/fa";
import { Images } from "../../resources/Images";
import { Services } from "../../types/Services";

interface Step1Props {
  services: Services[];
  handleServiceSelect: (service: Services) => void;
}
function Step1({ services, handleServiceSelect }: Step1Props) {
  return (
    <div>
      <h2 className="text-xl font-bold text-textHeading dark:text-white mb-6">
        Select a Service
      </h2>

      {services.length === 0 ? (
        <p className="text-textMuted dark:text-textMuted-dark">
          No services available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceSelect(service)}
              className="border border-formBorder dark:border-formBorder-dark rounded-lg p-4 hover:border-primaryRed dark:hover:border-primaryRed hover:bg-cardBg dark:hover:bg-darkThemeSecondary cursor-pointer transition-all shadow-subtle hover:shadow-highlight"
            >
              <div className="flex gap-4">
                <img
                  src={service.thumbnail || Images.placeholderImage}
                  alt={service.name}
                  className="w-20 h-20 object-cover rounded-md"
                  onError={(e) => {
                    e.currentTarget.src = Images.placeholderImage;
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-medium text-textHeading dark:text-white">
                    {service.name}
                  </h3>
                  <p className="text-sm text-textMuted dark:text-textMuted-dark line-clamp-2 mt-1">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-softRed flex items-center justify-center">
                    <FaAngleRight className="text-primaryRed" size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Step1;
