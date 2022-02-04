const BASE_URL = "https://api.coinpaprika.com/v1";

export const fetchCoins = () =>
  fetch(`${BASE_URL}/coins`).then((response) => response.json());

export const fetchCoinPrice = (coinId) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
};
