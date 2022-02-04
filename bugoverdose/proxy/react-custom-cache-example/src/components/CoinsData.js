import { useContext, useEffect, useState } from "react";
import { fetchCoins, fetchCoinPrice } from "../api";
import { CoinDataContext } from "../context";
import CoinRepository from "../domains/CoinRepository";
import Loading from "./Loading";

const CoinsData = () => {
  const [coinRepository] = useState(new CoinRepository());
  const [loadingCoins, setLoadingCoins] = useState(true);
  const [coinListData, setCoinListData] = useState([]);

  const { setLoadingCoin, setCoinData } = useContext(CoinDataContext);
  const { setLoadingCache, setCacheData } = useContext(CoinDataContext);

  const onCoinClick = async (e, coinId) => {
    const startTime = new Date().getTime();

    setLoadingCoin(true);
    setCoinData(await fetchCoinPrice(coinId));
    setLoadingCoin(false);

    const endTime = new Date().getTime();
    console.log(`${coinId} (no cache) : ${endTime - startTime}ms`);
  };

  const onCacheClick = async (e, coinId) => {
    const startTime = new Date().getTime();

    setLoadingCache(true);
    setCacheData(await coinRepository.findById(coinId));
    setLoadingCache(false);

    const endTime = new Date().getTime();
    console.log(`${coinId} (cache) : ${endTime - startTime}ms`);
  };

  useEffect(() => {
    const getCoinsData = async () => {
      const data = await fetchCoins();
      setCoinListData(data.slice(0, 10));
    };

    setLoadingCoins(true);
    getCoinsData();
    setLoadingCoins(false);
  }, []);

  if (loadingCoins) return <Loading />;

  return (
    <ul>
      {coinListData.map((coin, idx) => (
        <li key={idx}>
          <button onClick={(e) => onCoinClick(e, coin.id)}>
            {coin.name} | No Cache
          </button>
          <button onClick={(e) => onCacheClick(e, coin.id)}>
            {coin.name} | Cache
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CoinsData;
