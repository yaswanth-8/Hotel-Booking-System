import React from "react";
import Auth from "../Auth/Auth";
import Hotels from "../Hotels/Hotels";
import { useSelector } from "react-redux";

function Homescreen({ isAuthVisible }) {
  const auth = useSelector((state) => state.auth.user);

  const isMobile = window.innerWidth <= 767; // Check if screen size is mobile

  return (
    <div className="welcomepage-container">
      {auth === "no-user" && isAuthVisible && (
        <div className="auth-container">
          <Auth />
        </div>
      )}
      <div className="hotels-container">
        <Hotels />
      </div>
      {!isAuthVisible &&
        isMobile && ( // Conditionally display Hotels component only on mobile
          <div className="hotels-component-below">
            <Hotels />
          </div>
        )}
    </div>
  );
}

export default Homescreen;
