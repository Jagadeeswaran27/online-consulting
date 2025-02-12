export default function Banner() {
  return (
    <div className="relative w-[70%] mx-auto h-[260px]">
      <div className="absolute bg-[#b4aec4] rotate-2 w-full h-full"></div>
      <div className="absolute bg-[#d0cbd8] -rotate-1 w-full h-full flex items-center justify-center shadow-lg">
        <div className="flex gap-20 items-center justify-center p-10 py-20 rotate-1">
          <div className="flex flex-col gap-5">
            <h2 className="text-4xl font-medium">
              Ready to get expert advice?
            </h2>
            <p className="text-lg">
              Select a service and book a consultation with our experienced
              consultants today!
            </p>
          </div>
          <button className="bg-red-500 text-white py-2 px-5 font-semibold hover:bg-black transition-all duration-300">
            Book a Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
