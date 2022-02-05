export const fetchCoins = () =>
  fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );

// no-store : the browser does not look for cache & don't update the cache
export const fetchCoinWithNoCache = (coinId) =>
  fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`, {
    cache: "no-store",
  }).then((response) => response.json());

// default : the browser looks for a matching request in its HTTP cache
export const fetchCoinWithDefaultCache = (coinId) =>
  fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then((response) =>
    response.json()
  );
