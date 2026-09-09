# Section 2 — TypeScript Basics, Types & Type System

## 🎯 Section Overview

This section builds the foundation of TypeScript's type system.

The main progression is:

```text
Type Annotations
      ↓
Type Inference
      ↓
Basic Types
      ↓
Union Types
      ↓
Arrays / Tuples / Objects
      ↓
Literal Types
      ↓
Type Aliases
      ↓
Functions & Function Types
      ↓
Special Types
      ↓
Type Narrowing & Type Assertions
```

---

# 1. Type Annotations ⭐⭐⭐⭐

A **type annotation** explicitly tells TypeScript what type a value should have.

```ts
let userName: string;
let age: number;
let isAdmin: boolean;
```

The syntax is:

```ts
variableName: type;
```

For example:

```ts
let userName: string;

userName = "Omar"; // ✅
userName = 25; // ❌
```

TypeScript will prevent assigning an incorrect type.

### 🧠 Mental Model

> **Type annotation = I explicitly tell TypeScript the type.**

---

# 2. Type Inference ⭐⭐⭐⭐⭐

TypeScript can often figure out the type **automatically** from the initial value.

```ts
let userAge = 38;
```

TypeScript infers:

```text
userAge → number
```

Therefore:

```ts
userAge = 39; // ✅
userAge = "39"; // ❌
```

You didn't write:

```ts
let userAge: number = 38;
```

because TypeScript already knows it's a number.

### 🧠 Important Rule

> **If TypeScript can clearly infer the type, prefer inference instead of unnecessarily writing the annotation.**

This:

```ts
let userAge = 38;
```

is usually preferable to:

```ts
let userAge: number = 38;
```

because it is less verbose and still type-safe.

### When should you explicitly annotate?

Especially when there is **no initial value**:

```ts
let userName: string;

userName = "Omar";
```

Without the annotation, TypeScript has no value from which to infer the intended type.

### ⭐ Remember

```text
Initial value available
        ↓
TypeScript can infer
        ↓
Usually let inference do the work

No initial value
        ↓
Consider explicit annotation
```

---

# 3. Type Inference Also Works With Function Parameters ⭐⭐⭐

Function parameters normally need an explicit type:

```ts
function add(a: number, b: number) {
  return a + b;
}
```

However, a parameter with a default value can have its type inferred:

```ts
function add(a: number, b = 5) {
  return a + b;
}
```

TypeScript infers:

```text
a → number
b → number
```

because:

```ts
b = 5;
```

clearly indicates that `b` is a number.

Therefore:

```ts
add(10); // ✅
add(10, 6); // ✅
add("10"); // ❌
add(10, "6"); // ❌
```

This is simply combining **JavaScript default parameters** with **TypeScript type inference**.

---

# 4. `any` — The Escape Hatch ⚠️ ⭐⭐⭐

Sometimes you might want a variable to accept anything:

```ts
let age: any = 36;

age = "37";
age = false;
age = {};
age = [];
```

`any` essentially tells TypeScript:

> **Don't check this value's type.**

### Why is `any` dangerous?

Because it removes much of TypeScript's protection.

```ts
let value: any = "hello";

value.log();
value.foo.bar();
value();
```

TypeScript won't properly protect you here.

You're essentially getting back much of the freedom of vanilla JavaScript.

### 🧠 Mental Model

```text
TypeScript
    ↓
"Please check my types"

any
    ↓
"Don't check this value"
```

### 🚨 Rule

> **Use \*\***`any`\***\* only when you genuinely have no better option.**

If you can describe the possible values more specifically, use another type such as:

- union types
- `unknown`
- custom types

---

# 5. Union Types ⭐⭐⭐⭐⭐

A **union type** allows a value to have **one of several types**.

```ts
let age: string | number;
```

This means:

```text
age can be:

string
   OR
number
```

Therefore:

```ts
age = 36; // ✅
age = "37"; // ✅
age = false; // ❌
```

