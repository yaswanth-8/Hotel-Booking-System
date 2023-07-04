import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Layouts/Navbar/Navbar";
import Welcomepage from "./Components/HomeScreen/Welcomepage";
import "./App.css";
import HotelDetails from "./Components/Hotels/Hotel-Detail/HotelDetail";
import Homescreen from "./Components/HomeScreen/Homescreen";
import AddHotel from "./Components/Hotels/Add-Hotel/AddHotel";
import Reviews from "./Components/Layouts/Reviews/Reviews";
import RaiseQuery from "./Components/Layouts/Query/RaiseQuery";
import Notifications from "./Components/Layouts/Notifications/Notifications";
import Profile from "./Components/Layouts/Profile/Profile";

function App() {
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const authUser = sessionStorage.getItem("auth-user");

  const handleAuthenticateClick = (state) => {
    if (state === "open") {
      setIsAuthVisible(true);
    } else {
      setIsAuthVisible(!isAuthVisible);
    }
  };

  const AdminPrivateRoute = ({ element }) => {
    return authUser === "admin" ? element : <Navigate to="/" replace />;
  };
  const UserPrivateRoute = ({ element }) => {
    return authUser !== "admin" && authUser !== "no-user" ? (
      element
    ) : (
      <Navigate to="/" replace />
    );
  };
  const AdminAndUserPrivateRoute = ({ element }) => {
    return authUser !== "no-user" ? element : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <div>
        <Navbar
          className="Navbar-display-container"
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
          <Route
            path="/hotels/add"
            element={<AdminPrivateRoute element={<AddHotel />} />}
          />
          <Route path="/hotels/:id/reviews" element={<Reviews />} />
          <Route
            path="/hotels/:id/raisequery"
            element={<UserPrivateRoute element={<RaiseQuery />} />}
          />
          <Route
            path="/notifications"
            element={<AdminAndUserPrivateRoute element={<Notifications />} />}
          />
          <Route
            path="/profile"
            element={<UserPrivateRoute element={<Profile />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
