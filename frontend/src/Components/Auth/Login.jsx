import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

const user = { password: "yaswanth8*" };

function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    displayEmail: false,
    email: "",
    password: "",
    displayPassword: false,
    passwordFieldPosition: "right",
    inputType: "text",
  });
  const sendRef = useRef();

  const sendHandler = () => {
    const inputValue = sendRef.current.value;
    const updatedFormData = { ...formData };

    if (!updatedFormData.userName) {
      console.log(inputValue);
      updatedFormData.userName = inputValue;
      setFormData(updatedFormData);
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          displayEmail: true,
          inputType: "email",
        }));
      }, 1000);
    } else if (!updatedFormData.email) {
      console.log(inputValue);
      updatedFormData.email = inputValue;
      setFormData(updatedFormData);
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          displayPassword: true,
          inputType: "password",
        }));
      }, 1000);
    } else if (!updatedFormData.password) {
      console.log(inputValue);
      if (user.password !== inputValue) {
        updatedFormData.password = "Invalid credentials ";
        updatedFormData.passwordFieldPosition = "left";
      } else {
        updatedFormData.password = inputValue;
      }
      setFormData(updatedFormData);
    }

    sendRef.current.value = "";
  };

  const setToDefaultStateHandler = () => {
    setFormData({
      userName: "",
      displayEmail: false,
      email: "",
      password: "",
      displayPassword: false,
      passwordFieldPosition: "right",
    });
  };

  return (
    <div className="container">
      <center>
        <h2>Login</h2>
      </center>
      <div className="left">Enter your name</div>
      {formData.userName && <div className="right">{formData.userName}</div>}

      {formData.displayEmail && (
        <div className="left">Enter your email address</div>
      )}

      {formData.email && <div className="right">{formData.email}</div>}

      {formData.displayPassword && (
        <div className="left">Enter your Password</div>
      )}

      {formData.password && (
        <div className={formData.passwordFieldPosition}>
          {formData.password}
        </div>
      )}

      <div className="input-wrapper">
        <input
          className="login-input"
          type={formData.inputType}
          ref={sendRef}
        />
        {formData.passwordFieldPosition === "right" ? (
          <FontAwesomeIcon
            onClick={sendHandler}
            icon={faPaperPlane}
            size="2xl"
          />
        ) : (
          <FontAwesomeIcon
            icon={faArrowsRotate}
            onClick={setToDefaultStateHandler}
            size="2xl"
          />
        )}
      </div>
    </div>
  );
}

export default Login;
