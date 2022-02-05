# 싱글톤 패턴 (Singletons)

## Definition 정의

>Singletons are classes which can be instantiated once, and can be accessed
globally. This single instance can be shared throughout our application, which
makes Singletons great for managing global state in an application.

싱글톤 패턴은 객체의 인스턴스가 오직 1개만 생성되는 패턴을 말한다.

## 예제


## (DIS)ADVANTAGES 장단점
Restricting the instantiation to just one instance could potentially save a lot of
memory space.

한개의 instance로 강제하면, memory space를 많이 아낄 수 있다.
하지만 Javascript에서는 singleton 패턴들은 antipattern으로 여겨지며, 피해야 한다.

### Using a regular object 

### Testing

테스트마다 instance를 초기화 해야하기 때문에 테스트를 하는데 있어서 불편하다.

### Dependency hiding 

다른 모듈을 import할때, 모듈이 singleton을 import 하는지 명확하지 않을 수 있다.

우리는 module을 import함과 동시에 method들을 invoke할 수 있다.
- 하지만 이는 accidently하게 singleton의 값들을 변경 할 수 있다.
- 위 이유는 singleton pattern은 인스턴스가 하나이며 globally하게 공유하기 때문에 한쪽에서의 수정은 전체적인 수정을 야기하기때문이다.

### Global behavior

Singleton에서는 instance가 에플리케이션 안 모든 곳에서는 reference 될 수 있어야 한다.
Global 변수도 마차가지이다, instance 처럼 전역에서 reference 될 수 있다. 하지만 이는 좋은 디자인 방법은 아니다.
ES2015에선는 전역변수는 매우 드믄 경우이다.이제는 `let` 과 `const`가 전역적인 오염(?)을 막고 있기 때문이다.
코드베이스의 여러부분이 동일한 mutable 객체에 의존하는것은 unexpected behavor을 유발할 수 있다.

### State management in React