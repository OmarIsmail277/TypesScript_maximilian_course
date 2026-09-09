# Section 6 — TypeScript Classes & Interfaces

## 🎯 Section Overview

This section covers two major areas:

```text
JavaScript Classes
       ↓
TypeScript enhancements
       ↓
Properties & Constructors
       ↓
Parameter Properties
       ↓
Access Modifiers
       ↓
Getters & Setters
       ↓
Static Members
       ↓
Inheritance
       ↓
Abstract Classes
       ↓
Interfaces
       ↓
Interface Inheritance
       ↓
Interfaces + Classes
```

### 🧠 Big Picture

**Classes** are already a JavaScript feature.

TypeScript mainly adds:

- type information
- access modifiers
- parameter properties
- initialization checks
- abstract classes
- interfaces

> **Classes = JavaScript feature enhanced by TypeScript.**
>
> **Interfaces = TypeScript-only feature.**

---

# 1. Classes Are JavaScript ⭐⭐⭐

A class is a **blueprint for creating objects**.

```ts
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hi I am ${this.name}`);
  }
}
```

We can create multiple instances:

```ts
const omar = new User("Omar", 29);
const max = new User("Max", 36);
```

Both objects have the same structure and methods, but different data.

```text
User class
    ↓
 ┌──────────┐
 │ Omar     │
 │ age: 29  │
 └──────────┘

 ┌──────────┐
 │ Max      │
 │ age: 36  │
 └──────────┘
```

### Important

The class itself isn't something TypeScript invented.

JavaScript already has:

```js
class User {}
```

TypeScript gives us additional type-related features.

---

# 2. Class Properties / Fields ⭐⭐⭐⭐

In TypeScript, we can explicitly describe the properties that instances should have:

```ts
class User {
  name: string;
  age: number;
}
```

This tells TypeScript:

```text
Every User should have:

name → string
age  → number
```

We can also initialize a property directly:

```ts
class User {
  name = "Max";
}
```

TypeScript can infer:

```text
name → string
```

---

# 3. Constructors ⭐⭐⭐⭐

A constructor is a special method that runs automatically when you create an instance with `new`.

```ts
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

When we write:

```ts
const user = new User("Omar", 29);
```

the constructor automatically runs.

```text
new User("Omar", 29)
          ↓
      constructor
          ↓
this.name = "Omar"
this.age = 29
```

### Constructor parameters can be typed

```ts
constructor(name: string, age: number)
```

Therefore:

```ts
new User("Omar", 29); // ✅

new User(29, "Omar"); // ❌
```

---

# 4. `this` Is JavaScript ⭐⭐⭐

Inside the constructor:

```ts
this.name = name;
this.age = age;
```

`this` is standard JavaScript.

It refers to the **current instance**.

```ts
const omar = new User("Omar", 29);
```

Inside the constructor:

```text
this
 ↓
omar object
```

So:

```ts
this.name = name;
```

means:

> Put the constructor parameter `name` into this object's `name` property.

The parameter and property don't have to have the same name:

```ts
class User {
  name: string;
  age: number;

  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }
}
```

Here:

```text
n        → constructor parameter
this.name → class property

a        → constructor parameter
this.age  → class property
```

---

# 5. Property Initialization ⭐⭐⭐⭐

TypeScript can check whether required properties are actually initialized.

For example:

```ts
class User {
  name: string;
  age: number;
}
```

If strict property initialization is enabled, TypeScript can complain because these properties haven't been initialized.

A constructor solves this:

```ts
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

Now TypeScript can see that every instance receives values.

### 🧠 Mental Model

```text
Class
 ↓
defines the required properties
 ↓
Constructor receives values
 ↓
Constructor initializes properties
 ↓
Instance is ready
```

---

# 6. Constructor Parameter Properties ⭐⭐⭐⭐⭐

This is one of the most useful TypeScript shortcuts in this section.

Instead of:

```ts
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

TypeScript allows:

```ts
class User {
  constructor(
    public name: string,
    public age: number,
  ) {}
}
```

