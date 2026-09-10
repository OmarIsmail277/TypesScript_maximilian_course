type StringArray = string[];
// type ElementType<T extends any[]> = T[number];

// type Example1 = ElementType<StringArray>;

let text = 1;

// type Example2 = ElementType<typeof text>;

type GetElementType<T> = T extends any[] ? T[number] : never;
type Example1 = GetElementType<StringArray>;
type Example2 = GetElementType<StringArray>;

/**
 * Yet another TypeScript feature

that can help with deriving types from other types

is the conditional types feature.

And this is a feature which is particularly useful

for building utility types, helper types, you could say,

as I'll show you in this first example.

Let's say you have a situation

where in your application in different places

in that application, you're dealing with array types,

arrays of numbers, strings, objects, doesn't matter.

And you now wanna build a helper type

that makes it easy to extract the type

of the elements that are in the array,

so not the array type as a whole,

but just the type of elements in the array.

So if you, for example, have a string array type like this,

so I'm simply mapping the built-in string array type

to my custom type named StringArray,

and you then want to get the ElementType

of the elements in that array,

you could of course do so

by using StringArray[number] like that.

That's what you learned earlier in the course,

and that's not the conditional type feature.

But as a result, ElementType here would be string.

Now let's say you want to build a generic utility type

that you can use on all kinds of arrays

to extract the information about the types

that is managed by those arrays.

So that's stored as elements in the arrays.

You could achieve this by making ElementType generic,

and by trying to use this syntax.

However this fails because TypeScript doesn't know

whether T will really be an array.

Of course you could convince TypeScript

by adding a constraint here,

telling it that T will always extend some array type.

So an array full of anything,

where we don't care about the actual type

of value in there,

but it will be some array full of anything.

So in that case,

you could use ElementType on the string array here,

and example one would be string.

So now you would have a helper ElementType

which can be used on any array type

to extract information about the type

of value stored in the array,

like we're doing it here.

But one potential problem in a more complex applications

is that you can't use ElementType on anything

that's not an array.

So for example, if I had some text here,

so not a type but some value,

the text 'hello', could also be a variable of course,

and I then try to use ElementType

on the type of this text variable.

So on the type of the value that's stored in

that text variable, I would get an error

that my string here is not an array.

And of course the same would be true

if this were a number.

In that case I would get an error

that a number is not an array,

which of course makes sense.

And this of course is not necessarily a problem.

I mean we built a utility type ElementType here,

which can only be used on arrays,

that's not necessarily bad or a problem.

But you could build an even more generic helper type

which allows you to extract information from other types

by using this conditional type feature I want to show you.

So, for that I'll actually comment out this code,

and add a new type here,

which I'll again name ElementType

or GetElementType to make it clear

that this is kind of a utility type.

And now here I'll again make it generic,

but I won't add that constraint

that it only works on arrays.

Instead, we can make this a conditional type

by adding a ternary expression-like syntax

on the right side of the equal side here.

And again, what I'm about to write

will look like a ternary expression,

but we are in TypeScript world here,

we are defining a type,

so it will be a TypeScript feature

just using a syntax that looks like ternary expressions

in JavaScript, because the syntax looks like this.

We can take a look at the concrete type we'll get

when we use GetElementType on some other type,

and check whether it extends, any array.

So whether it is some array.

Now here I'm not defining a constraint

because I'm not using this here

between the angle brackets,

instead this is the syntax for writing a condition

in TypeScript, it is kind of writing equals, you could say,

using extends here.

I'm checking whether the type I'm getting

is an array full of anything.

Then you add a question mark and then

after the question mark, you define the type

that should be returned, you could say,

by GetElementType if this condition is met.

So if the type we're using GetElementType on

is some array.

And in my case here, that will be this type here

where I use this special syntax for extracting the type

of the elements in that array.

And I know that I'm working

with an array here due to this condition.

Now just as in ternary expressions in JavaScript,

you then also must add a colon to define an else case.

What should be the type returned by GetElementType

if this condition here is not met?

And that can be anything of your choice in the end.

For example, it could be T, so the unchanged type,

it could be never, to kind of make it clear

that this will not be a value

that should be returned by this type,

whatever you want.

Here I'll go for never.

And this now, allows me to use

GetElementType on my string array like this.

And in that case example one will be string.

So GetElementType will yield the type of the values

in that array, which in this case is string of course.

But if I bring back this example with the text here,

I can now use that for my second example,

still with GetElementType,

and pass in the type of this text variable,

which is number of course.

And example two will be never.

Now it would be number if it would just return T here

in that else case.

In that case example two would be number,

we would keep the original type,

but depending on how your utility type should work,

you can of course also change this to something like never,

so that example two is never

and is essentially a type we can't work with thereafter.

And you might wonder why you would want a feature like this.

Well, obviously these are advanced and to be honest,

niche features which you might not need all the time

and in very many projects.

You might especially not need features like this

when building applications with TypeScript.

But when building libraries or frameworks,

anything like this with TypeScript,

you sometimes might need features like this

to be able to work with the different kinds

of values your library might need to deal with

when being used by our developers.

That's one of the primary reasons

for why features like this exist,

which of course always makes it a bit hard

to show you good examples that are easy to grasp

and make sense at the same time.

But it hopefully is clear

how this conditional type feature here works.

It is essentially a ternary expression in TypeScript land.

And what it does, that it allows you to define a type

that will actually be a different type

depending on whether this condition here is met, or not.

 */

