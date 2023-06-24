import React, { useState } from "react";

import "./Auth.css";
import SignUp from "./Signup/Signup";
import Login from "./Login/Login";

function Auth() {
  const [authState, setAuthState] = useState("signUp");

  return (
    <div className="login-container">
      <center>
        <div className="switch-mode">
          <button
            className={authState === "login" ? "active" : ""}
            onClick={() => {
              setAuthState("login");
            }}
          >
            Login
          </button>
          <button
            className={authState === "signUp" ? "active" : ""}
            onClick={() => {
              setAuthState("signUp");
            }}
          >
            Sign Up
          </button>
        </div>
      </center>
      {authState === "login" ? <Login /> : <SignUp />}
    </div>
  );
}

export default Auth;