This combines:

1. declaring the property
2. giving it a type
3. receiving the constructor parameter
4. assigning it to the property

all in one place.

### Without shortcut

```text
name: string;
age: number;

constructor(name, age) {
  this.name = name;
  this.age = age;
}
```

### With shortcut

```ts
constructor(
  public name: string,
  public age: number
) {}
```

### 🧠 Mental Model

```text
public name: string
       ↓
create name property
       +
receive name parameter
       +
assign it to this.name
```

---

# 7. `public` Parameter Properties ⭐⭐⭐⭐⭐

Normally:

```ts
constructor(name: string) {}
```

`name` is only a constructor parameter.

It does **not** automatically become a class property.

But:

```ts
constructor(public name: string) {}
```

does.

So:

```ts
const user = new User("Omar");
```

gives the instance a property:

```text
user.name → "Omar"
```

The generated JavaScript essentially becomes:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

The TypeScript-specific parts:

```text
public
: string
: number
```

are removed during compilation.

### ⭐ Remember

> **A parameter prefixed with `public` becomes a public class property and is automatically initialized.**

---

# 8. Parameter Properties Work With `private` and `protected`

The same shortcut works with other access modifiers:

```ts
class User {
  constructor(
    public name: string,
    private age: number,
  ) {}
}
```

Now:

```text
name → public
age  → private
```

This is much more concise than declaring and initializing everything manually.

---

# 9. Access Modifiers ⭐⭐⭐⭐⭐

TypeScript provides access modifiers that control where class members can be accessed.

The important ones here are:

```text
public
private
protected
```

---

## `public`

A public property can be accessed from outside the class.

```ts
class User {
  constructor(public name: string) {}
}

const user = new User("Omar");

console.log(user.name); // ✅
```

`public` is also the default accessibility if no modifier is specified.

---

## `private`

A private property can only be accessed **inside the class itself**.

```ts
class User {
  constructor(
    public name: string,
    private age: number,
  ) {}

  greet() {
    console.log(this.age); // ✅
  }
}

const user = new User("Omar", 29);

console.log(user.age); // ❌
```

TypeScript reports:

```text
Property 'age' is private...
```

### 🧠 Mental Model

```text
private
   ↓
Inside class      ✅
Outside class    ❌
```

---

# 10. `protected` ⭐⭐⭐⭐

`protected` is similar to `private`, but it also allows access from **classes that inherit from the current class**.

```ts
class User {
  protected firstName = "Omar";
}

class Employee extends User {
  work() {
    console.log(this.firstName); // ✅
  }
}
```

But outside:

```ts
const employee = new Employee();

console.log(employee.firstName); // ❌
```

### `private` vs `protected`

```text
private
├── current class       ✅
└── child classes       ❌

protected
├── current class       ✅
├── child classes       ✅
└── outside             ❌
```

---

# 11. `readonly` ⭐⭐⭐

`readonly` means a property can be **read but not reassigned** after initialization.

Conceptually:

```ts
class User {
  constructor(public readonly name: string) {}
}
```

You can:

```ts
console.log(user.name); // ✅
```

But you cannot reassign:

```ts
user.name = "Ahmed"; // ❌
```

### Arrays — Important Detail

`readonly` on an array property prevents replacing the array itself, but it doesn't necessarily make the array contents immutable.

For example, conceptually:

```ts
class User {
  public readonly hobbies: string[] = [];
}
```

This can still allow:

```ts
user.hobbies.push("Football");
```

because you're modifying the existing array rather than assigning a new array.

Think:

```text
readonly array property
        ↓
user.hobbies = []       ❌
user.hobbies = ["x"]    ❌

user.hobbies.push("x")  ✅
```

---

# 12. Getters ⭐⭐⭐⭐

A getter allows you to expose a value through **property-like syntax** while running logic behind the scenes.

```ts
class User {
  constructor(
    private firstName: string,
    private lastName: string,
  ) {}

  get fullName() {
    return this.firstName + " " + this.lastName;
  }
}
```

Then:

