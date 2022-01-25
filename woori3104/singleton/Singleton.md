# Singleton

# 디자인패턴 카테고리

- 생성패턴(Creational Pattern) - 특정 클래스의 객체를 생성하는데 사용되는 패턴들
- 구조패턴(Structural Pattern) - 여러 클래스 혹은 객체들이 어떻게 결합하여 하나의 큰 구조를 만드는지에 대한 패턴들
- 행위패턴(Behavioral Patterns) - 여러 객체들간에 어떻게 상호작용하고 통신하는지에 포커스를 맞춘 패턴들

# Singleton Pattern

- 카테고리 : 생성패턴 (Creational Pattern)
- 개요 : 하나의 클래스가 하나의 인스턴스만 갖도록 제한하고, 전역범위에서 그 인스턴스를 엑세스할 수 있게 하는 패턴이다. 이 패턴은 시스템 전체에 걸쳐 하나의 인스턴스가 모든 처리를 조율해야하는 곳에 유용하다.
- 싱글톤 패턴은 단 하나의 객체만을 가지므로 static readonly필드에 객체를 생성하여 초기화하게되면, 처음으로 그 클래스를 사용하게 될 때 하나의 인스턴스만 생성하게 된다.
- 싱글톤패턴에서 하나의 인스턴스를 생성함과 동시에 생성된 인스턴스를 외부에서 엑세스하게해야한다.


## ES2015 Class를 사용한 싱글톤 예제

```jsx

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

- 위의 예제는 싱글톤 패턴을 충족시키지 못 한다. 싱글톤은 오직 한번만 인스턴스가 가능하나 위 예제는 여러개의 counter 클래스를 가질 수 있다. 

```jsx
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

- 새로운 메소드를 두번 호출함으로서 우리는 단지  counter1 과 counter2 다른 인스턴스로 설정 된다. 
- 인스턴스가 한번만 생성되도록 하려면 생성시 이미 생성된 인스턴스가 있는지 확인해야할 필요가 있다.

```jsx
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

const counter1 = new Counter();
const counter2 = new Counter();
// Error: You can only create one instance!
```

- object.feeze를 써주면 싱글톤 인스턴스를 수정하는 것을 막아준다.

```jsx
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

장단점 

- 인스턴스를 하나의 인스턴스로 절약하면 많은 메모리 공간을 절약할 수 있다.
- 그러나 싱글톤은 실제로 안티패턴으로 간주되어  JavaScript 에서는 피해야하다.
    - OOP언어에서는 자바스크립트에서 할 수 있는 방식으로 객체를 직접 생성할 수 없다.
    - 객체를 생성하는 클래스를 생성해야만 함. instance객체는 javascript예제의 값과 동일한 클래스의 인스턴스값을 가진다.
    
    - 일반 객체를 사용한 예시
    
    ```jsx
    
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
    

### Testing

- 싱글톤에서 코드를 테스트 하는것은 매우 까다롭다
    - 테스트마다 인스턴스를 새로 만들기때문에 인스턴스를 초기화해야한다.

### Dependency hiding

- 다른 모듈을 참조할 때 해당 모듈이 어떤 싱글톤을 가져오는지 명확히 알 수 없다.
    - 응용프로그램 전체에서 싱글톤의 여러 인스턴스를 공유하고 수정이 가능하기때문에 의도치않은 동작으로 이어질 수 있다.

### **Global behavior**

- 싱글톤의 일반적인 사용 사례는 애플리케이션 전체에 전역 상태를 갖는것과 동일하다.
    - 코드베이스의 여러부분이 동일한 변경 가능한 객체에 의존하는것은 예기치않은 동작을 유발할 수 있다.