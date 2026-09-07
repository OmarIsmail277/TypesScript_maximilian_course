# TypeScript — Section 1

## Lecture 3: Why Use TypeScript? — Catching Errors Early

---

## 🎬 Lecture Overview

Max demonstrates a simple calculator website that calculates a final price by adding **19% tax**.

The JavaScript version contains a bug because the value extracted from an HTML `<input>` is a **string**, even when the user enters something that looks like a number.

TypeScript can help detect this problem **before the application runs** by allowing us to define the types our functions expect.

### Core idea:

> **TypeScript helps us catch certain errors during development instead of discovering them later when the application is running.**

---

# 1. The Problem: HTML Input Values Are Strings ⭐⭐⭐

Suppose we have:

```html
<input type="text" id="price">
```

And the user enters:

```text
15
```

It looks like a number to us.

But JavaScript gives us:

```js
const inputPrice = input.value;
```

as a:

```text
string
```

So:

```js
console.log(typeof inputPrice);
```

outputs:

```text
"string"
```

Even if the user entered:

```text
15
```

the value is actually:

```text
"15"
```

not:

```text
15
```

---

# 2. Why Does This Cause a Bug? ⭐⭐⭐

JavaScript has a particular behavior when using `+`.

If you do:

```js
15 + 19
```

you get:

```text
34
```

But if you do:

```js
"15" + 19
```

JavaScript treats the `19` as something that should be converted to a string and **concatenates** them:

```text
"1519"
```

So instead of performing the calculation we intended, JavaScript creates a longer string.

### 🧠 Remember:

```js
15 + 19
// 34

"15" + 19
// "1519"
```

This is a classic example of **JavaScript type coercion**.

---

# 3. The Solution in JavaScript

We need to convert the input from a string into a number.

For example:

```js
const inputPrice = Number(input.value);
```

Now:

```text
"15" → 15
```

and the calculation works correctly.

Other ways of converting include:

```js
Number(value)
```

or:

```js
parseInt(value)
```

or:

```js
parseFloat(value)
```

But the important point for this lecture is simply:

> **The value coming from an input is a string, so we need a number for mathematical calculations.**

---

# 4. How TypeScript Helps ⭐⭐⭐

Now we can tell TypeScript exactly what a function expects.

For example:

```ts
function deriveFinalPrice(inputPrice: number) {
  return inputPrice * 1.19;
}
```

The important part is:

```ts
inputPrice: number
```

This is called a **type annotation**.

It tells TypeScript:

> **"The `inputPrice` parameter must be a number."**

---

# 5. TypeScript Detects the Problem ⭐⭐⭐

Suppose we have:

```ts
const inputPrice = input.value;
```

TypeScript knows:

```text
inputPrice → string
```

Then we try:

```ts
deriveFinalPrice(inputPrice);
```

But our function expects:

```text
number
```

So TypeScript tells us:

```text
Argument of type 'string'
is not assignable to parameter of type 'number'.
```

In other words:

```text
You gave me:
string

But I expected:
number
```

### 🧠 This is the key benefit.

TypeScript catches the mismatch **while you're writing the code**.

You don't have to:

1. Start the application
2. Open the website
3. Enter a price
4. Click the button
5. See the wrong result
6. Debug the problem

Instead:

```text
Write code
     ↓
TypeScript detects mismatch
     ↓
❌ Error
     ↓
Fix it
     ↓
Run application
```

---

# 6. Type Annotation ⭐⭐⭐

A **type annotation** explicitly tells TypeScript what type a value should have.

Example:

```ts
let age: number = 25;
```

Here:

```text
age     → variable
number  → type annotation
```

For a function parameter:

```ts
function calculate(price: number) {
  // ...
}
```

Here:

```text
price   → parameter
number  → type annotation
```

You will see type annotations everywhere throughout the course.

---

# 7. The Real Benefit: Catch Errors Earlier ⭐⭐⭐

This is the main lesson Max wants you to understand.

Without TypeScript:

```text
Incorrect value
      ↓
Application runs
      ↓
Potential bug
      ↓
You discover it later
```

With TypeScript:

```text
Incorrect value
      ↓
TypeScript detects it
      ↓
❌ Error
      ↓
Fix it
      ↓
Application runs correctly
```

### Therefore:

> **TypeScript moves certain errors earlier in the development process.**

And that's extremely useful.

---

# 8. Why This Becomes More Valuable in Large Projects ⭐⭐⭐

In a tiny calculator application, you can probably find a bug yourself.

But imagine a large application with:

* Hundreds of files
* Thousands of variables
* Many developers
* APIs
* Complex data structures
* Multiple components
* Functions calling other functions

A value might travel through many parts of your application:

```text
API
 ↓
Function A
 ↓
Function B
 ↓
Function C
 ↓
Component
 ↓
UI
```

If something has the wrong type, it can become difficult to discover where the problem originated.

TypeScript can help detect many of these mismatches much earlier.

This is one reason TypeScript becomes increasingly valuable as applications grow.

---

# 🧠 Important Mental Model

Don't think:

> ❌ "TypeScript prevents every bug."

It doesn't.

Think:

> ✅ **"TypeScript can detect certain classes of errors before runtime, especially errors involving types."**

There are plenty of bugs TypeScript cannot detect.

For example, this is valid TypeScript:

```ts
const age: number = 25;

if (age > 100) {
  // ...
}
```

TypeScript knows `age` is a number, but it doesn't know whether your business logic makes sense.

So:

```text
TypeScript
    ↓
Catches many type-related problems
    ≠
Catches every possible bug
```

---

# 🔥 Very Important Distinction

### JavaScript

JavaScript allows:

```js
const inputPrice = input.value;

deriveFinalPrice(inputPrice);
```

The problem may only become obvious **when the code runs**.

### TypeScript

TypeScript can recognize:

```text
inputPrice → string

deriveFinalPrice() → expects number
```

and report the mismatch during development.

---

# 🎯 What You Should Remember

If you remember only these **5 things**, you've understood the lecture:

### 1. HTML input values are strings.

Even if the user enters:

```text
15
```

JavaScript receives:

```js
"15"
```

not:

```js
15
```

---

### 2. `"15" + 15 * 0.19` is not `17.85`.

JavaScript concatenates them:

```js
"15" + 15 * 0.19
// "152.85"
```

This happens because one operand is a string.

---

### 3. We can convert the string to a number.

```js
const price = Number(input.value);
```

---

### 4. Type annotations tell TypeScript what type we expect.

```ts
function deriveFinalPrice(inputPrice: number) {
  // ...
}
```

---

### 5. TypeScript can catch type mismatches before runtime.

```text
string → ❌ → number
```

Instead of discovering the problem by testing the application, TypeScript can point it out during development.

---

# 📊 Lecture Priority

**🟢 HIGH**

This lecture contains one of the most important reasons developers use TypeScript:

> **Catch type-related errors earlier and improve the development workflow.**

The calculator example itself isn't important.

The **concept behind the example is extremely important**.

---

# 🔑 One-Sentence Takeaway

> **TypeScript lets us describe the types our code expects, allowing it to detect many type-related mistakes during development—before we have to run and test the application.**

---

## 🧩 Connection to What We Learned Before

Previous lecture:

> **TypeScript = JavaScript + TypeScript features**

This lecture gives us our first concrete example of that:

```text
JavaScript
    │
    ├── Variables
    ├── Functions
    ├── DOM
    └── Input values
          │
          ▼
     + TypeScript
       type annotations
          │
          ▼
     Early error detection
```

So we're starting to see **why** adding types to JavaScript is useful.