```ts
const omar = new User("Omar", "Ahmed");

console.log(omar.fullName);
```

Notice:

```ts
omar.fullName;
```

not:

```ts
omar.fullName();
```

Although `fullName` is calculated by a method internally, the getter lets us use it like a property.

### 🧠 Mental Model

```text
omar.fullName
      ↓
getter runs
      ↓
calculates full name
      ↓
returns value
```

---

# 13. Setters ⭐⭐⭐⭐

A setter lets you control what happens when a property is assigned.

```ts
class User {
  private _firstName = "";
  private _lastName = "";

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
    return this._firstName + " " + this._lastName;
  }
}
```

Now:

```ts
const user = new User();

user.firstName = "Omar"; // setter runs
user.lastName = ""; // ❌ throws Error
```

### 🧠 Why use setters?

They allow you to **validate or control data before storing it**.

```text
Assignment
    ↓
setter
    ↓
validate
    ↓
store value
```

---

# 14. Getters + Setters

Together, getters and setters allow you to expose a clean interface while keeping the underlying data controlled.

```text
Outside
   ↓
firstName setter
   ↓
validation
   ↓
_private property

_private property
   ↓
fullName getter
   ↓
Outside
```

This is especially useful for **encapsulation**.

---

# 15. Static Properties & Methods ⭐⭐⭐⭐

Normally, a property belongs to an **instance**:

```ts
const user = new User(...);

user.name;
```

A `static` property belongs to the **class itself**.

Example:

```ts
class User {
  static eid = "USER";
}
```

Access it through the class:

```ts
console.log(User.eid);
```

Not through an instance:

```ts
const user = new User();

console.log(user.eid); // ❌
```

---

# 16. Static Methods

Methods can also be static:

```ts
class User {
  static greet() {
    console.log("Hello");
  }
}
```

Call it with:

```ts
User.greet();
```

not:

```ts
const user = new User();

user.greet(); // ❌
```

### 🧠 Mental Model

```text
Normal property/method
        ↓
belongs to instance

static property/method
        ↓
belongs to class
```

---

# 17. When Are Static Members Useful?

They can be useful for functionality that doesn't depend on a particular instance.

For example, utility-style classes can group related functionality:

```ts
class MathUtils {
  static add(a: number, b: number) {
    return a + b;
  }
}

MathUtils.add(10, 20);
```

There is no reason to create:

```ts
new MathUtils();
```

just to use `add`.

---

# 18. Inheritance ⭐⭐⭐⭐

A class can inherit from another class using:

```ts
extends
```

Example:

```ts
class Employee extends User {
  work() {
    console.log("Working...");
  }
}
```

Now:

```text
User
 ↓
Employee
```

`Employee` gets the accessible members of `User` and can add its own functionality.

---

# 19. `super()` ⭐⭐⭐⭐

When a child class has its own constructor, it must call the parent constructor using:

```ts
super();
```

Example:

```ts
class Employee extends User {
  constructor(public jobTitle: string) {
    super();
  }
}
```

### Why?

The parent class may need to initialize its own properties.

```text
Employee constructor
        ↓
super()
        ↓
User constructor
        ↓
initialize User part
```

If the parent constructor requires parameters, pass them through:

```ts
super(...);
```

For example:

```ts
class User {
  constructor(public name: string) {}
}

class Employee extends User {
  constructor(
    name: string,
    public jobTitle: string,
  ) {
    super(name);
  }
}
```

### 🧠 Remember

> `super()` calls the parent class constructor.

---

# 20. `protected` + Inheritance

This is where `protected` becomes especially useful.

```ts
class User {
  protected _firstName = "";
}

class Employee extends User {
  work() {
    console.log(this._firstName); // ✅
  }
}
```

The child class can access `_firstName`, while outside code cannot.

---

# 21. Abstract Classes ⭐⭐⭐⭐

An **abstract class** is designed to be a **base class**, not something you instantiate directly.

```ts
abstract class UIElement {
  constructor(public identifier: string) {}

  clone(targetLocation: string) {
    // logic
  }
}
```

