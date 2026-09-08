// null & undefined - special types

// before we learned about void types, which is not returning anything
// now there two kinds of related types which are not specific to functions though

// the first one is the null type

// variable a type set to null
let a: null;

a = null; // ✅
// a = "Hi"; ❌

let b: null | string;

b = "omar";
// ....
b = null;

// why would that be helpful?
// well, this indeed is not helpful, but combined with other types in a union type, this can be helpful
// because this means that a variable can hold some other value, but it might also hold null

// also undefined

let c: undefined | string;

c = "omar";
// ...
c = undefined;

// Forced "Not Null" & Optional Chaining

const inputEl = document.getElementById("user-name")!;

// you're convincing TypeScript, so to say, that this here will not yield null
// and therefore this ofcourse is a dangerous operator, if you are wrong, this may lead to runtime error, because it silenced TS

// could also use it here
// console.log(inputEl!.value);

// Optional Chaining

// console.log(inputEl?.value);

// here you have no fallback code that executes if this null, like in the guard clause(if condition)

// type-casting

// now we still get an error here => Property 'value' does not exist on type 'HTMLElement'
// console.log(inputEl?.value);
// because HTMLElement is very generic and TS does not know wht type of element it will be,
// for example here because value is available on input element and not available on others

// we know that inputEl is actually an input element, but also we need to let TS know,
// solution is type-casting or type-assertion as it is also called

// it is a concept of converting some type to another type
// you do this with the help of the "as" operator

const inputEl2 = document.getElementById("user-name") as HTMLInputElement;
console.log(inputEl2.value);

// Now, with that we also got rid of the null case, by the way because we overwrote both types, HTMLElement and null with this type => HTMLInputElement
// we can also do that
// const inputEl2 = document.getElementById("user-name") as HTMLInputElement | null;

/*
Now, just as with the **non-null assertion operator (****!****)**, you should be careful with this.

Sometimes it is necessary, and sometimes you need this code. But of course, every time you **override the type inferred by TypeScript**, you take responsibility for making sure that you're actually working with a value of that type.

For example, if `getElementById()` turns out to yield some ordinary HTML element, which is **not an input element**, TypeScript wouldn't complain about your code. But you could potentially run into a **runtime error** or some nasty bugs.

So that's just something to be aware of.

Nonetheless, here it is a good solution to make sure that we can safely access the `value` property down there, because this property does exist on values of type `HTMLInputElement`.

And that's therefore a **very commonly used and important TypeScript feature**.


*/

// unknown type
// it's typically used in conjunction with functions

function process(val: any) {
  val.log();
}

// we might not know the value that is coming for us as a parameter for the function
// as a first solution, that we studied is to create a union type => string | number ...,that lists all the potential types we might be working with
// that would be a good solution, but we might not know what values we are going to deal with, in that case, we might use the any type, but of course with that, anything is allowed.

// And that's where the unknown type comes into play, it's a bit like any, but then it's not
// and the important difference is that if you have the any type, you can use this value in any way you want and you'll never get an error
// we can try to call a log method on val, and typescript wont complain, because any does allow anything. You are basically back to vanilla JavaScript with that.

// with "unknown", that is different, now we're getting an error, that val might not have a log method at the end - that it is of type unknown -
// and what "unknown" does is that forces you, the developer, to add some extra if checks, before you use the received value in a certain place.

function process2(val: unknown) {
  if (
    typeof val === "object" &&
    !!val &&
    "log" in val &&
    typeof val.log === "function"
  ) {
    val.log();
  }
}

/* and that is the idea behind unknown, it's definetely a bit of a more advanced types, can be very useful if you're writing very generic code, 
if you're writing library code, where you might not know in advance how your code is going to be used and with which kind of values.

In such cases, unknown can be very useful, It is a bit more advanced, but it is a commonly used type

that also is narrowing, we're narrowing down val to be an object with a log method, will be explored later in the couse in a more general way.

But it is important to understand that TypeScript does evaluate the overall code base
to derive the type of val in this place here and that the unknown type is a pretty useful type
in situations where you don't know with which kind of value you are going to work.
*/
