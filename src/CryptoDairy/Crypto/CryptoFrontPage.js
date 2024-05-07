import React, { useState } from 'react';
import "./Style.css";
import { Link } from 'react-router-dom';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { database } from '../Backend-Connectivity/FireBaseInstamce';

function CryptoFrontPage(props) {

  const deleteAllCrypto = async () => {

    if (props.Crypto_Name.length <= 0 && props.Crypto_Price.length <= 0 && props.Crypto_Quantity.length <= 0 && props.Crypto_Amount_Invested.length <= 0) {
      alert("No cryptos available at this time, please add some");
    } else {
      if (window.confirm("Are you sure to delete all cryptos...") === true) {
        let index = 0;

        const value = collection(database, props.userID);
        const data = await getDocs(value);
        let dataBaseID = [];
        data.docs.map(doc => {
          if (doc.data().Crypto_Name === props.Crypto_Name[index]) {
            index += 1;
            dataBaseID.push(doc.id);
          }
        });
        for (let i = 0; i < dataBaseID.length; i++) {
          const deleteVal = doc(database, props.userID, dataBaseID[i]);
          await deleteDoc(deleteVal);
        }
        alert("All the values, successfully deleted");
      }
    }

  }

  return (
    <div>
      <div className="btn-group services">

        <button
          type="button"
          className="btn  btn-outline-success dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          SERVICES
        </button>
        
        <ul className="dropdown-menu">

          <li>
            <Link className="dropdown-item" to="/newentry">
              <button className="btn  btn-outline-success">
                NEW CRYPTO
              </button>
            </Link>
          </li>

          <li>
            <Link
              className="dropdown-item" to="/showallcrypto">
              <button className="btn  btn-outline-success">
                ALL CRYPTOS
              </button>
            </Link>
          </li>

          <li>
            <Link
              className="dropdown-item" to="/showindividualcrypto">
              <button className="btn  btn-outline-success">
                INDIVIDUAL CRYPTO
              </button>
            </Link>
          </li>

          <li>
            <button
              className="btn  btn-outline-success"
              onClick={deleteAllCrypto}>
              DELETE ALL CRYPTO
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CryptoFrontPage;
