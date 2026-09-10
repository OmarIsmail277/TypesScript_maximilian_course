# Section 10 — Deriving Types from Other Types

## 1. Section Overview

This section introduces advanced TypeScript features that allow us to:

- Derive types from existing values.
- Extract parts of existing types.
- Combine/manipulate types.
- Transform one object type into another.
- Create conditional types.
- Extract nested type information with `infer`.
- Use built-in TypeScript utility types instead of creating everything ourselves.

### Big idea

```text
Existing value/type
       ↓
TypeScript derives
new type information
       ↓
Reusable + type-safe types
```

These features are **advanced and relatively niche**.

You won't necessarily use all of them in normal application code, but they become particularly useful when building:

- Libraries
- Frameworks
- Reusable utilities
- Generic APIs
- Complex type-safe systems

---

# 2. `typeof` in TypeScript ⭐⭐⭐

You already know JavaScript's:

```ts
typeof user;
```

which checks the type **at runtime**.

Example:

```ts
const user = "Omar";

console.log(typeof user);
```

Output:

```text
"string"
```

But TypeScript also uses `typeof` in the **type system**.

---

## Deriving a Type from a Value

```ts
const user = "Omar";

type UserName = typeof user;
```

Because `user` is a `const`, TypeScript knows:

```text
UserName = "Omar"
```

This is a **literal type**.

Compare that with:

```ts
let user2 = "medo";

type UserName2 = typeof user2;
```

Here:

```text
UserName2 = string
```

because a `let` variable can be reassigned, so TypeScript uses the broader `string` type.

### Important

There are two different worlds:

```text
JavaScript typeof
→ runtime check

TypeScript typeof
→ derive a type from a value
```

---

# 3. Practical `typeof` Example ⭐⭐⭐

Suppose we have:

```ts
const settings = {
  difficulty: "easy",
  minLevel: 10,
  didStart: false,
  players: ["Omar", "Medo"],
};
```

We could manually create:

```ts
type Settings = {
  difficulty: string;
  minLevel: number;
  didStart: boolean;
  players: string[];
};
```

But now we're describing the same structure twice.

Instead:

```ts
type Settings = typeof settings;
```

TypeScript derives the type automatically.

Then:

```ts
function loadData(settings: Settings) {
  // ...
}
```

We can also use it directly:

```ts
function loadData2(s: typeof settings) {
  // ...
}
```

### Why is this useful?

If `settings` changes:

```ts
const settings = {
  difficulty: "easy",
  minLevel: 10,
  didStart: false,
  players: ["Omar", "Medo"],
  maxPlayers: 5,
};
```

the derived type automatically reflects that structure.

You don't have to manually update `Settings`.

### Key idea

> **`typeof`\*\*** can derive a TypeScript type from an existing value.\*\*

---

# 4. `typeof` for Function Types ⭐⭐⭐

`typeof` can also derive the **entire type of a function**.

```ts
function sum(a: number, b: number) {
  return a + b;
}

function subtract(a: number, b: number) {
  return a - b;
}
```

Instead of manually writing:

```ts
type SumFn = (a: number, b: number) => number;
```

we can write:

```ts
type SumFn = typeof sum;
type SubtractFn = typeof subtract;
```

Now `SumFn` contains the complete function type:

```text
(a: number, b: number) => number
```

Then:

```ts
function performMathAction(cb: SumFn | SubtractFn) {
  // ...
}
```

can accept either function.

### Important

`typeof sum` means:

> "Give me the TypeScript type of this function."

It does **not** call the function.

---

# 5. `keyof` ⭐⭐⭐

`keyof` extracts the **keys of an object type**.

Example:

```ts
type User = {
  name: string;
  age: number;
};

type UserKeys = keyof User;
```

Now:

```text
UserKeys = "name" | "age"
```

So:

```ts
let validKey: UserKeys;

validKey = "name"; // ✅
validKey = "age"; // ✅
validKey = "email"; // ❌
```

### `typeof` vs `keyof`

This distinction is important:

```ts
typeof
```

works with a **value**:

```ts
typeof user;
```

while:

```ts
keyof;
```

works with a **type**:

```ts
keyof User
```