The `|` means **OR**.

### 🧠 Mental Model

```text
string | number
     ↓
string OR number
```

Union types are extremely important because they appear throughout real TypeScript applications.

---

# 6. Arrays & Types ⭐⭐⭐⭐

TypeScript infers array element types from their initial values.

```ts
let hobbies = ["Sports", "Cooking"];
```

TypeScript infers:

```text
hobbies → string[]
```

Therefore:

```ts
hobbies.push("Reading"); // ✅
hobbies.push(100); // ❌
```

The array is expected to contain strings.

---

# 7. Arrays With Multiple Types ⭐⭐⭐⭐

You can use a union inside an array type:

```ts
let users: (string | number)[] = ["Omar", 39, "Ahmed", 25];
```

This means:

> Every element can be either a string or a number.

```ts
users.push("Ali"); // ✅
users.push(30); // ✅
users.push(true); // ❌
```

### Important Parentheses

```ts
(string | number)[]
```

means:

> An array where each element is `string OR number`.

Whereas:

```ts
string | number[]
```

means:

> A `string` OR an array of numbers.

The parentheses matter.

---

# 8. Generic Array Syntax ⭐⭐

There is another way to describe arrays:

```ts
let students: Array<string | number>;
```

This is a **generic type**.

For now, think of:

```ts
Array<string | number>;
```

as essentially another way of writing:

```ts
(string | number)[]
```

Both describe:

> An array containing strings or numbers.

Generics become much more important later in the course.

### For now

You don't need to deeply understand generics yet.

Just recognize this syntax:

```ts
Array<string>;
Array<number>;
Array<string | number>;
```

---

# 9. Tuples ⭐⭐⭐⭐

A **tuple** is an array with:

- a fixed length
- a specific type for each position

Example:

```ts
let possibleResults: [number, number];

possibleResults = [1, -1]; // ✅
```

This means:

```text
Position 0 → number
Position 1 → number
Exactly 2 elements
```

So:

```ts
possibleResults = [1, -1, 0]; // ❌
```

because the tuple expects exactly two elements.

### Array vs Tuple

Normal array:

```ts
let values: number[];
```

means:

```text
Any number of numbers
```

Tuple:

```ts
let values: [number, number];
```

means:

```text
Exactly two numbers
```

### 🧠 Mental Model

> **Array = flexible length**
>
> **Tuple = fixed structure**

---

# 10. Object Types ⭐⭐⭐⭐

You can describe the expected structure of an object directly:

```ts
let user: {
  name: string;
  age: number;
  hobbies: string[];
  role: {
    description: string;
    id: number;
  };
} = {
  name: "Omar",
  age: 38,
  hobbies: ["Sports", "Cooking"],
  role: {
    description: "Admin",
    id: 1,
  },
};
```

TypeScript now knows the object's structure:

```text
User
├── name → string
├── age → number
├── hobbies → string[]
└── role
    ├── description → string
    └── id → number
```

This is called an **object type**.

---

# 11. `{}` Does NOT Mean "Object" ⚠️ ⭐⭐⭐⭐

This is a common TypeScript trap.

Consider:

```ts
let val: {} = "some text";
```

This is allowed.

Why?

Because `{}` in TypeScript does **not** mean:

> "Any object."

It essentially means:

> **Any value except \*\***`null`\***\* and \*\***`undefined`\***\*.**

So these can also satisfy `{}`:

```ts
"hello"
42
true
[]
{}
function () {}
```

But:

```ts
let val: {} = null; // ❌
let val: {} = undefined; // ❌
```

### 🚨 Important

Don't confuse:

```ts
{
}
```

with:

```ts
object;
```

or with a specific object structure.

### 🧠 Remember

```text
{}
↓
not null / undefined
```

This is a confusing feature, but you mainly need to **recognize what it means when you encounter it**.

---

# 12. `Record` — Flexible Object Types ⭐⭐⭐⭐

