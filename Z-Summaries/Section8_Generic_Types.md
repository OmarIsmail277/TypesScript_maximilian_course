# Section 8 — Generic Types

## 🎯 Core Idea

> **Generics allow us to create reusable, type-safe types, functions, classes, and interfaces where the concrete type is determined when they are used rather than when they are defined.**

Think of a generic as a **type placeholder**.

```ts
<T>
```

`T` means:

> "I don't know the exact type yet. Tell me when you use this."

---

## 1. Generic Types

We already know:

```ts
let names1: string[] = ["Omar", "Ahmed"];
```

An array can also be written using the generic `Array<T>` type:

```ts
let names2: Array<string> = ["Omar", "Ahmed"];
```

These are equivalent:

```ts
string[]
Array<string>
```

Other examples:

```ts
Array<number>
Array<boolean>
Array<string>
```

### 🧠 What does `Array<T>` mean?

```text
Array + Type
```

Examples:

```text
Array<string>  → array of strings
Array<number>  → array of numbers
Array<boolean> → array of booleans
```

So generics allow different types to **work together**.

---

# 2. Creating Our Own Generic Type

Previously:

```ts
type DataStore = {
  [prop: string]: number | string;
};

let store: DataStore = {};

store.name = "Omar";
```

The problem is that this type is fixed to:

```ts
number | string
```

We can make it generic:

```ts
type DataStore2<T> = {
  [prop: string]: T;
};
```

Now `T` is a type placeholder.

We decide the concrete type when using the type:

```ts
let store2: DataStore2<string | boolean> = {};

store2.name = "Omar";
store2.isHere = false;
```

Here:

```text
T = string | boolean
```

Another usage:

```ts
let nameStore: DataStore2<string> = {};
```

Here:

```text
T = string
```

So:

```ts
nameStore.name = "Omar";
```

is valid, but:

```ts
nameStore.age = 25;
```

would be an error.

### ⭐ Why generics?

Without generics, we might need:

```text
StringStore
NumberStore
BooleanStore
```

With generics:

```ts
DataStore<string>
DataStore<number>
DataStore<boolean>
```

One reusable type can support many concrete types.

---

# 3. Generic Functions

A function using `any`:

```ts
function merge(a: any, b: any) {
  return [a, b];
}
```

can technically accept anything:

```ts
const ids = merge(1, 2);
```

But `any` causes us to lose useful type information.

The better solution is a generic function:

```ts
function merging<T>(a: T, b: T) {
  return [a, b];
}
```

Now `T` is a type placeholder.

We can explicitly provide the type:

```ts
const my_ids = merging<number>(1, 2);
```

Here:

```text
T = number
```

But TypeScript can usually infer the type automatically:

```ts
const my_ids = merging(1, 2);
```

TypeScript sees two numbers and infers:

```text
T = number
```

### ⭐ Generic inference

You usually don't need to manually specify the generic type.

```ts
function identity<T>(value: T) {
  return value;
}

identity("Omar"); // T = string
identity(25);     // T = number
```

TypeScript figures out `T` from the arguments.

---

# 4. Multiple Generic Parameters

Consider:

```ts
function merge2<T>(a: T, b: T) {
  return [a, b];
}
```

Both parameters use the **same** type placeholder `T`.

Therefore:

```ts
merge2(1, "Omar");
```

causes a problem because:

```text
a → number
b → string
```

but both must use the same `T`.

### Solution: Multiple Generic Parameters

```ts
function merge3<T, Z>(a: T, b: Z) {
  return [a, b];
}
```

Now:

```ts
const idss = merge3(1, "Omar");
```

TypeScript infers:

```text
T = number
Z = string
```

We could explicitly provide them:

```ts
merge3<number, string>(1, "Omar");
```

But this isn't necessary here because TypeScript inference handles it.

### 🧠 Mental Model

Generic parameters are basically **parameters for types**.

Normal function:

```ts
function add(a, b) {}
```

`a` and `b` are value parameters.

Generic function:

```ts
function merge<T, U>(a: T, b: U) {}
```

`T` and `U` are type parameters.

---

# 5. Generic Constraints

Generics provide flexibility, but sometimes we don't want to accept **every possible type**.

For example, we want a function that merges objects:

```ts
function mergeObj<T>(a: T, b: T) {
  return {
    ...a,
    ...b
  };
}
```

We don't want this:

```ts
mergeObj(1, 2);
```

Numbers don't make sense for the object-spreading operation we want.

We can constrain `T`:

```ts
function mergeObj<T extends object>(a: T, b: T) {
  return {
    ...a,
    ...b
  };
}
```

Now TypeScript requires `T` to be an object.

```ts
mergeObj(1, 2); // ❌ Error
```

But:

```ts
mergeObj(
  { username: "Omar" },
  { age: 25 }
);
```

works.

---

# 6. What Does `extends` Mean Here?

Don't confuse generic `extends` with class inheritance.

Here:

```ts
<T extends object>
```

means:

