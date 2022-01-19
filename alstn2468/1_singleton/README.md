# Singleton Pattern (싱글톤 패턴)

> 애플리케이션 전체에서 하나의 글로벌 인스턴스를 공유하는 패턴

싱글톤은 한 번 인스턴스화 할 수 있고 전역으로 접근할 수 있는 클래스입니다. 이 *단일 인스턴스*는 애플리케이션 전체에서 공유할 수 있음으로 싱글톤은 애플리케이션의 글로벌 상태를 관리하는 데 유용합니다.

먼저 ES2015 클래스를 사용하는 싱글톤에 대해 살펴보겠습니다. 예시에서는 아래의 기능을 포함하는 `Counter` 클래스를 만들어보겠습니다.

- `getInstance` : 인스턴스의 값을 반환하는 메서드
- `getCount` : `counter` 변수의 현재 값을 반환하는 메서드
- `increment` : `counter` 값을 1씩 증가시키는 메서드
- `decrement` : `counter` 값을 1씩 감소시키는 메서드

```typescript
let counter = 0;

class Counter {
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
```

하지만 이 클래스는 싱글톤 기준에 맞지 않습니다. 싱글톤은 **한 번만 인스턴스화** 할 수 있습니다. 지금은 `Counter` 클래스의 인스턴스를 여러 개 만들 수 있습니다.

```typescript
let counter = 0;

class Counter {
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

const counter1 = new Counter();
const counter2 = new Counter();

console.log(
  counter1.getInstance() === counter2.getInstance()
); // false
```

새로운 메소드를 두 번 호출함으로써, 단지 `counter1`과 `counter2`를 서로 다른 인스턴스로 설정합니다. `counter1`과 `counter2`의 `getInstance` 메서드에 의해 반환된 값은 서로 다른 인스턴스에 대한 참조를 효과적으로 반환했습니다. 즉, 두 인스턴스의 값이 완전히 동일하지는 않습니다.

<!-- <video width='100%' src='https://res.cloudinary.com/ddxwdqwkr/video/upload/v1609056519/patterns.dev/jspat-52_zkwyk1.mp4' autoplay controls playsinline loop> -->

`Counter` 클래스의 인스턴스를 **하나만** 만들 수 있도록 확인할 수 있습니다.

인스턴스를 하나만 만들 수 있는 한 가지 방법은 `instance`라는 변수를 만드는 것입니다. 새 인스턴스가 생성될 때 `Counter` 생성자에서 `instance`의 참조와 동일하게 설정할 수 있습니다. `instance` 변수가 이미 값을 가졌는지 확인하여 새로운 인스턴스가 생기는 것을 방지할 수 있습니다. 그런 경우라면 이미 인스턴스가 존재하는 것입니다. 그런 일은 생기지 않아야 하며 사용자에게 알리기 위해 오류가 발생해야 합니다.

```typescript
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!');
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

const counter1 = new Counter();
const counter2 = new Counter();
// Error: You can only create one instance!
```

완벽합니다! 더 이상 여러개의 인스턴스를 만들 수 없습니다.

`counter.js` 파일에서 `Counter` 인스턴스를 export 합니다. 하지만 그전에 인스턴스를 얼려야(**freeze**) 합니다. `Object.freeze` 메서드는 코드를 사용하는 것이 싱글톤을 수정할 수 없도록 합니다. 고정된 인스턴스의 속성을 추가하거나 수정할 수 없으므로 싱글톤의 값을 실수로 덮어쓸 위험이 줄어듭니다.

```typescript
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!');
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

<hr />

`Counter` 예제를 구현하는 애플리케이션을 살펴보겠습니다. 아래와 같은 파일이 있습니다.

- `counter.js` : `Counter` 클래스를 포함하고 **Counter 인스턴스**를 기본 내보내기로 내보냅니다.
- `index.js` : `redButton.js`와 `blueButton.js` 모듈을 불러옵니다.
- `redButton.js` : `Counter`를 가져와 **빨간색** 버튼에 이벤트 리스너로 `Counter`의 `increment` 메서드를 추가하고 `getCount` 메서드를 호출해 카운터의 현재 값을 기록합니다.
- `blueButton.js` : `Counter`를 가져와 **파란색** 버튼에 이벤트 리스너로 `Counter`의 `increment` 메서드를 추가하고 `getCount` 메서드를 호출하여 카운터의 현재 값을 기록합니다.

`blueButton.js`와 `redButton.js`는 모두 `counter.js`에서 **동일한 인스턴스**를 가져옵니다. 이 인스턴스는 두 파일 모두에서 **Counter**로 가져옵니다.

<!-- <video width='100%' src='https://res.cloudinary.com/ddxwdqwkr/video/upload/v1609056519/patterns.dev/jspat-56_wylvcf.mp4' autoplay controls playsinline loop> -->

`redButton.js` 또는 `blueButton.js`에서 `increment` 메서드를 호출하면 `Counter` 인스턴스의 `counter` 속성 값이 두 파일 모두에서 업데이트됩니다. 빨간색 버튼을 클릭하든 파란색 버튼을 클릭하든 상관 없습니다. 모든 인스턴스에서 동일한 값이 공유됩니다. 이것이 다른 파일에서 메소드를 호출하고 있음에도 불구하고 `counter`가 계속 1씩 증가하는 이유입니다.

<hr />

## 장단점