Sometimes you know you want an **object**, but you don't know its property names yet.

For example:

```ts
let data: Record<string, number | string>;
```

This means:

> `data` must be an object whose keys are strings and whose values are either numbers or strings.

For example:

```ts
data = {
  name: "Omar",
  age: 38,
  role: "Admin",
};
```

The exact keys don't have to be known in advance.

### Structure

```text
Record<string, number | string>

       ↓

     object
       ↓
 ┌───────────────┐
 │ string keys   │
 │       ↓       │
 │ number/string │
 │    values     │
 └───────────────┘
```

`Record` is a built-in **generic type**.

### Compare

```ts
let data: {};
```

does **not** mean "any object."

Whereas:

```ts
let data: Record<string, number | string>;
```

actually describes a flexible object structure.

---

# 13. Enums ⭐⭐⭐⭐

Sometimes a value should only come from a **fixed set of choices**.

For example:

```text
Admin
Editor
Guest
```

Instead of using vague numbers:

```ts
let userRole = 0;
```

we can create an enum:

```ts
enum Role {
  Admin,
  Editor,
  Guest,
}
```

Then:

```ts
let userRole: Role = Role.Admin;
```

### Default numeric values

```text
Admin  → 0
Editor → 1
Guest  → 2
```

You can also change the starting value:

```ts
enum Role {
  Admin = 1,
  Editor,
  Guest,
}
```

Now:

```text
Admin  → 1
Editor → 2
Guest  → 3
```

---

# 14. String Enums ⭐⭐⭐

Enums can also contain strings:

```ts
enum Role {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Guest = "GUEST",
}
```

Unlike numeric enums, string values must be explicitly assigned.

---

# 15. Enums Exist at Runtime ⭐⭐⭐⭐

This is an important distinction.

Type annotations such as:

```ts
let age: number;
```

disappear during compilation.

But enums are different:

```ts
enum Role {
  Admin,
  Editor,
  Guest,
}
```

because:

```ts
Role.Admin;
```

is an actual value used by the program.

Therefore, the enum produces JavaScript during compilation.

### 🧠 Remember

```text
Type annotation
    ↓
Compile-time only
    ↓
Removed

Enum
    ↓
Used as a value
    ↓
Exists at runtime
```

---

# 16. Literal Types ⭐⭐⭐⭐⭐

TypeScript doesn't only allow general types like:

```ts
string;
number;
boolean;
```

It can also use **specific values as types**.

For example:

```ts
let userRole: "admin";
```

Here:

```ts
"admin";
```

is a **type**, not a value.

It means the only allowed value is:

```ts
"admin";
```

So:

```ts
userRole = "admin"; // ✅
userRole = "guest"; // ❌
```

### 🧠 Important Distinction

On the right side:

```ts
let role = "admin";
```

`"admin"` is a **value**.

On the type side:

```ts
let role: "admin";
```

`"admin"` is a **literal type**.

---

# 17. Literal Types + Unions ⭐⭐⭐⭐⭐

Literal types become much more useful when combined with unions:

```ts
let userRole: "admin" | "editor" | "guest" = "admin";
```

Now the allowed values are exactly:

```text
"admin"
"editor"
"guest"
```

Nothing else.

This is another way to model a fixed set of choices.

---

# 18. Enum vs Literal Union

Both can solve similar problems.

### Enum

```ts
enum Role {
  Admin = "admin",
  Editor = "editor",
  Guest = "guest",
}

let role: Role = Role.Admin;
```

### Literal Union

```ts
let role: "admin" | "editor" | "guest";
```

The course notes that literal unions are **arguably more popular in the TypeScript community** for many such cases.

For now, understand both rather than worrying about which one is universally "better."

---

# 19. Refining Tuples With Literal Types ⭐⭐⭐

We can combine the ideas we've learned.

Previously:

```ts
let possibleResults: [number, number];
```

allows:

