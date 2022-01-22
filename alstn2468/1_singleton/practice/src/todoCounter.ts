import Todo from './todo';

const countElement = document.getElementById('todo-count');

export function updateTodoCount() {
  countElement.innerText = `TODO LENGTH: ${Todo.getLength()}`;
}

updateTodoCount();