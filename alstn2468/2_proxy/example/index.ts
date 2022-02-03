const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};

type Person = typeof person;
type Prop = keyof Person;
type Value = Person[Prop];

const personProxy = new Proxy(person, {
  get: (obj: Person, prop: Prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj: Person, prop: Prop, value: Value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    return Reflect.set(obj, prop, value);
  }
});

personProxy.name;
personProxy.age = 43;
personProxy.name = "Jane Doe";