```ts
[10, 50][(100, -20)][(3, 7)];
```

But suppose only `1` or `-1` is valid at each position.

We can be more precise:

```ts
let possibleResults: [1 | -1, 1 | -1];

possibleResults = [1, -1]; // ✅
```

Now:

```ts
[10, -1]; // ❌
```

because `10` isn't one of the allowed literal values.

### 🧠 Progression

```text
[number, number]
       ↓
Any two numbers

[1 | -1, 1 | -1]
       ↓
Exactly two values,
each must be 1 or -1
```

---

# 20. Type Aliases / Custom Types ⭐⭐⭐⭐⭐

When a type becomes long or needs to be reused, we can give it a name.

```ts
type Role = "admin" | "editor" | "guest" | "reader";
```

Now instead of repeating:

```ts
"admin" | "editor" | "guest" | "reader";
```

we can write:

```ts
function access(role: Role) {
  // ...
}
```

### 🧠 Mental Model

> **Type alias = give a reusable name to a type definition.**

---

# 21. Type Aliases for Object Types ⭐⭐⭐⭐⭐

Type aliases are also very useful for objects.

```ts
type User = {
  name: string;
  age: number;
  role: Role;
  permissions: string[];
};
```

Now:

```ts
let user: User = {
  name: "Omar",
  age: 38,
  role: "admin",
  permissions: ["read", "write"],
};
```

Instead of repeatedly writing the entire object structure, we simply use:

```ts
User;
```

### 🧠 Why?

Without an alias:

```ts
function getUser(user: {
  name: string;
  age: number;
  role: Role;
  permissions: string[];
}) {}
```

With an alias:

```ts
function getUser(user: User) {}
```

Much cleaner and reusable.

---

# 22. Function Return Types ⭐⭐⭐⭐

You can explicitly specify what a function returns:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

The syntax is:

```ts
function functionName(parameters): returnType {}
```

However, TypeScript can usually infer the return type:

```ts
function add(a: number, b: number) {
  return a + b;
}
```

TypeScript sees:

```text
number + number
      ↓
number
```

and therefore infers:

```text
return type → number
```

### 🧠 Rule

Like variables:

> **Use inference when the return type is obvious; explicit return types can be useful when you want to clearly define or enforce the function's contract.**

---

# 23. `void` ⭐⭐⭐

`void` is commonly used as a function return type when the function doesn't return a value.

```ts
function log(message: string): void {
  console.log(message);
}
```

The function performs an action but doesn't return a useful value.

```text
log()
 ↓
prints something
 ↓
doesn't return a value
```

TypeScript can usually infer `void`, so this is also fine:

```ts
function log(message: string) {
  console.log(message);
}
```

### Important

`void` is mainly encountered with **function return types**.

---

# 24. `never` ⭐⭐⭐

`never` is different from `void`.

Consider:

```ts
function logAndThrow(errorMessage: string): never {
  console.log(errorMessage);
  throw new Error(errorMessage);
}
```

This function **never successfully completes**.

It doesn't return a value because execution stops by throwing an error.

### `void` vs `never`

```text
void
 ↓
Function finishes
 ↓
returns no useful value


never
 ↓
Function never successfully finishes
 ↓
throws / infinite execution
```

For example:

```ts
function log(message: string): void {
  console.log(message);
}
```

eventually finishes.

But:

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

never reaches the end normally.

### Why care?

You don't need to use `never` constantly.

The important thing is to **recognize it when you see it**, especially in existing TypeScript projects.

---

# 25. Functions as Types ⭐⭐⭐⭐⭐

Functions themselves have types.

For example:

```ts
function performJob(cb: (m: string) => void) {
  cb("Job Done!");
}
```

The parameter:

```ts
cb: (m: string) => void
```

means:

> `cb` must be a function that accepts a string and returns nothing.

Conceptually:

```text
(m: string) => void

     ↓

function
   ↓
takes a string
   ↓
returns void
```

