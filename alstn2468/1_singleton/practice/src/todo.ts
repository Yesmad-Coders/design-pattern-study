type Item = {
  id: number;
  text: string;
  completed: boolean;
}

let instance: ThisType<typeof Todo> | undefined;

class Todo {
  todo: Item[];

  constructor() {
    if (instance !== undefined) {
      throw new Error('Can create Todo Instance only once.');
    }

    this.todo = [];
    instance = this;
  }

  getLength() {
    return this.todo.length;
  }

  getTodo() {
    return this.todo;
  }

  getItem(id: Item['id']) {
    return this.todo.find((item) => item.id === id)
  }

  addTodo(text: Item['text']) {
    this.todo = [...this.todo, { id: this.getLength() + 1, text, completed: false }];
  }

  removeTodo(id: Item['id']) {
    this.todo = this.todo.filter((item) => item.id !== id);
  }

  toggleTodo(id: Item['id']) {
    this.todo = this.todo.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    );
  }
}

const SingletonTodo = new Todo();
// Object.freeze를 하면 todo 속성을 못바꿈
// 속성을 밖으로 빼서 대입하는 방식으로 써야하나?

export default SingletonTodo;