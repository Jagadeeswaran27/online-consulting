import { FaBriefcase, FaEnvelope } from "react-icons/fa";
import { Images } from "../../resources/Images";
import { ConsultantUser } from "../../types/Users";
import RenderStars from "./RenderStars";
interface ConsultantProfileCardProps {
  consultant: ConsultantUser;
}
export default function ConsultantProfileCard({
  consultant,
}: ConsultantProfileCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
      <div className="flex-shrink-0 mx-auto md:mx-0">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white dark:border-darkThemeCard overflow-hidden shadow-lg">
          <img
            src={consultant.photoURL || Images.placeholderImage}
            alt={consultant.userName}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = Images.placeholderImage;
            }}
          />
        </div>
      </div>

      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-textHeading dark:text-white">
          {consultant.userName}
        </h1>

        <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
          <div className="flex">
            {<RenderStars rating={Math.round(consultant.avgRating)} />}
          </div>
          <span className="text-textMuted dark:text-textMuted-dark">
            ({consultant.avgRating.toFixed(1)})
          </span>
          <span className="text-textMuted dark:text-textMuted-dark">
            · {consultant.reviewCount} reviews
          </span>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 justify-center md:justify-start text-textBody dark:text-textBody-dark">
            <FaBriefcase className="text-primaryRed" />
            <span>{consultant.experience} years of experience</span>
          </div>

          <div className="flex items-center gap-2 justify-center md:justify-start text-textBody dark:text-textBody-dark">
            <FaEnvelope className="text-primaryRed" />
            <span>{consultant.email}</span>
          </div>
        </div>

        <div className="mt-6 hidden md:block">
          <button className="px-6 py-3 bg-primaryRed hover:bg-secondaryRed text-white rounded-lg font-medium transition-colors shadow-md">
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
