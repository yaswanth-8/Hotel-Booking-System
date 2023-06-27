import React, { useState } from "react";
import Filters from "../Layouts/Filters/Filters";
import Hotels from "../Hotels/Hotels";
import "./Homescreen.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

function Homescreen() {
  const [isFilterVisible, setFilterVisible] = useState(true);

  const toggleFilterVisibility = () => {
    setFilterVisible(!isFilterVisible);
  };

  return (
    <div className="Homescreen-container">
      <div className="filter-button" onClick={toggleFilterVisibility}>
        <FontAwesomeIcon icon={faCaretRight} size="2xl" />
      </div>
      {isFilterVisible && (
        <div className="homescreen-filters-container">
          <Filters />
        </div>
      )}
      <Hotels />
    </div>
  );
}

export default Homescreen;
