import React from "react";
import { Link } from "react-router-dom";
import { NerdPointContext } from "../context";

const ContextConsumerComponent = () => {
  return (
    <NerdPointContext.Consumer>
      {({ nerdPoint, increment, decrement }) => (
        <>
          <div>nerdPoint: {nerdPoint}</div>
          <button onClick={increment}>증가시키기</button>
          <button onClick={decrement}>감소시키기</button>
          <Link to="/use-context">with useContext</Link>
        </>
      )}
    </NerdPointContext.Consumer>
  );
};

export default ContextConsumerComponent;
