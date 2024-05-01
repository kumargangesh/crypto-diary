import React from 'react';
import "./Style.css";
import { Link } from "react-router-dom";

function FrontPage(props) {

  const checkUser =() => {
    if(props.email !== "S"){
      props.setemail("S");
    }
  }

  return (
    <div>
        <div className="container d-flex justify-content-between">
          <Link to="/signup"> <button className="signUpButton" >SIGNUP</button> </Link>
          <Link to="/login"> <button className="loginButton" onClick={checkUser} >LOGIN</button> </Link>
        </div>
    </div>
  )
}

export default FrontPage;
