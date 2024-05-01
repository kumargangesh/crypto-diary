import React, { useState } from 'react';
import { addDataToFireBase, signUpUser } from "../Backend-Connectivity/Methods";
import { useNavigate } from "react-router-dom";

function SignUp(props) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const submit = async() => {
    if (email === "" && password === "") {
      alert("Enter Email and Password");
    } else if (email === "") {
      alert("Enter Email");
    } else if (password === "") {
      alert("Enter Password");
    } else {
      setEmail("");
      setPassword("");
      props.setemail(email.toString());
      await signUpUser(email, password) === true ? navigate("/login") : navigate("/signup");
      
    }
  }

  return (
    <div>
      <div className="signUpBox">
        <center><h1>Enter Details for SignUp</h1></center>
        <input type="email" placeholder="Enter Email" value={email} onChange={emailHandler} />
        <input type="text" placeholder="Enter Password" value={password} onChange={passwordHandler} />
        <div className="buttons d-flex justify-content-between">
          <button className="btn btn-outline-success" onClick={reset}>RESET</button>
          <button className="btn btn-outline-success" onClick={submit}>SUBMIT</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
