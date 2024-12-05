import React from 'react';
import ReactStars from 'react-rating-stars-component';

const StarRating = ({ value, onChange, readonly = false }) => {
  return (
    <ReactStars
      count={5}
      value={value}
      onChange={onChange}
      size={30}
      activeColor="#ffd700"
      isHalf={true}
      edit={!readonly}
    />
  );
};

export default StarRating;
