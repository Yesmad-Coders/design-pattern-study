import { useContext } from "react";
import { CoinDataContext } from "../../context";

const RawCoinData = () => {
  const { loadingCoin, coinData } = useContext(CoinDataContext);

  if (loadingCoin) return <></>;

  return (
    <div>
      <h3>No Cache</h3>
      <div>Name: {coinData?.name}</div>
      <div>Circulating Supply: {coinData?.circulating_supply}</div>
      <div>Total Supply: {coinData?.total_supply}</div>
      <div>Max Supply: {coinData?.max_supply}</div>
    </div>
  );
};

export default RawCoinData;
