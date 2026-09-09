# Section 7 — Advanced Types & Functions

## 8. Index Types ⭐⭐

Sometimes you don't know the exact property names of an object in advance.

For example, you might want:

```ts
type DataStore = {
  [prop: string]: number | boolean;
};
```

The important part is:

```ts
[prop: string]: number | boolean;
```

This is an **index signature**.

It means:

> "This object can have any number of properties, as long as the property name is a string and the value is either a number or boolean."

So this is valid:

```ts
let store: DataStore = {};

store.id = 5;
store.isOpen = false;
store.count = 10;
```

But this is invalid:

```ts
store.name = "Omar";
```

because `"Omar"` is a `string`, while our values must be:

```text
number | boolean
```

### Why use it?

When you want a **dynamic/flexible object structure**.

Instead of:

```ts
type DataStore = {
  id: number;
  count: number;
  isOpen: boolean;
};
```

where the properties are fixed, you can say:

```ts
type DataStore = {
  [prop: string]: number | boolean;
};
```

and allow dynamically named properties.

### Mental model

```text
[prop: string]: number | boolean
       ↓
Any string property name
       ↓
But its value must be
number OR boolean
```

---

# 9. `as const` ⭐⭐

Normally TypeScript may infer an array like:

```ts
let roles = ["admin", "guest", "editor"];
```

as:

```text
string[]
```

So the individual values are treated broadly as `string`.

But:

```ts
let roles = ["admin", "guest", "editor"] as const;
```

makes TypeScript preserve the **exact values**.

Conceptually:

```text
readonly ["admin", "guest", "editor"]
```

Now:

```ts
const firstRole = roles[0];
```

is inferred as:

```ts
"admin";
```

not simply:

```ts
string;
```

### It also makes the array readonly

So:

```ts
roles.push("omar");
```

is not allowed.

### Why use `as const`?

When you don't want a broad generic type like:

```ts
string;
```

and instead want a **very narrow literal type**:

```ts
"admin";
```

This is especially useful for fixed configuration values, constants, and sets of allowed values.

### Think:

```text
Normal:
["admin", "guest", "editor"]
        ↓
string[]

as const:
["admin", "guest", "editor"] as const
        ↓
readonly ["admin", "guest", "editor"]
```

---

# 10. Revisiting `Record`

Remember from Section 2:

```ts
Record<string, number | boolean>;
```

can describe an object whose:

```text
keys   → strings
values → number OR boolean
```

For example:

```ts
let someObj: Record<string, number | boolean>;
```

This is conceptually very similar to:

```ts
type DataStore = {
  [prop: string]: number | boolean;
};
```

So:

```ts
type DataStore = {
  [prop: string]: number | boolean;
};
```

and:

```ts
Record<string, number | boolean>;
```

can express essentially the same flexible object structure.

### Important distinction

`Record` is a **utility type**.

An index signature is the direct syntax:

```ts
[prop: string]: number | boolean;
```

You don't need to memorize both as completely different concepts.

---

# 11. `satisfies` ⭐⭐⭐

`satisfies` is a relatively newer TypeScript feature.

Its main idea is:

> **Check that a value satisfies a type, while preserving the value's more specific inferred type.**

This is useful when you want:

```text
Type safety
+
Precise inference
```

---

## Without `satisfies`

Consider:

```ts
const dataEntries: Record<string, number> = {
  entry1: 0.51,
  entry2: -1.23,
};
```

TypeScript checks that the object satisfies:

```ts
Record<string, number>;
```

But the variable is explicitly typed as that broad type.

So:

```ts
dataEntries.entry3;
```

is allowed because the type says:

```text
any string key → number
```

---

## With `satisfies`

Instead:

```ts
const dataEntries2 = {
  entry1: 0.51,
  entry2: -1.23,
} satisfies Record<string, number>;
```

Now TypeScript checks:

> "Does this object satisfy `Record<string, number>`?"

Yes.

But importantly, TypeScript **keeps the object's own inferred type** instead of replacing it with `Record<string, number>`.

So the type retains knowledge of the actual properties:

