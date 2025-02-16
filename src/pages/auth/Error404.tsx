import Lottie from "lottie-react";
import { Animations } from "../../resources/Animations";
import { Link } from "react-router-dom";
import { Routes } from "../../utils/Routes";

export default function Error404() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        minHeight: "calc(100vh - 180px)",
        maxHeight: "calc(100vh - 180px)",
      }}
    >
      <Lottie
        animationData={Animations.errorAnimation}
        loop={true}
        className="w-48 h-48 md:w-72 md:h-72"
      />
      <p className="text-2xl font-bold text-center">
        The page you are looking for does not exist.
      </p>
      <Link
        to={Routes.home}
        className="text-primaryRed mt-3 border-primaryRed border-2 py-[6px] px-3 font-semibold hover:bg-black hover:border-black hover:text-white transition-all duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
}
