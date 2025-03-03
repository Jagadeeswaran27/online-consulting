import { Services } from "../../types/Services";
import PrimaryAuthButton from "../common/PrimaryAuthButton";

interface ServiceHeaderProps {
  service: Services;
}

export default function ServiceHeader({ service }: ServiceHeaderProps) {
  return (
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
  );
}
