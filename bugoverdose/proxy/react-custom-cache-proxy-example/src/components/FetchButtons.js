import { useState } from "react";
import { fetchCoinWithDefaultCache, fetchCoinWithNoCache } from "../api";
import CoinCache from "../domains/CoinCache";

const FetchButtons = ({ coinId, coinName }) => {
  const [cacheStorage] = useState(
    new Proxy(
      {},
      {
        get: async (obj, coinId) => {
          const coin = obj[coinId];

          console.log("look for cache in application!");

          if (coin && !coin.isExpired()) return coin.getData();

          const newData = await fetchCoinWithNoCache(coinId);

          console.log("fetch data & generate new cache!");

          if (!coin) {
            obj[coinId] = new CoinCache(newData);
            return newData;
          }

          obj[coinId].updateData(newData);
          return newData;
        },
      }
    )
  );

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

    console.log(await cacheStorage[coinId]);

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
