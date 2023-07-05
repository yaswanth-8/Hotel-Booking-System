import React, { useState } from "react";

function Filter({ filterList, heading, onFilterChange }) {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedValue(value);
      onFilterChange([value, heading]);
    } else {
      setSelectedValue(null);
      onFilterChange(null);
    }
  };

  return (
    <div className="filter-section">
      <h3>{heading}</h3>
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
