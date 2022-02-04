import { useContext, useEffect, useState } from "react";
import { fetchCoins, fetchCoinPrice } from "../api";
import { CoinDataContext } from "../context";
import Loading from "./Loading";

const CoinsData = () => {
  const [loadingCoins, setLoadingCoins] = useState(true);
  const [coinListData, setCoinListData] = useState([]);

  const { setLoadingCoin, setCoinData } = useContext(CoinDataContext);

  const onCoinClick = async (e, coinId) => {
    setLoadingCoin(true);
    setCoinData(await fetchCoinPrice(coinId));
    setLoadingCoin(false);
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
          <button onClick={(e) => onCoinClick(e, coin.id)}>{coin.name}</button>
        </li>
      ))}
    </ul>
  );
};

export default CoinsData;
