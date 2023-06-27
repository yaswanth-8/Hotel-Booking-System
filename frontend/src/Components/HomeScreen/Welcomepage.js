import React from "react";
import Filters from "../Layouts/Filters/Filters";
import Auth from "../Auth/Auth";
import Hotels from "../Hotels/Hotels";
import { useSelector } from "react-redux";

function Homescreen({ isAuthVisible }) {
  const auth = useSelector((state) => state.auth.user);

  return (
    <div
      className={`app ${
        isAuthVisible && auth === "no-user" ? "show-auth" : "hide-auth"
      }`}
    >
      <div className="filters-container">
        <Filters />
      </div>
      <div className="hotels-container">
        <Hotels />
      </div>

      {auth === "no-user" && isAuthVisible && (
        <div className="auth-container">
          <Auth />
        </div>
      )}
    </div>
  );
}

export default Homescreen;
