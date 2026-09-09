# Section 1 — Introduction to TypeScript

## ⭐ Overall Priority: LOW

This section is mainly an introduction. Don't spend too much time memorizing it.

---

## 1. What Is TypeScript? ⭐⭐⭐

> **TypeScript = JavaScript + additional features, especially static typing.**

TypeScript is a **superset of JavaScript**, meaning valid JavaScript code is generally also valid TypeScript.

```ts
let age: number = 25;
```

The `: number` is TypeScript-specific.

Because you already know JavaScript, learning TypeScript is mainly about learning **the TypeScript type system and its additional features**.

---

## 2. JavaScript vs TypeScript ⭐⭐⭐⭐

### JavaScript

JavaScript is **dynamically typed**:

```js
let age = 25;

age = "Omar"; // allowed
```

The type can change at runtime.

### TypeScript

TypeScript allows us to specify and check types:

```ts
let age: number = 25;

age = "Omar"; // ❌ TypeScript error
```

The important benefit is that TypeScript can catch many type-related mistakes **before the code runs**.

---

## 3. TypeScript Doesn't Run Directly in the Browser ⭐⭐⭐⭐

Browsers execute **JavaScript**, not TypeScript.

The basic process is:

```text
TypeScript
    ↓
TypeScript Compiler (tsc)
    ↓
JavaScript
    ↓
Browser
```

For example:

```ts
let age: number = 25;
```

becomes essentially:

```js
let age = 25;
```

The TypeScript type information is removed during compilation.

---

## 4. Why Use TypeScript? ⭐⭐⭐⭐

The biggest benefit introduced in this section is:

> **Catch certain errors earlier.**

For example:

```ts
function calculatePrice(price: number) {
  return price * 1.19;
}

calculatePrice("15"); // ❌
```

TypeScript warns us before the application runs.

This is especially useful in **larger applications and teams**, where understanding the expected structure and types of data becomes increasingly important.

### Important limitation

TypeScript does **not** prevent every bug.

It mainly protects us from problems that its type system can detect.

---

## 5. TypeScript Is Still JavaScript ⭐⭐⭐

Don't think of TypeScript as a completely different language.

Think:

```text
JavaScript
    +
TypeScript features
    ↓
TypeScript
```

Your existing knowledge of:

- variables
- functions
- objects
- arrays
- classes
- loops
- promises
- modules
- etc.

still applies.

TypeScript mainly adds a **static type system and additional developer features** around JavaScript.

---

## 6. Basic Compilation

The TypeScript compiler is called:

```bash
tsc
```

For example:

```bash
tsc calculator.ts
```

can compile:

```text
calculator.ts
```

into:

```text
calculator.js
```

The browser then loads the generated JavaScript file.

---

## 7. Course Roadmap

The course gradually moves through:

```text
Basic TypeScript
      ↓
Types & Type Inference
      ↓
Arrays / Objects / Functions
      ↓
Custom Types & Interfaces
      ↓
Classes
      ↓
Generics
      ↓
Advanced / Derived Types
      ↓
Decorators
      ↓
Practical Projects
```

You don't need to memorize this roadmap. It's mainly useful for understanding where the course is heading.

---

# 🧠 The Most Important Mental Model

Think of TypeScript as **JavaScript with a type-checking layer**:

```text
You write TypeScript
        ↓
TypeScript checks your code
        ↓
TypeScript compiles it
        ↓
JavaScript is produced
        ↓
Browser / Node.js runs JavaScript
```

---

# ⚠️ Important Distinction

TypeScript's type system mainly helps **during development/compilation**.

For example:

```ts
let age: number = 25;
```

The `number` annotation doesn't exist in the final JavaScript:

```js
let age = 25;
```

So:

> **TypeScript types help us write safer code, but they aren't normally present at runtime.**

---

# 🎯 What You Actually Need to Remember

### Must Understand Deeply ⭐⭐⭐⭐

- TypeScript is a **superset of JavaScript**.
- TypeScript adds **static typing**.
- TypeScript can catch many errors **before runtime**.
- Browsers execute **JavaScript**, not TypeScript.
- TypeScript is compiled/transpiled into JavaScript.

### Just Know ⭐⭐

- `tsc` = TypeScript compiler.
- `.ts` → `.js`
- TypeScript has many additional features beyond types.
- The course will progress from basic types to advanced features.

---

# 🔑 Final Cheat Sheet

```text
TypeScript
= JavaScript
+ Static Typing
+ Additional Features
+ Better Developer Tooling
```

```text
.ts
 ↓
tsc
 ↓
.js
 ↓
Browser
```

> **TypeScript is JavaScript with a static type system that helps catch many mistakes before the code runs.**
