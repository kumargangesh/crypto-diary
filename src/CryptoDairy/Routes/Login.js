import React, { useState } from 'react';
import { addDataToFireBase, signInUser } from '../Backend-Connectivity/Methods';
import { useNavigate } from "react-router-dom";

function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  }

  const reset = () => {
    setVisible(true);
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
    setVisible(true);
    if (email === "" && password === "") {
      setMessage("Enter Email and Password");
    } else if (email === "") {
      setMessage("Enter Email");
    } else if (password === "") {
      setMessage("Enter Password");
    } else {
      const returnFromSignInUser = await signInUser(email, password);
      console.log(returnFromSignInUser);
      if (returnFromSignInUser[1] === true) {
        let userID = returnFromSignInUser[0];
        alert("User, successfully logged in.....");
        props.setemail(email);
        props.setuserid(userID);
        props.setPassword(password);
        setVisible(false);
        navigate("/routing");
      } else {
        setVisible(true);
        setMessage(returnFromSignInUser[2]);
        navigate("/login");
      }

    }
  }

  return (
    <div>
      <div className="signUpBox">

        <center><h1>Enter Details for Login</h1></center>

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

        <p style={
          {
            textAlign: "center",
            visibility: visible === true ? "visible" : "hidden"
          }
        }>{message}</p>
        
        <div className="buttons d-flex justify-content-between">

          <button className="btn btn-outline-success" onClick={reset}>RESET</button>
          <button className="btn btn-outline-success" onClick={submit}>SIGNIN</button>
          
        </div>
      </div>
    </div>
  )
}

export default Login;