This is not allowed:

```ts
const element = new UIElement("header"); // ❌
```

Instead, another class inherits from it:

```ts
class SideDrawerElement extends UIElement {
  constructor(
    public identifier: string,
    public position: "left" | "right",
  ) {
    super(identifier);
  }
}
```

Now:

```ts
const drawer = new SideDrawerElement("drawer", "left");
```

works.

---

# 22. Why Abstract Classes?

Sometimes you want to define a **common base** for several related classes, but the base class itself doesn't represent a complete object.

For example:

```text
UIElement
   ↓
 ┌──────────────┐
 ↓              ↓
Button       SideDrawer
```

`UIElement` defines common functionality.

But you don't want:

```ts
new UIElement(...)
```

to be allowed.

### 🧠 Mental Model

> **Abstract class = incomplete/base class that exists to be inherited from.**

The material emphasizes that this can be useful in larger projects or when building libraries.

---

# 23. Interfaces ⭐⭐⭐⭐⭐

Now we reach one of the most important TypeScript-only concepts.

An **interface defines a required shape/contract for an object**.

```ts
interface Authenticatable {
  email: string;
  password: string;
  login(): void;
  logout(): void;
}
```

This says that an `Authenticatable` must have:

```text
email
password
login()
logout()
```

---

# 24. Interfaces With Objects

An interface can be used as a type:

```ts
let user: Authenticatable;

user = {
  email: "test@test.com",
  password: "123456",

  login() {
    console.log("logging in...");
  },

  logout() {
    console.log("logged out successfully");
  },
};
```

TypeScript checks that the object satisfies the interface.

If something required is missing:

```ts
user = {
  email: "test@test.com",
};
```

TypeScript reports an error because the required properties/methods aren't present.

---

# 25. Interfaces as Contracts ⭐⭐⭐⭐⭐

Think of an interface as a **contract**.

```ts
interface Authenticatable {
  login(): void;
}
```

Then:

```ts
function authenticate(user: Authenticatable) {
  user.login();
}
```

This function doesn't care what the actual object is.

It only cares that the object satisfies the contract.

```text
authenticate()
      ↓
expects Authenticatable
      ↓
must have login()
```

So any compatible object can be passed:

```ts
authenticate(user);
```

### 🧠 Mental Model

> **Interface = "If you want to be treated as this type, you must have this shape."**

---

# 26. Interfaces With Classes ⭐⭐⭐⭐⭐

A class can promise to follow an interface using:

```ts
implements;
```

Example:

```ts
class AuthenticatableUser implements Authenticatable {
  constructor(
    public email: string,
    public password: string,
  ) {}

  login(): void {}

  logout(): void {}
}
```

Because the class implements `Authenticatable`, TypeScript checks that it provides the required structure.

If we forget:

```ts
logout(): void {}
```

TypeScript will complain.

### 🧠 Mental Model

```text
interface
    ↓
defines contract
    ↓
class implements it
    ↓
TypeScript checks the class
```

---

# 27. `implements` vs `extends` ⭐⭐⭐⭐⭐

These are easy to confuse.

### `extends`

Used for **class inheritance**:

```ts
class Employee extends User {}
```

Meaning:

> Employee is based on/inherits from User.

### `implements`

Used when a class follows an **interface contract**:

```ts
class User implements Authenticatable {}
```

Meaning:

> User promises to provide the structure required by Authenticatable.

### Mental model

```text
extends
→ inherit from a class

implements
→ satisfy an interface contract
```

---

# 28. Interfaces Can Be Extended ⭐⭐⭐⭐⭐

One interface can build upon another using:

```ts
extends
```

Example:

```ts
interface Authenticatable {
  login(): void;
}

interface Admin extends Authenticatable {
  role: "admin" | "superadmin";
}
```

`Admin` now requires everything from `Authenticatable` plus its own property.

So an `Admin` must have:

```text
login()
role
```

### Mental Model

```text
Authenticatable
       ↓ extends
      Admin
       ↓
inherits login()
       +
adds role
```

