# TypeScript — Section 12

## Lectures 7–10: Decorator Execution, Returning Classes & Property Descriptors

---

# 🎬 Lecture Overview

These lectures build on the previous decorator concepts and introduce three important ideas:

1. **When decorators actually execute**
2. **How a class decorator can replace a class by returning a new class**
3. **How method and accessor decorators can return property descriptors**

The most important distinction is:

> **The decorator itself runs when the class is defined, but logic inside a returned constructor runs when an instance is created.**

---

# 1. When Do Decorators Execute? ⭐⭐⭐

A very important point:

> **Decorators execute when the class is defined — not when you instantiate the class.**

For example:

```ts
@template
class Person {}
```

The decorator executes when JavaScript/TypeScript processes the class definition.

It does **not** automatically execute again when you do:

```ts
const person = new Person();
```

And decorators do **not** automatically run whenever you:

- Call a method
- Access a property
- Create an instance

---

## 🧠 Mental Model

Think of the decorator as **setup code**.

```text
Class is defined
      ↓
Decorator executes
      ↓
Behind-the-scenes setup
      ↓
Later...
Class/method/instance uses that setup
```

So decorators are related to **metaprogramming**:

> They can modify, configure, or store information about classes, methods, and properties behind the scenes.

---

# 2. Decorators Can Set Up Future Behavior

Although the decorator itself runs only once during class definition, it can configure behavior that happens later.

For example, a decorator could:

- Add extra functionality
- Add or store metadata
- Store information about a method/property
- Set up code that will execute when a method is later called
- Replace a class or method

### Important distinction

```text
Decorator execution
        ↓
Happens at class definition time
```

while:

```text
Behavior configured by decorator
        ↓
May happen later
```

This distinction is extremely important.

---

# 3. Returning a Class from a Class Decorator ⭐⭐⭐

A class decorator can **return something**.

Specifically, it can return a **new constructor/class** that replaces the original class.

For example:

```ts
@WithTemplate(...)
class Person {}
```

The decorator can return:

```ts
return class extends originalConstructor {
  constructor(...args: any[]) {
    super(...args);

    // Additional logic
  }
};
```

The returned class becomes the new version of the decorated class.

---

# 4. Why Return a New Class?

The new class can:

> **Keep the original functionality while adding new functionality.**

The decorator essentially does:

```text
Original class
      ↓
Decorator
      ↓
New class extends original class
      ↓
Original functionality
        +
Additional functionality
```

Because the new class extends the original constructor, we don't have to throw away the original class behavior.

---

# 5. `super(...args)` ⭐⭐⭐

When the decorator returns a class that extends the original class:

```ts
return class extends originalConstructor {
  constructor(...args: any[]) {
    super(...args);

    // New logic
  }
};
```

we use:

```ts
super(...args);
```

### Why?

Because the returned class extends the original class.

Calling:

```ts
super(...args);
```

runs the **original constructor**.

This preserves the original class's initialization and properties.

---

## Example

Suppose the original class is:

```ts
class Person {
  constructor(public name: string) {}
}
```

The decorator returns:

```ts
class extends Person {
  constructor(...args: any[]) {
    super(...args);

    // Additional logic
  }
}
```

When we create:

```ts
const person = new Person("Omar");
```

the new constructor runs and then:

```ts
super(...args);
```

calls the original constructor.

Therefore:

```text
New constructor
      ↓
super(...)
      ↓
Original constructor
      ↓
Original properties initialized
      ↓
Additional decorator logic
```

---

# 6. The Most Important Timing Difference ⭐⭐⭐

This is probably the most important concept from these lectures.

### Decorator itself

```text
Class definition
      ↓
Decorator executes
```

### Returned constructor

```text
new Person()
      ↓
Returned constructor executes
```

So:

```text
Class is defined
      ↓
Decorator executes
      ↓
Decorator returns new class
      ↓
New class replaces original class
      ↓
new Person()
      ↓
New constructor executes
      ↓
super(...)
      ↓
Original constructor executes
      ↓
Additional logic executes
```

---

# 7. Why This Is Useful

Suppose the decorator originally rendered a template directly:

```ts
function withTemplate(template: string, hookId: string) {
  return function (originalConstructor: any) {
    // render template here
  };
}
```

The rendering would happen when the decorator executes.

That means it happens when the class is **defined**.

But perhaps we only want to render the template when an actual object is created.

We can achieve this by returning a new class:

```ts
return class extends originalConstructor {
  constructor(...args: any[]) {
    super(...args);

    // Render template here
  }
};
```

Now:

```text
Class definition
      ↓
Decorator runs
      ↓
New class created
```

but:

```text
new Person()
      ↓
Template rendering runs
```

