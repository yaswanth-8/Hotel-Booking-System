import React, { useEffect, useState } from "react";
import Filter from "./Filter/Filter";
import "./Filters.css";

import axios from "axios";

function Filters() {
  const [countries, setCountries] = useState();
  const priceRange = [10000, 25000, 50000, 100000];
  const customerRatings = [3, 4, 5];

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5225/api/hotels/countries"
      );
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="filters-area">
      <Filter filterList={priceRange} heading="Price Range" />
      <Filter filterList={customerRatings} heading="Ratings" />
      {countries && <Filter filterList={countries} heading="Countries" />}
    </div>
  );
}

export default Filters;
