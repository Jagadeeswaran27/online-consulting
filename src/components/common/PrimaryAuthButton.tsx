import { FaSpinner } from "react-icons/fa";

interface PrimaryAuthButtonProps {
  text: string;
  onClick?: () => void;
  isLoading?: boolean;
}
export default function PrimaryAuthButton({
  text,
  onClick,
  isLoading,
}: PrimaryAuthButtonProps) {
  return (
    <button
      type="button"
      className="w-full bg-primaryRed rounded-lg text-center min-h-[48px] text-white py-3 font-semibold hover:bg-secondaryRed transition duration-300 flex items-center justify-center"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <FaSpinner className="animate-spin" /> : text}
    </button>
  );
}
