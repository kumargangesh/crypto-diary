import React from 'react';
import SingleCryptoInfo from './SingleCryptoInfo';
import "./Style.css";
import NoUserFound from './NoUserFound';
import NoCryptoExists from './NoCryptoExists';


function ShowAllCrypto(props) {

  return (
    <div>
      <div className="cryptos">
        <div className="row">

          {
            props.userID === "" ?
              <NoUserFound />
              :
              props.Crypto_Name.length > 0 ?
                props.Crypto_Name.map((value, index) => {

                  const price = props.Crypto_Price[index];
                  const quantity = props.Crypto_Quantity[index];
                  const amount = props.Crypto_Amount_Invested[index];

                  return (
                    <div className="col-md-4" key={value}>

                      <SingleCryptoInfo
                        name={value}
                        price={price}
                        quantity={quantity}
                        amount={amount}
                        userID={props.userID}
                      />

                    </div>
                  )
                })
                :
                <NoCryptoExists />
          }

        </div>
      </div>
    </div>
  )
}

export default ShowAllCrypto;
