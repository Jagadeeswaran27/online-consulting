interface NavigationButtonsProps {
  step: number;
  selectedMode: string | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  timeError: string | null;
  setStep: (step: number) => void;
  handleBack: () => void;
  handleConfirmBooking: () => void;
}
function NavigationButtons({
  step,
  selectedMode,
  selectedDate,
  selectedTime,
  timeError,
  setStep,
  handleBack,
  handleConfirmBooking,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={handleBack}
        className="px-6 py-2 border border-formBorder dark:border-formBorder-dark text-textBody dark:text-textBody-dark rounded-lg hover:bg-cardBg dark:hover:bg-darkThemeSecondary transition-colors"
      >
        Back
      </button>

      {step < 3 ? (
        <button
          onClick={() => (step === 1 ? null : setStep(step + 1))}
          disabled={step === 1 || (step === 2 && !selectedMode)}
          className={`px-6 py-2 bg-primaryRed hover:bg-secondaryRed text-white rounded-lg transition-colors shadow-customLight ${
            step === 1 || (step === 2 && !selectedMode)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Continue
        </button>
      ) : (
        <button
          onClick={handleConfirmBooking}
          disabled={!selectedDate || !selectedTime || timeError !== null}
          className={`px-6 py-2 bg-primaryRed hover:bg-secondaryRed text-white rounded-lg transition-colors shadow-customLight ${
            !selectedDate || !selectedTime || timeError !== null
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Confirm Booking
        </button>
      )}
    </div>
  );
}

export default NavigationButtons;