Think:

```text
typeof value
→ "What is the type of this value?"

keyof Type
→ "What are the keys of this type?"
```

---

# 6. `keyof` with Generics ⭐⭐⭐

A very useful example:

```ts
function getProp<T extends object, U extends keyof T>(obj: T, key: U) {
  const val = obj[key];

  if (val === undefined || val === null) {
    throw new Error("Accessing undefined or null value");
  }

  return val;
}
```

The important relationship is:

```ts
U extends keyof T
```

This means:

> `U` must be one of the keys of `T`.

For:

```ts
const data = {
  id: 1,
  isStored: false,
  values: [1, -5, 10],
};
```

this works:

```ts
getProp(data, "isStored");
getProp(data, "id");
getProp(data, "values");
```

but:

```ts
getProp(data, "name");
```

is an error because `"name"` isn't a key of `data`.

### Why is this powerful?

It **links the two generic parameters together**:

```text
T → type of the object

U → one of the keys of T
```

So TypeScript doesn't just say:

> "Give me an object and a string."

It says:

> "Give me an object, and the second argument must be a valid key of that specific object."

### Must understand deeply

Remember:

```ts
U extends keyof T
```

→ `U` must be a key of `T`.

---

# 7. Indexed Access Types ⭐⭐⭐

Indexed access types let you extract a **specific property type** from another type.

Example:

```ts
const appUser = {
  name: "Omar",
  age: 35,
  permissions: [
    {
      id: "p1",
      title: "Admin",
      description: "Admin Access",
    },
  ],
};

type AppUser = typeof appUser;
```

Now:

```ts
type Perms = AppUser["permissions"];
```

`Perms` becomes:

```ts
{
  id: string;
  title: string;
  description: string;
}
[];
```

This is similar to accessing an object property:

```ts
appUser["permissions"];
```

but we're doing it in the **type system**.

### Mental model

```text
AppUser
   ↓
["permissions"]
   ↓
type of permissions
```

---

# 8. Accessing an Array Element Type

Indexed access types become especially useful with arrays.

If:

```ts
type Perms = AppUser["permissions"];
```

and `Perms` is an array, then:

```ts
type Perm = Perms[number];
```

extracts the type of **one element** of that array.

So:

```text
Perms
↓
Array of permission objects

Perms[number]
↓
One permission object
```

Similarly:

```ts
type Names = string[];
type Name = Names[number];
```

gives:

```text
Name = string
```

### Why `[number]`?

An array can be indexed by numbers:

```ts
names[0];
names[1];
names[2];
```

So:

```ts
Names[number];
```

means:

> "Give me the type of whatever you get when accessing this array with a number."

### Important pattern

```ts
Type["property"];
```

→ property type

```ts
ArrayType[number];
```

→ element type

---

# 9. Mapped Types ⭐⭐⭐

Mapped types allow you to **transform one object type into another object type**.

Suppose:

```ts
type Operations = {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
};
```

We want another type where the same keys exist, but all values are numbers:

```ts
type Results = {
  add: number;
  subtract: number;
};
```

We could write that manually.

But we can derive it:

```ts
type Results2<T> = {
  [Key in keyof T]: number;
};
```

Then:

```ts
type MathResults = Results2<Operations>;
```

becomes:

```ts
{
  add: number;
  subtract: number;
}
```

### How to read this

```ts
[Key in keyof T]
```

means:

> "Go through every key in `T`."

Then:

```ts
: number
```

means:

> "Make the value of every key a number."

So:

```text
Operations
   ↓
take all keys
   ↓
add
subtract
   ↓
change their value type
   ↓
number
   ↓
Results2<Operations>
```

### Big idea

> **Mapped types transform an existing object type while keeping its keys.**

---

# 10. Making Properties Optional with Mapped Types

Mapped types can also modify property modifiers.

To make all properties optional:

```ts
type Results3<T> = {
  [Key in keyof T]?: number;
};
```

For:

```ts
type Operations = {
  add: (...args) => number;
  subtract: (...args) => number;
};
```

we get:

```ts
{
  add?: number;
  subtract?: number;
}
```

Therefore:

