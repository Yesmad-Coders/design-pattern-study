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

## 예제

### get 에 default 값을 추가

```js
const handler = {
  get: function (obj, prop) {
    return prop in obj ? obj[prop] : 37;
  },
};

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b);
//  1, undefined

console.log("c" in p, p.c);
//  false, 37
```

### Extending constructor

- constructor(), apply() 사용하여 새 constructor로 확장

```js
function extend(sup, base) {
  base.prototype = Object.create(sup.prototype);
  base.prototype.constructor = new Proxy(base, {
    construct: function (target, args) {
      var obj = Object.create(base.prototype);
      this.apply(target, obj, args);
      return obj;
    },
    apply: function (target, that, args) {
      sup.apply(that, args);
      base.apply(that, args);
    },
  });
  return base.prototype.constructor;
}

var Person = function (name) {
  this.name = name;
};

var Boy = extend(Person, function (name, age) {
  this.age = age;
});

Boy.prototype.gender = "M";

var Peter = new Boy("Peter", 13);

console.log(Peter.gender); // "M"
console.log(Peter.name); // "Peter"
console.log(Peter.age); // 13
```

### Manipulating DOM nodes

```js
let view = new Proxy(
  {
    selected: null,
  },
  {
    set: function (obj, prop, newval) {
      let oldval = obj[prop];

      if (prop === "selected") {
        if (oldval) {
          oldval.setAttribute("aria-selected", "false");
        }
        if (newval) {
          newval.setAttribute("aria-selected", "true");
        }
      }

      // The default behavior to store the value
      obj[prop] = newval;

      // Indicate success
      return true;
    },
  }
);

let i1 = (view.selected = document.getElementById("item-1")); //giving error here, i1 is null
console.log(i1.getAttribute("aria-selected"));
//  'true'

let i2 = (view.selected = document.getElementById("item-2"));
console.log(i1.getAttribute("aria-selected"));
//  'false'

console.log(i2.getAttribute("aria-selected"));
//  'true'
// Note: even if selected: !null, then giving oldval.setAttribute is not a function
```
