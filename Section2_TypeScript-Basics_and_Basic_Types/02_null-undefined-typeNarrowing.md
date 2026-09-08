# TypeScript — Null, Undefined & Type Narrowing

---

## 🎬 Lecture Overview

This lecture explains why `null` and `undefined` matter in TypeScript and introduces an important TypeScript feature called **type narrowing**.

The key example is:

```ts
document.getElementById("username");
```

TypeScript knows that this might return:

```text
HTMLElement
     OR
null
```

because the element might not exist.

The important mental model is:

> **TypeScript doesn't just know the types of your variables—it also analyzes your code and can narrow a variable's type after you check it.**

---

# 1. `null` and `undefined` Are Types ⭐⭐⭐

In TypeScript, `null` and `undefined` are valid types.

For example:

```ts
let username: string = "Omar";

let nothing: null = null;

let notDefined: undefined = undefined;
```

The important thing isn't memorizing these declarations.

The important thing is understanding that sometimes a value **might not exist**.

For example:

```text
HTMLElement
     OR
null
```

This is extremely common when working with the DOM.

---

# 2. The Real-World Example: Finding an HTML Element ⭐⭐⭐

Suppose our HTML contains:

```html
<input id="username" />
```

We can access it from TypeScript:

```ts
const inputEl = document.getElementById("username");
```

You might expect:

```text
inputEl → HTMLElement
```

But TypeScript gives it a type similar to:

```text
HTMLElement | null
```

Why?

Because TypeScript knows something important:

> **There might not actually be an element with that ID.**

---

# 3. Why Can `getElementById()` Return `null`? ⭐⭐⭐

Consider this:

```ts
const inputEl = document.getElementById("username");
```

If the HTML contains:

```html
<input id="username" />
```

then JavaScript finds the element:

```text
inputEl → HTMLElement
```

But what if the HTML is:

```html
<input id="email" />
```

There is no:

```text
id="username"
```

So:

```ts
document.getElementById("username");
```

returns:

```ts
null;
```

It doesn't throw an error.

Therefore, TypeScript correctly represents the possibility as:

```ts
HTMLElement | null;
```

---

# 4. This Is a Union Type ⭐⭐⭐

We've already seen union types.

For example:

```ts
let value: string | number;
```

means:

```text
value can be:
    ↓
string
OR
number
```

The same idea applies here:

```ts
HTMLElement | null;
```

means:

```text
inputEl can be:
    ↓
HTMLElement
OR
null
```

So `null` is simply another possible type in the union.

---

# 5. Why Does TypeScript Complain? ⭐⭐⭐

Suppose we try:

```ts
const inputEl = document.getElementById("username");

console.log(inputEl.value);
```

TypeScript complains because:

```text
inputEl
   ↓
HTMLElement | null
```

It is not safe to assume that `inputEl` exists.

Imagine this happens:

```text
getElementById("username")
          ↓
       null
          ↓
inputEl.value
          ↓
       ❌
```

You cannot access `.value` on `null`.

So TypeScript is protecting us from a possible runtime error.

---

# 6. Check for `null` ⭐⭐⭐

One solution is to check whether the element exists:

```ts
const inputEl = document.getElementById("username");

if (!inputEl) {
  throw new Error("Element not found");
}

console.log(inputEl);
```

The check means:

```text
If inputEl is falsy
       ↓
     null
       ↓
   throw error
```

If the code continues beyond that point:

```ts
console.log(inputEl);
```

TypeScript knows:

> **If \*\***`inputEl`\***\* were \*\***`null`\***\*, the program would already have thrown the error.**

Therefore, `inputEl` can no longer be `null` at this point.

---

# 7. Type Narrowing ⭐⭐⭐⭐

This is one of the **most important concepts in this lecture**.

Before the check:

```ts
const inputEl = document.getElementById("username");
```

TypeScript sees:

```text
HTMLElement | null
```

After:

```ts
if (!inputEl) {
  throw new Error("Element not found");
}
```

TypeScript narrows the type to:

```text
HTMLElement
```

This is called:

> **Type narrowing**

### Visualize it:

```text
Before the check:

HTMLElement | null
       ↓
   ┌───┴───┐
   ↓       ↓
Element   null


After checking:

if (!inputEl) {
   throw ...
}

       ↓

HTMLElement
```

The `null` possibility has been eliminated.

---

# 8. Why Is TypeScript Able to Do This?

TypeScript analyzes your code.

It understands the logic:

```ts
if (!inputEl) {
  throw new Error("Element not found");
}
```

If `inputEl` were `null`, the code would enter the `if` block and throw the error.

