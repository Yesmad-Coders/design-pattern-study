import { createContext } from "react";

export const CoinDataContext = createContext({
  coinData: {},
  setCoinData: () => {},

  loadingCoin: true,
  setLoadingCoin: () => {},

  cacheData: {},
  setCacheData: () => {},

  loadingCache: true,
  setLoadingCache: () => {},
});
