import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { admin, signIn } from "../../../store/Auth-Slice/authSlice";

const user = { password: "yaswanthmd" };

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayPassword: false,
    passwordFieldPosition: "right",
    inputType: "text",
  });

  const sendRef = useRef();
  const dispatch = useDispatch();

  const sendHandler = () => {
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
      console.log(inputValue);
      if (user.password !== inputValue && inputValue !== "admin") {
        updatedFormData.password = "Invalid credentials ";
        updatedFormData.passwordFieldPosition = "left";
      } else {
        updatedFormData.password = inputValue;
        if (inputValue === "admin") {
          dispatch(admin());
        } else {
          dispatch(signIn(formData.email));
        }
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
