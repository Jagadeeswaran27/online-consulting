export default function Banner() {
  return (
    <div className="relative w-[90%] sm:w-[80%] md:w-[70%] mx-auto h-auto min-h-[200px] sm:h-[260px] px-4 sm:px-0">
      <div className="absolute bg-[#b4aec4] dark:bg-[#2A232E] rotate-2 w-full h-full"></div>
      <div className="absolute bg-[#d0cbd8] dark:bg-[#3B323F] -rotate-1 w-full h-full flex items-center justify-center shadow-lg">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 md:gap-20 items-center justify-center p-6 sm:p-10 py-10 sm:py-20 rotate-1 text-center sm:text-left">
          <div className="flex flex-col gap-3 sm:gap-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium">
              Ready to get expert advice?
            </h2>
            <p className="text-base sm:text-lg">
              Select a service and book a consultation with our experienced
              consultants today!
            </p>
          </div>
          <button className="bg-red-500 text-white py-2 px-5 font-semibold hover:bg-secondaryRed transition-all duration-300 whitespace-nowrap">
            Book a Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
