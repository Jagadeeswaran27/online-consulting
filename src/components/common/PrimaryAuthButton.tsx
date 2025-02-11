interface PrimaryAuthButtonProps {
  text: string;
  onClick?: () => void;
}
export default function PrimaryAuthButton({
  text,
  onClick,
}: PrimaryAuthButtonProps) {
  return (
    <button
      type="button"
      className="w-full bg-primaryRed rounded-lg text-white py-3 font-semibold hover:bg-black transition duration-300"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
