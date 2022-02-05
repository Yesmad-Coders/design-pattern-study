import { useState } from "react";
import { fetchCoinWithDefaultCache, fetchCoinWithNoCache } from "../api";
import CoinRepository from "../domains/CoinRepository";

const FetchButtons = ({ coinId, coinName }) => {
  const [coinRepository] = useState(new CoinRepository());

  const onNoCacheClick = async (e, coinId, coinName) => {
    console.log(`Get ${coinName} data : (no cache)`);
    const startTime = new Date().getTime();

    await fetchCoinWithNoCache(coinId);

    const endTime = new Date().getTime();
    console.log(`It took ${endTime - startTime}ms.`);
  };

  const onDefaultCacheClick = async (e, coinId, coinName) => {
    console.log(`Get ${coinName} data : (default cache)`);
    const startTime = new Date().getTime();

    await fetchCoinWithDefaultCache(coinId);

    const endTime = new Date().getTime();
    console.log(`It took ${endTime - startTime}ms.`);
  };

  const onCustomCacheClick = async (e, coinId, coinName) => {
    console.log(`Get ${coinName} data : (custom cache)`);
    const startTime = new Date().getTime();

    await coinRepository.findById(coinId);

    const endTime = new Date().getTime();
    console.log(`It took ${endTime - startTime}ms.`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        whiteSpace: "nowrap",
      }}
    >
      <span>{coinName} </span>
      <span>
        <button onClick={(e) => onNoCacheClick(e, coinId, coinName)}>
          No Cache
        </button>
        <button onClick={(e) => onDefaultCacheClick(e, coinId, coinName)}>
          Default Cache
        </button>
        <button onClick={(e) => onCustomCacheClick(e, coinId, coinName)}>
          Custom Cache
        </button>
      </span>
    </div>
  );
};

export default FetchButtons;
