import CoinCache from "./CoinCache";
import { fetchCoinPrice } from "../api";

class CoinRepository {
  #coins;

  constructor() {
    this.#coins = {};
  }

  async findById(coinId) {
    const coin = this.#coins[coinId];

    if (coin && !coin.isExpired()) return coin.getData();

    const newData = await fetchCoinPrice(coinId);

    if (!coin) {
      this.#coins[coinId] = new CoinCache(newData);
      return newData;
    }

    this.#coins[coinId].updateData(newData);
    return newData;
  }
}

export default CoinRepository;
