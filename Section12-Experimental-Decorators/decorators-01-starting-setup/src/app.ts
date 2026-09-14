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

/* --- my notes ---


In order to do more advanced things with decorators, you will have to note that some decorators for example, class decorators, but also
method decorators are also capable of returning something. Now, we are returning nothing! Notice that we are not talking about the decorator function
which gets returned in the decorator factory, but a return value inside of the decorator function itself.

let's try in withTemplate function, here it's is a decorator that is added to a class, so we can return a new constructor function, which will
replace the old one. so which it will replace the class to which you added to decorator you could say.
*/

function withTemplate2(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function <T extends { new (...args: any[]): { name: string } }>(
    oringinalConstructor: T,
  ) {
    // just syntactic sugar
    return class extends oringinalConstructor {
      constructor(..._: any[]) {
        super();
        // any logic, for example we can move the template rendering logic above
        console.log("Rendering Template! 😎");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

/*
So, now what we are trying to do is, trying to replace the class, (the constructor function to which we added our decorator) --> with a new class,
with a new constructor function, where I still execute the old logic, but where I also add my own new logic, and therefore now the template
should actually only be rendered to the dom if I really instantiate my object here, and not all the time... (not when the decorator function is executed)
which as we learned happenssss as soon as we define the class. 


now, also, a little tweak here, we don't call our original constructor in here anymore, instead we can just access this.name to get the name property value
of the instance we are creating



*/

// lecture 10

/*
We saw how we can build quite amazing things

with decorators, decorator factories and then also

by utilizing the return values of decorators

which in the examples,

the class decorator allows us to

basically replace the class we added the decorator to

with a class that is totally different,

that builds up on the existing class, like in our case

and that therefore might add some functionalities.

Now you can return values in other decorators too

but not in all of them.

Or not in all them the return value is respected.

Now, decorators where you can return something

are the decorators you can add to methods

and the decorators you add to accessors.

So here on the setter log 2 and log 3 on the method

these two decorators, log 2 and log 3 these also could

return something and TypeScript would use it.

The decorators on properties and on parameters

of course, also can return something

but TypeScript will ignore it.

So return values are not supported there

or are not used to be precise.

Now what can you return on log 3?

So on method decorators and on log 2,

so on accessor decorators though.

You can return a brand new property descriptor.

Log 2 and log 3, which are the two decorators

I'm talking about, right?

Log 2 and log 3, both get the descriptor off the property,

off the method, you could say, they are attached to.

Because an accessor is kind of like a method,

you have a function that gets executed there.

Now the property descriptor is a JavaScript thing,

as you know, if we have a look at this page again

and we reload it we see that, for example

for our accessor decorator,

the property descriptor is this object here which has

the configurable and enumerable

and get and set properties.

And for the method decorator our descriptor is

this object here which also has

configurable, enumerable, value and writable.

And this is vanilla JavaScript.

You have property descriptors in vanilla JavaScript as well.

They allow you to define a property in more detail.

You can of course assign a value to a property

and since we're talking about a method,

the value is a function in this case

but you can also control whether it's writable

so if it can be changed after it has been created,

after the object has been created.

Whether it's configurable,

so if you can change it's

configuration and if you can delete this property.

And if it's enumerable,

which means if it shows up when you loop

through your object for example.

And therefore a method for example

by default this is set to false so that

if you use a for in loop on an object

this method is not printed as a property.

For an accessor we also got

configurable and enumerable,

but we get and set and there you could of course,

also, for example, return a new descriptor which

assigns a brand new set method or which suddenly

also adds a get functionality.

So here in log 2 and log 3 you can return a new

descriptor object in the end and make it clear

to TypeScript that you will do so by returning

or by setting the return type to property descriptor

and there you can therefore also set the set keyword,

the get keyword, the configurable or the

enumerable property and change how this accessor

or method is configured.

Now I don't wanna do that here for the accessor,

there's nothing interesting I could do with it

therefore I will not return a property descriptor,

but I will actually show you an example with the method

decorator where we will return something and we can build

interesting with the help of decorators.

*/

// lecture 11
// so, we can return something on method decorators, and that something should be a descriptor, which allows us to change the method or
// change the configuration of the method.

// first add a simple button in html

//then

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);

/*

Now, if we save that,

and we go back to our page and I click on this button,

we get undefined here, though,

we don't get our message being shown.

And the reason for that is that with an event listener,

if we point at a function that should be executed

the this keyword inside of that function

will not have the same context or reference

as it has if we call just p.ShowMessage,

in this case, this would refer to the printer.

No, in the scenario here where we use an event listener,

this will refer to the target of the event,

because addEventListener in the end binds this

in the function which is to be executed

to the target of the event.

And of course, I don't want this.

Now, a common workaround here

would be to use the bind method

and bind showMessage to p, or bind this in showMessage to p

so that when this executes, this is not referring

to what addEventListener wants it to refer to

but instead this inside of showMessage

will refer to this p, to this object here again.

And if we're now, if we reload here

and I clear this again, now we see this works!

Now, that is all default JavaScript.
*/

// Now, we will build a decorator, which we can add to this method, which will automatically bind this to the surrounding class,
// so to the object, this method belongs to, every time it's called, no matter where we call it.

// couple of arguments =>
// target: any => it's either the prototype of the object we're working with
// or its constructor function if we would be adding this to a static method,
// but here it will be the prototype because we will add it to an instance method,

// then we have the methodName, a string or a symbol, maybe number of course
// last descriptor => propertyDescriptor
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  // we get the originalMethod like this
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // again, the getter is basically like having a value property with extra logic that runs before the value is returned
      /*
      And now the big question, of course,

is what does this refer to in here?

Keep in mind it's inside of this getter method

so this will refer to whatever is responsible

for triggering this getter method.

And that's the trick now,

the getter method will be triggered

by the concrete object to which it belongs,

so this inside of the getter method

will always refer to the object

on which we defined the getter.

This will not be overwritten by addEventListener

because the getter is like an extra layer

between our function that's being executed

and the object to which it belongs

and the Event Listener.

So therefore, this in here will refer

to the object on which we originally defined the method.

So we can safely bind this for the original method

and ensure that now this inside of the original method

will also refer to the exact same object.
      */
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
}

/*
Now I will return the bound function here

and thereafter, outside of this adjusted descriptor,

return the adjusted descriptor.

So that's our decorator function,

returning a new descriptor object,

and therefore this descriptor object

will override the old descriptor,

that is what TypeScript will do with it.

TypeScript will then replace the old methods descriptor,

so the old methods configuration

with this new configuration here,

which added this extra getter layer.
*/

// change target and methodName to _,because not interested in them

/*
And now let's have a look at that,

let's click Click Me, and you should see This Works!

If I reload, this works.

Because this is now bound correctly.

And just to verify that it's really our decorator

that makes a difference here,

if I would remove the binding here

in my getter and the decorator

and I save that, you see that if it is now reloads

and we click Click me, we see undefined again.

So it's really this extra getter layer

which does its work here

which ensures that this is always bound correctly

no matter how you call showMessage.

If we called it like this directly on the object

it will work, if we call it here like this

with an event listener, it also works.

So you see this works here,

which in the end is coming from this showMessage call

and then you also see it works if I click on the button.

So this is one neat example

of how you can utilize decorators

to build a quite amazing functionality

and save you the hassle of manually calling bind everywhere.

Instead, you just bind it like this.
 */

// lecture 11 - validation with decorators

// class Course {
//   @Required
//   title: string;
//   @PositiveNumber
//   price: number;

//   constructor(t: string, p: number) {
//     this.title = t;
//     this.price = p;
//   }
// }

/*

Now, of course now when we want to instantiate this course,

we have to pass in a valid title and a valid price.

But one common scenario you might encounter

in some applications is that you fetch data,

let's say from a web resource and you get data where

you guess you have a couple of courses let's say,

but you don't know for sure.

Or, another possible scenario, you let users enter the data

and you simply want to assign that data

and trade a new course with the user-entered data

and you assume it's right, but you are not guaranteed

that it's right and therefore you want

to validate the input.

That's the scenario I wanna fake here.
*/

// add a simple form in html

/*
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Understanding TypeScript</title>
    <script src="dist/app.js" defer></script>
  </head>
  <body>
    <div id="app"></div>
    <button>Click me</button>
    <form>
      <input type="text" placeholder="Course title" id="title" />
      <input type="text" placeholder="Course price" id="price" />
      <button type="submit">Save</button>
    </form>
  </body>
</html>
 */

const courseForm = document.querySelector("form")!;

courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  console.log(createdCourse);

  if (!validate(createdCourse)) {
    alert("invalid input, please try again!");
    return;
  }
  console.log(createdCourse);
});

