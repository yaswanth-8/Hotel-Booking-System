import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Layouts/Navbar/Navbar";
import Welcomepage from "./Components/HomeScreen/Welcomepage";
import "./App.css";
import HotelDetails from "./Components/Hotels/Hotel-Detail/HotelDetail";
import Homescreen from "./Components/HomeScreen/Homescreen";
import AddHotel from "./Components/Hotels/Add-Hotel/AddHotel";
import Reviews from "./Components/Layouts/Reviews/Reviews";
import RaiseQuery from "./Components/Layouts/Query/RaiseQuery";
import Notifications from "./Components/Layouts/Notifications/Notifications";

function App() {
  const [isAuthVisible, setIsAuthVisible] = useState(false);

  const handleAuthenticateClick = (state) => {
    if (state === "open") {
      setIsAuthVisible(true);
    } else {
      setIsAuthVisible(!isAuthVisible);
    }
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
            element={<Welcomepage isAuthVisible={isAuthVisible} />}
          />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/hotels" element={<Homescreen />} />
          <Route path="/hotels/add" element={<AddHotel />} />
          <Route path="/hotels/:id/reviews" element={<Reviews />} />
          <Route path="/hotels/:id/raisequery" element={<RaiseQuery />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
