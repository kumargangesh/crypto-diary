import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { database, auth } from "../Backend-Connectivity/FireBaseInstamce";
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const signUpUser =async (email, password) => {
    
    let status = false;

    await createUserWithEmailAndPassword(auth, email, password).
    then(res => {
        alert("Hurray, User successfully created");
        status = true
    }).
    catch(error =>  {
        alert(error.message);
        status = false;
    });

    return status;
}

export const signInUser =async(email, password) => {

    let userID = "";

    await signInWithEmailAndPassword(auth, email, password)
    .then((userData) => {
        console.log(userData);
        console.log("user email : "+userData.user.email);
        console.log("user ID : "+userData.user.uid);
        userID = userData.user.uid;
    })
    .catch(error => alert(error.message));

    return userID;
}

export const addCryptoDataToFireBase =async(userID, CryptoName, CryptoPrice, CryptoQuantity, CryptoInvestedAmount) => {
    const value = collection(database, userID);
    const Crypto_Data = await getDocs(value);

    CryptoName = CryptoName.toUpperCase();

    let status = false;

    Crypto_Data.docs.map(crypto => {
        if(crypto.data().Crypto_Name === CryptoName){
            status = true;
            console.log("in isDataExists, crypto already exists");
        }
    });

    if(status === true){
        alert("Crypto named "+CryptoName+" already exists");
    }else{
        await addDoc(value, {
            Crypto_Name : CryptoName,
            Crypto_Price : CryptoPrice,
            Crypto_Quantity : CryptoQuantity,
            Crypto_Amount_Invested : CryptoInvestedAmount
        });
        alert("data inserted");
    }
}

export const getCryptoDataFromFireBase =async(userID) => {
    const value = collection(database, userID);
    const Crypto_Values = await getDocs(value);
    let Crypto_Data = [];
    Crypto_Values.docs.map(doc => {
        let object = {};
        object.Crypto_Name = doc.data().Crypto_Name;
        object.Crypto_Price = doc.data().Crypto_Price;
        object.Crypto_Quantity = doc.data().Crypto_Quantity;
        object.Crypto_Invested_Amount = doc.data().Crypto_Amount_Invested;
        Crypto_Data.push(object);
    });

    return Crypto_Data;
}



// export const addDataToFireBase = async (userName, password) => {

//     const value = collection(database, "users");

//     const status = await isUserExists(userName);

//     if (status !== undefined) {
//         const newCollection = collection(database, status);

//         await addDoc(newCollection, {
//             Crypto_Name : "LIVEPEER",
//             Crypto_Price : 1350,
//             Crypto_Quantity : 10,
//             Crypto_Amount_Invested : 13500
//         });
//         alert("data inserted");
    
//     } else {
//         console.log("user already exists");
//     }

//     // if (status === false) {

//     //     // await addDoc(value, {
//     //     //     name: userName,
//     //     //     password: password
//     //     // });
//     //     // alert("user created");
//     // } else {
//     //     console.log("user already exists");
//     // }

// }

// const isUserExists = async (userName) => {

//     const value = collection(database, "users");

//     const users = await getDocs(value);

//     let status;

//     users.docs.map(doc => {
//         if (doc.data().name === userName) {
//             status = doc.id;
//         }
//     });

//     return status;

//     // if (status === true) {
//     //     return true;
//     // } return false;

//     // let userNames = [];

//     // users.docs.map(doc => {
//     //     let user = [];
//     //     user.push(doc.data().name);
//     //     user.push(doc.data().password);
//     //     userNames.push(user);
//     // });

//     // return userNames;
// }
