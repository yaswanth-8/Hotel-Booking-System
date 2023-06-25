import React, { useState } from "react";
import Filters from "./Components/Layouts/Filters/Filters";
import Auth from "./Components/Auth/Auth";
import "./App.css";
import Hotels from "./Components/Hotels/Hotels";
import { useSelector } from "react-redux";
import Navbar from "./Components/Layouts/Navbar/Navbar";

function App() {
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const auth = useSelector((state) => state.auth.user);

  const handleAuthenticateClick = () => {
    setIsAuthVisible(!isAuthVisible);
  };

  return (
    <div>
      <Navbar
        title="Presidio Bookings"
        onAuthenticateClick={handleAuthenticateClick}
      />
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
    </div>
  );
}

export default App;