So we have moved the logic from:

> **class definition time**

to:

> **instance creation time**

---

# 8. Generic Constructor Type ⭐⭐⭐

The decorator can use a generic constructor type:

```ts
function WithTemplate<T extends { new (...args: any[]): { name: string } }>(
  originalConstructor: T,
) {
  return class extends originalConstructor {
    constructor(...args: any[]) {
      super(...args);

      console.log(this.name);
    }
  };
}
```

Let's understand this part:

```ts
T extends { new (...args: any[]): { name: string } }
```

It tells TypeScript that `T` must represent a constructor that:

- Can be called with `new`
- Can accept any number of arguments
- Creates an object containing a `name` property
- The `name` property must be a `string`

---

## 🧠 Breaking It Down

```ts
new (...args: any[]) => { name: string }
```

means roughly:

> "A constructor that accepts any arguments and creates an object with a string `name` property."

Therefore TypeScript knows this is safe:

```ts
this.name;
```

because the generic constraint guarantees that the created object has:

```ts
name: string;
```

---

# 9. Class Syntax Is Syntactic Sugar

The lecture points out that:

```ts
class Person {}
```

is essentially syntactic sugar around JavaScript's constructor/prototype mechanism.

Therefore, when a decorator returns:

```ts
return class extends originalConstructor {};
```

it is effectively returning a **new constructor**.

The important idea isn't the implementation detail.

Remember:

> **A class decorator can replace the original class with another constructor/class.**

---

# 10. Lecture 10 — Decorator Return Values ⭐⭐⭐

Not every decorator handles return values in the same way.

Some decorators can return something that TypeScript actually uses.

### Return values are respected for:

- **Method decorators**
- **Accessor decorators**

### Return values are ignored for:

- **Property decorators**
- **Parameter decorators**

So:

```text
Class decorator
      ↓
Can return a replacement class


Method decorator
      ↓
Can return a new descriptor


Accessor decorator
      ↓
Can return a new descriptor


Property decorator
      ↓
Return value ignored


Parameter decorator
      ↓
Return value ignored
```

---

# 11. Property Descriptors ⭐⭐⭐

To understand method/accessor decorator return values, we need to understand **property descriptors**.

Property descriptors are a **JavaScript feature**, not something unique to TypeScript.

They allow us to describe/configure a property in more detail.

A descriptor can contain things such as:

```text
configurable
enumerable
writable
value
get
set
```

---

# 12. Method Property Descriptor

For a method, the descriptor can look conceptually like:

```ts
{
  configurable: true,
  enumerable: false,
  value: function () {},
  writable: true
}
```

Important properties:

### `value`

The actual value of the property.

For a method:

```text
value → function
```

### `writable`

Controls whether the property's value can be changed.

### `configurable`

Controls whether the property can be reconfigured or deleted.

### `enumerable`

Controls whether the property appears during enumeration, such as a `for...in` loop.

---

# 13. Accessor Property Descriptor

An accessor uses:

```text
get
set
```

instead of a normal `value`.

For example:

```ts
{
  configurable: true,
  enumerable: false,
  get: function () {},
  set: function () {}
}
```

So the important difference is:

### Method

```text
value
writable
```

### Accessor

```text
get
set
```

Both can also have:

```text
configurable
enumerable
```

---

# 14. Why Do Decorators Receive Descriptors? ⭐⭐⭐

A method decorator can receive the method's descriptor.

Conceptually:

```ts
function Log(target: any, name: string, descriptor: PropertyDescriptor) {
  // descriptor describes the method
}
```

Because the descriptor describes how the method is configured, the decorator can return a **new descriptor** and therefore change how the method behaves.

---

# 15. Returning a New Property Descriptor ⭐⭐⭐

A method or accessor decorator can return:

```ts
PropertyDescriptor;
```

For example:

```ts
function Log(
  target: any,
  name: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor {
  return {
    ...descriptor,
    enumerable: true,
  };
}
```

This tells TypeScript that the decorator returns a property descriptor.

The decorator can potentially change things such as:

```text
value
writable
configurable
enumerable
```

For accessors:

```text
get
set
configurable
enumerable
```

---

# 16. Method Decorators Can Replace the Method

Because the method descriptor contains:

```ts
value;
```

and `value` is the function itself, a decorator can replace that function.

Conceptually:

```ts
return {
  ...descriptor,
  value: newFunction,
};
```

This allows decorators to do powerful things such as:

- Wrap a method
- Replace a method
- Add behavior before/after the original method
- Change how the method is configured

This is one of the reasons decorators are useful for reusable functionality.

---

# 17. Accessor Decorators Can Replace `get` / `set`

Accessor descriptors contain:

```ts
get;
set;
```

