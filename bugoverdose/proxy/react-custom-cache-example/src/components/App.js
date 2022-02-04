import { useState } from "react";
import { CoinDataContext } from "../context";
import CoinData from "./CoinData";
import CoinsData from "./CoinsData";

const App = () => {
  const [coinData, setCoinData] = useState([]);
  const [loadingCoin, setLoadingCoin] = useState(true);

  const [cacheData, setCacheData] = useState([]);
  const [loadingCache, setLoadingCache] = useState(true);

  return (
    <CoinDataContext.Provider
      value={{
        loadingCoin,
        setLoadingCoin,
        coinData,
        setCoinData,

        cacheData,
        setCacheData,
        loadingCache,
        setLoadingCache,
      }}
    >
      <CoinsData />
      <CoinData />
    </CoinDataContext.Provider>
  );
};

export default App;
