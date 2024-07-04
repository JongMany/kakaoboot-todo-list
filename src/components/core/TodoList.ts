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
  private containerElem: HTMLElement | null = null;

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
    this.render();
  }

  removeTodoList() {
    localStorage.removeItem("todoList");
    this.todoList = [];
    this.render();
  }

  private render() {
    if (!this.containerElem) {
      this.containerElem = document.createElement("div");
    }

    this.containerElem.innerHTML = `
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
    // return todoListContainer;
  }

  get element() {
    if (!this.containerElem) {
      this.render();
    }
    return this.containerElem!;
  }
}
