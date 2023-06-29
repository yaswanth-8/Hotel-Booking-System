import React from "react";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../../store/Auth-Slice/authSlice";
import { useNavigate } from "react-router-dom";

function Navbar({ title, onAuthenticateClick }) {
  const auth = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authenticateHandler = () => {
    if (window.location.pathname !== "/") {
      onAuthenticateClick("open");
      navigate("/");
    } else {
      onAuthenticateClick();
      navigate("/");
    }
  };

  const addHotelRouteHandler = () => {
    navigate("/hotels/add");
  };
  const showNotificationHandler = () => {
    navigate("/notifications");
  };

  const signOutHandler = () => {
    dispatch(signOut());
  };
  return (
    <div className="navbar">
      <div className="navbar-title">{title}</div>
      <button className="authenticate-button" onClick={addHotelRouteHandler}>
        Add Hotel
      </button>
      <button className="authenticate-button" onClick={showNotificationHandler}>
        🔔
      </button>

      {auth === "no-user" ? (
        <button className="authenticate-button" onClick={authenticateHandler}>
          Authenticate
        </button>
      ) : (
        <button className="authenticate-button" onClick={signOutHandler}>
          Log out
        </button>
      )}
    </div>
  );
}

export default Navbar;