// Another Example

type FullnamePerson = { firstName: string; lastName: string };
type FullnameOrNothing<T> = T extends FullnamePerson ? string : never;

function getFullname<T extends object>(person: T): FullnameOrNothing<T> {
  if (
    "firstName" in person &&
    "lastName" in person &&
    person.firstName &&
    person.lastName
  ) {
    return `${person.firstName} ${person.lastName}` as FullnameOrNothing<T>;
  }

  throw new Error("No irst name and / or last name found");
}

const name1 = getFullname({});
const name2 = getFullname({ firstName: "Omar", lastName: "Ahmed" });

/*

Now, here's another example

for conditional types.

Let's say you wanna build a function, getFullName.

And in that function, you expect to get a person,

which should be some object type in the end,

but you don't care about the concrete type of object.

So it should just be any object.

And we can, of course, again, make that work

by adding a generic type parameter here,

so to say, so by making getFullName a generic function

where T extends object.

Now, inside of getFullName,

we then wanna check whether person

has a firstName property.

So whether there is a firstName property in person,

and if there also is a lastName property in person.

In addition, I wanna check that those properties

don't hold null or undefined values.

So I'll check if person firstName is truthy

and if person lastName is truthy.

And that's how you can do this in JavaScript.

And if that's the case, we can return a string,

a template literal.

So this is now not this template literal type feature.

Instead here we're writing some JavaScript code.

So this is a regular string created using back ticks,

using JavaScript's template literal feature.

And I'll inject person.firstName here, add a blank,

and then have person.lastName.

And if we don't make it into this if check,

so if we don't have a firstName or a lastName,

or if one of the two is falsey,

then I wanna throw a new error.

No firstname and/or last name found.

Something like this.

Now, that could be a function your application needs.

Now, getFullName will return a string here.

That's what TypeScript infers.

But actually, that's not entirely correct.

It will actually return nothing. It will return never,

so to say, if we don't make it into this if check

because we throw an error in that case.

That's again a scenario where a conditional type

can help even though we're not building a utility type here.

But this is one example

where a conditional type could be used in a function

or with a function that you might build

for your application

because here for the return type,

we could set up a conditional type where we check

whether T extends an object that has firstName

and lastName properties.

Now, I'll actually outsource this into a separate type

so that this line of code doesn't get too long

and I'll name it FullnamePerson.

So that is simply an object where we have a firstName

of type string and a lastName of type string.

So we can then check here if T extends FullnamePerson.

And if that's the case, then I know

that this function will return a string,

otherwise it will return never, like this.

So that's now a conditional type being used

for the return value type of this getFullName function

to make it clear to TypeScript

that this function will either yield a string

or never anything depending on whether the object we get

is a fullName person or not.

So whether it has a firstName or a lastName.

Now, here I'm getting an error

that my string here is not assignable

to my conditional type here, even though we know

that it makes sense.

So what we can do here

to fix this is grab this conditional type

and outsource it into another type.

fullName or nothing could be the name,

which, of course, must be a generic type here

since I'm using T.

And then we can use fullName

or nothing here as a return type.

And just pass T, the same T we have here to it.

And then use type casting here in our return statement

to make it clear that this is of type fullName or nothing

for the generic type we're getting when using getFullName.

And with that the error goes away.

And now we can use our getFullName function here,

let's say on an empty object,

in which case, name1 will be never

because this empty object doesn't have a firstName

or a lastName.

If I, on the other hand, use it on an object

where we do have a firstName

but no lastName, it's still never.

But if I add a lastName here as well,

like this, then name2 all of a sudden is a string

instead of never because of our conditional type here,

the fullName or nothing type.

And that's therefore never example

for a conditional type here being used on a function

that we might build like this

in the application we're building.

And with that, we have a very generic

and flexible, yet at the same time type-safe way

of building functions like this.


*/
