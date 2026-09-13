# Section 11 — ECMAScript Decorators

## 1. What Are Decorators?

Decorators are a **meta-programming feature**.

> **Meta-programming = code that interacts with other code.**

They allow us to write code that can interact with or change the behavior of other code.

Decorators are not unique to TypeScript; other programming languages have similar concepts.

They can be used with:

- Classes
- Methods
- Fields / properties
- Getters
- Setters

### Core mental model

```text
Decorator
    ↓
interacts with
    ↓
Class / Method / Field
    ↓
can enhance or change its behavior
```

The decorator is attached using `@`:

```ts
@logger
class Person {
  name = "Omar";
}
```

---

# 2. Class Decorators

A class decorator receives the class it is attached to and can interact with it.

Example:

```ts
function logger<T extends new (...args: any[]) => any>(
  target: T,
  ctx: ClassDecoratorContext,
) {
  console.log("logger decorator");
  console.log(target);
  console.log(ctx);

  return class extends target {
    age = 35;
  };
}
```

Used as:

```ts
@logger
class Person {
  name = "Omar";

  greet() {
    console.log(`Hi I am ${this.name}`);
  }
}
```

The decorator can return a **new class based on the original class**:

```ts
return class extends target {
  age = 35;
};
```

So the resulting class has the original functionality plus the added `age` property.

```ts
const omar = new Person();

console.log(omar);
```

The important idea is:

> A decorator can return an updated/replacement version of the thing it decorates.

This makes decorators powerful because they can be used to add properties, methods, or other behavior.

---

# 3. Decorator Execution vs. Class Instantiation

There is an important timing difference.

Consider:

```ts
function logger<T extends new (...args: any[]) => any>(
  target: T,
  ctx: ClassDecoratorContext,
) {
  console.log("logger decorator");
  console.log(target);
  console.log(ctx);

  return class extends target {
    constructor(...args: any[]) {
      super(...args);
      console.log("class constructor");
      console.log(this);
    }
  };
}
```

And:

```ts
@logger
class Person {
  name = "Omar";
}
```

There are **two different moments**:

### 1. Class definition

When JavaScript processes the class and the decorator is attached:

```ts
@logger
class Person {}
```

The code directly inside the decorator runs.

So:

```ts
console.log("logger decorator");
console.log(target);
console.log(ctx);
```

runs when the class is defined.

### 2. Class instantiation

When we create an object:

```ts
const omar = new Person();
```

the constructor runs.

If the decorator returned a class with a constructor:

```ts
constructor(...args: any[]) {
  super(...args);
  console.log("class constructor");
  console.log(this);
}
```

those logs happen **every time a new instance is created**.

```text
Class definition
      ↓
Decorator executes
      ↓
Person class exists
      ↓
new Person()
      ↓
Constructor executes
      ↓
Instance created
```

### Important distinction

> **Decorator code executes when the decorator is applied/processed.**

> **Constructor code executes whenever an instance is created.**

So if we create two instances, the constructor-related logs happen twice.

---

# 4. Why Can Decorators Be Powerful?

A decorator doesn't have to simply log something.

It can return an updated version of what it decorates.

For a class, it could add:

- Properties
- Methods
- Constructor behavior
- Other functionality

For example, a reusable decorator could be distributed as a library and used by other developers to enhance classes.

The general idea is:

```text
Original class
     ↓
Decorator
     ↓
Enhanced class
```

This is one of the main reasons decorators are powerful.

---

# 5. Method Decorators

Decorators can also be attached to methods.

Example:

```ts
function autobind(
  target: (...args: any[]) => any,
  ctx: ClassMethodDecoratorContext,
) {
  console.log(target);
  console.log(ctx);
}
```

Used as:

```ts
class Person {
  @autobind
  greet() {
    console.log(`Hi I am ${this.name}`);
  }
}
```

A method decorator receives information about the decorated method and can be used to modify its behavior.

---

# 6. The `this` Problem with Methods

A common JavaScript problem:

```ts
class Person {
  name = "Omar";

  greet() {
    console.log(`Hi I am ${this.name}`);
  }
}
```

