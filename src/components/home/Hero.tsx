import { Images } from "../../resources/Images";

export default function Hero() {
  return (
    <div
      className="flex flex-col text-white gap-10 items-center justify-center py-20 "
      style={{
        background: `url(${Images.hero}) no-repeat center center/cover`,
        minHeight: "calc(100vh - 80px)",
        maxHeight: "calc(100vh - 80px)",
      }}
    >
      <h1 className="text-[50px] font-semibold text-shadow-lg ">
        Get Expert Consultation Online
      </h1>
      <p className="text-lg font-medium text-center max-w-[80%] text-shadow-lg">
        Select from a variety of services such as Electronics, Hotels, and
        Automobiles. Choose your preferred consultant and have a video
        consultation through our inbuilt feature. Leave a review after your
        session!
      </p>
      <div className="flex gap-10">
        <button className="bg-primaryRed text-white py-2 px-5 font-semibold hover:bg-black hover:text-white transition-all duration-300">
          Browse Services
        </button>
        <button className="text-white border-white border-2 py-[6px] px-3 font-semibold hover:bg-black hover:border-black hover:text-white transition-all duration-300 shadow-lg">
          Become a Consultant
        </button>
      </div>
    </div>
  );
}