```ts
let thirdMathResults: Results3<Operations> = {
  add: 3,
};
```

is valid.

`subtract` doesn't have to exist.

---

# 11. Making Optional Properties Required

The opposite is possible with:

```ts
-?
```

Example:

```ts
type Results4<T> = {
  [Key in keyof T]-?: number;
};
```

Suppose:

```ts
type Operations2 = {
  add?: (a: number, b: number) => number;
  subtract?: (a: number, b: number) => number;
};
```

Then:

```ts
type Results4<Operations2>
```

makes both properties required:

```text
add: number
subtract: number
```

### Remember

```text
?   → optional

-?  → remove optional
```

---

# 12. Readonly Mapping

Mapped types can also add `readonly`.

```ts
type Results5<T> = {
  readonly [Key in keyof T]-?: number;
};
```

Now the properties are:

- Required
- Readonly
- Number values

So:

```ts
fivthMathResults.add = 10;
```

is not allowed.

### Removing `readonly`

You can use:

```ts
-readonly;
```

Example:

```ts
type Results6<T> = {
  -readonly [Key in keyof T]-?: number;
};
```

### Modifier mapping cheat sheet

```text
?           → make optional
-?          → make required

readonly    → make readonly
-readonly   → remove readonly
```

---

# 13. Template Literal Types ⭐⭐

JavaScript has template literals:

```ts
const mainUserName = "Omar";

const greeting = `Hi ${mainUserName}`;
```

TypeScript has a similar concept **inside the type system**.

Example:

```ts
type ReadPermissions = "no-read" | "read";

type WritePermissions = "no-write" | "write";
```

Instead of manually writing all combinations:

```text
"no-read-write"
"read-no-write"
"no-read-no-write"
"read-write"
```

we can derive them:

```ts
type FilePermissions = `${ReadPermissions}-${WritePermissions}`;
```

This produces all valid combinations.

Conceptually:

```text
"no-read" + "no-write"
"no-read" + "write"
"read"    + "no-write"
"read"    + "write"
```

---

# 14. Template Literal Types with `keyof`

Consider:

```ts
type DataFile = {
  data: string;
  permissions: FilePermissions;
};
```

We can get its keys:

```ts
keyof DataFile
```

which gives:

```text
"data" | "permissions"
```

Now:

```ts
type DataFileEventNames = `${keyof DataFile}Changed`;
```

becomes:

```text
"dataChanged" | "permissionsChanged"
```

We can then build another object type:

```ts
type DataFileEvents = {
  [Key in DataFileEventNames]: () => void;
};
```

This combines several advanced TypeScript features:

```text
keyof
  +
template literal types
  +
mapped types
```

### Priority

Understand the idea, but don't worry about memorizing complicated combinations.

---

# 15. Conditional Types ⭐⭐⭐

Conditional types allow TypeScript to choose **one type or another depending on a condition**.

The syntax looks similar to a JavaScript ternary:

```ts
Condition ? TypeIfTrue : TypeIfFalse;
```

But this happens in the **type system**, not at runtime.

---

## Basic Example

```ts
type GetElementType<T> = T extends any[] ? T[number] : never;
```

Read it as:

> "If `T` is an array, give me the element type. Otherwise, give me `never`."

For:

```ts
type StringArray = string[];

type Example1 = GetElementType<StringArray>;
```

we get:

```text
Example1 = string
```

Because:

```text
StringArray
   ↓
is an array? YES
   ↓
T[number]
   ↓
string
```

If `T` isn't an array:

```ts
let text = 1;
```

then:

```ts
type Example2 = GetElementType<typeof text>;
```

would be:

```text
never
```

because `number` does not extend `any[]`.

### Important syntax

```ts
T extends SomeType ? A : B
```

means:

```text
If T satisfies SomeType
    → A

Otherwise
    → B
```

### Don't confuse this with a generic constraint

Compare:

```ts
type Example<T extends object> = T;
```

Here `extends` is a **constraint**.

But:

```ts
type Example<T> = T extends object ? string : never;
```

Here `extends` is part of a **conditional type**.

---

# 16. Why Conditional Types Exist

Conditional types are especially useful when building **generic utility/helper types**.

