import React from 'react'
import StarRatings from 'react-star-ratings';

const StarRating = ({ rating }) => {
  return (
    <StarRatings
      rating={rating}
      starDimension="15px"
      starSpacing="1px"
      starRatedColor="#FFD60A"
      starEmptyColor="#D3D3D3"
    />
  );
}

export default StarRating