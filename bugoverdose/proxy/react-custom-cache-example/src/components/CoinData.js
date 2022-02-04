import { useContext } from "react";
import { CoinDataContext } from "../context";

const CoinData = () => {
  const { loadingCoin, coinData } = useContext(CoinDataContext);

  if (loadingCoin) return <></>;

  return (
    <div>
      <div>Name: {coinData?.name}</div>
      <div>Circulating Supply: {coinData?.circulating_supply}</div>
      <div>Total Supply: {coinData?.total_supply}</div>
      <div>Max Supply: {coinData?.max_supply}</div>
    </div>
  );
};

export default CoinData;
