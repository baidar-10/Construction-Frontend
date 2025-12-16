import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, size = 16, showNumber = true }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${
            star <= Math.floor(rating)
              ? 'fill-amber-400 text-amber-400'
              : star - 0.5 <= rating
              ? 'fill-amber-400 text-amber-400 opacity-50'
              : 'fill-gray-300 text-gray-300'
          }`}
        />
      ))}
      {showNumber && (
        <span className="ml-1 text-sm font-semibold text-gray-700">{rating}</span>
      )}
    </div>
  );
};

export default StarRating;