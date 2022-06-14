import "./App.css";
import React, {useState, useEffect} from "react";
import arraysame from "./arraysame";
// Use this API
// https://api2.binance.com/api/v3/ticker/24hr

// symbols we want...
// BTCUSDT (Bitcoin)
// ETHUSDT (Ethereum)
// SOLUSDT (Solana)
// ADAUSDT (Cardano)
// DOGEUSDT (DogeCoin)

export default function App() {
  // 1. STATE AND USEEFFECT HERE

  const coin_names = {
    BTCUSDT: "Bitcoin",
    ETHUSDT: "Ethereum",
    SOLUSDT:"Solana",
    ADAUSDT: "Cardano",
    DOGEUSDT: "DogeCoin"
  }
const [wantedCryptoInfos, setWantedCryptoInfos] = useState([])
const wantedSymbols = Object.keys(coin_names)
async function getCryptoInfo(){
const res = await fetch('https://api2.binance.com/api/v3/ticker/24hr')
const data = await res.json()
setWantedCryptoInfos(arraysame(data,wantedSymbols))
}
useEffect(
  () =>{
   getCryptoInfo()
   
  },[]
)
  // 2. How will you "Pull out" the symbols we need?
console.log(wantedCryptoInfos)
  // 3. ...and then store them in state?
  let cryptoElements = ""
 if(wantedCryptoInfos !==[])
  {cryptoElements = wantedCryptoInfos.map( (crypto,i) => (
    
  <>
    <tr key={i}>
      <th>{i+1}</th>
      <th>{coin_names[crypto.symbol]}</th>
      <th>${Number(crypto.lastPrice)}</th>
      <th 
      style={crypto.priceChangePercent > 0 
      ? {color:"green"} 
      : {color:"red"}
      }
      >
      {(crypto.priceChangePercent > 0 ? '▲' : '▼') + crypto.priceChangePercent } %
      </th>
    </tr>
  </>
)

)}
  return (
    <div className="App">
      <nav>
        <img
          alt="logo"
          src="https://assets.codepen.io/6060109/crypto-logo-secondary.png"
        />
        <input type="text" placeholder="Search" />
      </nav>
      <div className="main-content">
        <h2>Today's cryptocurrency prices</h2>
        <table>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
          </tr>
          {/* 3. Display data here... */}
          {/* HINT: Map to JSX */}

          {/* Up? Green + ▲ */}
          {/* Down? Red + ▼ */}
         {cryptoElements}
        </table>
        <div className="bottom-logo-ctr">
          <img
            className="bottom-logo"
            alt="logo"
            src="https://assets.codepen.io/6060109/crypto-logo-primary.png"
          />
        </div>
      </div>
    </div>
  );
}
