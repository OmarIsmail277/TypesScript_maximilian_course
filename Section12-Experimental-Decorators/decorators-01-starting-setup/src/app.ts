// lecture 1

// function Logger(target: Function) {
//   console.log("Logging...");
//   console.log(target);
// }

// @Logger
// class Person {
//   name = "Omar";

//   constructor() {
//     console.log("Creating person object...");
//   }
// }

// const pers = new Person();
// console.log(pers);

// decorators execute when your class is defined, no when it is instantiated.
// you don't need to instantiate your class at all.
// we could remove that code for instantiating the class,
// and we would still get that decorator output.
// so the decorator runs when JavaScript finds your class definition,
// your constructor definition.
// not, when you use that constructor function to instantiate object.
// That's really important to understand.
// this is our first decorator, it's not the only way of how we can
// create a decorator though.

// ---------------------

// LECTURE 2

// besides creating a decorator like above, we can also define a decorator factory
// which basically returns a decorator function, but allows us to configure it when we assign it
// as a decorator to something

function Logger(logString: string) {
  console.log("LOGGER FACTORY");
  return function (target: Function) {
    console.log("Logging" + " " + logString);
    console.log(target);
  };
}

// @Logger("LOGGING - PERSON")
// class Person {
//   name = "Omar";

//   constructor() {
//     console.log("Creating person object...");
//   }
// }

// LECTURE 3
// BUILDING MORE USEFUL DECORATORS

function withTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function (target: any) {
    console.log("Rendering Template! 😎");
    const hookEl = document.getElementById(hookId);
    const p = new target();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

// @withTemplate("<h1>My Person Object</h1>", "app")
// class Person {
//   name = "Omar";

//   constructor() {
//     console.log("Creating person object...");
//   }
// }

// used also in angular, more advanced decorators of course than just that basic one

// lec4- Adding multiple decorators

@Logger("LOGGING - PERSON")
@withTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Omar";

  constructor() {
    console.log("Creating person object...");
  }
}

// compiles successfully without error, but we might ask,
// in which orders do these decorators execute?

// logs order in the console
/*
Rendering Template! 😎
app.ts:89 Creating person object...
app.ts:41 Logging LOGGING - PERSON
app.ts:42 class Person {
    constructor() {
        this.name = "Omar";
        console.log("Creating person object...");
    }
}
*/

// that tells us that the execute bottom-up, the bottom-most decorator first
// then thereafter, the decorators above it

// AND NOTICE, here we are talking about the actual decorator functions,
// as the decorator factories run earlier,
// tested by inserting loggers , template factory, logger factory

// we see actually that the logger factory runs first then template factory
// because here is the normal order, regular JS rules apply here and the first
// function executes first

// lecture 5 - diving into Property Decorators

// now before exploring more useful usecases or scenarios for some decorators,
// lets see the other places where we can add decorators

// Well obviously we can add decorators to classes
// but there are more places where we can add them.
// For that I'll create a new class, because we need a class
// for any decorator we wanna use, but we don't have to add all decorators directly to the class.

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property Decorator!");
  console.log(target, propertyName);
}

/*
Property Decorator!
app.ts:134 Objectconstructor: class ProductgetPriceWithTax: ƒ getPriceWithTax(tax)set price: ƒ price(val)[[Prototype]]: Object 'title'
*/

// if you add a decorator to a property,
// the decorator receives two arguments.
// The first argument, is the target of the property
// and for an instance property like this one,
// which we call on a instance if you work with it.
// This will be the prototype of the object that was created.
// If we had a static property here,
// target would refer to the constructor function state.

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) this._price = val;
    else throw new Error("Invalid Price! Must be positive...");
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// it executes when you define this property basically to JS, as part of ur class, as part of this constructor function
// which is created here in the end
// this is when the property executes

// Lecture 6
// Accessor & Parameter Decorators

// Now beside properties, you can also add decorators to accessors

// and there I will create a new decorator function
// because this will now receive free arguments.
// Log2, it will also get the target which again
// is either the prototype,
// if we're dealing with an instance accessor,
// or if we're dealing with a static one,
// it will be the constructor function
// so we don't know we will be of type any.

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor Decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// then lets add it to the setter here
// let's see what we get

/*
Accessor Decorator!
app.ts:192 {getPriceWithTax: ƒ}
app.ts:193 price
app.ts:194 {get: undefined, enumerable: false, configurable: true, set: ƒ}
*/

/*
you got the accessor decorator which executes here.
We got our prototype again, same as a buff for the property.
Then we got the name of our accessor, price in this case.
Not underscore price,
so not the property with which it deals internally.
Instead really the name of the accessor itself.
And we got a property descriptor here where we see
that a setter function is defined for example,
a getter function is not,
because for price I only have a setter, no getter.
And we see that it's not enumerable,
but that it is configurable.
So that we can change this definition here
for example that we can delete it and so on.
 */