---

# 29. Interface `extends` vs Declaration Merging

These are different concepts.

### Interface inheritance

```ts
interface Authenticatable {
  login(): void;
}

interface Admin extends Authenticatable {
  role: string;
}
```

Creates a **new interface**.

The original `Authenticatable` remains unchanged.

### Declaration merging

If the same interface is declared multiple times:

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}
```

TypeScript merges them into one `User` interface:

```text
User
├── name
└── age
```

### Important distinction

```text
extends
→ create a new interface based on another

same interface name
→ declaration merging
```

---

# 30. Interfaces Are TypeScript-Only ⭐⭐⭐⭐⭐

This is an important distinction from classes.

```ts
interface Authenticatable {
  login(): void;
}
```

Interfaces exist only to help TypeScript during development/type checking.

When TypeScript compiles:

```text
TypeScript
    ↓
JavaScript
```

the interface disappears.

There is no:

```js
interface Authenticatable {}
```

in the final JavaScript.

### 🧠 Mental Model

```text
Interface
    ↓
Type checking
    ↓
Compile
    ↓
Removed
```

Compare with a class:

```text
Class
    ↓
JavaScript runtime feature
    ↓
Exists at runtime
```

---

# 31. Classes vs Interfaces ⭐⭐⭐⭐⭐

This distinction is worth understanding deeply.

|                                | Class    | Interface |
| ------------------------------ | -------- | --------- |
| JavaScript feature?            | ✅       | ❌        |
| TypeScript feature?            | Enhanced | ✅        |
| Exists at runtime?             | ✅       | ❌        |
| Can create instances?          | ✅       | ❌        |
| Can contain implementation?    | ✅       | ❌        |
| Can define a shape/contract?   | ✅       | ✅        |
| Can be used as a type?         | ✅       | ✅        |
| Can be implemented by a class? | —        | ✅        |

### Simple mental model

```text
Class
→ blueprint + implementation + runtime object

Interface
→ contract / shape for TypeScript
```

---

# 32. Why Use Interfaces?

Interfaces become especially useful in:

- larger projects
- teams with multiple developers
- libraries
- APIs/contracts
- situations where different objects should follow the same structure

For example:

```ts
interface Authenticatable {
  login(): void;
}
```

Then many different classes can implement it:

```ts
class User implements Authenticatable {
  login() {}
}

class Admin implements Authenticatable {
  login() {}
}
```

Both guarantee:

```text
login()
```

exists.

The interface establishes the minimum required shape.

---

# 33. Type vs Interface

Both can describe object shapes.

For example:

```ts
type User = {
  name: string;
  age: number;
};
```

and:

```ts
interface User {
  name: string;
  age: number;
}
```

can often be used for similar purposes.

The important thing at this stage is:

> **Don't treat `interface` and `type` as completely unrelated concepts. Both can describe types/shapes, but interfaces have features such as `extends` and declaration merging and are commonly used for object contracts.**

The course material introduces interfaces primarily as **contracts for object/class shapes**.

---

# 🔥 The Most Important Concepts

## ⭐⭐⭐⭐⭐ Must Understand Deeply

### 1. Constructor Parameter Properties

```ts
constructor(
  public name: string,
  private age: number
) {}
```

Understand that this automatically creates and initializes properties.

---

### 2. Access Modifiers

```text
public
private
protected
```

Know exactly who can access each one.

---

### 3. Getters & Setters

```ts
get fullName() {}
set firstName(value: string) {}
```

Understand that they allow property-like access while controlling logic.

---

### 4. Inheritance

```ts
class Employee extends User {}
```

and:

```ts
super();
```

Know what the parent/child relationship means.

---

### 5. Interfaces

```ts
interface Authenticatable {
  login(): void;
}
```

Think:

> **Contract / required shape.**

---

### 6. `implements`

```ts
class User implements Authenticatable {}
```

The class promises to satisfy the interface.

---

### 7. Interface `extends`

```ts
interface Admin extends Authenticatable {
  role: string;
}
```

Builds a new interface from an existing one.

---

### 8. Runtime vs Compile-Time

Know the difference:

```text
Class
→ exists at runtime