So this works:

```ts
function log(message: string): void {
  console.log(message);
}

performJob(log);
```

---

# 26. Why Not Just Use `Function`? ⭐⭐⭐

You could technically write:

```ts
function performJob(cb: Function) {
  cb();
}
```

But this is much less specific.

Using:

```ts
cb: (m: string) => void
```

tells TypeScript exactly what function is expected.

### 🧠 Rule

> **Prefer describing the function signature instead of using the generic \*\***`Function`\***\* type.**

---

# 27. Function Types in Objects ⭐⭐⭐⭐

Methods can also be described inside object types.

```ts
type User = {
  name: string;
  age: number;
  greet: () => string;
};
```

This means:

```text
User
├── name → string
├── age → number
└── greet → function returning string
```

Then:

```ts
let user: User = {
  name: "Max",
  age: 39,

  greet() {
    console.log("Hello There!");
    return this.name;
  },
};
```

The `greet` method satisfies:

```ts
() => string;
```

---

# 28. `null` and `undefined` ⭐⭐⭐⭐

Both `null` and `undefined` can be used as types.

```ts
let a: null;
a = null;
```

And:

```ts
let c: undefined;
c = undefined;
```

They're especially useful when combined with unions:

```ts
let value: string | null;

value = "Omar";
value = null;
```

or:

```ts
let value: string | undefined;

value = "Omar";
value = undefined;
```

The important idea is:

> **The value may contain a normal value OR represent the absence of a value.**

---

# 29. `null` vs `undefined`

A useful mental model:

```text
null
 ↓
intentional absence of a value


undefined
 ↓
value is missing / wasn't provided
```

The exact meaning depends on the API or code you're working with.

For example:

```ts
users.find(...)
```

can return:

```text
User | undefined
```

because the user might not exist.

---

# 30. Type Narrowing ⭐⭐⭐⭐⭐

This is one of the **most important concepts in this section**.

Suppose:

```ts
const inputEl = document.getElementById("username");
```

TypeScript knows it could be:

```text
HTMLElement | null
```

because the element might not exist.

If you do:

```ts
console.log(inputEl.value);
```

TypeScript complains because `inputEl` might be `null`.

---

## Narrowing With a Check

```ts
if (!inputEl) {
  throw new Error("Element not found");
}

console.log(inputEl);
```

Before the check:

```text
HTMLElement | null
```

After the check:

```text
HTMLElement
```

TypeScript understands the program logic.

If `inputEl` were `null`, the code would already have thrown an error.

Therefore, beyond the `if` block, TypeScript can safely narrow the type.

### 🧠 Core Mental Model

```text
Possible types
      ↓
Check
      ↓
TypeScript analyzes the check
      ↓
Narrowed type
```

---

# 31. Type Narrowing With Unions ⭐⭐⭐⭐⭐

Narrowing isn't only about `null`.

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

Inside the first condition:

```text
string
```

Inside the second:

```text
number
```

So:

```text
Union
  ↓
Check
  ↓
Narrowed type
```

This concept becomes extremely important throughout TypeScript.

---

# 32. Non-Null Assertion Operator `!` ⚠️ ⭐⭐⭐

Sometimes you know a value isn't `null`, even though TypeScript can't know that.

You can use:

```ts
const inputEl = document.getElementById("user-name")!;
```

The `!` tells TypeScript:

> **Trust me, this value is not null.**

This removes the `null` possibility from the type.

### ⚠️ Danger

TypeScript trusts you.

If you're wrong:

```text
TypeScript
    ↓
"Okay, I'll trust you."
    ↓
Runtime
    ↓
💥 Possible error
```

So use `!` carefully.

---

# 33. Optional Chaining `?.` ⭐⭐⭐

Another way to deal with a potentially missing value is optional chaining:

```ts
console.log(inputEl?.value);
```

It means:

