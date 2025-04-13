import { FaCalendarAlt, FaLock, FaSpinner } from "react-icons/fa";
import { Services } from "../../types/Services";
import { ConsultantUser } from "../../types/Users";
import { generateTimeSlots } from "../../utils/Helper";

interface Step3Props {
  selectedService: Services;
  selectedMode: string;
  selectedDate: Date | null;
  selectedTime: string | null;
  consultant: ConsultantUser;
  fetchingSlots: boolean;
  timeError: string | null;
  datePickerRef: React.RefObject<HTMLInputElement> | null;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTimeChange: (time: string) => void;
  isTimeSlotBooked: (time: string) => boolean;
  openDatePicker: () => void;
}
function Step3({
  consultant,
  fetchingSlots,
  selectedDate,
  selectedMode,
  selectedService,
  selectedTime,
  timeError,
  datePickerRef,
  handleDateChange,
  handleTimeChange,
  isTimeSlotBooked,
  openDatePicker,
}: Step3Props) {
  return (
    <div>
      <h2 className="text-xl font-bold text-textHeading dark:text-white mb-6">
        Confirm Your Booking
      </h2>

      {/* Date and Time Selection */}
      <div className="bg-cardBg dark:bg-darkThemeSecondary rounded-lg p-6 mb-6 border border-formBorder dark:border-formBorder-dark">
        <h3 className="font-medium text-textHeading dark:text-white mb-4 pb-3 border-b border-formBorder dark:border-formBorder-dark flex items-center">
          <FaCalendarAlt className="mr-2" />
          Select Date and Time
        </h3>

        <div className="space-y-6">
          {/* Date Picker */}
          <div>
            <label className="block text-textMuted dark:text-textMuted-dark mb-2">
              Select Date
            </label>
            <div className="relative">
              <input
                ref={datePickerRef}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={
                  selectedDate ? selectedDate.toISOString().split("T")[0] : ""
                }
                onChange={handleDateChange}
                className="w-full p-3 pl-3 pr-10 rounded-lg border border-formBorder dark:border-formBorder-dark 
              bg-white dark:bg-darkThemeCard text-textBody dark:text-textBody-dark 
              [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute 
              [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={openDatePicker}
              >
                <FaCalendarAlt className="text-textMuted dark:text-textMuted-dark" />
              </div>
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-textMuted dark:text-textMuted-dark">
                  Select Time (10:00 AM - 5:00 PM)
                </label>
                {fetchingSlots && (
                  <div className="flex items-center text-sm text-textMuted dark:text-textMuted-dark">
                    <FaSpinner className="animate-spin mr-2" />
                    Checking availability...
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {generateTimeSlots().map((time) => {
                  const isBooked = isTimeSlotBooked(time);
                  return (
                    <button
                      key={time}
                      onClick={() => !isBooked && handleTimeChange(time)}
                      disabled={isBooked}
                      className={`p-2 rounded-lg border text-sm transition-colors relative ${
                        isBooked
                          ? "border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                          : selectedTime === time
                          ? "bg-primaryRed text-white border-primaryRed"
                          : "border-formBorder dark:border-formBorder-dark hover:border-primaryRed"
                      }`}
                    >
                      {!isBooked && time}
                      {isBooked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-50 rounded-lg">
                          <FaLock
                            size={12}
                            className="text-gray-500 dark:text-gray-400 mr-1"
                          />
                          <span className="text-xs">Booked</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              {timeError && (
                <p className="text-primaryRed text-sm mt-2">{timeError}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-cardBg dark:bg-darkThemeSecondary rounded-lg p-6 mb-6 border border-formBorder dark:border-formBorder-dark">
        <h3 className="font-medium text-textHeading dark:text-white mb-4 pb-3 border-b border-formBorder dark:border-formBorder-dark">
          Booking Summary
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between py-2">
            <span className="text-textMuted dark:text-textMuted-dark">
              Service:
            </span>
            <span className="font-medium text-textHeading dark:text-white">
              {selectedService.name}
            </span>
          </div>

          <div className="flex justify-between py-2 border-t border-formBorder dark:border-formBorder-dark border-opacity-40">
            <span className="text-textMuted dark:text-textMuted-dark">
              Mode:
            </span>
            <span className="font-medium text-textHeading dark:text-white">
              {selectedMode === "online"
                ? "Online Consultation"
                : "In-Person Consultation"}
            </span>
          </div>

          {consultant && (
            <div className="flex justify-between py-2 border-t border-formBorder dark:border-formBorder-dark border-opacity-40">
              <span className="text-textMuted dark:text-textMuted-dark">
                Consultant:
              </span>
              <span className="font-medium text-textHeading dark:text-white">
                {consultant.userName}
              </span>
            </div>
          )}

          {selectedDate && selectedTime && (
            <div className="flex justify-between py-2 border-t border-formBorder dark:border-formBorder-dark border-opacity-40">
              <span className="text-textMuted dark:text-textMuted-dark">
                Appointment:
              </span>
              <span className="font-medium text-textHeading dark:text-white">
                {selectedDate.toLocaleDateString()} at {selectedTime}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <p className="text-textMuted dark:text-textMuted-dark mb-6 bg-cardBg dark:bg-darkThemeSecondary p-4 rounded-lg">
          By confirming, you agree to our terms and conditions for consultation
          services.
        </p>
      </div>
    </div>
  );
}

export default Step3;
