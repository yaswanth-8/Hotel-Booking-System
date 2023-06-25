import React from "react";
import "./Navbar.css";

function Navbar({ title, onAuthenticateClick }) {
  return (
    <div className="navbar">
      <div className="navbar-title">{title}</div>
      <button className="authenticate-button" onClick={onAuthenticateClick}>
        Authenticate
      </button>
    </div>
  );
}

export default Navbar;
