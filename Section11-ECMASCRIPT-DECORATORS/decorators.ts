function logger<T extends new (...args: any[]) => any>(
  target: T,
  ctx: ClassDecoratorContext,
) {
  console.log("logger decorator");
  console.log(target);
  console.log(ctx);

  //use decorators to change the thing you are attaching them to (the class for example), how? by returning a new class
  // that is based on the old class in the end
  return class extends target {
    age = 35;
  };
}

@logger
class Person {
  name = "Omar";

  greet() {
    console.log(`Hi I am ${this.name}`);
  }
}

// test

const omar = new Person();
omar.greet();
console.log(omar);

/*
 Understanding Decorator Code Execution Order
Now, of course in this example I have here,

I'm returning a new class

that's based on the input class, so to say.

And I'm adding the age property.

Now, since my decorator is named logger,

that's probably not the kind of behavior you would expect.

So what I want to do instead here

is add the constructor function,

which I can add like this.

Accept any amount of arguments, of any type.

And then in there, first of all,

execute the constructor of the base class.

So of the person class, by forwarding all those arguments

by using the spread operator on this args rest parameter.

And then I want to console log, class constructor.

Because it's a logger decorator after all.

And here I just wanna log some information

at different points of time.

First, when the class is defined in the end

and the decorator is first executed,

but then also whenever a new instance

of the class is created.

And here I can also console log this

to log the concrete instance that has been created.

And by doing that, I can, for example, delete this code

and instead create a second, new person.

And if I do that and I compile the code

and I execute it, you see I'm getting a bunch

of logs down here, these logs.

And I'm getting them because I have my logs here

in this returned, class constructor.

And that makes a bit more sense

for a decorator named logger.

Now what you can also see here in those log messages

is that these different log statements are executed

at different points of time.

The text logger decorator, followed

by information about the target

and the context is actually, written to the log is output.

When that class definition is parsed

by JavaScript, the text class constructor

and the information about the concrete class instance

on the other hand, is output multiple times.

Once for every instantiation of the class.

So there is a timing difference here

between class definition where the logger decorator

is attached and parsed and class instantiation

where the constructor is executed.

That's just all the worth noting here.

The code directly in the decorator,

like these log statements where I log target

and context is executed right when the thing,

the decorator is attached to is defined.

So when the class is defined here.

*/

/**
 * 
So let's build a method decorator here,
So that's how you can build

and use a decorator

and you can do anything you want with it in the end,

since you can return an updated version

of the thing you're attaching it to.

You can use it to add more properties, methods,

and that can make it a really powerful feature.

You could, for example, create a decorator

and share it as a library

so that other developers can use it

that enhances any kind of class it's added to

by adding extra methods to it or anything like that.

So that's really a powerful feature to consider

and be aware of.

Here, however, I'll leave it at that

and instead move on to a different kind

of decorator you can build

because as mentioned,

you don't just have class decorators,

instead you also have decorators

that can be added to methods or fields.

So let's build a method decorator here,
 */

// method decorator

function autobind(
  target: (...args: any[]) => any,
  ctx: ClassMethodDecoratorContext,
) {
  console.log(target);
  console.log(ctx);
}

@logger
class Person2 {
  name = "Omar";

  constructor() {
    this.greet = this.greet.bind(this);
  }

  @autobind
  greet() {
    console.log(`Hi I am ${this.name}`);
  }
}

const medo = new Person2();

// use it to solve a common problem

const greet = medo.greet; // problem
greet(); // undefined - error

// we can solve it by this in the constructor

// constructor(){
//     this.greet = this.greet.bind(this)
// }

// but that is annoying, and can be repetitive, decorators can make it handy and solve it simply as we will see

function autobind2(
  target: (...args: any[]) => any,
  ctx: ClassMethodDecoratorContext,
) {
  ctx.addInitializer(function (this: any) {
    this[ctx.name] = this[ctx.name].bind(this);
  });
}

@logger
class Person3 {
  name = "Omar";

  constructor() {
    this.greet = this.greet.bind(this);
  }

  @autobind2
  greet() {
    console.log(`Hi I am ${this.name}`);
  }
}

const medo2 = new Person3();
const greet2 = medo.greet;
greet2();

// replacing methods with decorators

function autobind3(
  target: (...args: any[]) => any,
  ctx: ClassMethodDecoratorContext,
) {
  ctx.addInitializer(function (this: any) {
    this[ctx.name] = this[ctx.name].bind(this);
  });

  return function (this: any) {
    // adding more code for the greet method
    console.log("Executing original function");
    // target();
    //to make this keyword set apporpirately because it matters to me
    target.apply(this); // ✅
  };
}

