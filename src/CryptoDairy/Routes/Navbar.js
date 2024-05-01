import React, { useEffect, useState } from 'react';
import "./Style.css";

function Navbar(props) {

  const [email, changeEmail] = useState();

  useEffect(() => {
    changeEmail(props.email);
    console.log("in useEffect : "+props.email);
    getEmail();
  }, [props.email]);

  const getEmail =() => {
    if(props.email === undefined){
      alert("Enter Email");
    }else{
      changeEmail(props.email.charAt(0).toUpperCase());
    }
  }

  const deleteUser = () => {
    if(email === "S"){
      alert("Please SignUp or Login");
    }else{
      
    }
  }

  return (
    <div className="navbar">
      <h1>Crypto-Diary</h1>
      <button onClick={deleteUser}>{email}</button>
    </div>
  )
}

export default Navbar;
