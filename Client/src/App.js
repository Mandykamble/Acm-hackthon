import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import Djob from "./contracts/Djob.json";
import "./components/Cliant"
import "./App.css";
import Cliant from "./components/Cliant";

const App = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = Djob.networks[networkId];
        console.log("Contract Address:", deployedNetwork.address);
        const instance = new web3.eth.Contract(
          Djob.abi,
          deployedNetwork && deployedNetwork.address
        );
        setState({ web3, contract: instance });
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <div className="App">
      <Cliant state={state}> </Cliant>
      {/* <Freelancer state={state} address={address}></Freelancer> */}
    </div>
  );
};
export default App;
