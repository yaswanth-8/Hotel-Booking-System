import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    <Router>
      <div>
        <Navbar
          title="Presidio Bookings"
          onAuthenticateClick={handleAuthenticateClick}
        />
        <Routes>
          <Route
            path="/"
            element={<Homescreen isAuthVisible={isAuthVisible} />}
          />
          <Route path="/hotel" element={<HotelDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
