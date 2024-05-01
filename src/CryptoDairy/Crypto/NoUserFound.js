import React from 'react';
import { useNavigate } from "react-router-dom";
import "./Style.css";

function NoUserFound() {

  const navigate = useNavigate();

  const moveToSignup = () => {
    navigate("/");
  }

  return (
    <div className="nouserfound">

      <center>
        <h1>Please SignUp or Login to acces the services</h1>
      </center>

      <button
        className="btn btn-outline-success"
        onClick={moveToSignup}>
        SIGNUP / LOGIN
      </button>
    </div>
  )
}

export default NoUserFound;
