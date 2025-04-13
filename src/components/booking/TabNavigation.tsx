import { FaCheckCircle } from "react-icons/fa";

interface TabNavigationProps {
  step: number;
  setStep: (step: number) => void;
  sid: string | null;
}
function TabNavigation({ step, setStep, sid }: TabNavigationProps) {
  return (
    <div className="border-b border-formBorder dark:border-formBorder-dark">
      <div className="flex flex-wrap">
        <div
          className={`py-2 px-2 sm:py-3 sm:px-4 md:py-4 md:px-6 relative flex-1 text-center ${
            step === 1
              ? "text-primaryRed font-semibold border-b-2 border-primaryRed"
              : "text-textMuted dark:text-textMuted-dark hover:bg-gray-50 dark:hover:bg-darkThemeSecondary cursor-pointer"
          } ${sid ? "pointer-events-none opacity-70" : ""}`}
          onClick={() => !sid && step > 1 && setStep(1)}
        >
          <div className="flex items-center justify-center sm:justify-start">
            <div
              className={`w-6 h-6 rounded-full sm:mr-2 flex items-center justify-center text-xs ${
                step > 1
                  ? "bg-green-500 text-white"
                  : step === 1
                  ? "bg-primaryRed text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {step > 1 ? <FaCheckCircle size={14} /> : "1"}
            </div>
            <span className="hidden sm:inline">
              {sid ? "Service Selected" : "Select Service"}
            </span>
          </div>
          {step === 1 && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primaryRed" />
          )}
        </div>

        <div
          className={`py-2 px-2 sm:py-3 sm:px-4 md:py-4 md:px-6 relative flex-1 text-center ${
            step === 2
              ? "text-primaryRed font-semibold border-b-2 border-primaryRed"
              : "text-textMuted dark:text-textMuted-dark hover:bg-gray-50 dark:hover:bg-darkThemeSecondary cursor-pointer"
          } ${step < 2 ? "opacity-70" : ""}`}
          onClick={() => step > 2 && setStep(2)}
        >
          <div className="flex items-center justify-center sm:justify-start">
            <div
              className={`w-6 h-6 rounded-full sm:mr-2 flex items-center justify-center text-xs ${
                step > 2
                  ? "bg-green-500 text-white"
                  : step === 2
                  ? "bg-primaryRed text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {step > 2 ? <FaCheckCircle size={14} /> : "2"}
            </div>
            <span className="hidden sm:inline">Choose Mode</span>
          </div>
          {step === 2 && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primaryRed" />
          )}
        </div>

        <div
          className={`py-2 px-2 sm:py-3 sm:px-4 md:py-4 md:px-6 relative flex-1 text-center ${
            step === 3
              ? "text-primaryRed font-semibold border-b-2 border-primaryRed"
              : "text-textMuted dark:text-textMuted-dark hover:bg-gray-50 dark:hover:bg-darkThemeSecondary cursor-pointer"
          } ${step < 3 ? "opacity-70" : ""}`}
        >
          <div className="flex items-center justify-center sm:justify-start">
            <div
              className={`w-6 h-6 rounded-full sm:mr-2 flex items-center justify-center text-xs ${
                step > 3
                  ? "bg-green-500 text-white"
                  : step === 3
                  ? "bg-primaryRed text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {step > 3 ? <FaCheckCircle size={14} /> : "3"}
            </div>
            <span className="hidden sm:inline">Confirm Booking</span>
          </div>
          {step === 3 && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primaryRed" />
          )}
        </div>
      </div>
    </div>
  );
}

export default TabNavigation;
