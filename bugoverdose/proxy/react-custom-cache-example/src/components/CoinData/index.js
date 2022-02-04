import CoinCache from "./CoinCache";
import RawCoinData from "./NoCache";

const CoinData = () => {
  return (
    <div>
      <RawCoinData />
      <CoinCache />
    </div>
  );
};

export default CoinData;
