import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, onClick, editable = false }) => {
  const handleClick = (star) => {
    if (editable && onClick) {
      onClick(star);
    }
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} onClick={() => handleClick(star)}>
          {value >= star ? (
            <FaStar />
          ) : value >= star - 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;