If we do:

```ts
const medo = new Person();

const greet = medo.greet;
greet();
```

we lose the object context.

The method is no longer being called as:

```ts
medo.greet();
```

so `this` is not correctly bound to `medo`.

One traditional solution is:

```ts
constructor() {
  this.greet = this.greet.bind(this);
}
```

This works, but it can become repetitive if many methods need this treatment.

The course uses decorators to make this behavior reusable.

---

# 7. `ctx.addInitializer()`

The decorator can use:

```ts
ctx.addInitializer(...)
```

Example:

```ts
function autobind2(
  target: (...args: any[]) => any,
  ctx: ClassMethodDecoratorContext,
) {
  ctx.addInitializer(function (this: any) {
    this[ctx.name] = this[ctx.name].bind(this);
  });
}
```

Then:

```ts
class Person {
  name = "Omar";

  @autobind2
  greet() {
    console.log(`Hi I am ${this.name}`);
  }
}
```

Now:

```ts
const medo = new Person();

const greet2 = medo.greet;

greet2();
```

works because the method is bound to the instance.

### What is happening?

The initializer essentially performs the equivalent of:

```ts
this.greet = this.greet.bind(this);
```

but the decorator does it automatically.

So instead of repeatedly writing:

```ts
constructor() {
  this.greet = this.greet.bind(this);
}
```

we can use:

```ts
@autobind2
greet() {}
```

### Mental model

> `ctx.addInitializer()` lets the decorator register code that should run during initialization of the decorated class/instance.

---

# 8. Replacing a Method with a Decorator

A decorator can also **return a replacement function**.

Example:

```ts
function autobind3(
  target: (...args: any[]) => any,
  ctx: ClassMethodDecoratorContext,
) {
  ctx.addInitializer(function (this: any) {
    this[ctx.name] = this[ctx.name].bind(this);
  });

  return function (this: any) {
    console.log("Executing original function");

    target.apply(this);
  };
}
```

Here the decorator returns a **new function** that replaces the original method.

The returned function can add extra behavior:

```ts
console.log("Executing original function");
```

and then execute the original method:

```ts
target.apply(this);
```

### Why `apply(this)`?

We want the original method to execute with the correct `this`.

So:

```ts
target.apply(this);
```

means essentially:

> Execute `target` with this current object as its `this`.

---

# 9. Field Decorators

Decorators can also be attached to fields:

```ts
function fieldLogger(target: undefined, ctx: ClassFieldDecoratorContext) {
  console.log(target);
  console.log(ctx);

  return (initialValue: any) => {
    console.log(initialValue);
    return "";
  };
}
```

Used as:

```ts
class Person {
  @fieldLogger
  name = "Omar";
}
```

### Why is `target` `undefined`?

For this ECMAScript field decorator example, the decorator runs before the field has finished initializing, so there isn't an initialized field value available through `target` at that point.

The returned function receives the **actual initial value**:

```ts
return (initialValue: any) => {
  console.log(initialValue);
  return "";
};
```

If the original field is:

```ts
name = "Omar";
```

then:

```ts
initialValue;
```

is:

```ts
"Omar";
```

And because the decorator returns:

```ts
return "";
```

the field will receive the new value instead.

So conceptually:

```text
name = "Omar"
      ↓
field decorator
      ↓
initialValue = "Omar"
      ↓
return ""
      ↓
name becomes ""
```

This means a field decorator can inspect or replace the initial value.

---

# 10. Decorator Factories

A **decorator factory** is:

> A function that produces a decorator.

Why do we need this?

Suppose we want to configure a decorator.

Instead of:

```ts
@replacer
name = "Omar";
```

we want:

```ts
@replacer("Ahmed")
name = "Omar";
```

Here `"Ahmed"` is configuration passed to the decorator.

But there is a problem:

```ts
@replacer("Ahmed")
```

looks like we're directly executing the decorator.

Normally, the decorator itself is supposed to be supplied to JavaScript, and JavaScript executes it.

So we use an **outer function**.

---

# 11. Building a Decorator Factory

