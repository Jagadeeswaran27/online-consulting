export default function Hero() {
  return (
    <div className="flex flex-col text-white gap-10 items-center justify-center py-20  bg-gradient-to-r from-[#854af6] to-[#00bbe6] ">
      <h1 className="text-[50px] font-semibold">
        Get Expert Consultation Online
      </h1>
      <p className="text-lg font-medium text-center max-w-[80%]">
        Select from a variety of services such as Electronics, Hotels, and
        Automobiles. Choose your preferred consultant and have a video
        consultation through our inbuilt feature. Leave a review after your
        session!
      </p>
      <div className="flex gap-10">
        <button className="bg-primaryRed text-white py-2 px-5 font-semibold hover:bg-black hover:text-white transition-all duration-300">
          Browse Services
        </button>
        <button className="text-white border-white border-2 py-[6px] px-3 font-semibold hover:bg-black hover:border-black hover:text-white transition-all duration-300">
          Become a Consultant
        </button>
      </div>
    </div>
  );
}
