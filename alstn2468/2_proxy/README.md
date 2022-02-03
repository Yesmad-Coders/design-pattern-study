# Proxy Pattern (프록시 패턴)

> 대상 객체에 대한 상호 작용 차단 및 제어

Proxy 객체를 사용하면 특정 객체와의 상호 작용을 효과적으로 제어할 수 있습니다. Proxy 객체는 객체와 상호 작용할 때마다(예: 값을 가져오거나 값을 설정할 때) 동작을 결정할 수 있습니다.

<hr />

일반적으로, Proxy는 대신하는 것을 의미합니다. 대상에게 직접 말하는 대신 당신이 말하려고 했던 사람의 대리인과 이야기하게 됩니다. JavaScript에서도 마찬가지로 대상 객체와 직접 상호 작용하는 대신 Proxy 객체와 상호 작용합니다.

<hr />

John Doe를 나타내는 `person` 객체를 작성합니다.

```typescript
const person = {
  name: 'John Doe',
  age: 42,
  nationality: 'American'
};
```

우리는 객체와 직접 상호작용하는 대신에 Proxy 객체와 상호작용하기를 원합니다. JavaScript에서는 `Proxy` 인스턴스를 생성함으로써 쉽게 새로운 Proxy 객체를 생성할 수 있습니다.

```typescript
const person = {
  name: 'John Doe',
  age: 42,
  nationality: 'American'
};

const personProxy = new Proxy(person, {});
```

**Proxy**의 두 번째 인자는 `handler`를 나타내는 객체입니다. 핸들러 객체에서 상호 작용 타입을 기반으로 특정 동작을 정의할 수 있습니다. Proxy 핸들러에 추가할 수 있는 **여러 가지 방법**이 있지만 가장 일반적인 두 가지 방법은 `get`과 `set`입니다.

- `get` : 속성에 **접근**하려고 할 때 호출됩니다.
- `set` : 속성을 **수정**하려고 할 때 호출됩니다.

결과적으로 아래와 같은 결과를 확인할 수 있습니다.

<img src='./images/proxy-1.gif' width='100%' />

`person` 객체와 직접 상호 작용하는 대신 `personProxy`와 상호 작용합니다.

`PersonProxy` Proxy에 핸들러를 추가합니다. Proxy에서 `set` 메소드를 호출해 속성을 수정하려고 할 때 Proxy가 이전 값과 속성의 새 값을 기록하도록 합니다. Proxy에서 `get` 메소드를 호출해 속성에 접근하려고 할 때 Proxy가 속성의 키와 값을 포함하는 더 읽기 쉬운 문장을 기록하도록 합니다.

```typescript
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
  },
});
```

완벽합니다. 속성을 수정하거나 검색하려고 할 때 어떻게 되는지 살펴보겠습니다.

[![Edit proxy-1](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/proxy-1-rkgyo?fontsize=14&hidenavigation=1&theme=dark)

`name` 속성에 접근할 때 Proxy가 듣기 좋은 문장을 반환했습니다. `name` 값은 `John Doe`입니다.

`age` 속성을 수정할 때 Proxy가 `Changed age from 42 to 43.`처럼 이 속성의 이전 값과 새 값을 반환했습니다.

<hr />

Proxy는 **유효성 검사**를 추가하는 데 유용할 수 있습니다. 사용자는 `person`의 `age`를 문자열 값으로 바꾸거나 빈 이름으로 변경할 수 없어야 합니다. 또는 사용자가 존재하지 않는 객체의 속성에 액세스하려고 하면 알려야 합니다.

```typescript
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(
        `Hmm. this property doesn't seem to exist on the target object`
      );
    } else {
      console.log(`The value of ${prop} is ${obj[prop]}`);
    }
  },
  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log(`Sorry, you can only pass numeric values for age.`);
    } else if (prop === "name" && value.length < 2) {
      console.log(`You need to provide a valid name.`);
    } else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
      obj[prop] = value;
    }
  },
});
```

잘못된 값을 넘기려고 할 때 어떤 일이 생기는지 확인해 봅시다.

[![Edit proxy-2](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/proxy-2-dgk2v?fontsize=14&hidenavigation=1&theme=dark)

Proxy는 잘못된 값으로 `person` 객체를 수정하고 있지 않다는 것을 확인시켜 주었고, 이것은 데이터를 순수하게 유지하는 데 도움이 됩니다.

<hr/>

### Reflect

JavaScript는 `Reflect`라는 내장된 객체를 제공하므로 `Proxy`로 작업할 때 대상 객체를 더 쉽게 조작할 수 있습니다.

이전에는 대괄호 표기법으로 직접 값을 가져오거나 설정해서 프록시 내에서 대상 객체의 속성을 수정하고 접근하려 했지만 대신 `Reflect` 객체를 사용할 수 있습니다. `Reflect` 객체의 메서드 이름은 핸들러 객체의 메서드와 동일합니다.

`obj[prop]`를 통해 속성에 접근하거나 `obj[prop] = value`를 통해 속성을 설정하는 대신, `Reflect.get()` 및 `Reflect.set()`을 통해 대상 객체의 속성에 접근하거나 수정할 수 있습니다. 메서드는 핸들러 객체의 메서드와 동일한 인수를 받습니다.

```typescript
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    Reflect.set(obj, prop, value);
  },
});
```

완벽합니다. 우리는 `Reflect` 객체를 사용해 대상 객체의 속성을 쉽게 접근하고 수정할 수 있습니다.

[![Edit proxy-3](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/proxy-3-o1hjx?fontsize=14&hidenavigation=1&theme=dark)

<hr />

Proxy는 객체의 동작에 대한 제어를 추가하는 강력한 방법입니다. Proxy는 유효성 검사, 포맷팅, 알림 또는 디버깅에 도움이 되는 다양한 사용 사례를 가질 수 있습니다.

Proxy 객체를 과도하게 사용하거나 각 핸들러 메서드 호출 시 많은 작업을 수행하면 응용 프로그램의 성능에 쉽게 부정적인 영향을 줄 수 있습니다. 성능에 중요한 코드에는 Proxy를 사용하지 않는 것이 가장 좋습니다.

<hr />

### 참고

- [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) - MDN
- [Javascript Proxy](https://davidwalsh.name/javascript-proxy) - David Walsh
- [Awesome ES2015 Proxy](https://github.com/mikaelbr/awesome-es2015-proxy) - Github @mikaelbr
- [Thoughts on ES6 Proxies Performance](http://thecodebarbarian.com/thoughts-on-es6-proxies-performance) - Valeri Karpov