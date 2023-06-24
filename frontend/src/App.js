import React from "react";
import Filters from "./Components/Layouts/Filters/Filters";
import Auth from "./Components/Auth/Auth";
import "./App.css";
import Hotels from "./Components/Hotels/Hotels";

function App() {
  return (
    <div className="app">
      <div className="filters-container">
        <Filters />
      </div>
      <div className="hotels-container">
        <Hotels />
      </div>
      <div className="auth-container">
        <Auth />
      </div>
    </div>
  );
}

export default App;
