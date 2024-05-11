
// this is the Methods.js file, where all the handy methods releated to :
// * UserSignUp, 
// * UserLogin, 
// * User-Authentiction 
// * NewCrypto Entry
// * Showing All Crypto


import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { database, auth } from "../Backend-Connectivity/FireBaseInstamce";
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const signUpUser =async (email, password) => {

    // signUpUser method use to SignUp an User with the Firebase

    let status = false;
    let errorMessage = "";

    await createUserWithEmailAndPassword(auth, email, password).
    then(res => {
        status = true;
    }).catch(error => {
        status = false;
        errorMessage = error.message;
    });
    return [status, errorMessage];

    // it returns two values :
    //     * status : true / false
    //     * errorMessage : message returned by the Firebase while SignUp
}

export const signInUser =async(email, password) => {

    // signInUser method use to SignIn an User with the Firebase

    let userID = "";
    let status = false;
    let errorMessage = "";

    await signInWithEmailAndPassword(auth, email, password)
    .then((userData) => {
        userID = userData.user.uid;
        status = true;
    })
    .catch(error => {
        status = false;
        errorMessage = error.message;
    });

    return [userID, status, errorMessage];

    //  it returns two values :
    //     * userID : returned when an user found successfully
    //     * status : true / false
    //     * errorMessage : message returned by the Firebase while SignUp
    
}

export const addCryptoDataToFireBase =async(userID, CryptoName, CryptoPrice, CryptoQuantity, CryptoInvestedAmount) => {

    // addCryptoDataToFireBase method is use to add a new Crypto to th Firebase

    const value = collection(database, userID);
    const Crypto_Data = await getDocs(value);

    CryptoName = CryptoName.toUpperCase();

    let status = false;
    let statusMessage = "";

    Crypto_Data.docs.map(crypto => {
        if(crypto.data().Crypto_Name === CryptoName){
            status = true;
        }
    });

    if(status === true){
        statusMessage = "Crypto named "+CryptoName+" already exists";
    }else{
        await addDoc(value, {
            Crypto_Name : CryptoName,
            Crypto_Price : CryptoPrice,
            Crypto_Quantity : CryptoQuantity,
            Crypto_Amount_Invested : CryptoInvestedAmount
        });
        statusMessage = "data inserted";
    }

    return [status, statusMessage];
}

export const getCryptoDataFromFireBase =async(userID) => {

    // getCryptoDataFromFireBase method is use to get a particular crypto data respective of that user

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
