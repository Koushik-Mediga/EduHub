import React from 'react'
import StarRatings from 'react-star-ratings';

const StarRating = ({ rating }) => {
  return (
    <StarRatings
      rating={rating}
      starDimension="20px"
      starSpacing="1px"
      starRatedColor="#FFD60A"
      starEmptyColor="#2C333F"
    />
  );
}

export default StarRating