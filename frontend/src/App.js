import React, { useState } from "react";
import Navbar from "./Components/Layouts/Navbar/Navbar";
import Homescreen from "./Components/HomeScreen/Homescreen";
import "./App.css";
import HotelDetails from "./Components/Hotels/Hotel-Detail/HotelDetail";

function App() {
  const [isAuthVisible, setIsAuthVisible] = useState(false);

  const handleAuthenticateClick = () => {
    setIsAuthVisible(!isAuthVisible);
  };

  return (
    <div>
      <Navbar
        title="Presidio Bookings"
        onAuthenticateClick={handleAuthenticateClick}
      />
      {/* <Homescreen isAuthVisible={isAuthVisible} /> */}
      <HotelDetails />
    </div>
  );
}

export default App;
