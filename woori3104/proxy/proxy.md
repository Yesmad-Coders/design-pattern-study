# Proxy pattern

## Proxy 패턴 개요

- 카테고리 : 구조패턴
- 개요 : Proxy패턴은 클라이언트가 실제 사용을 원하는 객체를 직접 사용하는 것이 아니라 그 객체에 대한 대리자(Proxy) 역할을 하는 대리자를 두고, 클라이언트가 대리자 객체를 통해서 실제 객체를 사용하도록 하는 방식이다. 
- Gof : Provide a surrogate or placeholder for another object to control access to it.

- Adapter패턴과 Decorator패턴과 유사성을 보임. 
    - Adapter패턴은 클라이언트와 원래 객체 사이의 인터페이스 Gap을 메꾸는 역할을 하고, Proxy패턴은 클라이언트에서 Wrapping하고자 하는 원래 객체와 동일한 인터페이스를 제공한다. 
    - Proxy패턴은 그 목적이 실제 객체에 대한 대리자 역할을 하는 것이라면, Decorator패턴은 객체에 동적으로 추가적인 기능을 더하는 것을 목적으로 한다. 

- Proxy개체를 사용하면 특정 개체와의 상호작용을 더 잘 제어할 수 있다. 
- Proxy객체는 객체와 상호 작용할 때마다 동작을 결정할 수 있다. 


```jsx
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};
```
proxy object 
```jsx
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};

const personProxy = new Proxy(person, {});
```
- proxy의 두번째 인수는 핸들러 ```proxy```를 나타내는 객체입니다. 핸들러 개체에서 상호작용 유형에 따라 특정 동작을 정의 할 수 있다. 
- 일반적으로 proxy handler에 자주사용되는 함수는 ```get```, ```set```이다. 
    - ```get``` : 속성에 ***access**하려고 할때 호출
    - ```set``` : 속성을 ***modify**하려고 할때 호출
- ```person```에 직접 상호작용하는 대신에 ```personProxy```를 사용한다. 

- ```personProxy```에 핸들러 추가
    - 속성을 수정하려고 할때 ```set```메서드를 호출
```jsx
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
  }
});
```

```jsx
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
  }
});
```
- ```name```속성에 액세스할때 proxy는 ```The value of name is John Doe```를 반환한다. 
- ```age```속성을 수정할ㄸ 이 속성은 ```Changed age form 42 to 43```을 반환한다. 

- ***프록시 유효성 검사*** 를 추가하는데 유용할 수 있다. 
- 하기와 같이 ```person```사용자는 나이를 문자열값으로 변경하거나 공배문자를 지정할 수 없어야하고, 사용자가 존재하지 않는 개체속성에 액세스 하려는ㄴ 경우 사용자에게 알릴수 있도록 수정하고 테스트 한다. 

```jsx
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(
        `Hmm.. this property doesn't seem to exist on the target object`
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
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
      obj[prop] = value;
    }
  }
});
```

- 잘못된 값을 전달할때 경우 테스트 
```jsx
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(`Hmm.. this property doesn't seem to exist`);
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
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
      obj[prop] = value;
    }
    return true;
  }
});

personProxy.nonExistentProperty;
personProxy.age = "44";
personProxy.name = "";
```
- proxy는 잘못된 값으로 ```person```Object를 수정하지 않았는지 확인함으로서 데이터를 순수하게 유지하도록 한다. 

## Reflect
- ```Reflect```는 프록시로 작업할 떼 대상 오브젝트를 더 쉽게 조작할 수 있도록하는 내장 객체를 제공한다. 
- 이전에는 {}을 이용하여 직접 데이터를 가져오고 설정했으나 우리는 이제 ```Refect```를 사용할 수 있다. 
- ```Reflect```는 ```handler```의 메서드와 동일한 이름의 메서드를 가진다. 
- object[prop]을 통해 속성에 액세스하거나 obj[prop]=value 를 통해 값을 설정하는 대신 Reflect.get(), Reflect.set()을 통해 액세스하거나 수정할 수 있다. 
- method는 handler와 동일한 인수를 갖는다. 

```jsx
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    Reflect.set(obj, prop, value);
  }
});
```

```jsx
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    return Reflect.set(obj, prop, value);
  }
});

personProxy.name;
personProxy.age = 43;
```

- 프록시는 객체의 동작에 대한 제어를 추가하는 강력한 방법이다. 
- 객체를 과도하게 사용하거나 proxy에 과중한 작업을 수행하면 응용프로그램 성능에 부젇엊ㄱ인 영향을 줄 수 있다. 
- handler성능이 중요한 코드에는 프록시를 사용하지 않는 것이 좋다. 
