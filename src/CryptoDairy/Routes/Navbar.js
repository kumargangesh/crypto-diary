import React, { useEffect, useState } from 'react';
import "./Style.css";
import {useNavigate} from "react-router-dom";

function Navbar(props) {

  const [email, changeEmail] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    changeEmail(props.email);
    console.log("in useEffect : " + props.email);
    getEmail();
  }, [props.email]);

  const getEmail = () => {
    if (props.email === undefined) {
      alert("Enter Email");
    } else {
      changeEmail(props.email.charAt(0).toUpperCase());
    }
  }

  const gotosettings = () => {
    navigate("/usersettings");
  }

  return (
    <div className="navbar">

      <h1>Crypto-Diary</h1>
      <button onClick={gotosettings}>{email}</button>

    </div>
  )
}

export default Navbar;
