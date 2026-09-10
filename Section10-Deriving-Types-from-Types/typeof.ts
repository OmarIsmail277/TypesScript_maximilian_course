// Using "typeof"

const user = "Omar";

console.log(typeof user);

//

// typeof in typescript world
type UserName = typeof user; // since "user" is a const, UserName = "Omar"

// else, if it was a variable

let user2 = "medo";

type UserName2 = typeof user2; // type UserName2 = string

// that was a simple example to introduce it,
// now let's present a more realistic or useful example when using typeof operator in typescript world

// A more useful example

const settings = {
  difficulty: "easy",
  minLevel: 10,
  didStart: false,
  players: ["Omar", "Medo"],
};

// type Settings = {
//   difficulty: string;
//   minLevel: number;
//   didStart: boolean;
//   players: string[];
// };

function loadData(settings: Settings) {
  // ...
}

loadData(settings);

// better solution

type Settings = typeof settings; // type Settings here will then automatically be derived for you by TypeScript
// thanks to typescript typeof operator here

// also notice that although Settings type is defined below the function, the function can still see it and can use it
// as a type for its parameter

// we can also use it here directly in the function

function loadData2(s: typeof settings) {
  // ...
}

// that was another useful feature offered by TS which allows you to derive types from values

// Another great use-case for typeof

/*

Another Great Use-case for "typeof"
The typeof operator can also be very useful for quickly getting the type of a (potentially complex) function.

Consider the following scenario:

You have a function sum(a: number, b: number) that sums two numbers. You also have subtract(a: number, b: number) that subtracts two numbers.

In addition, you have performMathAction(cb) which receives a cb parameter. cb should be either a pointer to the sum or the subtract function. So that you could either call performMathAction(sum) or performMathAction(subtract).

Hence the idea is that performMathAction calls sum or subtract internally (and passes values to those functions).

This scenario is, of course, a bit made up but the described use-case of having a function that needs to interact with other functions is absolutely not - it's instead something you'll often do in your JavaScript / TypeScript code.

In order to properly define performMathAction, you must declare the type of the cb parameter.

You could do it like this:

function performMathAction(cb: (a: number, b: number) => number) {
  // some code...
}
But since you already defined sum and subtract somewhere else in your code, you can also simply derive the function type with help of typeof.

Like this:

function sum(a: number, b: number) {
  return a + b;
}
function subtract(a: number, b: number) {
  return a - b;
}
 
type SumFn = typeof sum;
type SubtractFn = typeof subtract;
 
function performMathAction(cb: SumFn | SubtractFn) {
  // some code...
}

*/
