// Project State Management
class ProjectState {
  private listeners: any[] = [];
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      people: numOfPeople,
    };
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

// now, we have a couple of unclear questions:
// First: how do we call add project from inside our class down there when we gather our userInput from inside the submit handler?
// Second: How do we pass that updated list of projects whenever it changes to the project list class

const projectState = ProjectState.getInstance(); // ==> Singeleton

// Validation
interface Validatable {
  value: string | number;
  required: boolean | undefined;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  // 1st check
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  // 2nd check
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  // 3rd check
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }

  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

// autobind decorator
// property descriptor => because methods in the end, are just properties, properties which hold functions
// Now, why is this a method decorator? Because the idea is that we can add it to submitHandler
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    // getter, which will be executed when you try to access the function
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
}

// besides, having our ProjetInput Class here, which is responsible for rendering the form and gathering the user input,
// we want to have another class which is responsible for rendering a list of projects => splitted into 2 classes, => one for the list,
// one class per project item in the list

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[];

  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list",
    )! as HTMLTemplateElement;

    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    this.assignedProjects = [];

    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    projectState?.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`,
    )! as HTMLUListElement;
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl?.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  // inputs
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // selection logic and rough-setup
    // the blueprint
    this.templateElement = document.getElementById(
      "project-input",
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    // we need to import the content of that template element & render this to the dom
    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );
    // The actual(concrete) form
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    // get access to different inputs in that form
    this.titleInputElement = this.element.querySelector(
      "#title",
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description",
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people",
    )! as HTMLInputElement;

    // before attaching, we want to get access to the different inputs in that element(form)
    // configure -> addListener to our element(form) ===
    // in general to keep [selection and rough set-up in the constructor] & then [the insertion & fine-tuning in seperate methods]
    // delegate the work
    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    // think how we can come with a smarter validation solution (outsource it into a separate validation function
    // which is configurable and how types could help you here)
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid Input, please try again!");
      return;
    } else return [enteredTitle, enteredDescription, +enteredPeople];
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  // this method should trigger whenever the form is submitted
  @autobind
  private submitHandler(event: Event) {
    // get access to the input values, validate them, then do something with them (later)
    event.preventDefault();
    // gather all our input values, quickly validate them and then do something with them
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState?.addProject(title, desc, people);
      this.clearInputs();
    }
  }

  // add a listener to our form - Sets up behavior
  private configure() {
    // this.element.addEventListener("submit", this.submitHandler); // problem- this bound to the current target of the event (which is the form)
    // it will not point to the class => solution => bind, better solution is with decorators(autobind)
    this.element.addEventListener("submit", this.submitHandler);
  }

  // rendering logic - Actually puts the form into the DOM
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
