import React, { useState } from "react";
import Router from "./Router";
import { NerdPointContext } from "./utils/nerdpoint-context";

const App = () => {
  const [nerdPoint, setNerdPoint] = useState(0); // 최상위 컴포넌트인 App에서 단 하나의 state를 생성

  return (
    <NerdPointContext.Provider
      value={{
        nerdPoint,
        increment: () => setNerdPoint(nerdPoint + 1), // setState를 직접 전달하지 않고
        decrement: () => setNerdPoint(nerdPoint - 1), // 정해진 메서드들로만 state 변경 가능하도록 지정
      }}
    >
      <Router />
    </NerdPointContext.Provider>
  );
};

export default App;
