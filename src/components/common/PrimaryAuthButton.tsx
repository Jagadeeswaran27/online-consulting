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
      className="w-full bg-primaryRed rounded-lg text-center text-white py-3 font-semibold hover:bg-black transition duration-300 flex items-center justify-center"
      onClick={onClick}
    >
      {isLoading ? <FaSpinner className="animate-spin" /> : text}
    </button>
  );
}
