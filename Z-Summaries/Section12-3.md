# TypeScript — Section 12

## Lectures 11–12: Autobind & Validation with Decorators

---

# 🎬 Lecture Overview

These final lectures show how decorators can solve **real-world problems**.

We see two practical examples:

1. **`@Autobind`** → automatically keeps `this` pointing to the correct class instance.
2. **Validation decorators** → attach validation rules to class properties and later use a `validate()` function to check an object.

The bigger lesson is:

> **Decorators can be used to build reusable functionality that would otherwise require repetitive code.**

---

# 1. The `this` Problem with Event Listeners ⭐⭐⭐

Consider:

```ts
class Printer {
  message = "This works!";

  showMessage() {
    console.log(this.message);
  }
}
```

If we call the method directly:

```ts
const p = new Printer();

p.showMessage();
```

`this` refers to:

```text
p
```

So:

```ts
this.message;
```

works correctly.

---

## But What Happens with `addEventListener`?

Suppose we do:

```ts
const button = document.querySelector("button")!;

button.addEventListener("click", p.showMessage);
```

Now the method is passed as a callback.

When the event occurs, the method's `this` is no longer the `Printer` instance.

For a normal event listener callback, `this` refers to the event target:

```text
this
 ↓
button
```

instead of:

```text
this
 ↓
p
```

Therefore:

```ts
console.log(this.message);
```

doesn't find the `message` property we expected.

---

# 2. Traditional JavaScript Solution: `bind()` ⭐⭐⭐

A common solution is:

```ts
button.addEventListener("click", p.showMessage.bind(p));
```

Or we can bind the method beforehand.

Conceptually:

```ts
p.showMessage = p.showMessage.bind(p);
```

Now the method permanently uses:

```text
this → p
```

regardless of how it is called.

---

# 3. The Problem with Doing This Manually

Imagine having many methods:

```ts
p.method1.bind(p);
p.method2.bind(p);
p.method3.bind(p);
```

That becomes repetitive.

Wouldn't it be nice if we could simply write:

```ts
@Autobind
showMessage() {
  console.log(this.message);
}
```

and have the decorator handle the binding automatically?

That's exactly what this example demonstrates.

---

# 4. Building the `@Autobind` Decorator ⭐⭐⭐

The decorator receives the method's descriptor:

```ts
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  // ...
}
```

The first two arguments aren't needed here, so they are renamed to:

```text
_
_2
```

to communicate:

> **These parameters exist, but we're not interested in them.**

The important argument is:

```ts
descriptor;
```

because it contains the method.

---

# 5. Getting the Original Method

The original method can be retrieved through:

```ts
const originalMethod = descriptor.value;
```

Remember:

> For a method, `descriptor.value` contains the actual function.

So:

```text
descriptor
     ↓
value
     ↓
original method
```

---

# 6. Returning a New Descriptor ⭐⭐⭐

The decorator creates a new descriptor:

```ts
const adjustedDescriptor: PropertyDescriptor = {
  configurable: true,
  enumerable: false,

  get() {
    // ...
  },
};
```

The important part is the:

```ts
get();
```

getter.

Instead of directly replacing the method with a bound function, the decorator creates a **getter layer**.

---

# 7. Why Does the Getter Solve the `this` Problem? ⭐⭐⭐

This is the clever part of the example.

Inside the getter:

```ts
get() {
  const boundFn = originalMethod.bind(this);
  return boundFn;
}
```

What does `this` refer to here?

The getter is accessed through the object that owns the property.

Therefore:

```text
Getter
  ↓
Triggered through the object
  ↓
this = the object
```

For example:

```text
p.showMessage
     ↓
getter executes
     ↓
this = p
```

This gives us the correct object to bind.

---

# 8. Binding the Original Method

Inside the getter:

```ts
const boundFn = originalMethod.bind(this);
```

If:

```text
this = p
```

then this becomes conceptually:

```ts
p.showMessage.bind(p);
```

The getter returns that bound function:

```ts
return boundFn;
```

Therefore, when the event listener later calls the returned function, the original method still has:

```text
this → p
```

---

# 9. Why `addEventListener` Can't Break It ⭐⭐⭐

