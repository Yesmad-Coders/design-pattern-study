import React from "react";
import { counter } from "../../utils/counter";
import { Link } from "gatsby";

const IncrementPage = () => {
  const onClickHandler = () => {
    counter.increment();
    console.log(counter.getCount());
  };

  return (
    <main>
      <title>Increment | singleton</title>
      <h1>Increment</h1>
      <div>증가시키기 전의 현재 값: {counter.getCount()}</div>
      <li>
        <button onClick={onClickHandler}>증가시키기</button>
      </li>
      <li>
        <Link to="/vanilla">변화 확인하러 돌아가기</Link>
      </li>
      <li>
        <Link to="/vanilla/decrement">감소시키러 가기</Link>
      </li>

      <p>
        <span style={{ display: "block" }}>
          해당 페이지에서 count 값을 증가시키더라도 현재 값이 변하지 않는 이유는
        </span>
        <span style={{ display: "block" }}>
          당연히 증가된 값으로{" "}
          <strong>컴포넌트를 다시 렌더링하지 않아서입니다.</strong>
        </span>
        <span style={{ display: "block" }}>
          브라우저의 콘솔에서 실시간으로 변화하는 데이터를 확인할 수 있습니다.
        </span>
      </p>
    </main>
  );
};

export default IncrementPage;
