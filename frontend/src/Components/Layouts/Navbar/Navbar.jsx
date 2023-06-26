import React from "react";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../../store/Auth-Slice/authSlice";

function Navbar({ title, onAuthenticateClick }) {
  const auth = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signOut());
  };
  return (
    <div className="navbar">
      <div className="navbar-title">{title}</div>
      {auth === "no-user" ? (
        <button className="authenticate-button" onClick={onAuthenticateClick}>
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
