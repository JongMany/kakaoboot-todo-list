import { Todo } from "../../entity/todo.entity";

// const todos: Todo[] = [
//   {
//     id: 1,

//     todo: "description1",
//     isDone: false,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

export class TodoList {
  private todoList: Todo[] = [];

  constructor() {
    this.loadTodoList();
  }

  loadTodoList() {
    const todoList = localStorage.getItem("todoList");
    if (todoList) {
      this.todoList = JSON.parse(todoList);
    }
  }

  setTodoList() {
    const todoList = localStorage.getItem("todoList");
    if (todoList) {
      this.todoList = JSON.parse(todoList);
    }
  }

  addTodo(todo: Todo) {
    this.todoList.push(todo);
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
  }

  removeTodoList() {
    localStorage.removeItem("todoList");
    this.todoList = [];
  }

  get element() {
    const todoListContainer = document.createElement("div");
    todoListContainer.innerHTML = `
      <ul>
        ${this.todoList
          .map(
            (todo) => `<li>
              <span>${todo.todo}</span>
              <span>${todo.isDone ? "완료" : "미완료"}</span>
              <span>${todo.createdAt}</span>
              <span>${todo.updatedAt}</span>
            </li>`
          )
          .join("")}
      </ul>
    `;
    return todoListContainer;
  }
}
