import { useState } from "react";
import {
  FaUserCircle,
  FaHeart,
  FaBriefcase,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { ConsultantUser } from "../../types/Users";
import { Images } from "../../resources/Images";
import { updateKudosForConsultant } from "../../core/services/UserService";
import { showToast } from "../../utils/Toast";
import { auth } from "../../core/config/Firebase";
import RenderStars from "./RenderStars";
import { GeneralSettings } from "../../types/Settings";

interface ConsultantProfileCardProps {
  consultant: ConsultantUser;
  onBook: () => void;
  consultantGenerealSettings: GeneralSettings | null;
}

export default function ConsultantProfileCard({
  consultant,
  onBook,
  consultantGenerealSettings,
}: ConsultantProfileCardProps) {
  const [kudosCount, setKudosCount] = useState<number>(
    consultant.kudos ? consultant.kudos.length : 0
  );
  const [hasGivenKudos, setHasGivenKudos] = useState(
    consultant.kudos?.includes(auth.currentUser?.uid || "") || false
  );

  const handleKudosClick = async () => {
    if (hasGivenKudos) {
      setKudosCount((prev) => prev - 1);
    } else {
      setKudosCount((prev) => prev + 1);
    }

    const response = await updateKudosForConsultant(
      consultant.cid,
      auth.currentUser?.uid || ""
    );

    if (response) {
      setHasGivenKudos(!hasGivenKudos);
    } else {
      // Revert the count if operation failed
      if (hasGivenKudos) {
        setKudosCount((prev) => prev + 1);
      } else {
        setKudosCount((prev) => prev - 1);
      }
      showToast({
        message: "Error giving kudos. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-6">
      <div className="mx-auto md:mx-0">
        {consultant.photoURL ? (
          <img
            src={consultant.photoURL}
            alt={consultant.userName}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white dark:border-darkThemeCard shadow-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = Images.placeholderImage;
            }}
          />
        ) : (
          <FaUserCircle className="w-24 h-24 md:w-32 md:h-32 text-gray-400 dark:text-gray-600" />
        )}
      </div>

      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-textHeading dark:text-white">
          {consultant.userName}
        </h1>
        <div className="flex items-center mt-1 justify-center md:justify-start">
          {<RenderStars rating={consultant.avgRating} />}
          <span className="dark:text-textMuted-dark text-textMuted text-sm">
            ({consultant.reviewCount})
          </span>
        </div>

        {/* Kudos section */}
        <div className="mt-3 flex items-center justify-center md:justify-start">
          <button
            onClick={handleKudosClick}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
              hasGivenKudos
                ? "text-white bg-primaryRed"
                : "text-textMuted dark:text-textMuted-dark hover:text-primaryRed dark:hover:text-primaryRed bg-formBg-selected dark:bg-formBg-selectedDark"
            }`}
            aria-label="Give kudos"
          >
            <FaHeart
              className={`${hasGivenKudos ? "animate-pulse" : ""}`}
              size={18}
            />
          </button>
          <span className="ml-2 text-sm font-medium text-textBody dark:text-textBody-dark">
            {kudosCount} {kudosCount === 1 ? "Kudo" : "Kudos"}
          </span>
          <span className="ml-3 text-xs text-textMuted dark:text-textMuted-dark">
            {hasGivenKudos ? "You gave kudos!" : "Give kudos"}
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

          {consultantGenerealSettings && (
            <div className="flex items-center gap-2 justify-center md:justify-start text-textBody dark:text-textBody-dark">
              <FaPhoneAlt className="text-primaryRed" />
              <span>
                Prefers {consultantGenerealSettings.contactPreference} contact
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="hidden md:block">
        <button
          onClick={onBook}
          className="px-6 py-3 bg-primaryRed hover:bg-secondaryRed text-white rounded-lg font-medium transition-colors shadow-md"
        >
          Book Consultation
        </button>
      </div>
    </div>
  );
}
