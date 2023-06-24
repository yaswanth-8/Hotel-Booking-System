import React, { useState } from "react";

function Filter({ filterList, heading, onFilterChange }) {
  const [checkedValues, setCheckedValues] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    let updatedCheckedValues = [...checkedValues];

    if (isChecked) {
      updatedCheckedValues.push(value);
    } else {
      updatedCheckedValues = updatedCheckedValues.filter(
        (val) => val !== value
      );
    }

    setCheckedValues(updatedCheckedValues);
    onFilterChange(updatedCheckedValues);
  };

  return (
    <div className="filter-section">
      <h3>{heading}</h3>
      {filterList.map((filter) => (
        <div key={filter}>
          <input
            type="checkbox"
            id={filter}
            value={filter}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={filter}>{filter}</label>
        </div>
      ))}
    </div>
  );
}

export default Filter;