> If `inputEl` exists, access `.value`; otherwise, stop and produce `undefined`.

Conceptually:

```text
inputEl exists?
    ↓
 YES → access .value
 NO  → return undefined
```

This is useful when you **don't want to throw an error** and don't need special fallback logic.

---

# 34. Type Assertions (`as`) ⭐⭐⭐⭐

Sometimes TypeScript knows only a general type, but **you know more about the actual value**.

For example:

```ts
const inputEl = document.getElementById("user-name") as HTMLInputElement;
```

Now TypeScript treats `inputEl` as:

```text
HTMLInputElement
```

instead of:

```text
HTMLElement | null
```

This lets us safely access:

```ts
console.log(inputEl.value);
```

because `value` exists on `HTMLInputElement`.

### 🧠 Mental Model

```text
TypeScript says:
HTMLElement | null

You say:
"I know this is actually an HTMLInputElement."

        ↓

as HTMLInputElement
```

---

# 35. Type Assertions Don't Convert Values ⚠️

This is an important distinction.

```ts
value as HTMLInputElement;
```

does **not** convert the actual value.

It only tells TypeScript:

> Treat this value as this type.

So type assertion is about **TypeScript's understanding**, not runtime conversion.

### ⚠️ Responsibility

When you override TypeScript's inferred type:

```ts
as HTMLInputElement
```

you become responsible for ensuring your assumption is correct.

If the actual DOM element isn't an input, TypeScript won't protect you from the mistake.

---

# 36. `unknown` — Safer Than `any` ⭐⭐⭐⭐

`unknown` is useful when you genuinely don't know what type of value you'll receive.

Compare:

```ts
function process(val: any) {
  val.log();
}
```

With `any`, TypeScript allows almost anything.

But:

```ts
function process(val: unknown) {
  val.log(); // ❌
}
```

TypeScript refuses because it doesn't know whether `val` has a `log` method.

This is exactly what makes `unknown` safer.

---

# 37. `unknown` Forces You to Check ⭐⭐⭐⭐⭐

Before using an `unknown` value, you need to **narrow it**.

For example:

```ts
function process(val: unknown) {
  if (
    typeof val === "object" &&
    !!val &&
    "log" in val &&
    typeof val.log === "function"
  ) {
    val.log();
  }
}
```

The checks gradually establish that:

```text
unknown
   ↓
object
   ↓
not null
   ↓
has "log"
   ↓
log is a function
   ↓
safe to call log()
```

This is another example of **type narrowing**.

---

# 38. `any` vs `unknown` ⭐⭐⭐⭐⭐

This distinction is very important.

|                                         | `any` | `unknown` |
| --------------------------------------- | ----- | --------- |
| Can contain any value?                  | ✅    | ✅        |
| TypeScript allows arbitrary operations? | ✅    | ❌        |
| Requires checks before using?           | ❌    | ✅        |
| Safer?                                  | ❌    | ✅        |

### 🧠 Mental Model

```text
any
 ↓
"Do whatever you want."

unknown
 ↓
"You can hold anything,
 but prove what it is first."
```

Therefore:

> **Prefer \*\***`unknown`\***\* over \*\***`any`\***\* when the value's type genuinely isn't known.**

---

# 🔥 The Most Important Concepts in This Section

If you're revising for practical TypeScript development, prioritize these:

## ⭐⭐⭐⭐⭐ Must Understand Deeply

### 1. Type Inference

```ts
let age = 38;
```

TypeScript figures out:

```text
age → number
```

---

### 2. Union Types

```ts
string | number;
```

means:

```text
string OR number
```

---

### 3. Literal Types

```ts
"admin" | "editor" | "guest";
```

restricts a value to those exact values.

---

### 4. Type Aliases

```ts
type User = {
  name: string;
  age: number;
};
```

Give reusable names to complex types.

---

### 5. Type Narrowing

```ts
if (typeof value === "string") {
  // value is string here
}
```

