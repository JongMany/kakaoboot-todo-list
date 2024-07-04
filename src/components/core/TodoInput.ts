import { Todo } from "../../entity/todo.entity";

export class TodoInput {
  private value: string = "";

  constructor(private addTodo: (todo: Todo) => void) {
    console.log("TodoInput constructor", this.initializeValue);
    this.inputHandler = this.inputHandler.bind(this);
    // this.addTodoHandler = this.addTodoHandler.bind(this);
  }

  initializeValue() {
    this.value = "";
  }

  setEventListener(element: HTMLElement) {
    const button = element.querySelector("#add");
    if (button) {
      button.addEventListener("click", this.addTodoHandler);
    }

    const input = element.querySelector("input");
    if (input) {
      input.addEventListener("change", this.inputHandler);
    }
  }

  addTodoHandler = () => {
    if (!this.value) {
      return;
    }
    const todo: Todo = {
      id: Math.random(),
      todo: this.value,
      isDone: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.addTodo(todo);

    this.initializeValue();
    const input = document.querySelector("input");
    if (input) {
      input.value = this.value;
    }
  };

  // addTodo(todo: Todo) {
  //   const prevTodoList = localStorage.getItem("todoList");
  //   const newTodoList = [];
  //   if (prevTodoList) {
  //     const parsedTodos = JSON.parse(prevTodoList);
  //     newTodoList.push(...parsedTodos, todo);
  //   } else {
  //     newTodoList.push(todo);
  //   }
  //   localStorage.setItem("todoList", JSON.stringify(newTodoList));
  // }

  inputHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
  }

  get element() {
    const containerElem = document.createElement("div");
    containerElem.innerHTML = `
      <input type="text" value="${this.value}" />
      <button id="add">추가</button>
    `;

    this.setEventListener(containerElem);

    return containerElem;
  }
}