Normally:

```ts
button.addEventListener("click", p.showMessage);
```

causes the callback's `this` to refer to the button.

But with the decorator:

```text
p.showMessage
     ↓
Getter executes
     ↓
Creates bound function
     ↓
originalMethod.bind(p)
     ↓
Event listener receives bound function
     ↓
this remains p
```

The event listener can no longer change the bound `this`.

---

# 10. The Complete `@Autobind` Flow

```ts
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,

    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjustedDescriptor;
}
```

Used as:

```ts
class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}
```

Then:

```ts
const p = new Printer();

const button = document.querySelector("button")!;

button.addEventListener("click", p.showMessage);
```

Now the output is:

```text
This works!
```

---

# 🧠 Why This Decorator Is Clever

Without the decorator:

```text
Event listener
     ↓
this → button ❌
```

With the decorator:

```text
p.showMessage
     ↓
Getter
     ↓
bind(this)
     ↓
this → p ✅
     ↓
Event listener
```

The decorator creates an additional layer between accessing the method and executing the method.

---

# 11. Real-World Example: Validation with Decorators ⭐⭐⭐

The next example demonstrates a different use case.

Suppose we have:

```ts
class Course {
  @Required
  title: string;

  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}
```

We want:

```text
title
 ↓
must not be empty

price
 ↓
must be greater than 0
```

---

# 12. Why Do We Need Validation?

Imagine data coming from:

- A web API
- A form
- User input
- Another external source

We may receive values that **look correct**, but we aren't guaranteed that they are valid.

For example:

```text
title = ""
price = -50
```

The TypeScript types may still say:

```ts
title: string;
price: number;
```

But that doesn't mean the values are valid according to our application's rules.

This is an important distinction:

> **Types describe the expected type of a value; validation checks whether the actual value satisfies our application rules.**

---

# 13. The Desired API

The goal is to make validation easy to use.

We want:

```ts
class Course {
  @Required
  title: string;

  @PositiveNumber
  price: number;
}
```

Then later:

```ts
const createdCourse = new Course(title, price);

if (!validate(createdCourse)) {
  alert("invalid input, please try again!");
  return;
}
```

So the user of the validation system doesn't have to manually write:

```ts
if (title.trim().length === 0) {
  // ...
}

if (price <= 0) {
  // ...
}
```

every time.

---

# 14. The Decorators Register Validation Rules ⭐⭐⭐

The idea is that:

```ts
@Required
```

means:

```text
This property needs "required" validation.
```

And:

```ts
@PositiveNumber
```

means:

```text
This property needs "positive" validation.
```

The decorators don't necessarily perform the validation immediately.

Instead, they **register the validation rules** somewhere.

Later:

```ts
validate(createdCourse);
```

looks at those registered rules and applies them to the object.

---

# 15. The Validation Registry ⭐⭐⭐

A registry is created:

```ts
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[];
  };
}

const registeredValidators: ValidatorConfig = {};
```

The basic idea is:

```text
registeredValidators
        ↓
stores validation configuration
        ↓
Class
   ↓
Properties
   ↓
Validation rules
```

For example, conceptually:

```text
Course
 ├── title → ["required"]
 └── price → ["positive"]
```

This registry acts as the decorator system's **behind-the-scenes storage**.

---

# 16. `@Required` Decorator ⭐⭐⭐

The decorator is:

```ts
function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],

    [propName]: ["required"],
  };
}
```

The important information is:

```ts
target.constructor.name;
```

This identifies the class.

For:

```ts
class Course {}
```

it gives:

```text
"Course"
```

And:

```ts
propName;
```

identifies the property:

```text
"title"
```

So the registry can associate:

```text
Course → title → required
```

---

# 17. `@PositiveNumber` Decorator

Similarly:

```ts
function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],

    [propName]: ["required"],
  };
}
```

The intended idea is:

```text
Course → price → positive
```

### ⚠️ Important note from the lecture

The example implementation is intentionally **naive**.

It uses:

```ts
["required"];
```

inside `PositiveNumber`, although the intended validator is `"positive"`.

The lecturer explicitly presents this as a simplified demonstration rather than a production-ready validator.

