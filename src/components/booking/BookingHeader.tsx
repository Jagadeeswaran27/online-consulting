import { FaArrowLeft } from "react-icons/fa";

function BookingHeader({ handleBack }: { handleBack: () => void }) {
  return (
    <div className="bg-profile-gradient dark:bg-dark-gradient text-white p-6">
      <div className="flex items-center mb-2">
        <button
          onClick={handleBack}
          className="mr-4 w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all"
        >
          <FaArrowLeft size={16} />
        </button>
        <h1 className="text-2xl font-bold">Book a Consultation</h1>
      </div>
      <p className="text-white text-opacity-90 ml-12">
        Follow the steps to schedule your consultation
      </p>
    </div>
  );
}

export default BookingHeader;
