import React from "react";
import { NerdPointContext } from "../utils/nerdpoint-context";

const StateConsumerComponent = () => {
  return (
    <NerdPointContext.Consumer>
      {({ nerdPoint, increment, decrement }) => (
        <>
          <div>nerdPoint: {nerdPoint}</div>
          <button onClick={increment}>증가시키기</button>
          <button onClick={decrement}>감소시키기</button>
        </>
      )}
    </NerdPointContext.Consumer>
  );
};

export default StateConsumerComponent;