---

# 18. Why the Registry Is Needed

Remember:

> A property decorator runs when the class is defined.

At that moment, it can store information such as:

```text
Course
title
required
```

Later, when we have an actual object:

```ts
const createdCourse = new Course(title, price);
```

we can call:

```ts
validate(createdCourse);
```

The validation function can then look up:

```text
What validation rules were registered
for this object's class?
```

---

# 19. The `validate()` Function ⭐⭐⭐

The validation function begins with:

```ts
function validate(obj: any) {
  const objVaidatorConfig = registeredValidators[obj.constructor.name];

  if (!objVaidatorConfig) return true;

  let isValid = true;

  // ...
}
```

First:

```ts
obj.constructor.name;
```

identifies the class of the object.

For:

```ts
const createdCourse = new Course(...);
```

the class name is:

```text
Course
```

So we retrieve:

```text
registeredValidators["Course"]
```

---

# 20. Looping Through Validation Rules

The function then loops through the configured properties:

```ts
for (const prop in objVaidatorConfig) {
```

For every property, it loops through its validators:

```ts
for (const validator of objVaidatorConfig[prop]) {
```

Then a `switch` determines which validation rule to execute:

```ts
switch (validator) {
  case "required":
    isValid = isValid && !!obj[prop];
    break;

  case "positive":
    isValid = isValid && obj[prop] > 0;
    break;
}
```

---

# 21. The `required` Validator

This line:

```ts
isValid = isValid && !!obj[prop];
```

checks whether the property contains a truthy value.

For example:

```text
""        → false
"React"   → true
```

So an empty title fails the required validation.

---

# 22. The `positive` Validator

The intended logic is:

```ts
isValid = isValid && obj[prop] > 0;
```

So:

```text
price = 100
   ↓
100 > 0
   ↓
true
```

But:

```text
price = -10
   ↓
-10 > 0
   ↓
false
```

Therefore the price must be greater than zero.

---

# 23. Final Validation Flow ⭐⭐⭐

The entire system works like this:

```text
Class definition
      ↓
@Required / @PositiveNumber
      ↓
Decorators register validation rules
      ↓
Registry stores the rules
      ↓
Later...
      ↓
new Course(title, price)
      ↓
validate(createdCourse)
      ↓
Find Course's registered validators
      ↓
Run validation rules
      ↓
true / false
```

---

# 24. Why This Is Powerful

The end user of the library doesn't need to know how the registry works.

They can simply write:

```ts
class Course {
  @Required
  title: string;

  @PositiveNumber
  price: number;
}
```

and later:

```ts
if (!validate(course)) {
  // invalid
}
```

All the complicated logic can be hidden inside a library.

This is exactly the type of abstraction decorators can enable.

---

# 25. Decorators as a Library API ⭐⭐⭐

Imagine this were a third-party validation library.

The library author could provide:

```ts
@Required
@PositiveNumber
validate()
```

The internal implementation could contain:

```text
Registry
Decorators
Validation logic
Metadata
Utility functions
```

But the end user only interacts with the simple API.

This is one of the biggest practical reasons decorators can be useful.

---

# 🧠 Important Connection to Earlier Lectures

Earlier we learned:

> **Decorators execute when the class is defined.**

The validation example demonstrates exactly why that matters.

When this class is defined:

```ts
class Course {
  @Required
  title: string;

  @PositiveNumber
  price: number;
}
```

the decorators can register:

```text
Course
 ├── title → required
 └── price → positive
```

Then later:

```ts
validate(course);
```

uses that information.

So:

```text
Decorator
   ↓
Registers configuration
   ↓
Stored in registry
   ↓
validate()
   ↓
Uses registered configuration
```

---

# 🔥 Two Real-World Patterns from These Lectures

## Pattern 1 — `@Autobind`

Decorator modifies how a method behaves.

```text
Method
  ↓
Decorator
  ↓
New descriptor
  ↓
Getter
  ↓
Automatically bind method
```

Result:

```text
this → correct class instance
```

---

## Pattern 2 — Validation

Decorators attach configuration/metadata.

