import { useState } from "react";
import { CoinDataContext } from "../context";
import CoinData from "./CoinData";
import CoinsData from "./CoinsData";

const App = () => {
  const [loadingCoin, setLoadingCoin] = useState(true);
  const [coinData, setCoinData] = useState([]);

  return (
    <CoinDataContext.Provider
      value={{
        loadingCoin,
        setLoadingCoin,
        coinData,
        setCoinData,
      }}
    >
      <CoinsData />
      <CoinData />
    </CoinDataContext.Provider>
  );
};

export default App;
