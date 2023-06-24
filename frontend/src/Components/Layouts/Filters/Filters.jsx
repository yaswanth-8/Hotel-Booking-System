import React from "react";
import Filter from "./Filter/Filter";
import "./Filters.css";

function Filters() {
  const priceRange = [2000, 4000, 5000];
  const customerRatings = [3, 4, 5];
  const countries = ["India", "France", "Australia", "United Kingdom"];

  const handleFilterChange = (checkedValues) => {
    console.log("Checked Values:", checkedValues);
  };

  return (
    <div className="filters-container">
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