> **T can be flexible, but it must satisfy the given constraint.**

Think:

```text
<T>
↓
Almost anything

<T extends object>
↓
Anything that qualifies as an object
```

So generic constraints give us:

```text
Flexibility + Rules
```

---

# 7. Constraints + Multiple Generic Types

We can improve the merge function further.

This:

```ts
function mergeObj<T extends object>(a: T, b: T) {
  return {
    ...a,
    ...b
  };
}
```

uses the same `T` for both arguments.

But these objects have different concrete types:

```ts
{ username: string }
```

and:

```ts
{ age: number }
```

TypeScript therefore has to find one shared type that can represent both.

Instead, use two generic parameters:

```ts
function mergeObj<T extends object, U extends object>(
  a: T,
  b: U
) {
  return {
    ...a,
    ...b
  };
}
```

Now:

```ts
const result = mergeObj(
  { username: "Omar" },
  { age: 25 }
);
```

TypeScript infers:

```text
T = { username: string }
U = { age: number }
```

The resulting type is essentially:

```ts
{
  username: string;
  age: number;
}
```

### 🧠 Why two generics?

Because the two arguments are allowed to have **different types**:

```text
First argument  → T
Second argument → U
```

while both are constrained:

```text
T extends object
U extends object
```

---

# 8. Intersection Types in Generic Functions

The result of combining two object types is conceptually an intersection:

```ts
T & U
```

Example:

```ts
type User = {
  username: string;
};

type Details = {
  age: number;
};

type Combined = User & Details;
```

The result is essentially:

```ts
type Combined = {
  username: string;
  age: number;
};
```

### 🧠 `&` means

> "This type has the properties/requirements of BOTH types."

So:

```text
T & U
```

means:

```text
T + U
```

---

# 9. Generic Classes

Generics can also be used with classes.

Without generics:

```ts
class User {
  constructor(public id: string | number | object) {}
}
```

The `id` can only be one of those predefined types.

With generics:

```ts
class User2<T> {
  constructor(public id: T) {}
}
```

Now the type is decided when creating the class instance.

```ts
const user = new User2("i1");
```

TypeScript infers:

```text
T = string
```

Therefore:

```ts
user.id
```

is known as a `string`.

Another example:

```ts
const user = new User2(123);
```

Now:

```text
T = number
```

Another:

```ts
const user = new User2({ name: "Omar" });
```

Now:

```text
T = { name: string }
```

### ⭐ One class, many possible concrete types

```text
User2<string>
User2<number>
User2<object>
```

---

# 10. Generic Interfaces

Generics also work with interfaces:

```ts
interface Role<T> {}
```

A practical example:

```ts
interface ApiResponse<T> {
  data: T;
  success: boolean;
}
```

Now:

```ts
const response: ApiResponse<string> = {
  data: "Omar",
  success: true
};
```

Or:

```ts
const response: ApiResponse<number> = {
  data: 123,
  success: true
};
```

The same interface works with different data types.

### ⭐ Real-world relevance

This pattern is extremely common when typing API responses:

```ts
ApiResponse<User>
ApiResponse<Product>
ApiResponse<Order>
```

One reusable structure, different data types.

---

# 🎯 Generic Types — The Big Picture

The whole section can be reduced to:

```text
WITHOUT GENERICS

Type is decided when defining the structure
        ↓
Less flexible
        ↓
May require duplicated types/functions
```

With generics:

```text
Define the structure now
        ↓
Leave the concrete type flexible
        ↓
Choose/infer the type when using it
        ↓
Reusable + type-safe
```

And with constraints:

```text
Generic
  ↓
Flexible

Generic + constraint
  ↓
Flexible but controlled
```

---

# ⭐ Must-Know Concepts

## 1. Generic Type

```ts
type Box<T> = {
  value: T;
};
```

Usage:

```ts
Box<string>
Box<number>
```

---

## 2. Generic Function

```ts
function identity<T>(value: T) {
  return value;
}
```

---

## 3. Generic Inference

```ts
identity("Omar");
```

TypeScript infers:

```text
T = string
```

---

## 4. Multiple Generic Parameters

```ts
function merge<T, U>(a: T, b: U) {
  return [a, b];
}
```

Useful when arguments can have different types.

---

## 5. Generic Constraints

```ts
<T extends object>
```

Means:

> `T` can vary, but it must satisfy the `object` constraint.

---

## 6. Generic Classes / Interfaces

```ts
class Box<T> {
  constructor(public value: T) {}
}

interface ApiResponse<T> {
  data: T;
}
```

---

# 💡 Interview Definition

> **Generics allow us to create reusable and type-safe code by using type parameters as placeholders, allowing the concrete types to be specified or inferred when the code is used.**

### One final mental model

Think of:

```ts
Array<T>
```

as a **container template**.

You don't build a different Array type for every type.

You build one template:

```text
Array<T>
```

Then TypeScript fills in the placeholder:

```text
Array<string>
Array<number>
Array<User>
```

That's essentially what **Generics** are.