Therefore, execution cannot continue beyond that point with `inputEl === null`.

So TypeScript concludes:

```text
At this point:
inputEl → HTMLElement
```

This is what Max means when he says TypeScript is **"smart about your entire code."**

---

# 9. Narrowing Doesn't Only Work With `null`

Type narrowing is a much broader TypeScript concept.

For example:

```ts
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }

  if (typeof value === "number") {
    console.log(value.toFixed(2));
  }
}
```

Before the checks:

```text
string | number
```

Inside the first block:

```text
string
```

Inside the second block:

```text
number
```

So:

```text
Union type
    ↓
Check
    ↓
Narrowed type
```

This idea will become extremely important throughout the TypeScript course.

---

# 10. `null` Is Common in Real Applications ⭐⭐⭐

This isn't just a theoretical TypeScript example.

You will encounter nullable values constantly.

For example:

### DOM

```ts
document.getElementById("username");
```

### APIs

An API might return:

```text
User
OR
null
```

### Searching data

```ts
const user = users.find((user) => user.id === id);
```

The result might be:

```text
User
OR
undefined
```

because the user might not exist.

So TypeScript forces you to consider those possibilities.

---

# 🧠 Important Mental Model

When TypeScript says:

```text
HTMLElement | null
```

don't think:

> ❌ "Why is TypeScript annoying me?"

Think:

> ✅ **"TypeScript is telling me that this value might not exist, so I need to handle that possibility."**

Then you can narrow it:

```ts
if (!inputEl) {
  throw new Error("Element not found");
}
```

After that:

```text
HTMLElement
```

---

# 🔥 The Core Pattern to Remember

You'll see this pattern **all the time**:

```ts
const result = somethingThatMightFail();

if (!result) {
  // Handle missing value
}

// result is now narrowed
```

Conceptually:

```text
Possible value
     +
Missing value
     ↓
Check
     ↓
Handle missing case
     ↓
Safe value
```

This is one of the fundamental patterns of TypeScript.

---

# ⚠️ One Important Distinction: `null` vs `undefined`

They're related but not identical.

### `null`

Usually means:

> **"There is intentionally no value."**

Example:

```ts
let selectedUser: User | null = null;
```

### `undefined`

Usually means:

> **"A value hasn't been provided / doesn't exist."**

For example:

```ts
const user = users.find(...);
```

If no user is found, the result is typically:

```text
undefined
```

So:

```text
null      → intentional absence of a value
undefined → value is missing / not provided
```

The exact meaning depends on the API and code you're working with, but this is a useful mental model.

---

# ⭐ What You Should Remember

If you remember only these **5 things**, you've understood the lecture:

### 1. `null` and `undefined` are types.

They represent situations where a value is missing or absent.

---

### 2. Some APIs can return a union containing `null`.

For example:

```ts
document.getElementById("username");
```

can return:

```ts
HTMLElement | null;
```

---

### 3. TypeScript forces you to handle the possibility of `null`.

Because this isn't safe:

```ts
inputEl.value; // ❌
```

if `inputEl` might be `null`.

---

### 4. Checking the value can narrow its type.

```ts
if (!inputEl) {
  throw new Error("Element not found");
}
```

After this:

```text
HTMLElement | null
        ↓
   Type narrowing
        ↓
HTMLElement
```

---

### 5. Type narrowing is a major TypeScript concept.

It isn't limited to `null`.

It also works with things like:

```ts
string | number;
```

and many other union types.

---

# 📊 Lecture Priority

**🟢 HIGH**

The specific `getElementById()` example isn't the important part.

The concepts you **must understand deeply** are:

```text
null / undefined
      ↓
Union types
      ↓
Checking possible values
      ↓
Type narrowing
```

Especially **type narrowing**—you'll encounter it repeatedly when working with TypeScript, APIs, React, and real-world application data.

---

# 🔑 One-Sentence Takeaway

> **When a value can be \*\***`null`\***\* or \*\***`undefined`\***\*, TypeScript makes us handle that possibility, and after a suitable check it can narrow the value to the safer, more specific type.**

---

## 🧩 Connection to Previous Lectures

Previously, we learned that TypeScript can describe multiple possible types:

```ts
let value: string | number;
```

Now we're seeing a real-world example:

```ts
const inputEl = document.getElementById("username");
// HTMLElement | null
```

So the progression is:

```text
Union Types
     ↓
A value can have multiple possible types
     ↓
TypeScript analyzes your checks
     ↓
Type Narrowing
     ↓
Safer, more precise code
```

This is a **core TypeScript skill** and worth understanding deeply.
