import { Todo } from "../../entity/todo.entity";

export class TodoInput {
  private value: string = "";
  private containerElem: HTMLElement | null = null;

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
    this.render();
  };

  inputHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.render();
  }

  render() {
    if (!this.containerElem) {
      this.containerElem = document.createElement("div");
    }
    this.containerElem.innerHTML = `
      <input type="text" value="${this.value}" />
      <button id="add">추가</button>
    `;
    this.setEventListener(this.containerElem);
  }

  get element() {
    if (!this.containerElem) {
      this.render();
    }

    return this.containerElem;
  }
}
