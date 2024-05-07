import React, { useState } from 'react';
import "../Style.css";

function IndividualCrypto(props) {

  const [Crypto_Price, setCryptoPrice] = useState();
  const [Crypto_Quantity, setCryptoQuantity] = useState();
  const [Crypto_Amount_Invested, setCryptoAmount] = useState();

  const priceHandler = (event) => {
    setCryptoPrice(event.target.value);
  }

  const quantityHandler = (event) => {
    setCryptoQuantity(event.target.value);
  }

  const amountHandler = (event) => {
    setCryptoAmount(event.target.value);
  }

  return (
    <div className="IndividualCrypto">

      <center><h1>BITCOIN</h1></center>

      <input
        type="text"
        value={Crypto_Price}
        onChange={priceHandler}
        placeholder="Crypto Price"
      />

      <input
        type="text"
        value={Crypto_Quantity}
        onChange={quantityHandler}
        placeholder="Crypto Quantity"
      />

      <input
        type="text"
        value={Crypto_Amount_Invested}
        onChange={amountHandler}
        placeholder="Crypto Amount Invested"
      />

    </div>
  )
}

export default IndividualCrypto;
