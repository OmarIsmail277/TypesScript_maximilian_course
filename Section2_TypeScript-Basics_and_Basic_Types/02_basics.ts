// type assignment/ type annotation
let userName: string;

// type inference
// TypeScript will automatically infer the type of the variable based on the assigned value
let userAge = 38;

// if you have no initial type, you should defintely assign a type explicitly, but if you have an initial type, you should rely on typescript's inference,
// as it is more flexible and less verbose, unless you have a strong reason to overwrite the inferred type with an explicit type annotation.

// ...

userName = "Omar";
// userAge = "39"; // This will cause a type error because userAge is inferred to be of type number, and assigning a string to it is not allowed.

// Assigning types to function parameters

// you could also take advantage of type inference if you need to, by assigning an intial value to b like this , b=5 (standard default value assignment in JS),
// and then typescript will infer the type of b to be number, and you don't need to explicitly assign a type to it.

function add(a: number, b = 5) {
  return a + b;
}

add(10); // correct, because b is already assigned a default value of 5, which is a number
// add("10"); // This will cause a type error because a is expected to be of type number, and passing a string is not allowed.

add(10, 6); // correct, because both a and b are numbers
// add(10,"6"); // This will cause a type error because b is expected to be of type number, and passing a string is not allowed.

// Now, there are also some other places, where type assignments and type inference can be used, for example when working with classes or objects, in future insha'Allah
// variables and functions are amongest the most common places where type assignments and type inference are used in TypeScript,
// and they are very important for ensuring type safety and catching errors early in the development process.

// the "any" type

// we did learn about explicit type assignments and type inference, and where you can assign types or infer types
// but up to this point, in all these basic examples here, we always worked with one type, one kind of value => string, number, boolean, etc.
// but sometimes you have situations where you need more flexibility.

let age: any = 36;

age = "37";
age = false;
age = {};
age = [];

// but any is not recommended to be used, because it defeats the purpose of using TypeScript in the first place,
// which is to have type safety and catch errors early in the development process.
// with any, you are allowing anything, you are essentially back to Vanilla Javascript with that.
// use it only as a last resort, when you have no other choice, and you are sure that you need that flexibility, and you are aware of the risks and trade-offs involved.

// But if you can be more specific, there is a better alternative to any, which still give more flexibility than a single type.

// Union types

let age2: string | number = 36;
age = "37";