```text
entry1
entry2
```

rather than simply treating the whole thing as:

```text
any string key
```

### Why is that useful?

Imagine:

```ts
const config = {
  theme: "dark",
  retries: 3,
} satisfies Record<string, string | number>;
```

You get two benefits:

```text
1. Type safety
   ↓
   Values must be string or number

2. Precise inference
   ↓
   TypeScript still knows about
   the actual properties of config
```

That's the main reason `satisfies` exists.

---

# 12. `satisfies` vs Type Annotation

This distinction is worth remembering:

### Type annotation

```ts
const data: Record<string, number> = {
  entry1: 0.51,
  entry2: -1.23,
};
```

You're saying:

> "Treat `data` as this type."

### `satisfies`

```ts
const data = {
  entry1: 0.51,
  entry2: -1.23,
} satisfies Record<string, number>;
```

You're saying:

> "Check that `data` satisfies this type, but keep its own inferred type."

### Mental model

```text
: Type
↓
Give the variable this type


satisfies Type
↓
Check the value against this type
while preserving its specific inferred type
```

This is particularly useful when working with configuration objects and libraries/frameworks that need both **flexibility and type safety**.

---

# 13. How These Concepts Connect

The last part of Section 7 is really about controlling **how broad or narrow TypeScript's understanding of a value should be**.

### Index signatures

Make an object **flexible**:

```ts
[prop: string]: number | boolean
```

> "I don't know all the property names, but I know the allowed value types."

### `as const`

Make values **narrow and precise**:

```ts
["admin", "guest", "editor"] as const;
```

> "Keep these exact literal values."

### `Record`

Another way to describe a flexible object:

```ts
Record<string, number>;
```

> "Any string key, with number values."

### `satisfies`

Validate while preserving inference:

```ts
const data = {...} satisfies Record<string, number>;
```

> "Make sure this matches the required shape, but don't throw away the specific information TypeScript already knows."

---

# ⭐ Section 7 — Final Priority

## Must understand deeply

### 1. Intersection types

```ts
A & B;
```

→ A **AND** B.

### 2. Type guards

```ts
typeof
in
instanceof
```

→ narrow a union to a more specific type.

### 3. Discriminated unions

```ts
source.type === "file";
```

→ use a common literal property to identify the union member.

### 4. Type predicates

```ts
source is FileSource
```

→ reusable type guard that tells TypeScript what type a successful check represents.

### 5. Function overloads

```ts
function getLength(value: string): string;
function getLength(value: any[]): number;
```

→ describe different input/output relationships for one function.

### 6. Index signatures

```ts
[prop: string]: number | boolean
```

→ flexible/dynamic object properties with controlled value types.

### 7. `as const`

```ts
["admin", "guest"] as const;
```

→ preserve exact literal values and make the result readonly.

### 8. `satisfies`

```ts
const data = {...} satisfies SomeType;
```

→ validate against a type **without unnecessarily widening/replacing the inferred type**.

---

# 🧠 Section 7 — One-Minute Revision

```text
Intersection
A & B
→ A AND B


Type Guards
typeof / in / instanceof
→ narrow types


Discriminated Union
type: "file" | "db"
→ identify the union member


Type Predicate
source is FileSource
→ reusable narrowing function


Function Overloads
string → string
array  → number
→ precise function API


Index Signature
[prop: string]: number
→ dynamic string properties with number values


Record
Record<string, number>
→ flexible object type


as const
["admin", "guest"] as const
→ exact literal values + readonly


satisfies
value satisfies Type
→ validate the type while preserving specific inference
```

## 🔑 The Big Picture

Section 7 is mostly about one central idea:

> **Giving TypeScript more precise information about your values.**

Sometimes you need to **combine** types:

```text
&
```

Sometimes you need to **narrow** a union:

```text
guards
```

Sometimes you need to **identify** a union member:

```text
discriminated unions
```

Sometimes you need to make objects **flexible**:

```text
index signatures / Record
```

And sometimes you want TypeScript to be **very precise instead of broad**:

```text
as const / satisfies
```
