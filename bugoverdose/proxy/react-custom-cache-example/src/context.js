import { createContext } from "react";

export const CoinDataContext = createContext({
  loadingCoin: true,
  setLoadingCoin: () => {},

  coinData: {},
  setCoinData: () => {},
});