Interface
→ removed during compilation
```

---

# 🟡 Important, But Don't Overthink

Be comfortable recognizing and using:

- `readonly`
- `static`
- `abstract`
- `protected`
- getters
- setters
- interface declaration merging
- class property initialization

You don't need to memorize generated JavaScript.

---

# ⚠️ Common Traps

### `private` ≠ `protected`

```text
private
→ class only

protected
→ class + subclasses
```

---

### `extends` has two related uses

```ts
class Employee extends User {}
```

→ class inheritance.

```ts
interface Admin extends User {}
```

→ interface inheritance.

---

### `implements` doesn't create inheritance

```ts
class User implements Authenticatable {}
```

The class doesn't inherit implementation from the interface.

The interface simply defines the **contract TypeScript checks**.

---

### Interface ≠ class

```text
interface
→ type/contract

class
→ blueprint + implementation + runtime
```

---

### `static` ≠ instance member

```ts
User.greet(); // static

user.greet(); // instance method
```

Static members belong to the class itself.

---

### Getter isn't called like a method

```ts
user.fullName; // ✅ getter
user.fullName(); // ❌
```

---

### `readonly` doesn't automatically make an array immutable

A readonly array property can still allow mutation of the existing array depending on the declared type.

---

# 🧠 The Big Picture

You can think of the whole section as three layers:

```text
                  TypeScript Classes
                         │
          ┌──────────────┴──────────────┐
          ↓                             ↓
   JavaScript Features          TypeScript Features
          │                             │
     class / new                    types
     constructor                 public/private
     this                        protected
     inheritance                 readonly
     static                      abstract
     methods                     parameter properties
                                  interfaces
```

Then interfaces provide another way of describing structure:

```text
Interface
    ↓
Contract
    ↓
"This object/class must have these members"
    ↓
TypeScript checks it
    ↓
Interface disappears at runtime
```

---

# 🔑 Final Cheat Sheet

```ts
// Class
class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

// Constructor parameter property
class User {
  constructor(
    public name: string,
    private age: number,
  ) {}
}

// Protected
class User {
  protected name = "Omar";
}

// Readonly
class User {
  constructor(public readonly id: number) {}
}

// Getter
class User {
  get fullName() {
    return "Omar Ahmed";
  }
}

// Setter
class User {
  set name(value: string) {
    // validation...
  }
}

// Static
class User {
  static role = "USER";

  static greet() {}
}

User.role;
User.greet();

// Inheritance
class Employee extends User {
  constructor() {
    super();
  }
}

// Abstract class
abstract class UIElement {
  abstract render(): void;
}

// Interface
interface Authenticatable {
  email: string;
  login(): void;
}

// Implements
class User implements Authenticatable {
  constructor(public email: string) {}

  login() {}
}

// Interface inheritance
interface Admin extends Authenticatable {
  role: "admin" | "superadmin";
}
```

---

# 🎯 One-Minute Revision

```text
Class
→ JavaScript blueprint for creating objects.

Constructor
→ runs automatically when new is used.

Class property
→ data belonging to an instance.

public
→ accessible everywhere.

private
→ accessible only inside the class.

protected
→ accessible inside the class and subclasses.

readonly
→ cannot reassign the property.

Parameter property
→ public/private/protected parameter automatically becomes a property.

Getter
→ access calculated logic like a property.

Setter
→ control/validate assignment like a property.

static
→ belongs to the class, not an instance.

extends
→ inheritance.

super()
→ calls the parent constructor.

abstract
→ class can only be used as a base class.

interface
→ TypeScript contract describing an object's/class's shape.

implements
→ class promises to satisfy an interface.

interface extends
→ create a new interface based on another.

Interface
→ compile-time only; removed from JavaScript.
```

> **The central idea of Section 6:** TypeScript takes JavaScript's class system and adds stronger structure and access control, while interfaces provide compile-time contracts that describe what objects and classes must look like.
