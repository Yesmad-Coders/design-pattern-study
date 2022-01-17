import React from "react";
import { counter } from "../../../utils/counter";
import { Link } from "gatsby";

const SingletonVanillaPage = () => {
  return (
    <main>
      <title>Singleton 바닐라JS</title>
      <h1>Singleton 바닐라JS</h1>
      <div>현재 값: {counter.getCount()}</div>

      <li>
        <Link to="/singleton/vanilla/increment">증가시키러 가기</Link>
      </li>
      <li>
        <Link to="/singleton/vanilla/decrement">감소시키러 가기</Link>
      </li>

      <p>
        <li>
          각 index.js, increment.js, decrement.js에서 각자 counter 객체를
          import하여 사용함
        </li>
        <li>전역 스코프에 선언된 단일의 count 값은 각 라우트들에 공유됨</li>
      </p>
    </main>
  );
};

export default SingletonVanillaPage;
