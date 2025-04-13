import { FaUserCircle, FaHeart } from "react-icons/fa";
import { Images } from "../../resources/Images";
import { ConsultantUser } from "../../types/Users";
import RenderStars from "./RenderStars";
import { Link } from "react-router-dom";
import { Routes } from "../../utils/Routes";
import { useState } from "react";
import { auth } from "../../core/config/Firebase";
import { updateKudosForConsultant } from "../../core/services/UserService";
import { showToast } from "../../utils/Toast";

interface ConsultantCardProps {
  consultant: ConsultantUser;
  sid?: string;
}
export default function ConsultantCard({
  sid,
  consultant,
}: ConsultantCardProps) {
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

  const routePath = sid
    ? `${Routes.services}/${sid}/profile/${consultant.cid}`
    : `profile/${consultant.cid}`;

  return (
    <>
      <div className="flex items-center mb-4">
        {consultant.photoURL ? (
          <img
            src={consultant.photoURL}
            alt={consultant.userName}
            className="w-16 h-16 rounded-full object-cover mr-4"
            onError={(e) => {
              (e.target as HTMLImageElement).src = Images.placeholderImage;
            }}
          />
        ) : (
          <FaUserCircle className="w-16 h-16 text-gray-400 dark:text-gray-600 mr-4" />
        )}
        <div>
          <h3 className="font-bold text-textHeading dark:text-white">
            {consultant.userName}
          </h3>
          <div className="flex items-center mt-1">
            {<RenderStars rating={consultant.avgRating} />}
            <span className="dark:text-textMuted-dark text-textMuted text-xs">
              ({consultant.reviewCount})
            </span>
          </div>
        </div>
      </div>

      <p className="text-textBody dark:text-textBody-dark mb-3 text-sm line-clamp-3">
        {consultant.bio}
      </p>

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm font-medium text-textMuted dark:text-textMuted-dark">
          Experience: {consultant.experience}
        </span>
        <Link
          to={routePath}
          className="text-primaryRed hover:text-secondaryRed font-medium text-sm transition-colors"
        >
          View Profile
        </Link>
      </div>

      {/* Kudos section */}
      <div className="mt-3 pt-3 border-t border-formBorder dark:border-formBorder-dark flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={handleKudosClick}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
              hasGivenKudos
                ? "text-white bg-primaryRed"
                : "text-textMuted dark:text-textMuted-dark hover:text-primaryRed dark:hover:text-primaryRed bg-formBg-selected dark:bg-formBg-selectedDark"
            }`}
            aria-label="Give kudos"
          >
            <FaHeart className={`${hasGivenKudos ? "animate-pulse" : ""}`} />
          </button>
          <span className="ml-2 text-sm font-medium text-textBody dark:text-textBody-dark">
            {kudosCount} {kudosCount === 1 ? "Kudo" : "Kudos"}
          </span>
        </div>
        <span className="text-xs text-textMuted dark:text-textMuted-dark">
          {hasGivenKudos ? "You gave kudos!" : "Give kudos"}
        </span>
      </div>
    </>
  );
}