TypeScript analyzes your checks and makes types more specific.

---

### 6. `unknown` vs `any`

```text
any     → disables type safety
unknown → forces you to prove the type
```

---

### 7. Type Assertions

```ts
value as SomeType;
```

Tell TypeScript that you know more about the value than it currently does.

Use carefully because **you take responsibility for the assumption**.

---

# 🟡 Important, But Don't Overthink

These should be familiar and usable:

- Array types: `string[]`
- Union arrays: `(string | number)[]`
- Generic array syntax: `Array<string>`
- Tuples: `[string, number]`
- Object types
- `Record`
- Enums
- Literal types
- Function return types
- Function types
- `void`
- `never`
- `null`
- `undefined`
- Optional chaining `?.`
- Non-null assertion `!`

---

# ⚠️ Common Traps

### `{} ≠ object`

```ts
let value: {} = "hello"; // ✅
```

`{}` basically means **anything except \*\***`null`\***\* and \*\***`undefined`\*\*.

---

### `any` removes TypeScript's protection

```ts
let value: any = "hello";

value.foo.bar(); // TypeScript won't protect you
```

---

### `unknown` is not the same as `any`

```ts
let value: unknown;

value.foo; // ❌
```

You must narrow it first.

---

### Type assertion doesn't convert the value

```ts
value as HTMLInputElement;
```

doesn't transform the value.

It only changes how **TypeScript treats it**.

---

### `void` ≠ `never`

```text
void
→ function finishes without returning a value

never
→ function never successfully finishes
```

---

# 🧠 The Big Picture

All these features are building toward one goal:

> **Describe your data precisely enough that TypeScript can protect you from incorrect usage.**

The progression looks like:

```text
Basic Types
     ↓
Type Inference
     ↓
Union Types
     ↓
Specific Types
     ↓
Literal Types
     ↓
Custom Types
     ↓
Type Narrowing
     ↓
Safer Code
```

And when TypeScript **doesn't know the type**:

```text
unknown
  ↓
check
  ↓
narrow
  ↓
use safely
```

---

# 🔑 Final Cheat Sheet

```ts
// Type annotation
let name: string;

// Type inference
let age = 38;

// Union
let id: string | number;

// Array
let names: string[];

// Union array
let values: (string | number)[];

// Generic array
let values: Array<string | number>;

// Tuple
let result: [number, number];

// Object type
let user: {
  name: string;
  age: number;
};

// Flexible object
let data: Record<string, string | number>;

// Literal type
let role: "admin" | "guest";

// Type alias
type Role = "admin" | "guest";

// Function return type
function add(a: number, b: number): number {
  return a + b;
}

// Function type
const callback: (value: string) => void = console.log;

// No useful return
function log(): void {}

// Never successfully completes
function fail(): never {
  throw new Error();
}

// Nullable value
let user: User | null;

// Type narrowing
if (typeof value === "string") {
  // value is string
}

// Non-null assertion
value!;

// Optional chaining
value?.property;

// Type assertion
value as SomeType;

// Unknown
let value: unknown;

// Any — avoid when possible
let value: any;
```

---

# 🎯 Section 2 — One-Minute Revision

If you only have one minute before an interview or coding session:

```text
Type annotation
→ I tell TS the type.

Type inference
→ TS figures out the type.

Union
→ value can be A OR B.

Literal type
→ value must be this exact value.

Tuple
→ fixed-length array with fixed types per position.

Type alias
→ reusable name for a type.

Record
→ flexible object with defined key/value types.

void
→ function finishes without returning a value.

never
→ function never successfully finishes.

unknown
→ anything is allowed, but you must check before using it.

any
→ anything is allowed and TS stops protecting you.

Type narrowing
→ checks make a broad type more specific.

Type assertion
→ "I know this value's type better than TS does."
```

> **The core skill from this section is learning to describe values precisely and then use TypeScript's narrowing system to safely work with values whose type can vary.**
