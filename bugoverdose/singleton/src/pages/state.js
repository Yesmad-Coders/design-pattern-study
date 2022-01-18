import React from "react";
import { Link } from "gatsby";
import { NerdPointContext } from "../components/App";

const SingletonStatePage = () => {
  return (
    <main>
      <title>Singleton State</title>
      <h1>Singleton State</h1>
      <NerdPointContext.Consumer>
        {({ nerdPoint, increment, decrement }) => (
          <>
            <div>nerdPoint: {nerdPoint}</div>
            <li>
              <button onClick={increment}>증가시키기</button>
              <button onClick={decrement}>감소시키기</button>
            </li>
          </>
        )}
      </NerdPointContext.Consumer>
      <li>
        <Link to="/">Go home</Link>
      </li>

      <ol>
        <li>
          App.js에서 useState로 nerdPoint state와 setNerdPoint 함수를 생성.
        </li>
        <li>
          App.js에서 nerdPoint와 nerdPoint를 1만큼 증가/감소시키는 함수 두 개를
          Provider로 주입.
        </li>
        <li>
          해당 페이지에서 Consumer로 nerdPoint state와 변경하는 함수 increment,
          decrement를 받아서 사용.
        </li>
        <li>
          setState를 직접 받지 않기 때문에 정해진 방식대로만 state 변경 가능.
        </li>
      </ol>
    </main>
  );
};

export default SingletonStatePage;
