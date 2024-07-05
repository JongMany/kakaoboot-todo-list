import { Todo } from "../../entity/todo.entity";
import { convertDateToDateString } from "../../utils/date";

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
      this.containerElem.className = "todo-list-container";
      /**
       * 완료 미완료 상태 변경 로직
       * 이벤트 위임(Event Delegation)을 사용하여 이벤트를 처리합니다.
       */
      this.containerElem.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains("todo_check")) {
          const idx = parseInt(target.id.split("_")[0]);
          this.todoList[idx].isDone = !this.todoList[idx].isDone;
          this.todoList[idx].updatedAt = new Date();
          localStorage.setItem("todoList", JSON.stringify(this.todoList));
          this.render();
        }
      });
    }

    this.containerElem.innerHTML = `
      <ul>
        ${this.todoList
          .map(
            (todo, idx) => `<li>
              <h4>
                <span>할 일 - </span>
                <span>${todo.todo}<span>
              </h4>
              <div>
                <input type="checkbox" ${todo.isDone ? "checked" : ""} id="${
              idx + "_isFinished"
            }" class="todo_check" />
                <span>${todo.isDone ? "완료" : "미완료"}</span>
              </div>
              <div>
                <span>생성일 - </span>
                <span>${convertDateToDateString(todo.createdAt, true)}</span>
              </div>
              <div>
                <span>수정일 - </span>
                <span>${convertDateToDateString(todo.updatedAt, true)}</span>
              </div>
            </li>`
          )
          .join("")}
      </ul>
    `;
  }

  get element() {
    if (!this.containerElem) {
      this.render();
    }
    return this.containerElem!;
  }
}
