# TypeScript — Enums

---

## 🎬 Lecture Overview

Sometimes a variable should only accept values from a **fixed set of choices**.

For example, a user can have one of these roles:

```text
Admin
Editor
Guest
```

We could represent these with numbers:

```ts
let userRole = 0;
```

But this has two problems:

1. `userRole` can accept **any number**.
2. `0` doesn't tell us what it actually means.

TypeScript provides **enums** to solve this problem.

> **An enum defines a named set of predefined values.**

---

# 1. The Problem With Plain Numbers ⭐⭐⭐

Imagine:

```ts
let userRole = 0;
```

We might decide:

```text
0 → Admin
1 → Editor
2 → Guest
```

But TypeScript sees:

```text
userRole → number
```

So this is also allowed:

```ts
userRole = 500;
```

Even though `500` isn't a valid user role.

There's also a readability problem:

```ts
userRole = 0;
```

What does `0` mean?

You need a comment or some external knowledge to understand it.

---

# 2. The Solution: Enum ⭐⭐⭐

We can define an enum:

```ts
enum Role {
  Admin,
  Editor,
  Guest
}
```

Think of it as:

```text
Role
├── Admin
├── Editor
└── Guest
```

Now `Role` represents a predefined set of choices.

---

# 3. Using an Enum as a Type ⭐⭐⭐

We can use the enum as a type:

```ts
let userRole: Role;
```

This tells TypeScript:

> `userRole` should contain a value from the `Role` enum.

We can then assign:

```ts
userRole = Role.Admin;
```

or:

```ts
userRole = Role.Guest;
```

But:

```ts
userRole = "Admin"; // ❌
```

is not valid.

---

# 4. Enum Members Have Values

By default, TypeScript gives numeric values to enum members.

```ts
enum Role {
  Admin,
  Editor,
  Guest
}
```

Internally:

```text
Admin  → 0
Editor → 1
Guest  → 2
```

So:

```ts
Role.Admin
```

produces:

```text
0
```

and:

```ts
Role.Guest
```

produces:

```text
2
```

### 🧠 Default numbering

The first member starts at `0`, then TypeScript counts upward:

```text
Admin  → 0
Editor → 1
Guest  → 2
```

---

# 5. Why Is `0` Allowed? ⭐⭐⭐

This explains something that can initially look confusing.

Suppose:

```ts
enum Role {
  Admin,
  Editor,
  Guest
}

let userRole: Role = 0;
```

You might expect:

```text
❌ 0 is a number, not Role
```

But TypeScript allows it in this case because:

```text
Role.Admin → 0
```

So `0` corresponds to one of the enum's values.

However:

```ts
let userRole: Role = 5;
```

will produce an error because `5` isn't one of the enum values in this example.

---

# 6. Changing the Starting Number

You can override the default numeric values.

For example:

```ts
enum Role {
  Admin = 1,
  Editor,
  Guest
}
```

Now TypeScript continues counting:

```text
Admin  → 1
Editor → 2
Guest  → 3
```

Therefore:

```ts
let userRole: Role = 0;
```

is no longer valid because no enum member has the value `0`.

---

# 7. Using the Enum Values ⭐⭐⭐

One of the biggest advantages is readability.

Instead of:

```ts
userRole = 0;
```

we can write:

```ts
userRole = Role.Admin;
```

This immediately tells another developer what the value means.

Similarly:

```ts
userRole = Role.Guest;
```

is much clearer than:

```ts
userRole = 2;
```

### Compare:

```ts
// ❌ What does 2 mean?
userRole = 2;
```

vs.

```ts
// ✅ Immediately understandable
userRole = Role.Guest;
```

This is one of the main practical benefits of enums.

---

# 8. Enums Are Both a Type AND a Value

This is an important concept.

When we write:

```ts
enum Role {
  Admin,
  Editor,
  Guest
}
```

`Role` can be used in two ways.

### As a type:

```ts
let userRole: Role;
```

Meaning:

> `userRole` must contain a valid `Role`.

### As a value:

```ts
userRole = Role.Admin;
```

Meaning:

> Give `userRole` the actual `Admin` value.

So:

```text
Role
 ├── Type → describes allowed values
 │
 └── Value → provides the actual enum members
```

---

# 9. String Enums ⭐⭐

Enums don't have to use numbers.

We can explicitly assign strings:

```ts
enum Role {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Guest = "GUEST"
}
```

Now:

```ts
Role.Admin
```

has the value:

