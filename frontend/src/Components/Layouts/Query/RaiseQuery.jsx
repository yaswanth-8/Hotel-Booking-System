import React, { useState } from "react";
import "./RaiseQuery.css";

const RaiseQuery = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the query submission logic here
    console.log(query);
    // Reset the query input
    setQuery("");
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="raise-query">
      <h2>Raise Query</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={handleChange}
          placeholder="Enter your query"
          rows={4}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RaiseQuery;
