import React, { useState } from 'react';
import "./Style.css";

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








// import { collection, getDocs } from 'firebase/firestore';
// import React, { useEffect, useState } from 'react';
// import { database } from '../Backend-Connectivity/FireBaseInstamce';

// function IndividualCrypto(props) {

//     const [Crypto_Name, setCryptoName] = useState();
//     const [Crypto_Price, setCryptoPrice] = useState();
//     const [Crypto_Quantity, setCryptoQuantity] = useState();
//     const [Crypto_Amount_Invested, setCryptoAmount] = useState();

//     const priceHandler = (event) => {
//         setCryptoPrice(event.target.value);
//     }

//     const quantityHandler = (event) => {
//         setCryptoQuantity(event.target.value);
//     }

//     const amountHandler = (event) => {
//         setCryptoAmount(event.target.value);
//     }

//     useEffect(() => {
//         console.log("in the useEffect of IndividualCrypto, Crypto_Name : " );
//         console.log("Name : "+props.Crypto_Name);
//         console.log("Price : "+props.Crypto_Price);
//         console.log("Quantity : "+props.Crypto_Quantity);
//         console.log("Amount : "+props.Crypto_Amount);
//     }, [props.Crypto_Name]);

//     // const getCryptoInfo_UsingCryptoName = async () => {
//     //     let name = props.Crypto_Name;
//     //     name = name.toUpperCase();
//     //     console.log(name);
//     //     const value = collection(database, props.userID);
//     //     const Crypto_Info = await getDocs(value);
//     //     Crypto_Info.docs.map((crypto) => {
//     //         // console.log(crypto.data().Crypto_Name);
//     //         // console.log(crypto.data().Crypto_Price);
//     //         // console.log(crypto.data().Crypto_Quantity);
//     //         // console.log(crypto.data().Crypto_Amount_Invested);
//     //         if (crypto.data().Crypto_Name === name) {
//     //             console.log("Crypto name found");
//     //             setCryptoName(crypto.data().Crypto_Name);
//     //             setCryptoPrice(crypto.data().Crypto_Price);
//     //             setCryptoQuantity(props.Crypto_Quantity);
//     //             setCryptoAmount(props.Crypto_Amount_Invested);
//     //         }
//     //     });

//     //     console.log("in the IndividualCrypto, " + Crypto_Name + " " + Crypto_Price + " " + Crypto_Quantity + " " + Crypto_Amount_Invested);
//     // }

//     return (
//         <div className="IndividualCrypto">
//             <center><h1>BITCOIN</h1></center>
//             <input type="text" value={Crypto_Price} onChange={priceHandler} placeholder="Crypto Price" />
//             <input type="text" value={Crypto_Quantity} onChange={quantityHandler} placeholder="Crypto Quantity" />
//             <input type="text" value={Crypto_Amount_Invested} onChange={amountHandler} placeholder="Crypto Amount Invested" />
//         </div>
//     )
// }


// export default IndividualCrypto;