Therefore, an accessor decorator can potentially return a new descriptor with:

```ts
get: newGetter;
```

or:

```ts
set: newSetter;
```

It could even add functionality that wasn't present before.

For example:

```text
Original accessor
      ↓
Decorator
      ↓
New descriptor
      ↓
New get/set behavior
```

---

# ⚠️ Important: Descriptor Is Vanilla JavaScript

Don't think:

> "PropertyDescriptor is a TypeScript decorator feature."

It isn't.

Property descriptors are part of **JavaScript itself**.

TypeScript decorators simply give us access to these descriptors so we can inspect or modify them.

---

# 🧠 Big Picture: Lectures 7–10

The lectures are building toward this mental model:

```text
                 DECORATORS
                     │
          ┌──────────┴──────────┐
          ↓                     ↓
   Run at definition       Configure behavior
        time                     │
                                ↓
                     Behavior may happen later
```

A class decorator can go further:

```text
Class
 ↓
Decorator
 ↓
Return new class
 ↓
New class replaces original
 ↓
new Person()
 ↓
New constructor runs
 ↓
super(...)
 ↓
Original constructor
 ↓
Additional logic
```

And method/accessor decorators can work with descriptors:

```text
Method / Accessor
       ↓
Property Descriptor
       ↓
Decorator can return
a new descriptor
       ↓
Behavior/configuration changes
```

---

# 🔥 Important Distinctions

## 1. Decorator execution vs instance creation

```text
Decorator
→ class definition time
```

```text
Constructor
→ instance creation time
```

---

## 2. Decorator vs returned constructor

The decorator itself:

```ts
function decorator(...) {
  // runs when class is defined
}
```

A returned constructor:

```ts
return class extends originalConstructor {
  constructor(...) {
    // runs when instance is created
  }
};
```

---

## 3. Class replacement

A class decorator can:

```text
Original class
      ↓
Decorator
      ↓
New class
      ↓
Replaces original
```

while still preserving the original behavior through:

```ts
extends originalConstructor
```

and:

```ts
super(...args);
```

---

## 4. Which decorator return values matter?

| Decorator | Return value respected? | What can it return?     |
| --------- | ----------------------- | ----------------------- |
| Class     | ✅                      | New constructor/class   |
| Method    | ✅                      | New property descriptor |
| Accessor  | ✅                      | New property descriptor |
| Property  | ❌                      | Ignored                 |
| Parameter | ❌                      | Ignored                 |

---

# 🎯 What You Should Remember

If you remember only these **7 things**, you've understood Lectures 7–10:

### 1. Decorators execute when the class is defined.

They don't automatically execute when you create an instance or call a method.

### 2. A decorator can configure behavior that happens later.

The decorator runs now; the behavior it sets up may run later.

### 3. A class decorator can return a new class.

```ts
return class extends originalConstructor {};
```

The returned class replaces the original.

### 4. `super(...args)` preserves the original constructor behavior.

```ts
constructor(...args: any[]) {
  super(...args);
}
```

### 5. Returning a new class allows instance-time logic.

```text
Decorator → definition time
Constructor → instantiation time
```

### 6. Method and accessor decorators can return property descriptors.

They can modify things such as:

```text
value
writable
configurable
enumerable
get
set
```

### 7. Property and parameter decorator return values are ignored.

This distinction is important for understanding what each decorator type can actually change.

---

# 📊 Lecture Priority

**🟢 HIGH**

The syntax is less important than these concepts:

- **When decorators execute**
- **How a class decorator can replace a class**
- **Why \*\***super(...args)\***\* matters**
- **Definition time vs instantiation time**
- **What property descriptors are**
- **Which decorators can return meaningful values**

The generic constructor syntax is worth understanding, but you don't need to memorize it character-by-character.

---

# 🔑 One-Sentence Takeaway

> **Decorators run when a class is defined, but they can configure behavior for later; class decorators can replace a class with a new constructor, while method and accessor decorators can return property descriptors to modify how those members behave.**

---

# ⚡ One-Minute Revision

```text
DECORATOR TIMING
Class definition
      ↓
Decorator executes
      ↓
Setup / modification
      ↓
Later → instance/method behavior


CLASS DECORATOR
@Decorator
class Person {}

Decorator can return:
class extends Original {}


super(...args)
      ↓
Runs original constructor
      ↓
Preserves original initialization


RETURN VALUES
Class      → new class/constructor
Method     → new descriptor
Accessor   → new descriptor
Property   → ignored
Parameter  → ignored


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
```

## 🧠 Core Mental Model

> **Decorator = setup at definition time.**
>
> **Returned constructor = logic at instantiation time.**
>
> **Descriptor = detailed JavaScript configuration of a property/method/accessor.**