Example:

```ts
function replacer<T>(initValue: T) {
  return function replacerDecorator(
    target: undefined,
    ctx: ClassFieldDecoratorContext,
  ) {
    console.log(target);
    console.log(ctx);

    return (initialValue: any) => {
      console.log(initialValue);
      return initValue;
    };
  };
}
```

Then:

```ts
class Person {
  @replacer("")
  name = "Omar";
}
```

### What's happening?

There are actually two functions:

```text
replacer("")
    ↓
outer function / factory
    ↓
returns replacerDecorator
    ↓
JavaScript uses replacerDecorator as the actual decorator
```

So:

```ts
@replacer("")
```

can be understood as:

```ts
const decorator = replacer("");

@decorator
name = "Omar";
```

Conceptually, the factory lets us **configure the decorator before it is applied**.

---

# 12. Why Use Decorator Factories?

They make decorators configurable.

For example, instead of hard-coding a URL:

```ts
@sendRequest
```

we could potentially have:

```ts
@sendRequest("https://api.example.com")
```

The factory receives the configuration and produces the actual decorator.

This pattern works not only with field decorators but also with:

- Class decorators
- Method decorators
- Other decorator types

---

# 13. ECMAScript vs. Experimental/Legacy Decorators

This section focuses on **ECMAScript Decorators**.

There is another approach covered in Section 12:

### ECMAScript Decorators

- Official/newer approach
- The direction of the JavaScript language
- Covered in this section

### Experimental / Legacy Decorators

- Older TypeScript approach
- Has existed for longer
- Still appears in many existing TypeScript projects
- Covered in the next section

The course specifically emphasizes that understanding the older approach is important because of its presence in existing projects, while the ECMAScript approach represents the future direction.

---

# ⭐ Section 11 — Important Mental Models

### Decorator

```text
Code attached to other code
        ↓
interacts with / changes it
```

### Class decorator

```ts
@logger
class Person {}
```

Works with the class.

### Method decorator

```ts
class Person {
  @autobind
  greet() {}
}
```

Works with a method.

### Field decorator

```ts
class Person {
  @fieldLogger
  name = "Omar";
}
```

Works with a field.

### Decorator factory

```ts
@replacer("Omar")
```

A function that **creates/configures a decorator**.

### `ctx.addInitializer()`

Allows a decorator to register initialization logic.

### Returning from a decorator

A decorator can return an updated/replacement version of the decorated thing.

---

# 🎯 Interview-Level Takeaways

You don't need to memorize every complicated decorator type.

Focus on understanding:

1. **What meta-programming means**
2. **What a decorator is**
3. **What \*\***\*\***\*\***@decorator\***\*\*\*\*\*\*\*** means\*\*
4. Difference between **class, method, and field decorators**
5. That decorators can **modify/replace behavior**
6. Why `autobind` is useful
7. What `ctx.addInitializer()` does conceptually
8. Why `target` can be `undefined` for the field decorator example
9. What a **decorator factory** is
10. Why we use a factory instead of directly executing a decorator
11. The existence of **ECMAScript vs. Experimental/Legacy decorators**

### One-sentence summary

> **Decorators are a meta-programming feature that lets us attach reusable code to classes or their members so we can inspect, enhance, modify, or replace their behavior.**

# ⚡ One-Minute Revision

- **Decorator** → code that interacts with other code.
- **Meta-programming** → code that operates on/interacts with code.
- `@logger` → attaches `logger` as a decorator.
- **Class decorator** → works with a class.
- **Method decorator** → works with a method.
- **Field decorator** → works with a field/property.
- A decorator can **modify or replace** the decorated thing.
- `ctx.addInitializer()` → registers initialization logic.
- **Decorator factory** → a function that returns a decorator.
- `@replacer("Omar")` → calls the factory to create the actual decorator.
- **ECMAScript decorators** → newer official approach.
- **Experimental/Legacy decorators** → older TypeScript approach, covered in Section 12.

### Core idea

> **Decorators let us attach reusable code to classes or their members to inspect, enhance, modify, or replace their behavior.**
