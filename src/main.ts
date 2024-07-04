import "./style.css";
import { TodoList } from "./components/core/TodoList.ts";
import { TodoInput } from "./components/core/TodoInput.ts";

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
