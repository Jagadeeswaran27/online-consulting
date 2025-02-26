import { Link } from "react-router-dom";
import { Images } from "../../resources/Images";
import { Routes } from "../../utils/Routes";
import { useContext } from "react";
import { AuthContext } from "../../store/context/auth";

export default function Hero() {
  const { user } = useContext(AuthContext);
  return (
    <div
      className="flex flex-col text-white gap-5 sm:gap-10 items-center justify-center py-10 sm:py-20 px-4 sm:px-0 max-sm:min-h-[500px] max-sm:max-h-[100vh] min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)]"
      style={{
        background: `url(${Images.hero}) no-repeat center center/cover`,
      }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold text-shadow-lg text-center">
        Get Expert Consultation Online
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl font-medium text-center max-w-[95%] sm:max-w-[90%] md:max-w-[80%] text-shadow-lg-dark">
        Select from a variety of services such as Electronics, Hotels, and
        Automobiles. Choose your preferred consultant and have a video
        consultation through our inbuilt feature. Leave a review after your
        session!
      </p>
      {user?.type !== "admin" ? (
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mt-4">
          <Link
            to={Routes.services}
            className="bg-primaryRed text-white py-2 px-5 font-semibold hover:bg-secondaryRed hover:text-white transition-all duration-300 text-center"
          >
            Browse Services
          </Link>
          <Link
            to={Routes.consultantSignup}
            className="text-white bg-black border-black border-2 py-[6px] px-3 font-semibold hover:bg-darkThemeSecondary hover:border-gray-800 hover:text-white transition-all duration-300 shadow-lg text-center"
          >
            Become a Consultant
          </Link>
        </div>
      ) : (
        <Link
          to={Routes.adminDashboard}
          className="bg-primaryRed text-white py-2 px-5 font-semibold hover:bg-secondaryRed hover:text-white transition-all duration-300 mt-4"
        >
          Go to Dashboard
        </Link>
      )}
    </div>
  );
}
