## 실행

```
npm install
npm start
```

- 구현 조건에 웹팩을 못 쓴다는 조건이 있어서 쓰지 않았습니다.
- script type="module"로 로컬 script 이용시 cors 문제를 일으켜서 live-server 로 실행해야 합니다.

## 테스트 실행

```
npm run cypress:open
or
npm run test
```

- cypress 를 이용한 e2e 테스트로 작성 하였습니다
- 실행 후 나오는 콘솔에서 ete.test.js를 클릭하면 테스트가 실행됩니다.
  - 간혹 버전차이로 인해 cypress에 크롬이나 엣지가 연결이 안되는 경우가 있는데 오른쪽 위 탭에서 electron을 연결하면 테스트 할 수 있습니다
  - `npm run test` 을 쓰면 cli 에서 테스트도 가능합니다
- 테스트는 live-server가 실행이 되어 있어야 동작됩니다.

## 구조 설명

- 전체적으로 단방향으로 의존성으로 구현 했습니다.
- 컴포넌트 재사용성을 높이기 위해 공통 모듈을 구현했습니다.
- 공통 모듈 상속 후에 개별 컴포넌트가 구현됩니다.

### Component

- 각 컴포넌트들은 Component 모듈을 기본적으로 상속합니다.
- init 메서드를 이용시 root 가 되는 html string을 반환하며 해당 root element를 이용해서 하위 element를 그리게 됩니다.
- init 메서드 종료시 render 메서드를 호출하게 되며 render 메서드에서 template을 그리게 됩니다.
- render 메서드가 끝난 후에는 didMount 메서드가 호출되며 그려진 element에 이벤트 바인딩을 하게 됩니다.
- state 프로퍼티는 Proxy를 통해 trap 되며 의존성 주입된 다른 컴포넌트에서 state 변경시 update 메서드를 호출하며 미리 정의한 DOM 업데이트 등과 같은 관련 로직이 실행됩니다.

### MessageInput

- 메시지 아이템을 추가하는 컴포넌트입니다
- inject 메서드로 MessageList 컴포넌트를 주입받고 버튼 클릭시 메시지 아이템 상태를 추가하게 됩니다.
- 주입 받은 MessageList의 state 는 변경시 Proxy로 추적이 됩니다.
- MessageList의 update 메서드가 호출되고 MessageItem 생성 및 DOM 추가가 이뤄집니다.

### MessageList

- MessageItem들을 관리하는 컴포넌트 입니다
- 시간 로직, MessageItem의 state와 이벤트가 모두 관리 되기 때문에 가장 복잡도가 높게 설계 되었습니다
- 시간 로직
  - setInterval 하나가 유지되면서 MessageItem의 setLeftTime 메서드를 호출해서 DOM 상태를 바꾸게 됩니다
  - 모든 item들이 사라졌을때 해제 되도록 설계 되었습니다.
- 이벤트
  - item들의 이벤트 핸들링은 Element.closest를 이용해서 MessageList에 이벤트 위임됩니다.

### MessageItem

- 단순히 item들의 DOM 업데이트 로직만 있는 컴포넌트 입니다
