import { FaLocationArrow, FaVideo } from "react-icons/fa";
import { Images } from "../../resources/Images";
import { Services } from "../../types/Services";
import { ContactPreference, GeneralSettings } from "../../types/Settings";
import { ConsultantUser } from "../../types/Users";

interface Step2Props {
  selectedService: Services;
  handleModeSelect: (mode: ContactPreference) => void;
  selectedMode: string | null;
  consultantSetting: GeneralSettings | null;
  consultant: ConsultantUser | null;
}
function Step2({
  selectedService,
  handleModeSelect,
  selectedMode,
  consultantSetting,
  consultant,
}: Step2Props) {
  return (
    <div>
      <h2 className="text-xl font-bold text-textHeading dark:text-white mb-6">
        Select Consultation Mode
      </h2>

      {/* Selected Service Info */}
      <div className="mb-6 p-4 bg-cardBg dark:bg-darkThemeSecondary rounded-lg border border-formBorder dark:border-formBorder-dark">
        <div className="flex gap-4">
          <img
            src={selectedService.thumbnail || Images.placeholderImage}
            alt={selectedService.name}
            className="w-16 h-16 object-cover rounded-md shadow-subtle"
            onError={(e) => {
              e.currentTarget.src = Images.placeholderImage;
            }}
          />
          <div className="flex-1">
            <h3 className="font-medium text-textHeading dark:text-white">
              {selectedService.name}
            </h3>
            <p className="text-sm text-textMuted dark:text-textMuted-dark mt-1">
              {selectedService.description.length > 100
                ? `${selectedService.description.substring(0, 100)}...`
                : selectedService.description}
            </p>
          </div>
        </div>
      </div>

      {/* Consultant Info (if available) */}
      {consultant && (
        <div className="mb-6 p-4 bg-cardBg dark:bg-darkThemeSecondary rounded-lg border border-formBorder dark:border-formBorder-dark">
          <h3 className="font-medium text-textHeading dark:text-white mb-2">
            Your Consultant
          </h3>
          <div className="flex gap-4 items-center">
            <img
              src={consultant.photoURL || Images.placeholderImage}
              alt={consultant.userName}
              className="w-12 h-12 object-cover rounded-full border-2 border-white dark:border-darkThemeSecondary shadow-subtle"
              onError={(e) => {
                e.currentTarget.src = Images.placeholderImage;
              }}
            />
            <div>
              <p className="font-medium text-textHeading dark:text-white">
                {consultant.userName}
              </p>
              <p className="text-sm text-textMuted dark:text-textMuted-dark">
                {`${consultant.experience} years experienced consultant`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mode Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => handleModeSelect("online")}
          className={`border-2 rounded-lg p-6 hover:shadow-highlight cursor-pointer transition-all ${
            selectedMode === "online"
              ? "border-primaryRed bg-softRed bg-opacity-10"
              : "border-formBorder dark:border-formBorder-dark hover:border-primaryRed dark:hover:border-primaryRed"
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primaryRed bg-opacity-10 rounded-full flex items-center justify-center mb-4">
              <FaVideo className="text-primaryRed" size={24} />
            </div>
            <h3 className="font-medium text-textHeading dark:text-white mb-2">
              Online Consultation
            </h3>
            <p className="text-sm text-textMuted dark:text-textMuted-dark">
              Meet your consultant virtually through in-built video call
            </p>
            {consultantSetting?.contactPreference === "online" && (
              <div className="mt-3 bg-green-100 dark:bg-green-900 dark:bg-opacity-30 text-green-800 dark:text-green-300 text-xs py-1 px-3 rounded-full font-medium">
                Preferred by consultant
              </div>
            )}
          </div>
        </div>

        <div
          onClick={() => handleModeSelect("offline")}
          className={`border-2 rounded-lg p-6 hover:shadow-highlight cursor-pointer transition-all ${
            selectedMode === "offline"
              ? "border-primaryRed bg-softRed bg-opacity-10"
              : "border-formBorder dark:border-formBorder-dark hover:border-primaryRed dark:hover:border-primaryRed"
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primaryRed bg-opacity-10 rounded-full flex items-center justify-center mb-4">
              <FaLocationArrow className="text-primaryRed" size={24} />
            </div>
            <h3 className="font-medium text-textHeading dark:text-white mb-2">
              Offline Consultation
            </h3>
            <p className="text-sm text-textMuted dark:text-textMuted-dark">
              Make your consultation through offline phone call
            </p>
            {consultantSetting?.contactPreference === "offline" && (
              <div className="mt-3 bg-green-100 dark:bg-green-900 dark:bg-opacity-30 text-green-800 dark:text-green-300 text-xs py-1 px-3 rounded-full font-medium">
                Preferred by consultant
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step2;
