# TypeScript — Section 1

## Lecture 4: Installing & Using TypeScript

---

## 🎬 Lecture Overview

This lecture explains an important limitation of TypeScript:

> **Browsers cannot directly execute TypeScript code.**

Therefore, when building browser applications, we need to **compile TypeScript into JavaScript**.

The basic workflow is:

```text
TypeScript (.ts)
       ↓
TypeScript Compiler (tsc)
       ↓
JavaScript (.js)
       ↓
Browser
```

---

# 1. TypeScript Doesn't Run Directly in the Browser ⭐⭐⭐

Suppose we have:

```text
calculator.ts
```

The browser cannot simply execute this file because TypeScript contains syntax that isn't standard JavaScript.

For example:

```ts
function deriveFinalPrice(inputPrice: number) {
  return inputPrice * 1.19;
}
```

The:

```ts
: number
```

is TypeScript-specific syntax.

The browser doesn't understand it.

Therefore, we need to convert the TypeScript code into JavaScript.

---

# 2. Compilation ⭐⭐⭐

The process of converting TypeScript into JavaScript is called **compilation**.

```text
calculator.ts
     ↓
 TypeScript Compiler
     ↓
calculator.js
```

The generated JavaScript contains code that JavaScript environments can execute.

For example:

### TypeScript

```ts
function deriveFinalPrice(inputPrice: number) {
  return inputPrice * 1.19;
}
```

### Compiled JavaScript

```js
function deriveFinalPrice(inputPrice) {
  return inputPrice * 1.19;
}
```

Notice that:

```ts
: number
```

has disappeared.

That's because the type annotation is a **TypeScript feature**, not JavaScript.

---

# 3. The TypeScript Compiler — `tsc` ⭐⭐⭐

The tool that performs this conversion is called the:

> **TypeScript Compiler**

Its command-line command is:

```bash
tsc
```

Think:

```text
tsc = TypeScript Compiler
```

When you run:

```bash
tsc calculator.ts
```

TypeScript compiles:

```text
calculator.ts
```

and produces:

```text
calculator.js
```

---

# 4. Installing TypeScript ⭐⭐⭐

Max uses **npm** to install TypeScript.

First, you need **Node.js**, because npm comes bundled with Node.js.

You can download Node.js from its official website.

The recommended version for most users is the **LTS (Long-Term Support)** version.

After installing Node.js, you can verify the installation:

```bash
node -v
```

and:

```bash
npm -v
```

---

# 5. Installing TypeScript Globally

Max demonstrates installing TypeScript globally:

```bash
npm install -g typescript
```

Let's break this down:

```text
npm
 ↓
Node.js package manager
```

```text
install
 ↓
Install a package
```

```text
-g
 ↓
Globally
```

```text
typescript
 ↓
The TypeScript package/compiler
```

So:

```bash
npm install -g typescript
```

means:

> **Install TypeScript globally on my computer.**

---

# 6. What Does "Globally" Mean?

A global installation means the TypeScript compiler is available from your system's command line.

Therefore, you can use:

```bash
tsc
```

from different projects without installing TypeScript separately in each one.

For example:

```text
Computer
│
├── Project A
│   └── calculator.ts
│
├── Project B
│   └── app.ts
│
└── Project C
    └── index.ts
```

A globally installed compiler can be invoked from these projects.

### ⚠️ Important

Max later teaches a **project-specific/local installation**, which is generally the approach you'll encounter in modern frontend projects.

For now, the goal is simply to understand the global installation and the compiler.

---

# 7. Mac vs Windows

Max uses macOS in the lecture.

On Windows, the command is the same:

```bash
npm install -g typescript
```

On macOS/Linux, you may sometimes need:

```bash
sudo npm install -g typescript
```

if your system requires elevated permissions.

### For Windows:

You normally **do not use `sudo`**.

---

# 8. Compiling a TypeScript File ⭐⭐⭐

Once TypeScript is installed, navigate your terminal into the project directory.

For example:

```bash
cd my-project
```

Then run:

```bash
tsc calculator.ts
```

The compiler will process:

```text
calculator.ts
```

and generate:

```text
calculator.js
```

---

# 9. Why Do We Need to Be in the Project Folder?

Because when you run:

```bash
tsc calculator.ts
```

the compiler needs to find the file you're referring to.

So your terminal should be located inside the project:

```text
my-project/
│
├── calculator.ts
├── index.html
└── ...
```

Then:

```bash
tsc calculator.ts
```

---

# 10. The Browser Uses the Compiled JavaScript ⭐⭐⭐

After compilation, your HTML should reference the JavaScript file:

```html
<script src="calculator.js"></script>
```

Not:

```html
<script src="calculator.ts"></script>
```

The browser receives:

