import React from 'react';
import { useNavigate } from "react-router-dom";
import "./Style.css";

function NoCryptoExists() {

  const navigate = useNavigate();

  const moveToSignup = () => {
    navigate("/newentry");
  }

  return (
    <div className="nouserfound">

      <center>
        <h1>No Crypto exists with this user, please add some</h1>
      </center>

      <button
        className="btn btn-outline-success"
        onClick={moveToSignup}>
        ADD CRYPTO
      </button>
    </div>
  )
}

export default NoCryptoExists;
