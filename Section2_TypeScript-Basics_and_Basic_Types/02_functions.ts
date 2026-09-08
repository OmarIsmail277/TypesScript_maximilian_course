// Function return value types

function add(a: number, b: number): number {
  return a + b;
}

// it can be usually inferred using the return type it sees

// void type

function log(message: string): void {
  console.log(message);
}

// returns nothing, you don't need to set it, as it is inferred, but it's important to know about this void type here because it's a special type which you use in combination
// with functions or with function return values.

// You don't use it anywhere else in your TypeScript code. You'll not use void as a type for a variable or a parameter,
// but it is a very common return type for functions, if those functions simply don't return anything.

// -------------

// the "never" type

function logAndThrow(errorMessage: string): never {
  console.log(errorMessage);
  throw new Error(errorMessage);
}

/* Now the return type of that function is interesting, because it is void, But you could override it to never

never means that this function, will never complete, yes it will not return anything, but it will not return anything because it will never return

This log function up here will at some point be finished and then just not return anything.

while the other function, will not finish, you could say because it froze in error, which could crash your program, if you're not catching it somewhere else.

// So there is a subtle difference here!

And this can be expressed by using the never type.

---------


Now you might not care too much about that, you might be fine with inferred void type,

but you will see that never type in certain places in other projects

and by explictly setting it, you can make sure you 'll never accidentally use that function and try to store a return value in a variable or constant,
because if you try to do so, that constant or variable will have the never type inferred since the function returns never.

and if you then try to use that and try to access some property or anything like that, it wont work because typescript knows that his will never contain a value, so to say.

// just if you saw it you know what it's about.

and if you create a function that froze an error and that will therefore never return an error, you might just set theat return type here
to make sure that this function can never be used somewhere where a value is expected or anything like that.

*/

// Functions as Types

// function performJob(cb: Function) {
//   // ...
//   cb();
// }

// or

function performJob(cb: (m: string) => void) {
  // ...
  cb("Job Done!");
}

performJob(log);

// dealing with objects and methods

type User = {
  name: string;
  age: number;
  greet: () => string;
};

let user: User = {
  name: "Max",
  age: 39,
  greet() {
    console.log("Hello There!");
    return this.name;
  },
};