/*
Now, unfortunately this only works though if

I don't enter anything.

If I now click save, we see this course is created.

Now, this technically is a valid course

but of course, it's not really valid for our application.

We probably wanna have a title which is not empty

and a price which is greater than zero.

So we wanna add validation.

Of course we can simply add a if check here

and check if title, trim, length is greater than zero,

which means it is not empty

and where we also validate the price.

But that means that whenever we create a new course,

we have to add the validation logic here before we add it.

Wouldn't it be nice if the validation logic

would be included in the course class,

with the help of decorators, maybe?

And that's exactly what I wanna do here.
*/

// function Required() {}
// function PositiveNumber() {}
// function validate(obj: object) {}

/*
Now I will only provide a basic idea

of how we could implement this,

in the next module I will show you an example package

which does this in a way more elaborate way

and which we then will all use there

to play around with it a bit.

Now however here I want to implement

this with my own decorators

and I will add a decorator required here

and we'll add another decorator function

which I'll name PositiveNumber.

So I got two decorators here.

And now my idea is that we can add them here

to our properties, for example Required in front of title,

and positiveNumber in front of the price and typescript kind

of registers this somewhere and then

we got a third function, validate to which we can pass

a object so any object and typescript then has a look

at the project, finds any validation we registered

on this class for this object earlier

and applies our validation logic.

That's the idea I have here.

So, this could be part of a third-party library

we're exposing to you and then you just import required

positive number and validate to first set up the validators

and then at some point call validate.

So for example here when we created the course,

we can call validate and pass in the createdCourse

and if this is not true, so let's say

this should return true or false,

if this is not true, then we throw an error

or show an alert, invalid input please try again

and only otherwise we continue.

So that's my idea.

That we can call validate, this returns true or false.

True if it's valid, false if it's not valid

and we can therefore use the result.

So therefore we get a couple of things to do.

We need to make sure that when we add a decorator here,

this is somehow stored somewhere.

Again, keep in mind this could be part

of our own third-party library,

so in there we could have some kind of storage

that's stores that for this class and this title property

for example, we want it to be required.

And in validate, we can then check if in the storage

for the object we got, for the class the object is based on

we do have a validator registered for the title,

for the price and so on.

And we then run our validation logic.

That's my idea here.


 */

// lecture 12 - Validation with Decorators - Finished

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ["required", "positive"]
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
    /*Now of course this is a very naive validator.

If we had other validators registered

for this property already, I would now overwrite it here.

So it would be better to first retrieve

any existing validators and then copy them into this array

and only add required to that existing array.

Again, to save some time here,

and to just show the general idea,

I will have this more naive approach here. */
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function validate(obj: any) {
  const objVaidatorConfig = registeredValidators[obj.constructor.name];
  if (!objVaidatorConfig) return true;

  let isValid = true;

  for (const prop in objVaidatorConfig) {
    console.log(prop);
    for (const validator of objVaidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

/*
And therefore this now looks good to me

and this is now our first naive implementation

of how such a validator could work

with the help of TypeScript decorators.

And keep in mind that all of that here,

all the decorators, the validate function and the registry,

would be hidden away from you.

That could be part of a third party library

which you're working on,

of course in a more elaborate way than probably

which you share with your end users.

And you, as a end user, would just import these things,

add these decorators, and call validate,

and you would have a very convenient way

of adding validation to your classes then.
*/
