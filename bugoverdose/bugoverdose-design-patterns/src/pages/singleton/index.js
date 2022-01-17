import React from "react";
import { Link } from "gatsby";

const SingletonPage = () => {
  return (
    <main>
      <title>Singleton</title>
      <h1>싱글톤 패턴</h1>
      <p>
        <div>
          <Link to="/singleton/vanilla">바닐라 JS</Link>
        </div>
        <li>
          책에 나온 예시 코드를 React 환경에서 그대로 적용해본 결과를
          확인해보고자 간략히 구현함
        </li>
        <li>
          useState 훅을 사용하지 않고 전역 스코프에 let으로 선언된 count라는
          변수는 다른 라우트들에서 그대로 공유될 수 있음.
        </li>
        <li>
          count를 변경하기 위한 counter <strong>객체</strong>의 경우 애초에{" "}
          <strong>참조되어 사용되기 때문에</strong> (굳이 상위 컴포넌트에서 정의
          및 import하고 하위 컴포넌트들에 prop으로 일일이 전달하지 않더라도)
          자연스럽게 싱글톤으로 관리됨.
        </li>
      </p>
    </main>
  );
};

export default SingletonPage;