```text
"ADMIN"
```

and:

```ts
Role.Guest
```

has the value:

```text
"GUEST"
```

### Why must every string value be specified?

With numbers, TypeScript can automatically continue:

```text
0 → 1 → 2 → 3
```

But strings don't have an obvious automatic sequence.

TypeScript can't know whether you want:

```text
"ADMIN"
"EDITOR"
"GUEST"
```

or:

```text
"admin"
"editor"
"guest"
```

or:

```text
"A"
"B"
"C"
```

Therefore, string enum values must be explicitly assigned.

---

# 10. What Happens After Compilation? ⭐⭐⭐

Enums are different from type annotations.

Remember:

```ts
function calculate(price: number) {
  // ...
}
```

The:

```ts
: number
```

gets removed when TypeScript compiles to JavaScript.

But an enum is different.

```ts
enum Role {
  Admin,
  Editor,
  Guest
}
```

needs to exist at runtime because:

```ts
Role.Admin
```

is actually used as a value.

Therefore, TypeScript generates JavaScript code to represent the enum.

Conceptually:

```text
TypeScript enum
      ↓
JavaScript object
      ↓
Admin → 0
Editor → 1
Guest → 2
```

So enums are a **runtime feature**, unlike purely compile-time type annotations.

---

# 🧠 The Most Important Mental Model

Think of an enum as a **named list of allowed choices**.

Instead of:

```ts
let role = 0;
```

we define:

```ts
enum Role {
  Admin,
  Editor,
  Guest
}
```

Then:

```ts
let role: Role = Role.Admin;
```

Now the code communicates two things:

```text
role
 ↓
must be a Role
 ↓
Role.Admin / Role.Editor / Role.Guest
```

And the code is much easier to understand.

---

# 🔥 Real-World Example

Enums can be useful for things such as:

```text
User roles
Order status
Payment status
Direction
Permission levels
Application modes
```

For example:

```ts
enum OrderStatus {
  Pending,
  Shipped,
  Delivered,
  Cancelled
}
```

Then:

```ts
let status: OrderStatus = OrderStatus.Pending;
```

Instead of scattering magic numbers or strings throughout the application.

---

# ⚠️ One Important Perspective

Don't think:

> **"Enums are the main way TypeScript restricts values."**

They're **one** way.

Later in the course you'll encounter other TypeScript features for expressing a fixed set of values, such as **union types**.

For example:

```ts
let role: "admin" | "editor" | "guest";
```

This also restricts the possible values.

So remember:

```text
Enums
   ↓
Named predefined values


Union types
   ↓
Another way to restrict possible values
```

You'll learn when each approach makes sense later.

---

# ⭐ What You Should Remember

If you remember only these **6 things**, you've understood the lecture:

### 1. Enum = predefined set of named choices

```ts
enum Role {
  Admin,
  Editor,
  Guest
}
```

---

### 2. An enum can be used as a type

```ts
let userRole: Role;
```

---

### 3. Enum members can be used as values

```ts
userRole = Role.Admin;
```

---

### 4. Numeric enums start at `0` by default

```text
Admin  → 0
Editor → 1
Guest  → 2
```

You can change the starting value:

```ts
enum Role {
  Admin = 1,
  Editor,
  Guest
}
```

---

### 5. Enums can use strings

```ts
enum Role {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Guest = "GUEST"
}
```

---

### 6. Enums exist at runtime

Unlike a type annotation, an enum generates JavaScript because its values are actually used by the application.

---

# 📊 Lecture Priority

**🟢 MEDIUM-HIGH**

You should understand enums well enough to:

* Define one
* Use it as a type
* Access its members
* Understand numeric vs string enums
* Understand why it produces JavaScript

But don't spend excessive time memorizing the generated JavaScript implementation.

The **concept** is much more important than the compiler-generated code.

---

# 🔑 One-Sentence Takeaway

> **An enum lets us define a named, predefined set of values and use that set as a type, making our code more restrictive, readable, and meaningful.**

---

## 🧩 Connection to What We Already Learned

Previously:

```ts
let age: number = 25;
```

We restricted a value to a **type**.

Now we're creating our own predefined set:

```ts
enum Role {
  Admin,
  Editor,
  Guest
}
```

and using it as a type:

```ts
let userRole: Role;
```

So we're moving from:

```text
Built-in types
      ↓
Custom / more specific types
      ↓
Advanced TypeScript type system
```

This is an important step toward understanding how TypeScript can precisely describe the data in our applications.
