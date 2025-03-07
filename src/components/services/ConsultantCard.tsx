import { FaUserCircle } from "react-icons/fa";
import { Images } from "../../resources/Images";
import { ConsultantUser } from "../../types/Users";
import RenderStars from "./RenderStars";
import { Link } from "react-router-dom";
import { Routes } from "../../utils/Routes";

interface ConsultantCardProps {
  consultant: ConsultantUser;
  sid?: string;
}
export default function ConsultantCard({
  sid,
  consultant,
}: ConsultantCardProps) {
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
    </>
  );
}
