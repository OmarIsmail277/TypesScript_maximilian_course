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

    // think how we can come with a smarter validation solution (outsource it into a separate validation function
    // which is configurable and how types could help you here)
    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredPeople.trim().length === 0
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
      console.log(title, desc, people);
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