```text
calculator.js
```

because that's the file it knows how to execute.

---

# 11. TypeScript Errors Also Stop Compilation ⭐⭐⭐

TypeScript doesn't only provide errors inside your IDE.

If your code contains an error, the compiler can report it as well.

For example, suppose we have:

```ts
function add(a: number, b: number) {
  return a + b;
}
```

and accidentally introduce an error.

When you run:

```bash
tsc calculator.ts
```

TypeScript will report the compilation error.

### Important idea:

```text
IDE
 ↓
TypeScript detects error
 ↓
❌ Fix it
```

And if you try to compile anyway:

```text
tsc calculator.ts
 ↓
TypeScript checks code
 ↓
❌ Compilation error
```

So the IDE and compiler both help catch problems.

---

# 12. IDE vs Compiler

These are two related but different things.

### IDE / Code Editor

For example:

```text
VS Code
```

can show TypeScript errors while you're writing code.

This gives you **immediate feedback**.

### TypeScript Compiler

```bash
tsc
```

actually performs the compilation process.

It checks the TypeScript code and generates JavaScript.

### Mental model

```text
             TypeScript code
                   │
          ┌────────┴────────┐
          ↓                 ↓
       VS Code             tsc
          ↓                 ↓
   Shows errors       Compiles code
                         ↓
                    JavaScript
```

---

# 13. Manual Compilation Doesn't Scale ⭐⭐⭐

Imagine a project with:

```text
100 TypeScript files
```

You wouldn't want to manually run:

```bash
tsc file1.ts
tsc file2.ts
tsc file3.ts
...
```

That's obviously inefficient.

In real projects, we configure TypeScript so that the compilation process can handle the project more systematically.

For example:

```text
Multiple .ts files
       ↓
 TypeScript compiler
       ↓
Multiple .js files
```

Later in the course, Max will show how to:

* Configure TypeScript projects
* Compile multiple files
* Automate compilation
* Integrate TypeScript into a larger build process

---

# 🧠 The Most Important Mental Model

Keep this picture in your head:

```text
        You write
      TypeScript code
           │
           ▼
        .ts file
           │
           ▼
   TypeScript Compiler
          (tsc)
           │
           ▼
       .js file
           │
           ▼
        Browser
```

The browser doesn't care about your TypeScript code.

It executes the **compiled JavaScript**.

---

# 🔥 Important Connection to Previous Lectures

Previously we learned:

> **TypeScript = JavaScript + additional features**

Now we can understand what happens to those additional features.

For example:

```ts
function calculate(price: number) {
  return price * 1.19;
}
```

The TypeScript-specific part:

```ts
: number
```

helps **you and TypeScript** during development.

But eventually:

```text
: number
   ↓
removed during compilation
```

and the browser gets normal JavaScript:

```js
function calculate(price) {
  return price * 1.19;
}
```

So:

> **TypeScript features help during development, then the TypeScript-specific syntax is removed when compiling to JavaScript.**

---

# ⭐ What You Should Remember

If you remember only these **6 things**, you've understood the lecture:

### 1. Browsers don't directly execute TypeScript.

```text
.ts ❌ → Browser
```

Instead:

```text
.ts → compile → .js → Browser
```

---

### 2. TypeScript needs a compilation step.

```text
TypeScript → JavaScript
```

---

### 3. `tsc` is the TypeScript compiler command.

```bash
tsc calculator.ts
```

---

### 4. `npm install -g typescript` installs TypeScript globally.

```bash
npm install -g typescript
```

`-g` means **globally**.

---

### 5. The browser loads the compiled JavaScript.

```html
<script src="calculator.js"></script>
```

not the `.ts` file.

---

### 6. TypeScript can catch errors before compilation/runtime.

You can often see the error directly in your IDE, and the compiler will also report it when you run `tsc`.

---

# 📊 Lecture Priority

**🟢 HIGH**

The commands themselves aren't the most important thing to memorize because modern tools often handle them for you.

The **workflow** is what you must understand:

> **Write TypeScript → compile it → get JavaScript → run JavaScript.**

Later, tools such as **Vite, Webpack, and other build tools** can automate much of this process.

---

# 🔑 One-Sentence Takeaway

> **TypeScript code doesn't run directly in the browser, so it must be compiled into JavaScript—using the TypeScript compiler (`tsc`)—which is then executed by the browser.**

---

## 🧩 Connection to Your Current Setup

Since you're currently using **npm and TypeScript on Windows**, the basic command Max demonstrates is exactly:

```bash
npm install -g typescript
```

Then you can verify the compiler with:

```bash
tsc --version
```

And compile a file with:

```bash
tsc filename.ts
```

We'll later move beyond this simple global setup and see how TypeScript is normally integrated into modern projects.
