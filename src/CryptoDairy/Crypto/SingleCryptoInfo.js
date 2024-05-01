import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { database } from '../Backend-Connectivity/FireBaseInstamce';

function SingleCryptoInfo(props) {

  const [Crypto_Name, setCryptoName] = useState();
  const [Crypto_Price, setCryptoPrice] = useState();
  const [Crypto_Quantity, setCryptoQuantity] = useState();
  const [Crypto_Amount_Invested, setCryptoAmount] = useState();
  const [readOnly, toggleReadOnly] = useState(true);

  const [PriceVisibilty, togglePriceVisisbilty] = useState(false);
  const [QuantityVisibilty, toggleQuantityVisisbilty] = useState(false);
  const [AmountVisibilty, toggleAmountVisisbilty] = useState(false);

  const [updateClicked, toggleUpdateClicked] = useState(false);

  useEffect(() => {
    setCryptoName(props.name);
    setCryptoPrice(props.price);
    setCryptoQuantity(props.quantity);
    setCryptoAmount(props.amount);
  }, [props.name]);

  const PriceHandler = (event) => {
    setCryptoPrice(event.target.value);
  }

  const QuantityHandler = (event) => {
    setCryptoQuantity(event.target.value);
  }

  const AmountHandler = (event) => {
    setCryptoAmount(event.target.value);
  }

  const update = () => {
    toggleReadOnly(false);
    toggleUpdateClicked(true);
  }

  const confirmUpdate = async () => {
    if (updateClicked === true) {
      toggleReadOnly(true);

      if (Crypto_Price === "" && Crypto_Quantity === "" && Crypto_Amount_Invested === "") {
        togglePriceVisisbilty(true);
        toggleQuantityVisisbilty(true);
        toggleAmountVisisbilty(true);
        toggleReadOnly(false);
      } else if (Crypto_Price === "") {
        togglePriceVisisbilty(true);
        toggleReadOnly(false);
      } else if (Crypto_Quantity === "") {
        toggleQuantityVisisbilty(true);
        toggleReadOnly(false);
      }
      else if (Crypto_Amount_Invested === "") {
        toggleAmountVisisbilty(true);
        toggleReadOnly(false);
      } else {
        togglePriceVisisbilty(false);
        toggleQuantityVisisbilty(false);
        toggleAmountVisisbilty(false);
        alert("okay the values, will be updated");
        toggleUpdateClicked(false);

        const value = collection(database, props.userID);

        const Crypto_Info = await getDocs(value);

        let Crypto_Data_To_Update;
        Crypto_Info.docs.map(doc => {
          if (doc.data().Crypto_Name === Crypto_Name) {
            Crypto_Data_To_Update = doc.id;
          }
        });

        console.log("in the SingleCryptoInfo, Crypto to update : " + Crypto_Data_To_Update);

        const Update_Refrence = doc(database, props.userID, Crypto_Data_To_Update);

        await updateDoc(Update_Refrence, {
          Crypto_Price: Crypto_Price,
          Crypto_Quantity: Crypto_Quantity,
          Crypto_Amount_Invested: Crypto_Amount_Invested
        });

        alert("Crypto Data updated successfully");

      }
    } else {
      alert("First click on Update Button, toc continue");
    }

  }

  const deleteCryptoInfo = async () => {
    if (window.confirm("Are you sure want to delete " + Crypto_Name) === true) {
      const value = collection(database, props.userID);

      const Crypto_Info = await getDocs(value);

      let Crypto_Data_To_Update;
      Crypto_Info.docs.map(doc => {
        if (doc.data().Crypto_Name === Crypto_Name) {
          Crypto_Data_To_Update = doc.id;
        }
      });

      console.log("in the SingleCryptoInfo, Crypto to update : " + Crypto_Data_To_Update);

      const deleteVal = doc(database, props.userID, Crypto_Data_To_Update);
      await deleteDoc(deleteVal);
      alert("information deleted");
    }
  }

  return (
    <div className="singleCryptoInfo">

      <center><h1>{Crypto_Name}</h1></center>

      <input
        type="text"
        value={Crypto_Price}
        onChange={PriceHandler}
        readOnly={readOnly} />

      <center><p style={{
        color: "red",
        visibility: PriceVisibilty === false ? "hidden" : "visible"
      }}>Enter Price</p></center>

      <input
        type="text"
        value={Crypto_Quantity}
        onChange={QuantityHandler}
        readOnly={readOnly} />

      <center><p style={{
        color: "red",
        visibility: QuantityVisibilty === false ? "hidden" : "visible"
      }}>Enter Quantity</p></center>

      <input
        type="text"
        value={Crypto_Amount_Invested}
        onChange={AmountHandler}
        readOnly={readOnly} />

      <center><p style={{
        color: "red",
        visibility: AmountVisibilty === false ? "hidden" : "visible"
      }}>Enter Amount Invested</p></center>

      <div className="buttonGroup d-flex justify-content-around">
        <button className="btn btn-outline-success" onClick={update}>UPDATE</button>
        <button className="btn btn-outline-success" onClick={confirmUpdate}>CONFIRM UPDATE</button>
        <button className="btn btn-outline-success" onClick={deleteCryptoInfo}>DELETE</button>
      </div>

    </div>
  )
}

export default SingleCryptoInfo;