```text
Property
   ↓
@Required
   ↓
Register validation rule
   ↓
Registry
   ↓
validate(object)
   ↓
Apply rule
```

Result:

```text
true / false
```

---

# ⚠️ Important Distinction

The decorators themselves don't necessarily perform the final operation.

For example:

```ts
@Required
```

doesn't mean:

> "Immediately check whether this property is valid."

Instead, in this example it means:

> **"Register the fact that this property should be validated as required."**

Later:

```ts
validate(course);
```

performs the actual validation.

This is another great example of:

> **Decorator = setup/configuration**
>
> **Later code = uses that configuration**

---

# 🎯 What You Should Remember

If you remember only these **8 things**, you've understood Lectures 11–12:

### 1. Passing a method to an event listener can cause a `this` problem.

```ts
button.addEventListener("click", p.showMessage);
```

The callback's `this` is not automatically the `Printer` instance.

---

### 2. `bind()` fixes the problem.

```ts
p.showMessage.bind(p);
```

It permanently binds `this` to `p`.

---

### 3. `@Autobind` automates this.

The decorator uses a new property descriptor with a getter:

```ts
get() {
  return originalMethod.bind(this);
}
```

---

### 4. `descriptor.value` contains the original method.

```ts
const originalMethod = descriptor.value;
```

---

### 5. The getter gives us the correct object.

The getter is accessed through the object, so:

```ts
this;
```

inside the getter refers to that object.

Then:

```ts
originalMethod.bind(this);
```

binds the original method to the correct instance.

---

### 6. Decorators can be used to register metadata/configuration.

For example:

```ts
@Required
title: string;
```

can register:

```text
title → required
```

---

### 7. A registry can store decorator configuration.

```text
Course
 ├── title → required
 └── price → positive
```

Then:

```ts
validate(course);
```

can retrieve and apply those rules.

---

### 8. Decorators are excellent for reusable abstractions.

They can hide complicated implementation details behind a simple API:

```ts
@Required
@PositiveNumber
```

instead of repeating validation logic throughout the application.

---

# 📊 Section 12 Final Priority

**🟢 HIGH — Concepts**

You don't need to memorize every decorator implementation.

Focus on understanding:

- What decorators are
- When decorators execute
- Decorator factories
- Returning/replacing classes
- Decorator execution order
- Property/method/accessor/parameter decorators
- Property descriptors
- `this` + `bind()`
- How `@Autobind` works
- Decorators as configuration/metadata
- Registry pattern for validation

The exact implementation of `Autobind` or the validator registry is less important than understanding **why the pattern works**.

---

# 🧠 Section 12 — Complete Mental Model

```text
                    DECORATORS
                        │
        ┌───────────────┼────────────────┐
        ↓               ↓                ↓
     Modify          Configure         Replace
     behavior        behavior           code
        │               │                │
        ↓               ↓                ↓
   @Autobind        @Required       Class decorator
        │               │                │
        ↓               ↓                ↓
   New descriptor     Registry       New class
        │               │                │
        ↓               ↓                ↓
   Bind `this`       validate()      extends original
```

---

# ⚡ One-Minute Revision — Section 12

```text
DECORATORS
→ Metaprogramming
→ Run at class definition time
→ Configure/modify code behind the scenes


CLASS DECORATOR
→ Can return a new class
→ New class can extend original
→ super(...) runs original constructor


METHOD DECORATOR
→ Receives descriptor
→ descriptor.value = original method
→ Can return a new descriptor


PROPERTY DESCRIPTOR

Method:
value
writable
configurable
enumerable

Accessor:
get
set
configurable
enumerable


@AUTOBIND

Problem:
event listener changes method's `this`

Solution:
originalMethod.bind(this)

Decorator:
getter → bind method → return bound function


VALIDATION

@Required
      ↓
register rule

@PositiveNumber
      ↓
register rule

Registry
      ↓
stores configuration

validate(object)
      ↓
find rules
      ↓
apply validators
      ↓
true / false
```

---

# 🔑 Final Section 12 Takeaway

> **Decorators are a metaprogramming tool that lets us configure or modify classes and their members at definition time, enabling reusable patterns such as automatic method binding, class replacement, and metadata-driven validation.**
