import React from "react";

const FilterGroup = ({ minRating, onRatingClick, ratings }) => {
  return (
    <ul className="movie_filter align_center">
      {ratings.map((rate) => {
        return (
          <li
            className={`movie_filter_item ${minRating == rate ? "active" : ""}`}
            key={rate}
            onClick={() => {
              onRatingClick(rate);
            }}
          >
            {rate}+ star
          </li>
        );
      })}
    </ul>
  );
};

export default FilterGroup;
