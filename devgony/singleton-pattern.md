# Singleton Pattern

# Definition

- 단 한번만 instantiate 되며 global 에서 접근이 가능한 Class를 활용 하는 패턴
- global state 를 관리하는데 용이

# ES2015 Class를 활용한 예시

```js
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
```

- `Object.freeze` 를 사용해 모듈을 import 하는 외부에서 singleton을 수정할 수 없도록 함

# 장점

- 메모리 공간 사용을 현저히 줄일 수 있음

# 단점

## 일반 object 활용이면 충분

- JS에서는 직접 object를 생성 할 수 있기 때문에 singleton pattern의 class를 사용하지 않아도 된다

```js
let count = 0;

const counter = {
  increment() {
    return ++count;
  },
  decrement() {
    return --count;
  },
};

Object.freeze(counter);
export { counter };
```

## Testing 어렵다

- Testing 에서 singleton 을 사용할 경우 모든 test 가 기존 test의 영향을 받는다
- Test의 순서가 결과에 영향을 미친다
- Test 이후 전체 instance를 초기화 해야한다

## Dependency hiding 짜증난다

- import하는 module이 singleton 인지 아닌지 모른다
- import 된 singleton의 값이 변할 경우 로직의 문제 발생 가능

## Global behavior

- singleton은 어디에서나 접근/변경 가능하기 때문에 data flow 를 이해 하고 그 순서에 맞게 수행 하는 것이 중요

## State management in React

- Redux와 같은 global state 관리 tool은 의도되지 않은 mutation 막기 위해 read-only 이고 mutate 함수를 별도 제공한다

# Henry's Example

- Unit testing for Prisma

```ts
// client.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;
```

```ts
// singleton.ts
import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import prisma from "./client";

jest.mock("./client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
```

- PrismaClient 를 `client.ts` 내 에서 한 번만 instantiate 하여 testing 하는 형태
- `단점` 에서 언급한 대로 test 직전마다 이전에 mock한 부분을 reset 해주고있다.
