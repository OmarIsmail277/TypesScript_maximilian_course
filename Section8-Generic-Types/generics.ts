// A generic type we already now

let names1: string[] = ["Omar", "Ahmed"];
// Generic Type
let names2: Array<string> = ["Omar", "Ahmed"];

// we can say about generic types:

/*

types that need to work together with other types in order 
to describe a certain value type

Array type + String type

Generics = combinations of types


Array + number, boolean, .. etc

with that, we can build our own generic types and work with them
*/

// Creating and Using a Generic Type

// what we made before
type DataStore = {
  [prop: string]: number | string;
};

let store: DataStore = {};
store.name = "Omar";
// store.isHere = false;

// turning it into generic type
type DataStore2<T> = {
  [prop: string]: T;
};

let store2: DataStore2<string | boolean> = {};
store2.name = "Omar";
store2.isHere = false;

let nameStore: DataStore2<string> = {};

/**
 *  you can set up any store based on any

internally stored type you want.

And that is the benefit of generic types.

You can simply create more flexible types

where you don't have to decide about all the types

that will interact with the type at the point

where you're defining it,

but where you can instead decide such things

at the point where you're using it.

And that's sometimes a useful pattern.
 */

// Generic Functions & Inference

// function merge(a, b) {
//   return [a, b];
// }

// we could use any

// problem with any

// const ids = merge(1, 2); // returns array of any
// ids[0]. don't get auto completion because concrete type information
// gets lost after merge is done with those values due to us setting these parameters to any here

// here comes generic function to resuce
// same as before  in datastore

function merging<anything>(a: anything, b: anything) {
  return [a, b];
}

const my_ids = merging<number>(1, 2);

// we can omit number because TS already infers

// TS inference works well with Generics
//we can omit Array<string> abve

// working with multiple generic params

// problem in normal case

function merge2<T>(a: T, b: T) {
  return [a, b];
}

// const idss = merge2(1, "Omar");
// because we are using the same place holder for both parametrs

function merge3<T, Z>(a: T, b: Z) {
  return [a, b];
}

const idss = merge3(1, "Omar"); // correct and valid
// yo can also set <number, string> here as concrete values explictly that should be used
// instead of the placeholders but this is not neccessary here because of type inference

// Generics and constraints

/**
 * Now, sometimes when working

with Generic types and when building Generic functions

and so on, you also might want to allow some flexibility,

but you might not be happy with getting

all kinds of values for those placeholders.

For example, what if we had a function called mergeObj?

So, merge Object.

And the idea is that we get two values here

and we, again, merge them,

but I wanna merge them into a new object.

By creating a new object like this

and by then using the standard JavaScript spread operator

to spread all the properties

of the first value into this object

and all the properties of the second value.

That might be a utility function we wanna build.

Now, of course, again, the types are missing here

and we could therefore use any,

but, again, for the reasons mentioned before,

that's not ideal.

It's also not ideal, by the way,

because here in this case, when I use merge object

and I try to merge to numbers like this,

that won't work with the spread operator.

If you console lock the result of merging this here,

and you then compile this code,

and you then run the compiled JavaScript file,

you'll see an empty object will be output here,

because merging two numbers doesn't really do anything

when doing it like this.

So, any is not a great choice here.

Now, again, we can use a placeholder,

we can turn this into a Generic function

and use

T like this.

We could also use multiple placeholders,

but let's start with one.

Now, with that, we can still use

this function like this though,

and that might be exactly the kind

of thing we don't wanna allow.

We might be happy here with getting

different kinds of values, but not all kinds of values.

And that's why TypeScript allows you

to add a so-called constraint to your placeholders,

to your Generic type parameters as they're also called.

Because these things here, these placeholders,

are essentially parameters

for the Generic type you are building.

And you do add a constraint here

by adding the extends keyword.

A special keyword provided

by TypeScript here in this context

to allow you to define a constraint for this placeholder.

Essentially, extends tells TypeScript that the actual type

that will be used here when using merge object,

so it will be used for these parameters in the end,

must extend a certain other type of your choice.

For example, number.

That it must be something

that has something to do with the number type

to put it like this.

And as a result, if I were to add number here,

I'd get an error that the spread operator

makes no sense when being used on a number.

Because, indeed, here I don't want number,

this was just an example.

Instead, here we could say

that we want to extend the object type.

This tells TypeScript that the actual type

that will be used here must be some object,

any kind of object, but it has to be an object.

A number doesn't qualify.

Hence, I'm getting this error here

that a value of type number is not an object.

Instead, now we could pass an object here

where we have, like, a username, let's say,

and then we could pass a second object here

where we had, like, a H,

so that we're feeding two objects into merge object.



 */

// Constraints & Multiple Generic Types

/**
 * 
 * 
 * Now, one interesting thing you'll see

is that the inferred type here is rather complex.

Now it's a union type of multiple different objects,

and the reason for that

is that I'm using one single type placeholder T

for two parameters

and I'm then passing two different objects

into merge object.

Therefore, we actually have two values

of two different kind of object types.

Sure, they're both objects,

but the concrete object types are different.

The first object is a object

with a property called username, which holds a string.

And the second object is a totally different object,

which has a age property of type number.

TypeScript could throw an error,

therefore, that we have one placeholder,

but two different types here, but it doesn't do that.

Instead, it decides that we have probably one shared type

that's common to both objects,

and that would be an object that has both a username

and an age property,

but username can be string or undefined,

and age can be a number or undefined.

That's the only way of making both

of these values work based on one shared type,

and that's why we have such a complex inferred type here.

Now therefore, what we could do here

is we could add a second placeholder U,

which should also extend object

and which we use for the second parameter like this.

With that, the inferred type is still not trivial,

but definitely a bit less to read.

Now this essentially says

that we have two different object types passed

into merge object and we get back a new object type,

which is the combination of these two objects.

So an intersection type of these two object types

in the end,

that's what we're getting back from merge object.

And with that, long story short,

we built a generic merge object function,

which uses multiple placeholders

that do allow all kinds of different object types

but that need object types

that do not work with numbers, strings

or anything like that.

And therefore, type constraints

as we have them here are another crucial feature

when working with generic types or generic functions

or anything like that.
 */

// Working with generic classes and interfaces

class User {
  constructor(public id: string | number | object) {}
}

// generic type

class User2<T> {
  constructor(public id: T) {}
}

const user = new User("i1");

// user.id // typescript understands that it's a string

// generic interfaces

interface Role<T> {}

/**
 * Essentially in any place in TypeScript

where you are defining some kind of type

as you are doing when you're defining a class or a function

or a standalone type in all these places,

you can use this generic type feature.
 */

// Summary

/**
 * 
 * [Maximilian Schwarzmüller] And that's already it

for this section on Generic types.

Generics or Generic types

can be a feature that can definitely look intimidating

and hard to grasp at first,

but as you can hopefully tell from all these examples,

in the end,

it's a really useful feature

that isn't actually that complex.

Now, of course, as everything,

it'll take practice to find out when exactly

you want to use this feature,

and it can definitely be confusing at times,

but in a nutshell,

it's really only about being able to build flexible types,

where multiple value types work together.

Now, there is more you can do with Generics

and with types in TypeScript in general,

and we'll explore that in the next section.

For the moment you know, what Generics are

and why this is a useful feature.
 */
