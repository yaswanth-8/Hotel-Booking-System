import React from "react";
import Filter from "./Filter/Filter";
import "./Filters.css";
import { useDispatch } from "react-redux";
import {
  setPriceFilter,
  setRatingFilter,
} from "../../../store/Filter/filterSlice";

function Filters() {
  const priceRange = [10000, 25000, 50000, 100000];
  const customerRatings = [3, 4, 5];
  const countries = ["India", "France", "Australia", "United Kingdom"];
  const dispatch = useDispatch();

  const handleFilterChange = (checkedValues) => {
    if (!checkedValues) {
      dispatch(setPriceFilter(1000000));
      dispatch(setRatingFilter(6));
    }
  };

  return (
    <div className="filters-area">
      <Filter
        filterList={priceRange}
        heading="Price Range"
        onFilterChange={handleFilterChange}
      />
      <Filter
        filterList={customerRatings}
        heading="Ratings"
        onFilterChange={handleFilterChange}
      />
      <Filter
        filterList={countries}
        heading="Countries"
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}

export default Filters;
