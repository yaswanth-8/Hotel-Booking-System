import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const user = { password: "yaswanth8*" };
function SignUp() {
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
    if (inputValue === "") {
      return;
    }
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
      inputType: "text",
    });
  };

  return (
    <div>
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

export default SignUp;
