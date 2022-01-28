# Proxy Pattern

## Definition

- Proxy object를 통해, 특정 object를 제어
- get, set 과 같은 object와의 interact 시에 proxy는 행동을 결정

```js
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
};
```

- createing new instance of Proxy

```js
const personProxy = new Proxy(person, {});
```

- 2nd argument is handler object to define specific behavior

```js
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
    return true;
  },
});
```

- get: invoked when trying to access a property
- set: invoked when trying to modify a property

```js
personProxy.name;
// Teh value of name is John Doe
personProxy.age = 43;
// Cahnged age from 42 to 43
```

## 장점

- Validation 에 유용
  - user 는 age를 string으로 바꿀 수 있으면 안된다
  - faulty values 에 대한 조건을 설정

```js
set: (obj, prop, value) => {
  if (prop === "age" && typeof value !== "number") {
    console.log(`Sorry, you can only pass numberic values for age.`);
  } else if (prop === "name" && value.length < 2) {
    console.log(`You need to provide a valid name.`);
  } else {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
    obj[prop] = value;
  }
};
```

- formatting
- notifications(when it's faulty?)
- debugging

## Reflect

- JS에서는 target object를 쉽게 조작하도록 Reflect 라는 built-in object 제공

```js
new Proxy(person, {
  get: (obj, prop) => {
    Reflect.get(obj, prop);
  },
  set: (obj, prop, value) => {
    Reflect.set(obj, prop, value);
  },
});
```

## 단점

- 과도한 사용, 무거운 작업을 Proxy-pattern으로 하면 성능 문제 일으킴
