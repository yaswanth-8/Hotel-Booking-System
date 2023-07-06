import React, { useEffect } from "react";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut } from "../../../store/Auth-Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHotel, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { setNotificationCount } from "../../../store/Notification/notificationSlice";

function Navbar({ title, onAuthenticateClick }) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const checkLogInfromStore = useSelector((state) => state.auth.user);
  const notificationCount = useSelector((state) => state.notification.count);
  const authUser = sessionStorage.getItem("auth-user");
  const auth = isLoggedIn
    ? sessionStorage.getItem("auth-user")
    : checkLogInfromStore;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(signIn(sessionStorage.getItem("auth-user")));
    }
    fetchPendingCount();
    // eslint-disable-next-line
  }, [dispatch, isLoggedIn]);

  const fetchPendingCount = async () => {
    try {
      const response = await fetch("http://localhost:5225/api/pending");
      const data = await response.json();
      console.log("Pending count:", data);
      dispatch(setNotificationCount(data));
    } catch (error) {
      console.error("Error fetching pending count:", error);
    }
  };

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
  const displayHotelsHandler = () => {
    navigate("/hotels");
  };

  return (
    <div className="navbar">
      <div className="navbar-title" onClick={displayHotelsHandler}>
        {title}
      </div>
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
            🔔{" "}
            {authUser === "admin" ? (
              <span>
                <span className="tiny-emoji">🔴</span>
                {notificationCount}
              </span>
            ) : (
              ""
            )}
          </button>
        ) : (
          ""
        )}
        {auth !== "no-user" ? (
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
