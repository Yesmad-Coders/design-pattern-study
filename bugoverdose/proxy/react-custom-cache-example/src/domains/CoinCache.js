class CoinCache {
  #data;
  #expirationTime;

  constructor(data) {
    this.#data = data;
    this.#expirationTime = this.#generateExpirationTime();
  }

  getData() {
    return this.#data;
  }

  updateData(data) {
    this.#data = data;
    this.#expirationTime = this.#generateExpirationTime();
  }

  isExpired() {
    const curTime = new Date().getTime();
    return this.#expirationTime < curTime;
  }

  #generateExpirationTime() {
    const registeredTime = new Date().getTime();
    const minuteInMiliseconds = 60 * 1000;
    return registeredTime + minuteInMiliseconds;
  }
}

export default CoinCache;
