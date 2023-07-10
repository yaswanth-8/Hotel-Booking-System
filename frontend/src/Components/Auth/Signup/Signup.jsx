import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faCircleCheck,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import usePostUser from "../../../Hooks/usePostUser";
//import bcrypt from "bcryptjs";

function SignUp() {
  const [formData, setFormData] = useState({
    userName: "",
    displayEmail: false,
    email: "",
    password: "",
    retypePassword: "",
    displayPassword: false,
    displayRetypePassword: false,
    passwordFieldPosition: "right",
    inputType: "text",
  });
  const [sendButtonState, setSendButtonState] = useState(false);
  const sendRef = useRef();
  const { postUser, isLoading, error } = usePostUser();

  const sendHandler = async () => {
    const inputValue = sendRef.current.value;
    if (inputValue === "") {
      setSendButtonState(false);
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
      if (!inputValue.includes("@")) {
        setSendButtonState(true);
        return;
      }
      setFormData((prev) => ({ ...prev, email: inputValue }));
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          displayPassword: true,
          inputType: "password",
        }));
      }, 1500);
      if (error) {
        console.log("email id exists");
      }
    } else if (!updatedFormData.password) {
      console.log(inputValue);
      setFormData((prev) => ({ ...prev, password: inputValue }));
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          displayRetypePassword: true,
          inputType: "password",
        }));
      }, 1000);
    } else if (!updatedFormData.retypePassword) {
      console.log(inputValue);
      if (updatedFormData.password !== inputValue) {
        updatedFormData.retypePassword = "Password didnt match";
        updatedFormData.passwordFieldPosition = "left";
      } else {
        //const saltRounds = 10; // Number of salt rounds for bcrypt
        //const hashedPassword = await bcrypt.hash(inputValue, saltRounds);

        updatedFormData.retypePassword = inputValue;
        postUser(formData.userName, formData.email, inputValue, "user");
        console.log(isLoading);
        if (error) {
          console.log(error);
        }
      }
      setFormData(updatedFormData);
    }

    sendRef.current.value = "";
  };

  const setToDefaultStateHandler = () => {
    setSendButtonState(false);
    sendRef.current.value = "";
    setFormData({
      userName: "",
      displayEmail: false,
      email: "",
      password: "",
      retypePassword: "",
      displayPassword: false,
      displayRetypePassword: false,
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
      {sendButtonState && <p className="right">invalid email</p>}
      {formData.displayPassword && (
        <div className="left">Enter your Password</div>
      )}

      {formData.password && (
        <div className="right">
          {String.fromCharCode(8226).repeat(formData.password.length)}
        </div>
      )}

      {formData.displayRetypePassword && (
        <div className="left">Retype your Password</div>
      )}

      {formData.retypePassword === "Password didnt match" ? (
        <div className={formData.passwordFieldPosition}>
          {formData.retypePassword}
        </div>
      ) : (
        formData.retypePassword && (
          <div className={formData.passwordFieldPosition}>
            {String.fromCharCode(8226).repeat(formData.retypePassword.length)}
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: "#00d60e" }}
              size="lg"
            />
          </div>
        )
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
          !sendButtonState && (
            <FontAwesomeIcon
              onClick={sendHandler}
              icon={faPaperPlane}
              size="2xl"
            />
          )
        ) : (
          <FontAwesomeIcon
            icon={faArrowsRotate}
            onClick={setToDefaultStateHandler}
            size="2xl"
          />
        )}
        {sendButtonState && (
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
