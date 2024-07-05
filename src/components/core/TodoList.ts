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
    this.todoList = this.createObservable(this.todoList, () => this.render());
  }

  /**
   * State 객체를 Proxy로 감싸서 변화 감지
   * @param obj 감시할 객체
   * @param callback 객체 변화 시 호출될 콜백 함수
   */
  createObservable(obj: any, callback: () => void) {
    return new Proxy(obj, {
      set(target, property, value) {
        console.log("set", property, value);

        target[property as keyof typeof target] = value;
        callback();
        return true;
      },
      deleteProperty(target, property) {
        delete target[property as keyof typeof target];
        callback();
        return true;
      },
    });
  }

  /**
   * 로컬스토리지에 저장된 todoList를 불러옵니다.
   */
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

  /**
   * todoList에 새로운 todo를 추가합니다.
   * @param todo 추가할 todo
   */
  addTodo(todo: Todo) {
    this.todoList.push(todo);
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
    // this.render();
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
          this.todoList[idx] = {
            ...this.todoList[idx],
            isDone: !this.todoList[idx].isDone,
            updatedAt: new Date(),
          };

          localStorage.setItem("todoList", JSON.stringify(this.todoList));
          // this.render();
        } else if (target.classList.contains("delete_btn")) {
          const idx = parseInt(target.id.split("_")[0]);
          // this.todoList = this.todoList.filter((_, index) => index !== idx);
          this.todoList.splice(idx, 1);
          localStorage.setItem("todoList", JSON.stringify(this.todoList));
          // this.render();
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
              <button id="${
                idx + "_todoDelete"
              }" class="delete_btn">삭제</button>
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
