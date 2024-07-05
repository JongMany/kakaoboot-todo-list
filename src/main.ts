import { TodoList } from "./components/core/TodoList.ts";
import { TodoInput } from "./components/core/TodoInput.ts";
// https://0422.tistory.com/317
function render(rootElem: HTMLElement) {
  const todoList = new TodoList();
  const todoInput = new TodoInput(todoList.addTodo.bind(todoList));

  rootElem.innerHTML += `
    <h1>Todo List</h1>
  `;

  rootElem.appendChild(todoList.element);

  rootElem.appendChild(todoInput.element);
}

const rootElem = document.querySelector<HTMLDivElement>("#app")!;
render(rootElem);
