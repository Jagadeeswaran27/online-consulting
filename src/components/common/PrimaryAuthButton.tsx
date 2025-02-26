import { FaSpinner } from "react-icons/fa";

interface PrimaryAuthButtonProps {
  text: string;
  onClick?: (e: React.FormEvent) => void;
  isLoading?: boolean;
  isSmall?: boolean;
}
export default function PrimaryAuthButton({
  text,
  onClick,
  isSmall,
  isLoading,
}: PrimaryAuthButtonProps) {
  return (
    <button
      type="button"
      className={`w-full bg-primaryRed rounded-lg text-center ${
        isSmall ? "max-h-[40px]" : "min-h-[48px]"
      }  text-white py-3 font-semibold hover:bg-secondaryRed transition duration-300 px-2 flex items-center justify-center`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <FaSpinner className="animate-spin" /> : text}
    </button>
  );
}
