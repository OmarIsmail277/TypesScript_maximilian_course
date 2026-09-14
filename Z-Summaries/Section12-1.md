# TypeScript — Section 12

## Experimental / Legacy Decorators — Lectures 1–6

---

# 🎬 Overview

These lectures introduce the **older/legacy TypeScript decorator system** and explore:

- Class decorators
- Decorator factories
- Useful decorator examples
- Multiple decorators and their execution order
- Property decorators
- Accessor decorators
- Method decorators
- Parameter decorators

The most important difference from Section 11 is that **legacy decorators use a different decorator API and different arguments**.

---

# 1. Class Decorators ⭐⭐⭐

A basic class decorator:

```ts
function Logger(target: Function) {
  console.log("Logging...");
  console.log(target);
}

@Logger
class Person {
  name = "Omar";

  constructor() {
    console.log("Creating person object...");
  }
}
```

### Important:

The decorator executes when the **class is defined**, not when the class is instantiated.

So even if you remove:

```ts
const pers = new Person();
```

the decorator still executes.

### Mental model

```text
JavaScript finds class definition
        ↓
Decorator executes
        ↓
Class can later be instantiated
```

Not:

```text
new Person()
   ↓
Decorator executes
```

This distinction is fundamental.

---

# 2. Decorator Factories ⭐⭐⭐

Instead of directly using a decorator:

```ts
@Logger
```

we can create a **decorator factory**:

```ts
function Logger(logString: string) {
  console.log("LOGGER FACTORY");

  return function (target: Function) {
    console.log("Logging" + " " + logString);
    console.log(target);
  };
}
```

Then:

```ts
@Logger("LOGGING - PERSON")
class Person {}
```

### Why is it called a factory?

Because:

```text
Logger("LOGGING - PERSON")
        ↓
returns a decorator function
        ↓
that decorator is applied to Person
```

The factory allows us to **configure the decorator** when using it.

### Important distinction

```ts
Logger("LOGGING - PERSON");
```

is the **decorator factory**.

The function it returns:

```ts
function (target: Function) {
  ...
}
```

is the **actual decorator**.

---

# 3. Building a More Useful Decorator ⭐⭐⭐

Max creates a `withTemplate` decorator:

```ts
function withTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");

  return function (target: any) {
    console.log("Rendering Template! 😎");

    const hookEl = document.getElementById(hookId);
    const p = new target();

    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}
```

Used as:

```ts
@withTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Omar";

  constructor() {
    console.log("Creating person object...");
  }
}
```

The decorator:

1. Receives a template and an element ID.
2. Creates an instance of the decorated class with:

   ```ts
   new target();
   ```

3. Finds the HTML element.
4. Inserts the template.
5. Gets the `name` from the created object.
6. Places the name inside the `<h1>`.

### Important connection

This example shows how decorators can perform **behind-the-scenes work around a class**.

Frameworks such as Angular make much more advanced use of decorators.

---

# 4. Multiple Decorators ⭐⭐⭐

We can apply multiple decorators:

```ts
@Logger("LOGGING - PERSON")
@withTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Omar";

  constructor() {
    console.log("Creating person object...");
  }
}
```

The important question is:

> **In which order do the decorators execute?**

---

## Decorator Execution Order

The **actual decorator functions** execute **bottom-up**.

So:

```ts
@Logger(...)
@withTemplate(...)
class Person {}
```

executes:

```text
withTemplate
    ↓
Logger
```

The bottom-most decorator executes first.

### ⚠️ But decorator factories are different

The **decorator factories execute earlier**, following normal JavaScript function-call order.

So:

```ts
@Logger(...)
@withTemplate(...)
class Person {}
```

roughly behaves as:

```text
Logger(...) factory
        ↓
withTemplate(...) factory
        ↓
decorator functions execute bottom-up
        ↓
withTemplate decorator
        ↓
Logger decorator
```

### 🧠 Important distinction

> **Factories execute first in normal top-to-bottom evaluation order, while the resulting decorator functions execute bottom-to-top.**

---

# 5. Property Decorators ⭐⭐⭐

Decorators can also be added to properties.

Example:

```ts
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property Decorator!");
  console.log(target, propertyName);
}
```

Usage:

```ts
class Product {
  @Log
  title: string;

  // ...
}
```

A **legacy property decorator** receives:

```text
target
propertyName
```

### `target`

For an **instance property**:

```text
target → prototype
```

For a **static property**:

```text
target → constructor function
```

### `propertyName`

The name of the decorated property.

For:

```ts
@Log
title: string;
```

the value is:

```text
"title"
```

---

# 6. When Does a Property Decorator Execute?

The property decorator executes when the property is encountered as part of the **class definition**, not when you later create an instance.

So again:

```text
Class is defined
      ↓
Property decorator executes
```

not:

```text
new Product()
      ↓
Property decorator executes
```

This follows the same important decorator execution concept we've already seen.

---

# 7. Accessor Decorators ⭐⭐⭐

Decorators can also be placed on accessors such as setters and getters.

Example:

```ts
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor Decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}
```

Used on:

