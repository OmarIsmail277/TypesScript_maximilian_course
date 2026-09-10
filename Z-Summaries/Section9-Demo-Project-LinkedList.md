# Section 9 — Demo Project: Generic Linked List

## 1. Purpose of the Project

This section is mainly **practice**, not a major new theory section.

The goal is to apply concepts learned in previous sections, especially:

- Classes
- Generic types
- Generic classes
- Access modifiers
- Optional properties

The project builds a **Linked List** data structure using TypeScript.

---

# 2. What Is a Linked List?

A linked list is a data structure made up of **nodes**.

Each node:

1. Stores a value.
2. Knows about the **next node**.

Conceptually:

```text
Node → Node → Node → Node
```

For example:

```text
10 → 5 → -3 → null
```

Each node contains something like:

```text
[value | next]
```

So:

```text
[10 | →] → [5 | →] → [-3 | null]
```

Unlike an array, the nodes don't need to be stored next to each other in memory.

The important idea for this project is:

> **Each node is connected to the next node.**

A linked list can sometimes be more efficient than an array for certain operations, but it also has limitations. In many real-world situations, an array is still the better choice.

---

# 3. `ListNode<T>` — Generic Class ⭐⭐⭐

```ts id="6k1q8a"
class ListNode<T> {
  next?: ListNode<T>;

  constructor(public value: T) {}
}
```

This is a **generic class**.

`T` represents the type of value stored inside the node.

So:

```ts id="4x7x5p"
ListNode<number>;
```

means:

> This node stores a number.

While:

```ts id="g3qv7r"
ListNode<string>;
```

means:

> This node stores a string.

### The value

```ts id="4e4j28"
constructor(public value: T) {}
```

Because `value` is `T`, the node can store whatever type the linked list specifies.

For example:

```ts id="n5v3u8"
const node = new ListNode<number>(10);
```

or:

```ts id="k8q2zp"
const node = new ListNode<string>("Omar");
```

---

# 4. The `next` Property

```ts id="t0g4la"
next?: ListNode<T>;
```

This means:

> `next` can contain another `ListNode<T>`, or it can be `undefined`.

The `?` makes the property optional.

This makes sense because the **last node doesn't have a next node**.

Conceptually:

```text
10 → 5 → -3 → undefined
```

So:

```text
first node
    ↓
 ListNode<number>
    ↓
 next
    ↓
 ListNode<number>
    ↓
 next
    ↓
 ListNode<number>
    ↓
 undefined
```

### Important

Notice that `next` is also generic:

```ts
ListNode<T>;
```

This ensures that the next node stores the **same type of value**.

A `ListNode<number>` should link to another `ListNode<number>`, not a string node.

---

# 5. `LinkedList<T>` — Generic Class ⭐⭐⭐

```ts id="8h4m3p"
class LinkedList<T> {
  private root?: ListNode<T>;
  private tail?: ListNode<T>;
  private length = 0;
}
```

Again, the class is generic.

`T` represents the type of values stored throughout the list.

So:

```ts id="z2g6w1"
LinkedList<number>;
```

means:

> This linked list stores numbers.

And:

```ts id="x5f9q2m"
LinkedList<string>;
```

means:

> This linked list stores strings.

---

# 6. `root`

```ts id="k0r8vx"
private root?: ListNode<T>;
```

`root` points to the **first node** in the linked list.

Example:

```text
root
 ↓
10 → 5 → -3
```

The property is:

- `private` → only the class can directly access it.
- `?` → the list may initially have no root.
- `ListNode<T>` → when it exists, it is a node containing values of type `T`.

---

# 7. `tail`

```ts id="s3p6jd"
private tail?: ListNode<T>;
```

`tail` points to the **last node**.

Example:

```text
root                tail
 ↓                    ↓
10 → 5 → -3
```

Keeping a reference to the tail makes adding a new element more efficient.

---

# 8. `length`

```ts id="d4x7nc"
private length = 0;
```

This keeps track of how many nodes are currently in the list.

Initially:

```text
length = 0
```

After adding three values:

```text
length = 3
```

It's private because users of the class don't need to modify it directly.

---

# 9. Adding Elements

The `add()` method:

```ts id="p8z3kf"
add(value: T) {
  const node = new ListNode(value);

  if (!this.root || !this.tail) {
    this.root = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    this.tail = node;
  }

  this.length++;
}
```

Because the class is generic:

```ts id="e6w1qn"
value: T;
```

the value must match the type of the list.

---

## Creating the Node

```ts id="v5m2cx"
const node = new ListNode(value);
```

If this is:

```ts id="0r7s4k"
LinkedList<number>;
```

then `value` is a number and the created node is effectively:

```text
ListNode<number>
```

If it is:

```ts id="h3j8qa"
LinkedList<string>;
```

then it becomes:

```text
ListNode<string>
```

---

# 10. Adding the First Element

```ts id="u8n4kd"
if (!this.root || !this.tail) {
  this.root = node;
  this.tail = node;
}
```

If the list is empty, there is no root or tail.

So the new node becomes **both**:

```text
root
 ↓
10
 ↑
tail
```

This is the first node in the list.

---

# 11. Adding Another Element

If the list already contains nodes:

```ts id="c7x2pm"
else {
  this.tail.next = node;
  this.tail = node;
}
```

Suppose we have:

```text
root
 ↓
10 → 5
     ↑
    tail
```

When adding `-3`:

```ts id="f9v5zr"
this.tail.next = node;
```

creates:

```text
10 → 5 → -3
```

Then:

```ts id="a2k7xd"
this.tail = node;
```

moves the tail:

