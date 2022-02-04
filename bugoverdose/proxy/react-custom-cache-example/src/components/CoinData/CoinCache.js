import { useContext } from "react";
import { CoinDataContext } from "../../context";

const CoinCache = () => {
  const { loadingCache, cacheData } = useContext(CoinDataContext);

  if (loadingCache) return <></>;

  return (
    <div>
      <h3>Cache</h3>
      <div>Name: {cacheData?.name}</div>
      <div>Circulating Supply: {cacheData?.circulating_supply}</div>
      <div>Total Supply: {cacheData?.total_supply}</div>
      <div>Max Supply: {cacheData?.max_supply}</div>
    </div>
  );
};

export default CoinCache;
