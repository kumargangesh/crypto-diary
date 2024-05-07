import React, { useState } from 'react';
import { signUpUser } from "../Backend-Connectivity/Methods";
import { useNavigate } from "react-router-dom";
import "./Style.css";

function SignUp(props) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageVisibilty, toggleErrorMessageVisibilty] = useState(false)
  const [message, setMessage] = useState("");

  const emailHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  }

  const reset = () => {
    if (email === "" && password === "") {
      setMessage("Enter Email and Password");
    } else if (email === "") {
      setMessage("Enter Email");
    } else if (password === "") {
      setMessage("Enter Password");
    } else {
      if (window.confirm("Are you sure to reset values") === true) {
        setEmail("");
        setPassword("");
      }
    }
  }

  const submit = async () => {
    if (email === "" && password === "") {
      setMessage("Enter Email and Password");
    } else if (email === "") {
      setMessage("Enter Email");
    } else if (password === "") {
      setMessage("Enter Password");
    } else {
      const returnFromSignUpUser = await signUpUser(email, password);
      if (returnFromSignUpUser[0] === true) {
        navigate("/login");
        props.setemail(email.toString());
        props.setPassword(password);
        setEmail("");
        setPassword("");
        toggleErrorMessageVisibilty(true);
        setMessage("User successfully registered with us");
      } else {
        navigate("/signup");
        toggleErrorMessageVisibilty(true);
        setMessage(returnFromSignUpUser[1]);
      }

    }
  }

  return (
    <div>
      <div className="signUpBox">
        <center><h1>Enter Details for SignUp</h1></center>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={emailHandler}
        />

        <input
          type="text"
          placeholder="Enter Password"
          value={password}
          onChange={passwordHandler}
        />

        <center><p style={{
          color: "red",
          visibility: errorMessageVisibilty === true ? "visible" : "hidden"
        }}></p>{message}</center>

        <div className="buttons d-flex justify-content-between">

          <button
            className="btn btn-outline-success"
            onClick={reset}>
            RESET
          </button>

          <button
            className="btn btn-outline-success"
            onClick={submit}>
            SIGNUP
          </button>
        </div>

      </div>
    </div>
  )
}

export default SignUp;
