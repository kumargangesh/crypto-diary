import React, { useState } from 'react';
import { addDataToFireBase, signInUser } from '../Backend-Connectivity/Methods';
import { useNavigate } from "react-router-dom";

function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  }

  const reset = () => {
    if (email === "" && password === "") {
      alert("Enter Email and Password");
    } else if (email === "") {
      alert("Enter Email");
    } else if (password === "") {
      alert("Enter Password");
    } else {
      if (window.confirm("Are you sure to reset values") === true) {
        setEmail("");
        setPassword("");
      }
    }
  }

  const submit = async () => {
    if (email === "" && password === "") {
      alert("Enter Email and Password");
    } else if (email === "") {
      alert("Enter Email");
    } else if (password === "") {
      alert("Enter Password");
    } else {

      let userID = await signInUser(email, password);
      console.log("in the sign in, userID : " + userID);
      if (userID !== "") {
        alert("User, successfully logged in.....");
        props.setemail(email);
        props.setuserid(userID);
        setVisible(false);
        navigate("/routing");
      } else {
        setVisible(true);
        navigate("/login");
      }
    }
  }

  return (
    <div>
      <div className="signUpBox">
        <center><h1>Enter Details for Login</h1></center>
        <input type="email" placeholder="Enter Email" value={email} onChange={emailHandler} />
        <input type="text" placeholder="Enter Password" value={password} onChange={passwordHandler} />
        <p style={
          {
            textAlign: "center",
            visibility: visible === true ? "visible" : "hidden"
          }
        }>Enter the correct crenditials</p>
        <div className="buttons d-flex justify-content-between">
          <button className="btn btn-outline-success" onClick={reset}>RESET</button>
          <button className="btn btn-outline-success" onClick={submit}>SUBMIT</button>
        </div>
      </div>
    </div>
  )
}

export default Login;