// Field Decorator

function fieldLogger(target: undefined, ctx: ClassFieldDecoratorContext) {
  console.log(target);
  console.log(ctx);

  /*
So it is a function that will be executed for you

after the field to which this decorator has been attached,

has been initialized.

So if you need to get access to the actual value

that's stored in the field inside of your decorator,

you can do so with help of this returned function

because here you'll get the actual value.

So I can console.log(initialValue)

and I can then change it by simply returning a new value

that should be set instead. maybe useful if fetching value from db or sth.
  */
  return (initialValue: any) => {
    console.log(initialValue);
    return "";
    //  I return an empty string.
    // So that's the value that will be used in that instance
    // of the class I'm creating for all the other code,
  };
}
// the type of target for the fields must be undefined, because the decorator code will be executed
// before the field is done initializing

class Person4 {
  @fieldLogger
  name = "Omar";

  constructor() {
    this.greet = this.greet.bind(this);
  }

  @autobind2
  greet() {
    console.log(`Hi I am ${this.name}`);
  }
}

// Building configurable decorators with factories
function replacer<T>(initValue: T) {
  return function replacerDecorator(
    target: undefined,
    ctx: ClassFieldDecoratorContext,
  ) {
    console.log(target);
    console.log(ctx);
    return (initValue: any) => {
      console.log(initValue);
      return initValue;
    };
  };
}

class Person5 {
  @replacer("")
  name = "Omar";

  constructor() {
    this.greet = this.greet.bind(this);
  }

  @autobind2
  greet() {
    console.log(`Hi I am ${this.name}`);
  }
}

/*
So we now saw field decorators,

method decorators, and class decorators,

and you'll see even more decorators later

and more use cases

once we dive into experimental decorators.

But before we go there,

I wanna dive into another important concept

that you'll often see in conjunction with decorators,

and that's the concept of decorator factories.

And a decorator factory in the end is just a function

that produces a decorator.

And why would you do that?

Well, let's say here for my field logger decorator,

where I'm changing the default value,

I actually want to be able to set the default value,

the field value should be changed to

from this place in my coat here.

So when attaching the decorator.

And for that, I'll also change the name to replacer,

which makes a bit more sense if I'm replacing the value.

But that still doesn't give me

any way of changing the value.

So what I would want to do is execute this decorator

as a function here

and pass my new default value as a argument,

that would be nice to do.

Now, of course, I could also set it just here,

but we just have a basic example here.

So that's what I would like to be able to do.

Imagine that we're building a decorator

that sends AHTDP request.

In that case, I might wanna set my URL here.

But to keep things simple, I just wanna be able

to directly set the default value,

this value should be changed to.

However, this is not how I can use it,

because these decorator functions like logger, auto bind,

and replacer should not be executed by you in your code.

Instead, you should just point at them

and then JavaScript will in the end execute them for you.

So in order to be able to use this decorator like this,

you must wrap it in another function

into a factory function.

So for that, I'll add another function,

name it replacer too

and rename this replacer here to replacer decorator.

And I'll move this replacer decorator

into the replacer function now,

and I'll return it there

because by doing it like this,

when I execute this function,

I actually get the actual decorator function

that should be added here.

So I again point at a function that's added as a decorator

simply by wrapping it in another function.

I'm executing the outer function

and the returned value, the inner function,

the actual decorator function is therefore,

again, placed here, you could say,

standard Java script in the end.

And now here I can accept my in it value

of type string or of type any to be more flexible.

And then use this in it value down here,

or actually use a generic type here

to get a bit more type support.

And with that, I can set my initial value here.

So if I now save this, compile this,

and execute it, I got the same behavior as before,

I changed the name to an empty string,

and I did that now with help

of such a decorator factory function.

And in the end, it's just my decorator being wrapped

and returned inside of another function.

And it's that other function which I execute here,

to then get the actual decorator that's added to this field.

And of course, you cannot just do that for field decorators,

but also for method and class and the other decorators.

*/

/*
And that's it for this introduction here

to the ECMAScript Decorators.

Now, in the next section,

we'll explore the Experimental Decorators,

which is the older approach

that has been around for a longer time,

and which is therefore the approach you'll see,

probably in most projects today,

if they're using TypeScript Decorators.

But of course, it is also important

to know about this feature in general

and to know about this official approach,

which is the future of Decorators, you could say.

And that is exactly what I introduced you to

in this section.
*/
