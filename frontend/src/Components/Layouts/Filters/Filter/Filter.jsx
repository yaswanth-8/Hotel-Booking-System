import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountryFilter,
  setPriceFilter,
  setRatingFilter,
} from "../../../../store/Filter/filterSlice";

function Filter({ filterList, heading }) {
  const dispatch = useDispatch();
  const selectedValue = useSelector((state) => {
    if (heading === "Price Range") {
      return state.filter.price;
    }
    if (heading === "Ratings") {
      return state.filter.rating;
    }
    if (heading === "Countries") {
      return state.filter.country;
    }
    return null;
  });

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      if (heading === "Price Range") {
        dispatch(setPriceFilter(value));
      }
      if (heading === "Ratings") {
        dispatch(setRatingFilter(value));
      }
      if (heading === "Countries") {
        dispatch(setCountryFilter(value));
      }
    } else {
      if (heading === "Price Range" && selectedValue === value) {
        dispatch(setPriceFilter(1000000));
      }
      if (heading === "Ratings" && selectedValue === value) {
        dispatch(setRatingFilter(0));
      }
      if (heading === "Countries" && selectedValue === value) {
        dispatch(setCountryFilter(null));
      }
    }
  };

  return (
    <div className="filter-section">
      <h3>
        {heading} {heading === "Countries" ? " 🌎 " : ""}{" "}
        {heading === "Price Range" ? " ( ₹ ) " : ""}
        {heading === "Ratings" ? " ⭐ " : ""}
      </h3>
      {filterList.map((filter) => {
        const isSelected = String(selectedValue) === String(filter);

        return (
          <div key={filter}>
            <input
              type="checkbox"
              id={filter}
              value={filter.toString()}
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={filter}>{filter}</label>
          </div>
        );
      })}
    </div>
  );
}

export default Filter;
