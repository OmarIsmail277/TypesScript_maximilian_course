/// <reference path="base-component.ts" />

namespace App {
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    // inputs
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");
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
    }

    // add a listener to our form - Sets up behavior
    configure() {
      // this.element.addEventListener("submit", this.submitHandler); // problem- this bound to the current target of the event (which is the form)
      // it will not point to the class => solution => bind, better solution is with decorators(autobind)
      this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent() {}

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
  }
}
