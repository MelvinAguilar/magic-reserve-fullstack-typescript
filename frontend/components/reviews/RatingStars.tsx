
interface RatingStarsProps {
  rating: number;
  quantity?: number;
  small?: boolean;
}

const RatingStars = ({ rating, quantity, small }: RatingStarsProps) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <div
          className={`relative w-[5ch] overflow-hidden !leading-none text-gray-500 ${small ? "text-3xl" : "text-5xl"}`}
        >
          <span
            className={`empty-stars grid ${small ? "small-stars" : ""}`}
          ></span>
          <span
            style={{ width: `${rating * 20}%` }}
            className={`full-stars absolute left-0 top-0 grid overflow-hidden
             text-yellow-500 placeholder:absolute ${
               small ? "small-stars" : ""
             }`}
          ></span>
        </div>
        {quantity ? (
          <p className="text-gray-500">{rating} out of 5</p>
        ) : (
          <p className="text-gray-500">No reviews yet</p>
        )}
      </div>
      {quantity && <p>{quantity} reviews</p>}
    </>
  );
};

export default RatingStars;
