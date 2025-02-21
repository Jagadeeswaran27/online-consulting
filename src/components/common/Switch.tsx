interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export default function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <div>
      {label && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`${
          checked
            ? "bg-primaryRed dark:bg-secondaryRed"
            : "bg-gray-200 dark:bg-darkThemeSecondary"
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none `}
      >
        <span
          className={`${
            checked ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-100 shadow-lg transition-transform duration-200 ease-in-out`}
        />
      </button>
    </div>
  );
}
