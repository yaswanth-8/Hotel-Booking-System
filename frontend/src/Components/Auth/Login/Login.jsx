import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { admin, signIn } from "../../../store/Auth-Slice/authSlice";
//import bcrypt from "bcryptjs";
import { API_BASE_URL } from "../../../config";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayPassword: false,
    passwordFieldPosition: "right",
    inputType: "text",
  });

  const navigate = useNavigate();
  const sendRef = useRef();
  const dispatch = useDispatch();

  const sendHandler = async () => {
    const inputValue = sendRef.current.value;
    if (inputValue === "") {
      return;
    }
    const updatedFormData = { ...formData };
    if (!updatedFormData.email) {
      console.log(inputValue);
      setFormData((prev) => ({ ...prev, email: inputValue }));
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          displayPassword: true,
          inputType: "password",
        }));
      }, 1000);
    } else if (!updatedFormData.password) {
      updatedFormData.password = inputValue;
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/userInfo?email=${formData.email}`
        );
        console.log(response.data);
        const storedHashedPassword = response.data.password;
        console.log(storedHashedPassword[0]);
        var passwordMatched = false;
        if (storedHashedPassword[0] !== "$") {
          if (inputValue === response.data.password) {
            passwordMatched = true;
          }
        } else {
          // passwordMatched = await bcrypt.compare(
          //   inputValue,
          //   storedHashedPassword
          // );
        }
        if (passwordMatched) {
          if (response.data.role === "admin") {
            dispatch(admin());
          } else {
            dispatch(signIn(response.data.name));
          }
          console.log("In loginjs role is" + response.data.role);
          sessionStorage.setItem("auth-user", response.data.role);
          sessionStorage.setItem("userName", response.data.name);
          sessionStorage.setItem("userEmail", response.data.email);
          sessionStorage.setItem("UserID", response.data.userID);
          sessionStorage.setItem("isLoggedIn", true);
          navigate("/hotels");
        } else {
          console.log("invalid");
          updatedFormData.password = "Invalid credentials ";
          updatedFormData.passwordFieldPosition = "left";
        }
      } catch (error) {
        console.log("invalid");
        updatedFormData.password = "Invalid credentials ";
        updatedFormData.passwordFieldPosition = "left";
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
      inputType: "text",
    });
  };

  return (
    <div>
      <div className="left">Enter your email address</div>

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
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendHandler();
            }
          }}
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
