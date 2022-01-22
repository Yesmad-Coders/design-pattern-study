import Todo from './todo';

type Item = typeof Todo['todo'][number];

function updateCompletedStatus(element: HTMLButtonElement, completed: boolean) {
  element.innerText = completed ? '✅' : '❌';
}

function createTodoItemButton(item: Item) {
  const button = document.createElement('button');
  updateCompletedStatus(button, item.completed);

  button.addEventListener('click', () => {
    const { completed } = Todo.getItem(item.id);
    Todo.toggleTodo(item.id);
    updateCompletedStatus(button, !completed);
  });

  return button;
}

export function createTodoItem(item: Item) {
  const listItem = document.createElement('li');

  listItem.innerText = item.text + ' ';
  listItem.setAttribute('id', `todo-item-${item.id}`);
  listItem.appendChild(createTodoItemButton(item));

  return listItem;
}

export function appenTodoItem(node: ReturnType<typeof createTodoItem>) {
  document.getElementById('todo-list').appendChild(node);
}