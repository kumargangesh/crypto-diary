import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import FrontPage from './FrontPage';
import "./Style.css";
import Navbar from './Navbar';
import CryptoFrontPage from '../Crypto/CryptoFrontPage';
import NewEntry from "../Crypto/NewEntry";
import ShowIndividualCrypto from '../Crypto/ShowIndividualCrypto';
import ShowAllCrypto from '../Crypto/ShowAllCrypto';
import { getCryptoDataFromFireBase } from '../Backend-Connectivity/Methods';
import UserSettings from './UserSettings';

function Routing() {

  const [email, setEmail] = useState("S");
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState("");

  const [Crypto_Name, setCryptoName] = useState([]);
  const [Crypto_Price, setCryptoPrice] = useState([]);
  const [Crypto_Quantity, setCryptoQuanCrypto_Quantity] = useState([]);
  const [Crypto_Amount_Invested, setCryptoAmount] = useState([]);

  const [cryptoName, setcryptoname] = useState();

  useEffect(() => {
    console.log("in the Routing.js, UserID : " + userID);
    getCryptoInfo();
    console.log("in the useEffect of Routing, Crypto_Name : " + cryptoName);
  });

  const getCryptoInfo = async () => {
    try {
      const Crypto_Info = await getCryptoDataFromFireBase(userID);
      Crypto_Info.map((value) => {
        console.log("in the useEffect of Routing.js, :");
        Crypto_Name.push(value.Crypto_Name);
        Crypto_Price.push(value.Crypto_Price);
        Crypto_Quantity.push(value.Crypto_Quantity);
        Crypto_Amount_Invested.push(value.Crypto_Invested_Amount);
      });
      console.log("in the Useeffect of Routing : " + Crypto_Name);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Router>

      <Navbar email={email} />

      <Routes>
        <Route path="/"
          element={
            <FrontPage
              email={email}
              setemail={setEmail}
            />
          }
        />

        <Route path="/signup"
          element={
            <SignUp
              email={email}
              setemail={setEmail}
              setPassword={setPassword}
            />
          }
        />

        <Route path="/login"
          element={
            <Login
              email={email}
              setemail={setEmail}
              userID={userID}
              setuserid={setUserID}
              setPassword={setPassword}
            />
          }
        />

        <Route path="/routing"
          element={
            <CryptoFrontPage
              userID={userID}
              Crypto_Name={Crypto_Name}
              Crypto_Price={Crypto_Price}
              Crypto_Quantity={Crypto_Quantity}
              Crypto_Amount_Invested={Crypto_Amount_Invested}
            />
          }
        />

        <Route path="/newentry"
          element={
            <NewEntry
              userID={userID}
            />
          }
        />

        <Route
          path="/showindividualcrypto"
          element={
            <ShowIndividualCrypto
              userID={userID}
              Crypto_Name={Crypto_Name}
            />
          }
        />

        <Route path="/showallcrypto"
          element={
            <ShowAllCrypto
              userID={userID}
              Crypto_Name={Crypto_Name}
              Crypto_Price={Crypto_Price}
              Crypto_Quantity={Crypto_Quantity}
              Crypto_Amount_Invested={Crypto_Amount_Invested}
            />
          }
        />

        <Route path="/usersettings"
          element={
            <UserSettings
              email={email}
              password={password}
            />
          }
        />

      </Routes>
    </Router>
  )
}

export default Routing;
