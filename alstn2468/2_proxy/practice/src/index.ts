type Form = {
  name: string,
  age: number;
}
type Prop = keyof Form;
type Value = Form[Prop];

let validName: boolean | undefined,
  validAge: boolean | undefined;
const form: Form = {
  name: '',
  age: 0,
};

const nameValidator = (name: Form['name']) => name !== '' && name.length <= 4;
const ageValidator = (age: Form['age']) => age > 0 && age <= 4;
const validateObject = (prop: Prop, value: Value) => {
  switch (prop) {
    case 'age':
      if (typeof value === 'number' && ageValidator(value)) {
        validAge = true;
      } else {
        validAge = false;
      }
      return validAge;
    case 'name':
      if (typeof value === 'string' && nameValidator(value)) {
        validName = true;
      } else {
        validName = false;
      }
      return validName;
  }
}

const formProxy = new Proxy(form, {
  get: (obj: Form, prop: Prop) => {
    return Reflect.get(obj, prop);
  },
  set: (obj: Form, prop: Prop, value: Value) => {
    if (validateObject(prop, value)) {
      return Reflect.set(obj, prop, value);
    }
    return false;
  }
});

const nameInput = document.querySelector('#name');
const ageInput = document.querySelector('#age');

nameInput.addEventListener('input', (e) => {
  formProxy.name = (<HTMLInputElement>e.target).value;
  if (!validName) {
    nameInput.setAttribute('class', 'error');
  } else {
    nameInput.setAttribute('class', 'valid');
  }
});

ageInput.addEventListener('keyup', (e) => {
  formProxy.age = Number((<HTMLInputElement>e.target).value);
  if (!validAge) {
    ageInput.setAttribute('class', 'error');
  } else {
    ageInput.setAttribute('class', 'valid');
  }
});