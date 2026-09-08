# TypeScript — Constructor Parameter Properties

## 🎬 Lecture Overview

TypeScript provides a shortcut that lets you:

- declare a class property
- type it
- receive it through the constructor
- initialize it

**all in one place.**

The keyword used is `public` (or later, `private`, `protected`, etc.).

---

# 1. The Longer TypeScript Version

Without the shortcut:

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

We have to:

1. Declare `name`
2. Declare `age`
3. Receive them in the constructor
4. Assign them to `this`

---

# 2. The TypeScript Shortcut ⭐⭐⭐⭐

We can replace all of that with:

```ts
class User {
  constructor(
    public name: string,
    public age: number,
  ) {}
}
```

That's it.

The `public` keyword tells TypeScript:

> **Create a public property with this parameter's name and automatically assign the parameter's value to it.**

So this:

```ts
constructor(public name: string, public age: number) {}
```

is essentially a shortcut for:

```ts
name: string;
age: number;

constructor(name: string, age: number) {
  this.name = name;
  this.age = age;
}
```

---

# 3. What Does `public` Do Here?

Normally:

```ts
constructor(name: string, age: number) {}
```

`name` and `age` are just **constructor parameters**.

They don't automatically become class properties.

But:

```ts
constructor(public name: string, public age: number) {}
```

tells TypeScript to:

```text
parameter
   ↓
create property with same name
   ↓
assign parameter value to property
```

So:

```ts
new User("Max", 36);
```

produces an object like:

```text
{
  name: "Max",
  age: 36
}
```

---

# 4. Why Is This Useful? ⭐⭐⭐

It makes classes much more concise.

### Without shortcut

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

### With shortcut

```ts
class User {
  constructor(
    public name: string,
    public age: number,
  ) {}
}
```

Same basic result, much less code.

---

# 5. Creating Instances Is Still JavaScript ⭐⭐⭐

Once the class is defined:

```ts
class User {
  constructor(
    public name: string,
    public age: number,
  ) {}
}
```

you create an instance normally:

```ts
const max = new User("Max", 36);
const fred = new User("Fred", 25);
```

This:

```ts
new User("Max", 36);
```

is **standard JavaScript class syntax**.

The `public` parameter-property syntax is the TypeScript-specific part.

---

# 6. The Result

If we do:

```ts
console.log(max);
console.log(fred);
```

we get objects conceptually like:

```text
User {
  name: "Max",
  age: 36
}

User {
  name: "Fred",
  age: 25
}
```

Each instance has its own values.

---

# 7. What Happens After Compilation? ⭐⭐⭐

Remember:

```text
TypeScript
    ↓
   tsc
    ↓
JavaScript
```

TypeScript:

```ts
class User {
  constructor(
    public name: string,
    public age: number,
  ) {}
}
```

gets compiled to essentially:

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
```

Notice:

```text
public
: string
: number
```

are gone.

They're TypeScript features.

The generated JavaScript still needs to perform:

```js
this.name = name;
this.age = age;
```

because that's what actually creates and initializes the properties at runtime.

---

# 8. Constructor Parameters Still Behave Like Functions ⭐⭐⭐

A constructor is essentially a special function, so normal parameter features still apply.

For example, you can make a parameter optional:

```ts
class User {
  constructor(
    public name: string,
    public age?: number,
  ) {}
}
```

Now:

```ts
new User("Max"); // ✅
new User("Max", 36); // ✅
```

You can also provide a default value:

```ts
class User {
  constructor(
    public name: string,
    public age = 18,
  ) {}
}
```

Then:

```ts
new User("Max");
```

gives:

```text
name → "Max"
age  → 18
```

So the normal JavaScript/TypeScript function parameter rules still apply.

---

# 🧠 The Most Important Mental Model

Don't think of:

```ts
constructor(public name: string, public age: number) {}
```

as some completely different constructor.

Think:

> **`public`\*\*** tells TypeScript to automatically turn this constructor parameter into a class property.\*\*

So:

```text
public name: string
       ↓
Create `name` property
       +
Receive `name` parameter
       +
Assign parameter to property
```

---

# 🔥 JavaScript vs TypeScript

### JavaScript

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
```

### TypeScript — Longer Version

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

### TypeScript — Shortcut

```ts
class User {
  constructor(
    public name: string,
    public age: number,
  ) {}
}
```

All three ultimately produce the same basic object structure:

```text
{
  name: "...",
  age: ...
}
```

---

# ⭐ What You Should Remember

The key syntax is:

```ts
constructor(public name: string, public age: number) {}
```

It is a **TypeScript shortcut** for:

```ts
name: string;
age: number;

constructor(name: string, age: number) {
  this.name = name;
  this.age = age;
}
```

### Remember:

```text
public parameter
      ↓
class property
      +
automatic initialization
```

---

# 📊 Lecture Priority

**🟢 HIGH**

This is worth learning because you'll see this syntax frequently in TypeScript codebases.

You don't need to memorize the generated JavaScript.

Just understand:

> **A parameter prefixed with \*\***`public`\***\* becomes a class property automatically and is initialized with the parameter value.**

Later, `private` and `protected` will build on this same syntax.

---

# 🔑 One-Sentence Takeaway

> **TypeScript's constructor parameter properties let you create, type, and initialize class properties directly in the constructor parameters using keywords like \*\***`public`\***\*, dramatically reducing boilerplate code.**
