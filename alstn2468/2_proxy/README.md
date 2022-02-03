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

<iframe
  src="https://codesandbox.io/embed/proxy-1-rkgyo?fontsize=14&hidenavigation=1&theme=dark"
   style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
   title="proxy-1"
   allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
   sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

`name` 속성에 접근할 때 Proxy가 듣기 좋은 문장을 반환했습니다. `name` 값은 `John Doe`입니다.

`age` 속성을 수정할 때 Proxy가 `Changed age from 42 to 43.`처럼 이 속성의 이전 값과 새 값을 반환했습니다.

<hr />
