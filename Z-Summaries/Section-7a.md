# Section 7 — Advanced Types & Functions (Part 1)

## 1. Intersection Types ⭐⭐⭐

### The idea

An **intersection type** combines multiple types into **one type that must satisfy all of them**.

Syntax:

```ts
type A = {
  name: string;
};

type B = {
  age: number;
};

type C = A & B;
```

Now `C` must have **both** `name` and `age`:

```ts
const user: C = {
  name: "Omar",
  age: 29,
};
```

Think:

```text
A & B
 ↓
A AND B
```

### Example from the course

```ts
type FileData = {
  path: string;
  content: string;
};

type DatabaseData = {
  connectionUrl: string;
  credentials: string;
};

type Status = {
  isOpen: boolean;
  errorMessage?: string;
};
```

We can combine them:

```ts
type AccessedFileData = FileData & Status;

type AccessedDatabaseData = DatabaseData & Status;
```

So:

```ts
AccessedFileData;
```

means:

```text
FileData
+
Status
```

Therefore an object needs:

```ts
const file: AccessedFileData = {
  path: "data.csv",
  content: "...",
  isOpen: true,
};
```

It must satisfy **both** `FileData` and `Status`.

### `&` vs `|`

This is extremely important:

```ts
type A = FileData | Status;
```

means:

> A **OR** Status

while:

```ts
type A = FileData & Status;
```

means:

> FileData **AND** Status

So:

```text
| → OR → one of them
& → AND → all of them
```

### Interface alternative

The same idea can be expressed with interface inheritance:

```ts
interface AccessedFileData extends FileData, Status {}
```

So `type` with `&` and `interface` with `extends` can sometimes achieve a similar result.

### Must understand deeply

The most important thing:

> **Intersection types combine types so the resulting value must satisfy all of them.**

---

# 2. Type Guards ⭐⭐⭐

A **type guard** is a check that gives TypeScript information about the type of a value.

For example:

```ts
type FileSource = {
  type: "file";
  path: string;
};

type DBSource = {
  type: "db";
  connectionUrl: string;
};

type Source = FileSource | DBSource;
```

`Source` can be either:

```text
FileSource
      OR
DBSource
```

Therefore TypeScript cannot initially assume that `source.path` exists:

```ts
function loadData(source: Source) {
  // source.path ❌
}
```

We need to **narrow** the type first.

---

## Type Guard with `in`

The `in` operator can be used as a type guard:

```ts
function loadData(source: Source) {
  if ("path" in source) {
    source.path;
    return;
  }

  source.connectionUrl;
}
```

Inside:

```ts
if ("path" in source)
```

TypeScript understands:

```text
source → FileSource
```

because only `FileSource` has a `path` property.

After the `if`, TypeScript knows the remaining possibility is:

```text
source → DBSource
```

### Simple mental model

```text
Source
 ├── FileSource
 │     └── path
 │
 └── DBSource
       └── connectionUrl
```

Check:

```ts
"path" in source;
```

↓

```text
Yes → FileSource
No  → DBSource
```

---

# 3. Discriminated Unions ⭐⭐⭐

A **discriminated union** is a union where each type has a common property that identifies which type it is.

In the example:

```ts
type FileSource = {
  type: "file";
  path: string;
};

type DBSource = {
  type: "db";
  connectionUrl: string;
};

type Source = FileSource | DBSource;
```

The common property is:

```ts
type;
```

But notice the values:

```ts
type: "file";
```

and:

```ts
type: "db";
```

These are **literal types**.

Now we can narrow using:

```ts
function loadData2(source: Source) {
  if (source.type === "file") {
    source.path;
    return;
  }

  source.connectionUrl;
}
```

When TypeScript sees:

```ts
source.type === "file";
```

it knows:

```text
source → FileSource
```

Otherwise:

```text
source → DBSource
```

### Why is this called "discriminated"?

Because the `type` property **discriminates** between the possible types.

```text
Source
   │
   └── type
       ├── "file" → FileSource
       └── "db"   → DBSource
```

### `in` guard vs discriminated union

Both can narrow:

```ts
if ("path" in source) {
```

and:

```ts
if (source.type === "file") {
```

But discriminated unions are often cleaner when you **design the types yourself**.

A common pattern is:

```ts
type Result =
  | { type: "success"; data: string }
  | { type: "error"; message: string }
  | { type: "loading" };
```

Then:

```ts
if (result.type === "success") {
  result.data;
}
```

The `type` property tells TypeScript exactly which member of the union you're dealing with.

### Must understand deeply

Remember:

> **Discriminated union = union + shared literal property used to identify/narrow the member.**

---

# 4. Type Guards with `instanceof` ⭐⭐

`instanceof` can also narrow types when working with classes.

```ts
class User {
  constructor(public name: string) {}

  join() {}
}

class Admin {
  constructor(public permissions: string[]) {}

  scan() {}
}
```

Create a union:

```ts
type Entity = User | Admin;
```

Now:

```ts
function init(entity: Entity) {
  if (entity instanceof User) {
    entity.join();
    return;
  }

  entity.scan();
}
```

When TypeScript sees:

