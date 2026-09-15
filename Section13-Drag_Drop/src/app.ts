// Code goes here!

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

  // this method should trigger whenever the form is submitted
  private submitHandler(event: Event) {
    // get access to the input values, validate them, then do something with them (later)
    event.preventDefault();

    console.log(this.titleInputElement.value);
  }

  // add a listener to our form - Sets up behavior
  private configure() {
    // this.element.addEventListener("submit", this.submitHandler); // problem- this bound to the current target of the event (which is the form)
    // it will not point to the class => solution => bind, better solution is with decorators(autobind)
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  // rendering logic - Actually puts the form into the DOM
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
