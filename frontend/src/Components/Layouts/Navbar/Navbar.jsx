import React, { useEffect } from "react";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut } from "../../../store/Auth-Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHotel, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Navbar({ title, onAuthenticateClick }) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const checkLogInfromStore = useSelector((state) => state.auth.user);
  const auth = isLoggedIn
    ? sessionStorage.getItem("auth-user")
    : checkLogInfromStore;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(signIn(sessionStorage.getItem("auth-user")));
    }
  }, [dispatch, isLoggedIn]);
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
  const showProfileHandler = () => {
    navigate("/profile");
  };

  const signOutHandler = () => {
    dispatch(signOut());
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navbar-title">{title}</div>
      <div className="navbar-buttons">
        {auth === "admin" ? (
          <button
            className="authenticate-button"
            onClick={addHotelRouteHandler}
          >
            + <FontAwesomeIcon icon={faHotel} />
          </button>
        ) : (
          ""
        )}

        {auth !== "no-user" ? (
          <button
            className="authenticate-button"
            onClick={showNotificationHandler}
          >
            🔔
          </button>
        ) : (
          ""
        )}

        {auth !== "admin" && auth !== "no-user" ? (
          <button className="authenticate-button" onClick={showProfileHandler}>
            <FontAwesomeIcon icon={faUser} />
          </button>
        ) : (
          ""
        )}
        {auth === "no-user" ? (
          <button className="authenticate-button" onClick={authenticateHandler}>
            Authenticate
          </button>
        ) : (
          <button className="authenticate-button" onClick={signOutHandler}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