```text
root
 ↓
10 → 5 → -3
          ↑
         tail
```

---

# 12. Updating `length`

Every successful `add()` ends with:

```ts id="q4m8vy"
this.length++;
```

So:

```text
add(10)  → length = 1
add(5)   → length = 2
add(-3)  → length = 3
```

---

# 13. Getting the Number of Elements

```ts id="r6c1wp"
getNumberOfElements() {
  return this.length;
}
```

Since `length` is maintained internally, users can ask the list for its size without modifying it.

```ts id="b9n3xt"
console.log(numberList.getNumberOfElements());
```

Output:

```text
3
```

---

# 14. Printing the List

```ts id="e2m7qa"
print() {
  let current = this.root;

  while (current) {
    console.log(current.value);
    current = current.next;
  }
}
```

The method starts at the root:

```text
current
   ↓
10 → 5 → -3
```

Then:

```ts id="p4c8zs"
current = current.next;
```

moves to the next node:

```text
10 → 5 → -3
      ↑
    current
```

Then:

```text
10 → 5 → -3
           ↑
         current
```

Finally:

```text
current = undefined
```

and the loop stops.

### The important pattern

```text
current = root

      ↓
process current
      ↓
current = current.next
      ↓
repeat until undefined
```

This is the basic way to **traverse a linked list**.

---

# 15. Using the Generic Linked List

### Number list

```ts id="j8s4vn"
const numberList = new LinkedList<number>();

numberList.add(10);
numberList.add(5);
numberList.add(-3);
```

The `<number>` tells TypeScript:

> This list is for numbers.

Therefore:

```ts id="q7m2xc"
numberList.add("Omar");
```

would be an error.

---

### String list

```ts id="w3k9fp"
const nameList = new LinkedList<string>();
```

Now:

```ts id="a6v1rd"
nameList.add("Omar");
nameList.add("Ahmed");
```

is valid.

But:

```ts id="n2x5qb"
nameList.add(29);
```

is not valid.

---

# 16. Why Generics Are the Main TypeScript Lesson Here ⭐⭐⭐

Without generics, you might create separate classes:

```text
NumberList
StringList
UserList
ProductList
...
```

That would duplicate the same logic.

With:

```ts id="c5q8wm"
class LinkedList<T>
```

you create **one reusable class**.

Then:

```ts id="b1v6zr"
LinkedList<number>;
LinkedList<string>;
LinkedList<User>;
LinkedList<Product>;
```

can all use the same implementation.

### Mental model

```text
LinkedList<T>
      ↓
T = number
      ↓
LinkedList<number>

T = string
      ↓
LinkedList<string>

T = User
      ↓
LinkedList<User>
```

This is exactly why generics are powerful:

> **Write the logic once, while keeping it type-safe for different types.**

---

# 17. The Alternative `add()` Implementation

The course first shows a simpler implementation:

```ts id="m7c2qa"
add(value: T) {
  const node = new ListNode(value);

  if (!this.root) {
    this.root = node;
  } else {
    let current = this.root;

    while (current.next) {
      current = current.next;
    }

    current.next = node;
  }

  this.length++;
}
```

This works by starting from the root and walking through the list until it reaches the last node.

```text
root
 ↓
10 → 5 → 8 → 12
             ↑
          find this
```

Then it attaches the new node.

### Why the final implementation is better for this demo

The final version maintains:

```ts id="q1s6ye"
private tail?: ListNode<T>;
```

So it already knows where the last node is.

Instead of:

```text
root → node → node → node → last
```

searching for the last node every time, it can directly do:

```ts id="z5r8kp"
this.tail.next = node;
this.tail = node;
```

This makes adding to the end more efficient.

---

# 18. TypeScript Concepts Applied in This Project

This project reinforces several concepts from previous sections:

| TypeScript Concept               | Where it appears                                 |
| -------------------------------- | ------------------------------------------------ |
| Classes                          | `ListNode`, `LinkedList`                         |
| Generic classes                  | `class ListNode<T>`                              |
| Generic classes                  | `class LinkedList<T>`                            |
| Constructor parameter properties | `constructor(public value: T)`                   |
| Access modifiers                 | `private root`, `private tail`, `private length` |
| Optional properties              | `next?`, `root?`, `tail?`                        |
| Type annotations                 | `value: T`                                       |
| Generic instantiation            | `new LinkedList<number>()`                       |
| Type safety                      | number list cannot accept strings                |

---

# ⭐ What You Should Take From This Section

This section is **not primarily about learning Linked Lists**.

The Linked List is the vehicle for practicing TypeScript.

The biggest lesson is:

```text
Generic Class
      ↓
class LinkedList<T>
      ↓
Reusable implementation
      ↓
LinkedList<number>
LinkedList<string>
LinkedList<User>
...
      ↓
Type-safe reuse
```

And the second important lesson is how TypeScript features work naturally together:

```text
Class
 +
Generic
 +
Access modifiers
 +
Optional properties
 +
Constructor parameter properties
      ↓
A reusable type-safe data structure
```

---

# 🧠 One-Minute Revision

```text
Linked List
→ collection of connected nodes

Node
→ stores a value + reference to next node

ListNode<T>
→ generic node

LinkedList<T>
→ generic linked list

root
→ first node

tail
→ last node

length
→ number of nodes

next?
→ next node may not exist

add()
→ create node and connect it

print()
→ start at root and follow next

current = current.next
→ move through the list

LinkedList<number>
→ number-only list

LinkedList<string>
→ string-only list

Main TypeScript lesson
→ Generics let us write one reusable,
  type-safe class for many different types.
```
