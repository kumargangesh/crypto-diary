import React, { useState } from 'react';
import "./Style.css";
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { database } from '../Backend-Connectivity/FireBaseInstamce';
import NoUserFound from './Unavailble/NoUserFound';
import NoCryptoExists from "./Unavailble/NoCryptoExists";

function ShowIndividualCrypto(props) {

    const [cryptoName, setcryptoname] = useState("");

    const [Crypto_Name, setCryptoName] = useState("");
    const [Crypto_Price, setCryptoPrice] = useState("");
    const [Crypto_Quantity, setCryptoQuantity] = useState("");
    const [Crypto_Amount_Invested, setCryptoAmount] = useState("");

    const [visibility, setVisibilty] = useState(false);

    const [readOnly, toggleReadOnly] = useState(true);

    const [updateButton, toggleUpdateButton] = useState(false);

    const [documentID, setDocumentID] = useState("");

    const [message, setMessage] = useState("");
    const [messageVisibilty, toggleMessageVisisbilty] = useState(false);

    const cryptonamehandler = (event) => {
        setcryptoname(event.target.value);
    }

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
        setCryptoAmount(event.target.value);
    }

    const search = () => {
        if (cryptoName === "") {
            setVisibilty(true);
        } else {
            setVisibilty(false);
            getCryptoInfoUsingName();
        }
    }

    const getCryptoInfoUsingName = async () => {
        try {

            let name = cryptoName;
            name = name.toUpperCase();

            const value = collection(database, props.userID);
            const Crypto_Data = await getDocs(value);

            let status = false;

            Crypto_Data.docs.map(crypto => {
                if (crypto.data().Crypto_Name === name) {
                    setDocumentID(crypto.id);
                    status = true;
                    setCryptoName(crypto.data().Crypto_Name);
                    setCryptoPrice(crypto.data().Crypto_Price);
                    setCryptoQuantity(crypto.data().Crypto_Quantity);
                    setCryptoAmount(crypto.data().Crypto_Amount_Invested);
                }
            });

            console.log("in getCryptoInfoUsingName, stauts : " + status);

            if (status === false) {
                setDocumentID(undefined);
            }

            console.log("in getCryptoInfoUsingName, documentD : " + documentID);

        } catch (error) {
            console.log(error.message);
        }
    }

    const update = () => {
      if(updateButton === true){
        toggleUpdateButton(false);
        toggleReadOnly(true);
      }else{
        toggleUpdateButton(true);
        toggleReadOnly(false);
      }
    }

    const confirmUpdate = async () => {
        toggleMessageVisisbilty(true);
        if (updateButton === true) {

            if (Crypto_Price === "" && Crypto_Quantity === "" && Crypto_Amount_Invested === "") {
                setMessage("Enter Price, Quantity, Amount Invested");
            } else if (Crypto_Price === "") {
                setMessage("Enter Price");
            } else if (Crypto_Quantity === "") {
                setMessage("Enter Quantity");
            } else if (Crypto_Amount_Invested === "") {
                setMessage("Enter Amount Invested");
            } else {

                let name = Crypto_Name;
                name = name.toUpperCase();

                const value = collection(database, props.userID);
                const Crypto_Data = await getDocs(value);

                let documentRefrence;

                Crypto_Data.docs.map(crypto => {
                    if (crypto.data().Crypto_Name === name) {
                        documentRefrence = crypto.id;
                    }
                });

                setMessage("Okay, we are updating data....");

                console.log("in the confirmUpdate method, documentRefrence : " + documentRefrence);

                const Update_Refrence = doc(database, props.userID, documentRefrence);

                await updateDoc(Update_Refrence, {
                    Crypto_Price: Crypto_Price,
                    Crypto_Quantity: Crypto_Quantity,
                    Crypto_Amount_Invested: Crypto_Amount_Invested
                });

                setMessage("Crypto Data of " + Crypto_Name + " has been updated successfully");

            }

        } else {
            setMessage("First click Update Button");
        }
    }

    const deleteCryptoInfo = async () => {
        if (window.confirm("Are you sure to delete " + Crypto_Name) === true) {

            let name = Crypto_Name;
            name = name.toUpperCase();

            const value = collection(database, props.userID);
            const Crypto_Data = await getDocs(value);

            let documentRefrence;

            Crypto_Data.docs.map(crypto => {
                if (crypto.data().Crypto_Name === name) {
                    documentRefrence = crypto.id;
                }
            });

            const deleteVal = doc(database, props.userID, documentRefrence);
            await deleteDoc(deleteVal);
            setMessage("information about " + Crypto_Name + " deleted successfully");

        }
    }


    const afterFirstComponent = () => {
        console.log("in the afterFirstComponent, documentID :" + documentID);
        if (props.userID !== "") {
            if (props.Crypto_Name.length > 0) {
                if (documentID === "") {
                    return (
                        <center>
                            <h1>Enter Crypto Name to search Crypto Data</h1>
                        </center>
                    );
                } else if (documentID === undefined) {
                    return (
                        <NoCryptoExists />
                    );
                } else {
                    return (
                        <div className="IndividualCrypto">
                            <center><h1>{Crypto_Name ? Crypto_Name : ""}</h1></center>

                            <input
                                type="text"
                                placeholder="Crypto Price"
                                value={Crypto_Price ? Crypto_Price : ""}
                                onChange={priceHandler}
                                readOnly={readOnly}
                            />

                            <input
                                type="text"
                                placeholder="Crypto Quantity"
                                value={Crypto_Quantity ? Crypto_Quantity : ""}
                                onChange={quantityHandler}
                                readOnly={readOnly}
                            />

                            <input
                                type="text"
                                placeholder="Crypto Amount"
                                value={Crypto_Amount_Invested ? Crypto_Amount_Invested : ""}
                                onChange={amountHandler}
                                readOnly={readOnly}
                            />

                            <center><p style={{
                                color: "red",
                                visibility: messageVisibilty === true ? "visible" : "hidden"
                            }}>{message}</p></center>

                            <div className="buttonGroup d-flex justify-content-around">

                                <button
                                    className="btn btn-outline-success"
                                    onClick={update}>
                                    UPDATE
                                </button>

                                <button
                                    className="btn btn-outline-success"
                                    onClick={confirmUpdate}>
                                    CONFIRM UPDATE
                                </button>

                                <button
                                    className="btn btn-outline-success"
                                    onClick={deleteCryptoInfo}>
                                    DELETE
                                </button>

                            </div>

                        </div>
                    );
                }
            } else {
                return <NoCryptoExists />
            }
        }
    }

    return (

        <div>
            {
                props.userID === "" ?
                    <NoUserFound />
                    :
                    <div className="divWithInputButton">

                        <input
                            type="text"
                            value={cryptoName}
                            onChange={cryptonamehandler}
                            placeholder="Crypto Name"
                        />

                        <center><p style={{
                            color: "red",
                            visibility: visibility === true ? "visible" : "hidden"
                        }}>Enter Crypto Name</p></center>

                        <button
                            className="searchButton btn btn-outline-success"
                            onClick={search}>
                            SEARCH
                        </button>

                    </div>

            }

            {
                afterFirstComponent()
            }

        </div>

    )
}



export default ShowIndividualCrypto;
