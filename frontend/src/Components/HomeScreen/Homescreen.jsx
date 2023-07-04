import React, { useState } from "react";
import Filters from "../Layouts/Filters/Filters";
import Hotels from "../Hotels/Hotels";
import "./Homescreen.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

function Homescreen() {
  const [isFilterVisible, setFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setFilterVisible(!isFilterVisible);
  };

  return (
    <div className="Homescreen-container">
      <div className="filter-button" onClick={toggleFilterVisibility}>
        {/* <FontAwesomeIcon
          icon={faAnglesLeft}
          size="xl"
          style={{ color: "#c7c7c7" }}
        /> */}
        {!isFilterVisible ? (
          <FontAwesomeIcon
            icon={faAnglesRight}
            size="xl"
            style={{ color: "#c7c7c7" }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faAnglesLeft}
            size="xl"
            style={{ color: "#c7c7c7" }}
          />
        )}
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