// we can also add decorators to methods
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor,
) {
  console.log("Method Decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

/*
Now with that if I saved this,
this executes and you see here our method decorator
executes and then here we get our prototype,
same object as before.
We get the name of the method here
and we get this descriptor of this method here.
So the very same behavior as before basically,
just a descriptor is a little bit different
since it's a method descriptor
and not an accessor descriptor.
We got a value and a writeable property here.
Previously on the accessor descriptor,
we had get and set.
But that's just a javascript difference,
nothing TypeScript specific.
*/

// last, add decorator to a parameter
function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter Decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}
/*
Now what does a parameter decorator get as arguments?
Well, it gets the target same as before.
The next argument we get is the name,
and not the name of the parameter,
but the name of the method in which we used this parameter.
So basically, the same as in the method decorator thus far.
But the last argument is different.
This is now not the property descriptor,
but instead this is the position of this argument,
so the number of the argument.
Here for example, this would be the first argument.
So now again, let's copy that here
and put all of that into Log4 parameter decorator.
And let's output position here as well
so that we can see what's in there.
If we now saved it, we see our parameter decorator up there,
not the very last output because execution order
is different but we see our parameter decorator
here and then here.
We got the prototype as before.
We got the name of the method
where we used this parameter,
and then the index of that argument,
and that starts at zero,
so the first argument has a number of zero here,
an index of zero,
and that's our parameter decorator.
So these are all the places where we can add
decorators and TypeScript,
and we can do various things with them.
Now I will show you a couple of examples
in this module here,
and I'll also show you libraries or frameworks
that make heavy use of decorators.
And I'll show you what they do with decorators
to give you an idea of the power that decorators can have.
*/

// Lecture 7
// Before we dive into more examples, let's understand the order
// in which decorators run though. And here, it's important to understand

// first of all, it's important to understand that they all run without us instantiating this product
// they all execute when you defined this class (class Product)

// IMPORTANT: Decorators do NOT run when you call a method or access a property.
//
// Instead, a decorator executes when the class is defined.
// It allows you to perform behind-the-scenes setup work.
//
// This connects to the concept of metaprogramming:
// decorators can modify, configure, or store information about
// classes, methods, or properties behind the scenes.
//
// They are NOT event listeners that automatically run whenever
// you interact with a method or property.
//
// You can use decorators to set up behavior that will execute later,
// but that behavior is configured by the decorator during class definition.
//
// For example, a decorator can:
// // - Add extra functionality
// // - Add or store metadata
// // - Store information about a property or method
// // - Set up code that will execute when a method is later called
//
// IMPORTANT: The decorator itself runs at class definition time,
// not every time you create an instance.
//
// Example:
//
// @template
// class Person {}
//
// The decorator runs when the Person class is defined.
// It does NOT automatically run again every time you do:
//
// const person = new Person();
//
// If you want the template to be available when creating instances,
// the decorator would need additional logic to store that template
// somewhere behind the scenes, which could then be used later.
//
// So the core idea is:
//
// // Class is defined
// //        ↓
// // Decorator executes
// //        ↓
// // Behind-the-scenes setup
// //        ↓
// // Later, the class/method can use that setup
//
// Decorators can therefore add functionality that may execute later,
// but the decorator itself executes when the class is defined.

// Lecture 8
// Returning (and changing) a Class in a Class Decorator

// Class decorators can return something.
//
// For a class decorator, the returned value can be a new constructor
// function (or a new class) that replaces the original class.
//
// Example:
//
// @WithTemplate(...)
// class Person {}
//
// The decorator can return a new class:
//
// return class extends originalConstructor {
//   constructor(...args: any[]) {
//     super(...args);
//
//     // New logic here
//   }
// };
//
// The returned class extends the original constructor, so we keep
// the original class's functionality and can add our own functionality.
//
// `class` is syntactic sugar for creating a constructor function,
// so returning a new class ultimately means returning a new
// constructor function.
//
// IMPORTANT:
// The decorator itself still executes when the class is defined.
//
// But now the decorator returns a new constructor that replaces
// the original constructor.
//
// The new constructor runs when the class is instantiated:
//
// const person = new Person();
//
// So we can move logic from the decorator itself into the
// new constructor and make that logic run when an instance
// is created instead of when the class is defined.
//
//
// Execution flow:
//
// Class is defined
//       ↓
// Decorator executes
//       ↓
// Decorator returns a new class / constructor
//       ↓
// New class replaces the original class
//       ↓
// new Person()
//       ↓
// New constructor executes
//       ↓
// Original constructor runs through `super(...args)`
//       ↓
// Additional custom logic runs
//
//
// `super(...args)` is important because the new class extends
// the original constructor.
//
// By calling `super(...args)`, we execute the original constructor
// and preserve the original class's initialization and properties.
//
//
// Generic constructor type:
//
// function WithTemplate<T extends { new (...args: any[]): { name: string } }>(
//   originalConstructor: T
// ) {
//
//   return class extends originalConstructor {
//     constructor(...args: any[]) {
//       super(...args);
//
//       // Additional logic
//       // `this.name` is available because we told TypeScript
//       // that the constructor creates an object with a `name` property.
//     }
//   };
// }
//
// `T` represents the original constructor.
//
// `{ new (...args: any[]): { name: string } }` tells TypeScript that:
//
// // - The value is a constructor function.
// // - It can be called with `new`.
// // - It can accept any number of arguments.
// // - It creates an object with a `name` property of type string.
//
// This allows the decorator to safely work with classes that satisfy
// this requirement.
//
// The important difference is:
//
// // Decorator logic:
// // runs when the class is DEFINED.
//
// // Logic inside the returned constructor:
// // runs when the class is INSTANTIATED.
//
// This is one of the powerful features of class decorators:
// they can replace the original class with a new class that
// preserves the original functionality while adding custom logic.