```ts
class Product {
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) this._price = val;
    else throw new Error("Invalid Price! Must be positive...");
  }
}
```

A legacy accessor decorator receives **three arguments**:

```text
target
name
descriptor
```

---

## `target`

Just like with the property decorator:

### Instance accessor:

```text
target → prototype
```

### Static accessor:

```text
target → constructor function
```

---

## `name`

The name of the accessor itself.

For:

```ts
set price(...)
```

the name is:

```text
"price"
```

It is **not**:

```text
"_price"
```

because `_price` is the internal property, while `price` is the accessor being decorated.

---

## `descriptor`

The property descriptor describing the accessor.

For example:

```ts
{
  get: undefined,
  set: ƒ,
  enumerable: false,
  configurable: true
}
```

Since this example only has a setter:

```text
get → undefined
set → setter function
```

The `enumerable` and `configurable` values are standard JavaScript property-descriptor concepts.

---

# 8. Method Decorators ⭐⭐⭐

Methods can also have decorators.

```ts
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor,
) {
  console.log("Method Decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}
```

Used on:

```ts
class Product {
  @Log3
  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}
```

A legacy method decorator receives:

```text
target
name
descriptor
```

Just like an accessor decorator.

---

# 9. Method Descriptor vs Accessor Descriptor

Both use:

```ts
PropertyDescriptor;
```

but the descriptor contents differ because they describe different JavaScript constructs.

### Method descriptor

Contains things such as:

```text
value
writable
enumerable
configurable
```

### Accessor descriptor

Contains:

```text
get
set
enumerable
configurable
```

This difference comes from **JavaScript property descriptors**, not something unique to TypeScript.

---

# 10. Parameter Decorators ⭐⭐⭐

Finally, decorators can be placed on parameters.

Example:

```ts
function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter Decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}
```

Used like:

```ts
class Product {
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}
```

A legacy parameter decorator receives:

```text
target
name
position
```

---

## `target`

Same idea as before:

```text
instance method → prototype
static method → constructor function
```

---

## `name`

This is **not the parameter's name**.

It is the name of the **method containing the parameter**.

So for:

```ts
getPriceWithTax(@Log4 tax: number)
```

we get:

```text
name → "getPriceWithTax"
```

---

## `position`

This tells us the **index of the parameter**.

Indexes start at `0`.

So:

```ts
getPriceWithTax(@Log4 tax: number)
```

has:

```text
position → 0
```

If we had:

```ts
someMethod(first, second, third);
```

then:

```text
first  → 0
second → 1
third  → 2
```

---

# 📊 Legacy Decorator Argument Cheat Sheet

| Decorator     | Arguments                      |
| ------------- | ------------------------------ |
| **Class**     | `target`                       |
| **Property**  | `target`, `propertyName`       |
| **Accessor**  | `target`, `name`, `descriptor` |
| **Method**    | `target`, `name`, `descriptor` |
| **Parameter** | `target`, `name`, `position`   |

### 🧠 Easy pattern

```text
Class
  ↓
target

Property
  ↓
target + property name

Accessor / Method
  ↓
target + name + descriptor

Parameter
  ↓
target + method name + parameter position
```

---

# 🔥 Most Important Concepts From Lectures 1–6

### 1. Decorators execute when the class/member is defined

Not when you instantiate the class or call the method.

### 2. Decorator factories allow configuration

```ts
@Logger("LOGGING - PERSON")
```

The factory receives configuration and returns the actual decorator.

### 3. Multiple decorator functions execute bottom-up

```ts
@Logger
@withTemplate
class Person {}
```

→ `withTemplate` executes first.

### 4. Decorator factories execute earlier

The factory calls follow normal JavaScript evaluation order.

### 5. Legacy decorators receive different arguments depending on where they're used

```text
Class       → target
Property    → target, name
Accessor    → target, name, descriptor
Method      → target, name, descriptor
Parameter   → target, name, position
```

### 6. `target` usually refers to the prototype for instance members

For static members, it refers to the constructor function.

### 7. `descriptor` is a JavaScript `PropertyDescriptor`

It describes the method/accessor and differs depending on whether you're dealing with a method or accessor.

---

# 🧠 One-Minute Revision

```text
LEGACY DECORATORS — LECTURES 1–6

Decorator:
→ Runs when the class/member is defined.

Decorator Factory:
→ Function that returns a decorator.
→ Allows configuration.

Multiple Decorators:
→ Factories execute first.
→ Actual decorators execute bottom-up.

Class:
→ @Logger
→ target

Property:
→ @Log
→ target + propertyName

Accessor:
→ target + name + descriptor

Method:
→ target + name + descriptor

Parameter:
→ target + method name + position

target:
→ Instance member → prototype
→ Static member → constructor function

Parameter position:
→ Starts at 0.

Main mental model:
→ Decorators perform setup/work around class definitions
   and can inspect or modify the decorated class members.
```

### 🔑 One-Sentence Takeaway

> **Legacy TypeScript decorators can be attached to classes, properties, accessors, methods, and parameters; depending on where they are used, they receive different arguments and execute during the class/member definition process.**
