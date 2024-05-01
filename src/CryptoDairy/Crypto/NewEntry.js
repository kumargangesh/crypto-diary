import React, { useEffect, useState } from 'react';
import "./Style.css";
import { addCryptoDataToFireBase } from '../Backend-Connectivity/Methods';
import { useNavigate } from "react-router-dom";
import NoUserFound from './NoUserFound';

function NewEntry(props) {

  useEffect(() => {
    console.log("in the useEffect of NewEntry.js, userID : " + props.userID);
  }, [props.userID]);

  const navigate = useNavigate();

  const [cryptoName, setCryptoName] = useState("");
  const [cryptoPrice, setCryptoPrice] = useState("");
  const [cryptoQuantity, setCryptoQuantity] = useState("");
  const [cryptoInvestedAmount, setCryptoInvestedAmount] = useState("");

  const nameHandler = (event) => {
    setCryptoName(event.target.value);
  }

  const priceHandler = (event) => {
    setCryptoPrice(event.target.value);
  }

  const quantityHandler = (event) => {
    setCryptoQuantity(event.target.value);
  }

  const amountHandler = (event) => {
    setCryptoInvestedAmount(event.target.value);
  }

  const reset = () => {
    if (isEmpty() !== true) {
      setCryptoName("");
      setCryptoPrice("");
      setCryptoQuantity("");
      setCryptoInvestedAmount("");
    }
  }

  const submit = () => {
    if (isEmpty() !== true) {
      console.log("in the NewEntry.js, userID : " + props.userID);
      addCryptoDataToFireBase(props.userID, cryptoName, cryptoPrice, cryptoQuantity, cryptoInvestedAmount);
      reset();
      navigate("/routing");
    }
  }

  const back = () => {
    if (window.confirm("Are you sure to go back") === true) {
      navigate("/routing");
    }
  }

  const isEmpty = () => {
    if (cryptoName === "" && cryptoPrice === "" && cryptoQuantity === "" && cryptoInvestedAmount === "") {
      alert("Please enter All Fields");
      return true;
    } else if (cryptoName === "") {
      alert("Please enter Crypto Name");
      return true;
    } else if (cryptoPrice === "") {
      alert("Please enter Crypto Price");
      return true;
    } else if (cryptoQuantity === "") {
      alert("Please enter Crypto Quantity");
      return true;
    } else if (cryptoInvestedAmount === "") {
      alert("Please enter Crypto Invested Amount");
      return true;
    } else {
      return false;
    }
  }

  return (
    props.userID !== "" ?
      <div>
        <div className="newCrypto">

          <center><h1><u>Add new Crypto</u></h1></center>

          <input
            type="text"
            placeholder="Crypto Name"
            onChange={nameHandler}
            value={cryptoName}
          />

          <input
            type="number"
            placeholder="Crypto Buying Price"
            onChange={priceHandler}
            value={cryptoPrice}
          />

          <input
            type="number"
            placeholder="Crypto Holding Quantity"
            onChange={quantityHandler}
            value={cryptoQuantity}
          />

          <input
            type="number"
            placeholder="Crypto Invested Amount"
            onChange={amountHandler}
            value={cryptoInvestedAmount}
          />


          <div className="d-flex justify-content-between">
            <button
              className="btn btn-outline-success"
              onClick={back}>
              BACK
            </button>

            <button
              className="btn btn-outline-success"
              onClick={reset}>
              RESET
            </button>

            <button
              className="btn btn-outline-success"
              onClick={submit}>
              SUBMIT
            </button>

          </div>
        </div>
      </div>
      :
      <NoUserFound />
  )
}

export default NewEntry;
