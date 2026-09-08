# TypeScript — Classes

## Lecture: Classes & Class Properties

---

## 🎬 Lecture Overview

This lecture starts working with **classes**, which are already part of JavaScript.

The main TypeScript-specific concept is:

> **In TypeScript, class properties should be explicitly defined in the class itself, rather than being created implicitly inside the constructor.**

We'll also see how TypeScript checks that these properties are properly initialized.

---

# 1. Classes Are Already Part of JavaScript ⭐⭐⭐

You create a class using the `class` keyword:

```ts
class User {}
```

The class is essentially a **blueprint** for creating objects.

For example:

```text
User class
    ↓
    ├── User object
    ├── User object
    └── User object
```

Each object is an **instance** of the class.

---

# 2. Class Naming Convention

Class names conventionally start with an uppercase letter:

```ts
class User {}
```

instead of:

```ts
class user {}
```

This is **not a TypeScript requirement**.

It's simply a common programming convention that makes it clear that `User` is a class/blueprint.

---

# 3. Class Properties / Fields ⭐⭐⭐

Classes usually contain **properties**, also called **fields**.

For example, a `User` might have:

```text
name
age
```

These properties describe the data belonging to each object.

---

# 4. How JavaScript Can Create Properties

In JavaScript, you can create properties inside the constructor:

```js
class User {
  constructor() {
    this.name = "Max";
  }
}
```

The property is effectively created when the constructor runs.

Remember:

```ts
new User();
```

causes the constructor to execute automatically.

So:

```text
new User()
    ↓
constructor()
    ↓
this.name = "Max"
```

---

# 5. TypeScript Wants Properties Defined Explicitly ⭐⭐⭐⭐

In TypeScript, we should define the class properties directly in the class:

```ts
class User {
  name = "Max";
}
```

Now TypeScript knows that every `User` has a:

```text
name
```

property.

This is one of the differences Max is highlighting between **Vanilla JavaScript and TypeScript**.

---

# 6. Why Define Properties in the Class?

Suppose we want every user to have:

```text
name → string
age  → number
```

We can define them explicitly:

```ts
class User {
  name: string;
  age: number;
}
```

Now TypeScript knows the structure of a `User`:

```text
User
 ├── name: string
 └── age: number
```

This is especially useful because TypeScript can now check how these properties are used.

---

# 7. Constructors Can Receive Values ⭐⭐⭐

Usually, we don't want every user to have the exact same values.

Instead of:

```ts
class User {
  name = "Max";
}
```

we might want:

```text
User 1 → Max, 30
User 2 → Omar, 25
User 3 → Ahmed, 28
```

That's where the constructor becomes useful.

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

Now the constructor expects:

```text
name → string
age  → number
```

---

# 8. The Constructor Parameters Are Typed ⭐⭐⭐

This:

```ts
constructor(name: string, age: number)
```

means:

```text
name → must be a string
age  → must be a number
```

So:

```ts
new User("Omar", 25); // ✅
```

but:

```ts
new User(25, "Omar"); // ❌
```

TypeScript catches the incorrect types.

---

# 9. `this` Is Still Standard JavaScript ⭐⭐⭐

Inside the constructor:

```ts
this.name = name;
this.age = age;
```

`this` is **not a TypeScript feature**.

It's standard JavaScript.

It refers to the object currently being created.

For:

```ts
const user = new User("Omar", 25);
```

the constructor effectively does:

```text
this
 ↓
user object
```

So:

```ts
this.name = name;
```

means:

> Put the constructor's `name` value into this object's `name` property.

---

# 10. Property Names and Parameter Names Don't Have to Match

These names:

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

work perfectly fine.

The important distinction is:

```text
this.name → class property
n         → constructor parameter

this.age  → class property
a         → constructor parameter
```

They don't have to have the same names.

Max uses different names here to make this distinction clear.

---

# 11. TypeScript Checks Property Initialization ⭐⭐⭐⭐

Consider:

```ts
class User {
  name: string;
  age: number;
}
```

TypeScript can complain because:

```text
name → declared as string
       but has no value

age → declared as number
      but has no value
```

The properties are **uninitialized**.

We can fix that by assigning values in the constructor:

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

Now TypeScript can see that when a `User` is created, both properties receive values.

---

# 🧠 The Important Mental Model

Think of the class definition as describing the **shape of every object** created from that class.

```ts
class User {
  name: string;
  age: number;
}
```

means:

```text
Every User should have:

name → string
age  → number
```

Then the constructor makes sure those properties actually receive values:

```ts
constructor(n: string, a: number) {
  this.name = n;
  this.age = a;
}
```

So:

```text
Class definition
      ↓
Defines the properties
      ↓
Constructor receives values
      ↓
Constructor initializes properties
      ↓
Instance is ready to use
```

---

# 🔥 JavaScript vs TypeScript

### JavaScript

You can create properties directly inside the constructor:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

### TypeScript

Define the property explicitly:

```ts
class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

The TypeScript version gives TypeScript more information about the structure of the class.

---

# ⭐ What You Should Remember

### 1. Classes are not new to TypeScript.

They're already a JavaScript feature:

```ts
class User {}
```

---

### 2. A class is a blueprint for objects.

```text
User class
    ↓
instances / objects
```

---

### 3. TypeScript lets you explicitly define class properties.

```ts
class User {
  name: string;
  age: number;
}
```

---

### 4. The constructor initializes those properties.

```ts
constructor(name: string, age: number) {
  this.name = name;
  this.age = age;
}
```

---

### 5. Constructor parameters can be typed.

```ts
constructor(name: string, age: number)
```

This ensures that users are created with the expected types.

---

### 6. `this` is JavaScript.

```ts
this.name = name;
```

`this` refers to the current instance.

---

# 📊 Lecture Priority

**🟢 HIGH**

The class syntax itself isn't new if you already know JavaScript.

The important TypeScript concepts are:

```text
Class
  ↓
Explicitly defined properties
  ↓
Property types
  ↓
Constructor parameters
  ↓
Property initialization
```

You should understand these deeply because classes appear throughout TypeScript codebases and many TypeScript features build on this foundation.

---

# 🔑 One-Sentence Takeaway

> **TypeScript allows you to explicitly define and type class properties, while the constructor can receive values and initialize those properties when each class instance is created.**

---

## 🧩 Connection to JavaScript

You already know JavaScript classes.

TypeScript mainly adds **type information and stricter checks** around them:

```text
JavaScript class
       +
property types
       +
constructor parameter types
       +
initialization checks
       ↓
TypeScript class
```

So don't learn this as a completely new concept—think of it as **JavaScript classes with stronger type safety**.
