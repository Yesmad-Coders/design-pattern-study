import { useEffect, useState } from "react";
import { fetchCoins } from "../api";
import FetchButtons from "./FetchButtons";
import Loading from "./Loading";

const App = () => {
  const [loadingCoins, setLoadingCoins] = useState(true);
  const [coinListData, setCoinListData] = useState([]);

  useEffect(() => {
    const getCoinsData = async () => {
      const data = await fetchCoins();
      setCoinListData(data.slice(91, 111));
    };

    setLoadingCoins(true);
    getCoinsData();
    setLoadingCoins(false);
  }, []);

  if (loadingCoins) return <Loading />;

  return (
    <ul>
      <h2>Coins</h2>
      {coinListData.map((coin, idx) => (
        <FetchButtons key={idx} coinId={coin.id} coinName={coin.name} />
      ))}
      <button style={{ marginTop: 20 }} onClick={(e) => console.log("")}>
        create blank space in console
      </button>
    </ul>
  );
};

export default App;
