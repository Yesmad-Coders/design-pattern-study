import Todo from './todo';
import { updateTodoCount } from './todoCounter';
import { appenTodoItem, createTodoItem } from './todoItem';

const buttonElement = document.getElementById('create-todo');
const inputElement = (<HTMLInputElement>document.getElementById('todo-input'));

buttonElement.addEventListener('click', () => {
  const value = inputElement.value;

  if (value === '') {
    alert('Input value is empty string.');
    return;
  }

  Todo.addTodo(value);
  inputElement.value = '';

  appenTodoItem(
    createTodoItem(
      Todo.getTodo()[Todo.getLength() - 1]
    )
  );

  updateTodoCount();
});
