import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface RenderStarsProps {
  rating: number;
}

const RenderStars = ({ rating }: RenderStarsProps) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.1;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar key={`full-${i}`} className="text-textStar mr-1" size={14} />
    );
  }
  if (hasHalfStar) {
    stars.push(
      <FaStarHalfAlt key="half" className="text-textStar mr-1" size={14} />
    );
  }
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar key={`empty-${i}`} className="text-textStar mr-1" size={14} />
    );
  }
  return (
    <div className="flex items-center" title={`${rating.toFixed(1)}`}>
      {stars}
    </div>
  );
};

export default RenderStars;
