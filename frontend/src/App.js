import React from "react";
import Filters from "./Components/Layouts/Filters/Filters";
import Auth from "./Components/Auth/Auth";
import "./App.css";
import Hotels from "./Components/Hotels/Hotels";
import { useSelector } from "react-redux";

function App() {
  const auth = useSelector((state) => state.auth.user);

  return (
    <div className="app">
      <div className="filters-container">
        <Filters />
      </div>
      <div className="hotels-container">
        <Hotels />
      </div>
      {auth === "no-user" ? (
        <div className="auth-container">
          <Auth />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