For example, you may want a type that behaves differently depending on what type you give it:

```text
Array
 ↓
extract element type

Not array
 ↓
return never
```

This allows one generic utility type to handle different inputs safely.

These features are particularly useful in **libraries and frameworks**, where code needs to support many different types supplied by other developers.

---

# 17. Another Conditional Type Example ⭐⭐

The course also demonstrates a conditional type with a function.

```ts
type FullnamePerson = {
  firstName: string;
  lastName: string;
};

type FullnameOrNothing<T> = T extends FullnamePerson ? string : never;
```

This means:

```text
If T has:
  firstName: string
  lastName: string

→ return string

Otherwise
→ return never
```

Then:

```ts
function getFullname<T extends object>(
  person: T
): FullnameOrNothing<T> {
  if (
    "firstName" in person &&
    "lastName" in person &&
    person.firstName &&
    person.lastName
  ) {
    return `${person.firstName} ${person.lastName}`
      as FullnameOrNothing<T>;
  }

  throw new Error("No first name and / or last name found");
}
```

Now:

```ts
const name1 = getFullname({});
```

gives:

```text
never
```

because `{}` doesn't satisfy `FullnamePerson`.

While:

```ts
const name2 = getFullname({
  firstName: "Omar",
  lastName: "Ahmed",
});
```

gives:

```text
string
```

because the object satisfies `FullnamePerson`.

### Why `never`?

If the required properties aren't available, the function throws an error:

```ts
throw new Error(...);
```

A function that throws instead of successfully returning has a `never` result in that branch.

---

# 18. Type Assertion in the Conditional Example

Inside the function:

```ts
return `${person.firstName} ${person.lastName}`
  as FullnameOrNothing<T>;
```

The `as` is a **type assertion**.

It tells TypeScript:

> "Treat this returned value as `FullnameOrNothing<T>`."

Remember from the previous section:

```text
as
↓
changes TypeScript's understanding
↓
does NOT convert the runtime value
```

The actual value is still a JavaScript string.

---

# 19. `infer` ⭐⭐⭐

`infer` is one of the more advanced features in this section.

Its purpose is:

> **Extract some nested type information from another type inside a conditional type.**

A common example is extracting the **return type of a function**.

Suppose:

```ts
function add(a: number, b: number) {
  return a + b;
}
```

We can get the whole function type:

```ts
type AddFn = typeof add;
```

which is essentially:

```ts
(a: number, b: number) => number;
```

But what if we only want:

```text
number
```

—the return type?

That's where `infer` can help.

---

# 20. Building a Custom Return-Type Utility

```ts
type ReturnValueType<T> = T extends (...args: any[]) => infer RV ? RV : T;
```

The important part is:

```ts
T extends (...args: any[]) => infer RV
```

This asks:

> "Is `T` a function?"

If yes:

```ts
infer RV
```

tells TypeScript:

> "Extract the function's return type and call it `RV`."

Then:

```ts
? RV
```

returns that extracted type.

So:

```ts
type AddFnReturnValueType = ReturnValueType<AddFn>;
```

becomes:

```text
number
```

because `add()` returns a number.

---

# 21. Breaking Down `infer`

This:

```ts
T extends (...args: any[]) => infer RV
```

can look scary.

Break it down:

```text
T
↓
the type we're checking

extends
↓
is T compatible with...

(...args: any[]) => ...
↓
some function with any parameters

infer RV
↓
extract the return type and call it RV
```

Then:

```ts
? RV
```

means:

```text
If T is a function
→ return its extracted return type
```

and:

```ts
: T
```

means:

```text
Otherwise
→ return T itself
```

The course also mentions that `never` could be used instead if the utility should reject non-function types.

---

# 22. The Core Idea Behind `infer`

Don't try to memorize the complete syntax immediately.

Remember:

```text
infer
 ↓
"Extract this piece of type information
 from the type I'm checking."
```

For example:

```ts
T extends (...args: any[]) => infer RV
```

means:

```text
Check whether T is a function
             ↓
If yes, extract its return type
             ↓
Call that extracted type RV
```

Then we can use `RV` elsewhere in the conditional type.

### Must understand deeply

