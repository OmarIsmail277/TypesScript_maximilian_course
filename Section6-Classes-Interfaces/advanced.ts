// getters

class User {
  constructor(
    private firstName: string,
    private lastName: string,
  ) {}

  get fullName() {
    return this.firstName + "" + this.lastName;
  }
}

const omar = new User("Omar", "Ahmed");
console.log(omar.fullName);

// setters

class User2 {
  protected _firstName: string = "";
  private _lastName: string = "";

  set firstName(name: string) {
    if (name.trim() === "") {
      throw new Error("Invalid name");
    }
    this._firstName = name;
  }

  set lastName(name: string) {
    if (name.trim() === "") {
      throw new Error("Invalid name");
    }
    this._lastName = name;
  }

  get fullName() {
    return this._firstName + "" + this._lastName;
  }

  // static properties & methods
  static eid = "USER";
  // the special about static is you can access it on the class itself, not on an object

  static greet() {
    console.log("Hello");
  }
}

const omar2 = new User2();
omar2.firstName = "omarrr";
omar2.lastName = ""; // will throw an Error
console.log(omar2.fullName);

// -------------------------------------------------

console.log(User2.eid);
User2.greet();

// static maybe useful when building utility classes for example, which group a bunch of utility methods

// -----

// understanding inheritance

class Employee extends User2 {
  constructor(public jobTitle: string) {
    // ensures that the constructor of the base class is getting called as well
    super();
    // super.firstName = "Omar";

    // if the constructor of the base class would take some parameters, you would have to pass these parameters here super(...)
  }
  work() {
    console.log(this._firstName);
  }
}

// protected => access properties using inheriting classes

// ---------

// abstract class

abstract class UIElement {
  constructor(public identifier: string) {}

  clone(targetLocation: string) {
    // logic to duplicate the UI element
  }
}

// can't instantiate it

// let ui_element = new UIElement();

class sideDrawerElement extends UIElement {
  constructor(
    public identifier: string,
    public position: "left" | "right",
  ) {
    super(identifier);
  }

  // ....
}

// might be useful when working on more complex projects or when building third party libraries,
// you might have certain classes that should not be usable themselves directly, but instead it should only act as base classes.
// and in such case you can decorate them with the abstract keyword

// it only exists in typescript
