import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { database } from '../Backend-Connectivity/FireBaseInstamce';

function SingleCryptoInfo(props) {

  const [Crypto_Name, setCryptoName] = useState();
  const [Crypto_Parsed_Name, setCryptoParsedName] = useState();
  const [Crypto_Price, setCryptoPrice] = useState();
  const [Crypto_Quantity, setCryptoQuantity] = useState();
  const [Crypto_Amount_Invested, setCryptoAmount] = useState();
  const [readOnly, toggleReadOnly] = useState(true);

  const [message, setMessage] = useState("");
  const [messageVisibilty, toggleMessageVisisbilty] = useState(false);

  const [updateClicked, toggleUpdateClicked] = useState(false);

  useEffect(() => {
    setCryptoName(props.name);
    checkNameCondition();
    setCryptoPrice(props.price);
    setCryptoQuantity(props.quantity);
    setCryptoAmount(props.amount);
  }, [props.name]);

  const checkNameCondition = () => {
    if (props.name.length > 9) {
      let name = props.name;
      let updatedName = name.slice(0, 8) + "....";
      setCryptoParsedName(updatedName);
    } else {
      setCryptoParsedName(props.name);
    }
  }

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
    toggleMessageVisisbilty(true);
    if (updateClicked === true) {
      toggleReadOnly(true);

      if (Crypto_Price === "" && Crypto_Quantity === "" && Crypto_Amount_Invested === "") {
        setMessage("Enter Price, Quantity and Invested Amount");
        toggleReadOnly(false);
      } else if (Crypto_Price === "") {
        setMessage("Enter Price");
        toggleReadOnly(false);
      } else if (Crypto_Quantity === "") {
        setMessage("Enter Quantity");
        toggleReadOnly(false);
      }
      else if (Crypto_Amount_Invested === "") {
        setMessage("Enter Invested Amount");
        toggleReadOnly(false);
      } else {
        setMessage("okay the values are updating....");
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

        setMessage("Crypto Data updated successfully");

      }
    } else {
      setMessage("First click on Update Button");
    }

  }

  const deleteCryptoInfo = async () => {
    toggleMessageVisisbilty(true);
    if (window.confirm("Are you sure want to delete " + Crypto_Name) === true) {

      console.log("crypto name to delete : " + Crypto_Name);
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
      setMessage("information deleted");
    }
  }

  return (
    <div className="singleCryptoInfo">

      <center><h1>{Crypto_Parsed_Name}</h1></center>

      <input
        type="text"
        value={Crypto_Price}
        onChange={PriceHandler}
        readOnly={readOnly} />

      <input
        type="text"
        value={Crypto_Quantity}
        onChange={QuantityHandler}
        readOnly={readOnly} />

      <input
        type="text"
        value={Crypto_Amount_Invested}
        onChange={AmountHandler}
        readOnly={readOnly} />

      <center><p style={{
        color: "red",
        visibility: messageVisibilty === true ? "visible" : "hidden"
      }}>{message}</p></center>

      <div className="buttonGroup d-flex justify-content-around">

        <button
          className="btn btn-outline-success" onClick={update}>
          UPDATE
        </button>

        <button
          className="btn btn-outline-success" onClick={confirmUpdate}>
          CONFIRM UPDATE
        </button>

        <button
          className="btn btn-outline-success" onClick={deleteCryptoInfo}>
          DELETE
        </button>

      </div>

    </div>
  )
}

export default SingleCryptoInfo;
