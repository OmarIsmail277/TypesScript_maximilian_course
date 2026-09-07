# TypeScript — Section 1

## Lecture 2: What Is TypeScript and Why Use It?

---

## 🎬 Lecture Overview

The lecture answers two fundamental questions:

1. **What is TypeScript?**
2. **Why would we use it instead of JavaScript?**

The key idea is:

> **TypeScript is JavaScript with additional type-related features.**

---

# 1. What Is TypeScript? ⭐⭐⭐

The official TypeScript website describes TypeScript as:

> **"JavaScript with syntax for types."**

This might sound complicated at first, but the idea is simple.

TypeScript code looks very similar to JavaScript because:

> **TypeScript is built on top of JavaScript.**

---

## 2. TypeScript Is a JavaScript Superset ⭐⭐⭐

TypeScript is called a **JavaScript superset**.

### What does "superset" mean?

A superset contains **everything from the original thing + additional features**.

Think of it like:

```text
          TypeScript
     ┌─────────────────┐
     │                 │
     │   JavaScript    │
     │                 │
     │  + TypeScript   │
     │    features     │
     │                 │
     └─────────────────┘
```

So:

> **All valid JavaScript is generally valid TypeScript.**

TypeScript keeps JavaScript's:

* Syntax
* Functions
* Objects
* Arrays
* Classes
* Loops
* Modules
* etc.

And adds additional features, especially **type-related features**.

---

# 3. TypeScript Adds Static Typing ⭐⭐⭐

This is the **main feature introduced in this lecture**.

JavaScript is dynamically typed.

For example:

```js
let age = 25;

age = "hello";
```

JavaScript allows the variable to change from a number to a string.

TypeScript lets us specify the type:

```ts
let age: number = 25;
```

Now TypeScript knows:

```text
age → must be a number
```

Therefore:

```ts
age = "hello";
```

will produce a TypeScript error.

---

# 4. TypeScript-Specific Syntax

Consider a function:

```ts
function calculatePrice(inputPrice: number) {
  return inputPrice * 1.2;
}
```

The important part is:

```ts
inputPrice: number
```

This tells TypeScript:

> **"The ****inputPrice**** parameter must be a number."**

So:

```ts
calculatePrice(100);       // ✅
```

But:

```ts
calculatePrice("100");     // ❌
```

TypeScript can detect the problem in your IDE.

If we convert the string to a number:

```ts
calculatePrice(Number("100")); // ✅
```

the error disappears.

---

# 5. What Does "Static Typing" Mean? ⭐⭐⭐

Let's simplify the terminology.

### Dynamic typing — JavaScript

The type can be determined/changed while the program runs:

```js
let value = 10;

value = "hello";
```

JavaScript allows this.

### Static typing — TypeScript

Types are checked **before the program runs**, during development/compilation.

```ts
let value: number = 10;

value = "hello"; // ❌
```

TypeScript warns us about the problem before we run the code.

### Mental model

```text
JavaScript
    ↓
Types are checked at runtime
    ↓
Dynamic typing


TypeScript
    ↓
Types are checked during development/compilation
    ↓
Static typing
```

---

# 6. Strict Typing

Max also mentions **strict typing**.

The basic idea is:

> **You cannot freely use every type of value everywhere.**

For example:

```ts
function multiply(price: number) {
  return price * 2;
}
```

The function expects:

```text
number
```

So passing:

```ts
multiply(10);       // ✅
multiply("hello");  // ❌
```

is not allowed.

TypeScript uses the declared type to help ensure that values are used correctly.

---

# 7. Why Is TypeScript Easy for JavaScript Developers? ⭐⭐⭐

Because TypeScript doesn't throw away your JavaScript knowledge.

You can write:

```ts
const user = {
  name: "Omar",
  age: 25
};
```

This looks exactly like JavaScript.

Then TypeScript allows you to enhance it with type information.

So your learning process is basically:

```text
JavaScript knowledge
        ↓
     + TypeScript
       features
        ↓
   TypeScript skills
```

This is why having a strong JavaScript foundation makes TypeScript much easier to learn.

---

# 🧠 The Most Important Mental Model

Don't think:

> ❌ "I need to learn an entirely new language."

Think:

> ✅ **"I already know JavaScript. TypeScript adds a type system and other features on top of it."**

This distinction is extremely important.

---

# ⚠️ One Important Clarification

TypeScript code isn't directly what the browser executes.

The browser understands **JavaScript**, not TypeScript.

So the general process is:

```text
TypeScript
    ↓
TypeScript Compiler
    ↓
JavaScript
    ↓
Browser
```

For example:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

The type annotations:

```ts
: number
```

are TypeScript-specific.

They don't exist in the JavaScript that ultimately runs in the browser.

---

# 🎯 Why Use TypeScript?

This lecture is **leading toward this question**, but Max hasn't fully explained the benefits yet.

The main benefit introduced so far is:

### Type safety ⭐⭐⭐

TypeScript can catch mistakes while you're writing code.

Instead of discovering a problem later when your application runs:

```text
Write code
   ↓
TypeScript checks it
   ↓
❌ "This value should be a number"
   ↓
Fix it
   ↓
Run the application
```

This becomes especially valuable as applications become larger and more complicated.

Max will explain the broader benefits in the following lectures.

---

# ⭐ What You Should Remember

If you remember only **5 things** from this lecture:

### 1. TypeScript is a JavaScript superset.

```text
TypeScript = JavaScript + additional features
```

### 2. Your JavaScript knowledge still applies.

You aren't starting from zero.

### 3. The major feature is static typing.

You can tell TypeScript what types your values should have.

```ts
let age: number = 25;
```

### 4. TypeScript catches type-related mistakes before runtime.

```ts
function add(a: number, b: number) {
  return a + b;
}

add("10", 20); // ❌
```

### 5. TypeScript eventually becomes JavaScript.

```text
TypeScript → Compiler → JavaScript → Browser
```

---

# 📊 Lecture Priority

**🟢 HIGH**

This is an important foundational lecture.

You don't need to memorize Max's exact wording, but you **must understand the mental model**:

> **TypeScript isn't a replacement for JavaScript. It's JavaScript enhanced with a type system and other features.**

---

# 🔑 One-Sentence Takeaway

> **TypeScript is a superset of JavaScript that adds static typing and other features, allowing developers to catch many mistakes earlier while still using their existing JavaScript knowledge.**