Understand **what \*\***`infer`\***\* does**.

The exact advanced syntax can be learned when you actually need to write a utility type.

---

# 23. TypeScript Already Provides These Utilities ⭐⭐⭐

A very important practical lesson from this section:

> **You don't always need to build these utility types yourself.**

For example, we created:

```ts
type ReturnValueType<T> = T extends (...args: any[]) => infer RV ? RV : T;
```

But TypeScript already provides:

```ts
ReturnType<T>;
```

So:

```ts
type AddFnReturnValueType = ReturnType<AddFn>;
```

gives:

```text
number
```

You should therefore know that TypeScript has many built-in utility types.

The course specifically mentions:

```text
ReturnType
Partial
```

For example:

```ts
Partial<User>;
```

makes all properties of `User` optional.

Instead of manually creating:

```ts
type OptionalUser<T> = {
  [Key in keyof T]?: T[Key];
};
```

you can use:

```ts
Partial<User>;
```

---

# 24. Built-in Utility Types

The important practical lesson is:

```text
Need a utility type?
        ↓
Check TypeScript's built-in utilities first.
        ↓
Maybe it already exists.
```

The course's examples include:

```ts
ReturnType<T>;
Partial<T>;
```

There are many others in TypeScript.

Official documentation:

https://www.typescriptlang.org/docs/handbook/utility-types.html

---

# ⭐ Section 10 — Priority

## Must Understand Deeply

### 1. `typeof`

```ts
type Settings = typeof settings;
```

→ derive a type from a value.

---

### 2. `keyof`

```ts
keyof User
```

→ get the keys of a type.

---

### 3. `keyof` + generics

```ts
U extends keyof T
```

→ `U` must be a key of `T`.

---

### 4. Indexed access types

```ts
User["name"];
```

→ get the type of a property.

```ts
Names[number];
```

→ get the element type of an array.

---

### 5. Mapped types

```ts
type Results<T> = {
  [Key in keyof T]: number;
};
```

→ transform an object type based on another object type.

---

### 6. Conditional types

```ts
T extends SomeType ? A : B
```

→ choose a type depending on a condition.

---

### 7. `infer`

```ts
T extends (...args: any[]) => infer RV
  ? RV
  : never
```

→ extract nested type information.

---

### 8. Built-in utility types

Know that TypeScript already provides utilities such as:

```ts
ReturnType<T>;
Partial<T>;
```

→ check the built-ins before creating your own.

---

# 🟡 Good to Understand, But Don't Over-Memorize

### Template literal types

```ts
`${ReadPermissions}-${WritePermissions}`;
```

Useful for generating combinations of literal types.

### Complex combinations

For example:

```ts
keyof
+
mapped types
+
template literal types
```

These are powerful but relatively niche.

---

# 🧠 Section 10 — One-Minute Revision

```text
typeof
→ derive a type from a value

keyof
→ get the keys of a type

U extends keyof T
→ U must be a key of T

Indexed Access
User["name"]
→ property type

Array[number]
→ element type

Mapped Type
[Key in keyof T]
→ transform an object type

?:
Conditional Type
T extends X ? A : B
→ choose a type based on a condition

Template Literal Type
`${A}-${B}`
→ generate literal string combinations

infer
→ extract nested type information

ReturnType<T>
→ built-in utility for extracting
   a function's return type

Partial<T>
→ built-in utility that makes
   all properties optional
```

# 🔑 The Big Picture

All of Section 10 revolves around **deriving rather than manually defining** types.

Instead of:

```text
"I'll write this type myself."
```

TypeScript lets you say:

```text
"Take this existing information
and derive the type I need from it."
```

The progression is roughly:

```text
typeof
  ↓
derive type from value

keyof
  ↓
derive keys from type

Indexed Access
  ↓
extract part of a type

Mapped Types
  ↓
transform a type

Conditional Types
  ↓
choose a type based on a condition

infer
  ↓
extract nested type information

Utility Types
  ↓
use ready-made versions of
common type transformations
```

### Final mental model

> **Section 10 teaches TypeScript's type-manipulation toolbox: take existing type information, extract it, transform it, combine it, or conditionally derive something new from it.**