```ts
entity instanceof User;
```

it knows:

```text
entity → User
```

Therefore:

```ts
entity.join();
```

is valid.

Otherwise:

```text
entity → Admin
```

so:

```ts
entity.scan();
```

works.

### When is `instanceof` useful?

Mainly when your possible values are **class instances**.

```text
Object shapes → "in", discriminated unions, etc.
Class instances → instanceof
```

---

# 5. Reusable Type Guards & Type Predicates ⭐⭐⭐

Sometimes you don't want to repeat the same type-checking logic everywhere.

You can move the guard into a reusable function:

```ts
function isFile(source: Source): source is FileSource {
  return source.type === "file";
}
```

The important part is:

```ts
source is FileSource
```

This is called a **type predicate**.

It tells TypeScript:

> "If this function returns `true`, treat `source` as a `FileSource`."

Now:

```ts
if (isFile(source)) {
  source.path;
}
```

TypeScript knows inside the `if`:

```text
source → FileSource
```

### Why is this useful?

Without the reusable guard:

```ts
if (source.type === "file") {
  // ...
}
```

You repeat the logic.

With:

```ts
isFile(source);
```

you can reuse the same check:

```ts
if (isFile(source)) {
  // FileSource
}
```

anywhere in your code.

### Important distinction

A type predicate does **not** magically convert the value.

It provides **type information to TypeScript**.

```ts
source is FileSource
```

means:

> "When this condition is true, TypeScript can narrow `source` to `FileSource`."

### Must understand deeply

Know this pattern:

```ts
function isFile(source: Source): source is FileSource {
  return source.type === "file";
}
```

Think:

```text
boolean check
      +
type information
      ↓
reusable type guard
```

---

# 6. Function Overloads ⭐⭐⭐

Function overloads allow you to describe **different valid ways of calling the same function**, with different return types depending on the input.

From the course:

```ts
function getLength(val: string | any[]) {
  if (typeof val === "string") {
    const numberOfWords = val.split(" ").length;
    return `${numberOfWords} words`;
  }

  return val.length;
}
```

We can call it with:

```ts
const numberOfWords = getLength("does this work?");
```

The result is:

```ts
string;
```

And:

```ts
const numItems = getLength(["sports", "cookies"]);
```

The result is:

```ts
number;
```

The problem is that the function's return type depends on the input:

```text
string input → string output
array input  → number output
```

Function overloads let us describe that relationship more precisely.

---

## Overload signatures

Conceptually:

```ts
function getLength(val: string): string;
function getLength(val: any[]): number;
```

Then we provide one implementation:

```ts
function getLength(val: string | any[]) {
  if (typeof val === "string") {
    const numberOfWords = val.split(" ").length;
    return `${numberOfWords} words`;
  }

  return val.length;
}
```

Now TypeScript understands:

```ts
getLength("hello");
```

→ `string`

while:

```ts
getLength(["a", "b"]);
```

→ `number`

### The structure

```ts
// Overload signatures
function getLength(val: string): string;
function getLength(val: any[]): number;

// Implementation
function getLength(val: string | any[]) {
  // actual logic
}
```

The first signatures describe the **public API**.

The final function contains the **implementation**.

### Why use overloads?

Because they give TypeScript a more precise understanding of a function's behavior.

Without overloads:

```text
string | number
```

might be the inferred result.

With overloads:

```text
string input → string
array input  → number
```

### Must understand deeply

The main idea is more important than memorizing syntax:

> **Function overloads describe multiple valid call signatures for one function and can provide more precise return types.**

---

# 7. Big Picture — Section 7 Part 1

We've now covered four major ideas:

```text
Intersection Types
        ↓
Combine types
A & B → A AND B


Type Guards
        ↓
Narrow a union
"property" in value
instanceof
typeof


Discriminated Unions
        ↓
Use a shared literal property
to identify the union member


Function Overloads
        ↓
Describe different valid
input → output relationships
```

---

# ⭐ Priority

### Must understand deeply

1. **Intersection types**

   ```ts
   A & B;
   ```

2. **Type narrowing / guards**

   ```ts
   "path" in source;
   typeof value === "string" instanceof User;
   ```

3. **Discriminated unions**

   ```ts
   source.type === "file";
   ```

4. **Type predicates**

   ```ts
   source is FileSource
   ```

5. **Basic function overload concept**

### Just know/use

- The exact syntax of complicated overloads.
- When to choose every possible type-guard technique.
- Advanced overload edge cases.

---

# 🧠 One-Minute Revision

```text
Intersection
A & B
→ must satisfy A AND B

Type Guard
→ runtime check that helps TypeScript narrow a type

"in"
"path" in source
→ checks whether a property exists

instanceof
entity instanceof User
→ checks whether an object is an instance of a class

Discriminated Union
→ union + common literal property

source.type === "file"
→ narrows Source → FileSource

Type Predicate
source is FileSource
→ tells TypeScript what type a successful guard represents

Function Overload
→ multiple call signatures for one function

string input → string output
array input  → number output
```

**Core mental model:**

> Section 7 is largely about giving TypeScript **more precise information** about values whose types could otherwise be ambiguous.
