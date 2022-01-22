import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NerdPointContext } from "../utils/nerdpoint-context";

const UseContextComponent = () => {
  const { nerdPoint, increment, decrement } = useContext(NerdPointContext);
  return (
    <>
      <div>nerdPoint: {nerdPoint}</div>
      <button onClick={increment}>증가시키기</button>
      <button onClick={decrement}>감소시키기</button>
      <Link to="/">with Context.Consumer</Link>
    </>
  );
};

export default UseContextComponent;
