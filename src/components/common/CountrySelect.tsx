import { useState, useRef, useEffect } from "react";
import { countries } from "../../utils/Countries";
import { BiCheckCircle } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";

interface CountrySelectProps {
  value: string | null;
  onChange: (code: string) => void;
  onSave: () => void;
}

export default function CountrySelect({
  value,
  onChange,
  onSave,
}: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry = countries.find((country) => country.code === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOnSave = () => {
    onSave();
    setShowSelect(false);
  };

  if (!showSelect) {
    if (!selectedCountry) {
      return (
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-2 border rounded-lg 
                     border-gray-300 dark:border-gray-600 bg-white dark:bg-darkThemeSecondary"
          >
            <span className="text-gray-500 dark:text-gray-400">
              Select a country
            </span>
          </div>
          <button
            onClick={() => setShowSelect(true)}
            className="px-3 py-2 text-sm text-primaryRed dark:text-secondaryRed 
                   hover:text-secondaryRed dark:hover:text-primaryRed transition-colors"
          >
            Select
          </button>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 px-3 py-2 border rounded-lg 
                     border-gray-300 dark:border-gray-600 bg-white dark:bg-darkThemeSecondary"
        >
          <img
            src={selectedCountry.flag}
            alt={selectedCountry.name}
            className="w-6 h-4 object-cover rounded-sm"
          />
          <span className="text-gray-900 dark:text-gray-100">
            {selectedCountry.name}
          </span>
        </div>
        <button
          onClick={() => setShowSelect(true)}
          className="px-3 py-2 text-sm text-primaryRed dark:text-secondaryRed 
                   hover:text-secondaryRed dark:hover:text-primaryRed transition-colors"
        >
          Change
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex items-center gap-4" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 border rounded-lg 
                 border-gray-300 dark:border-gray-600 bg-white dark:bg-darkThemeSecondary
                 hover:border-primaryRed dark:hover:border-secondaryRed transition-colors"
      >
        {selectedCountry ? (
          <>
            <div className="flex items-center gap-2">
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                className="w-6 h-4 object-cover rounded-sm"
              />
              <span className="text-gray-900 dark:text-gray-100">
                {selectedCountry.name}
              </span>
            </div>
          </>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">
            Select country...
          </span>
        )}
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 bg-white dark:bg-darkThemeSecondary border 
                      border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => {
                onChange(country.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 
                         dark:hover:bg-darkThemeCard transition-colors ${
                           value === country.code
                             ? "bg-gray-50 dark:bg-darkThemeCard"
                             : ""
                         }`}
            >
              <img
                src={country.flag}
                alt={country.name}
                className="w-6 h-4 object-cover rounded-sm"
              />
              <span className="text-gray-900 dark:text-gray-100">
                {country.name}
              </span>
            </button>
          ))}
        </div>
      )}
      <div
        className="flex items-center gap-2"
        onClick={() => setShowSelect(false)}
      >
        <GiCancel size={25} className="cursor-pointer" />
        <BiCheckCircle
          size={30}
          onClick={handleOnSave}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
