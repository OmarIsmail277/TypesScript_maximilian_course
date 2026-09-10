function add(a: number, b: number) {
  return a + b;
}

type AddFn = typeof add;

type ReturnValueType<T> = T extends (...args: any[]) => infer RV ? RV : T; // T or never

type AddFnReturnValueType = ReturnValueType<AddFn>; // ✅

/*

So at this point,

you learned about a lot of

pretty advanced TypeScript features

that help you derive types from other types.

And as mentioned, they are relatively niche

and chances are high that you won't need all of them

or maybe none of them in most of your projects.

But they can come in handy from time to time.

Now, there is yet another important

TypeScript feature and keyword

that can be useful in certain situations.

And that would be the infer keyword,

which can be a bit tricky to understand at first,

but we'll get there step by step.

Now to understand it,

let's say we have a function add,

which takes two parameters, A and B,

which are both of type number,

and which then returns to sum like this.

Therefore, add has a return type of number.

And now let's say you wanna write a utility type

that helps you extract just that return type information.

Of course, as you learned before,

you can use type of,

the type of keyword which is supported by TypeScript

to get the type of some variable or constant

or in this case, function.

Therefore, AddFn holds the entire function type information.

That it is a function, that it takes two parameters

of type number and that yields a number.

And this can sometimes be useful.

But what if you want

the ad function return value type instead?

So not the entire function type,

but just the return value type.

Well, you can get it

with help of the infer key keyword I mentioned.

This key keyword, the infer keyword

needs to be used together with

this conditional type feature

I mentioned in the previous lectures though.

Because it works like this.

The add function return value type

or maybe just the return value type

to make the name a bit more generic,

must be a generic type.

So it must work together with some other type information.

And this other type information will be,

in our case here, the function type

for which we want to return the return value type.

So the information about which type of value

is returned by the function.

Now, first we must check whether

the type we got here really is a function type though.

And for that, we write a generic way

of describing a function.

We can use dot, dot, dot here, args

any array to describe that it can be a function

with any amount of arguments,

any amount of parameters which are of any type.

Now this dot, dot, dot syntax here might look weird,

but in the end, it's inspired by

JavaScript's rest parameters feature,

which allows you to kind of

group all the parameters received by a function

into one single array.

So that's a JavaScript feature,

which is picked up by TypeScript here

to simply say that

you don't care about how many parameters

this function type you're describing here will receive.

They're all grouped into

one parameter here in this type definition

and you don't care about their types,

you don't care about the number of parameters status,

what this says, and yet.

And then of course, here after this arrow,

you need to describe the return value type

of the function type that's passed as a type

for this type placeholder T here.

And of course, again, you don't care

about what the return value type is

or to be precise,

that's exactly the kind of information

you are trying to extract with that utility type.

You wanna find out which kind of value,

which type of value is returned by the function

that is provided for this placeholder.

And that's where you can use this inferred keyword

followed by any name of your choice,

like R for return value or RV, whatever you want.

And then like in any conditional type,

you add a question mark

and you now need to return

some type if this condition is met.

So if the type which is passed in for T is some function.

Well, in that case,

for this return value type utility type,

I wanna return this RV, this return value type

of this function.

And thanks to infer, you can do that.

So put in other words,

infer can be used here in your condition, in your check

to extract some extra information, some extra type

from that type you're checking against.

And you can then use this name you assigned here

on the right side of the question mark

to return it or manipulate it

and return the manipulated type whatever you want.

And of course, you also need to add an L's case.

And the L's case could again either be T again,

so the value that was passed to return value type

or never, for example,

to indicate that you weren't able to extract

a return value type from the type that was provided for a T.

And now with that,

you can use this return value type helper type here

to get the add function return value type

by using our return value type helper function on AddFN.

So on this ad function type,

which, remember, is the entire function type.

But I'm passing this as a type for the T placeholder

to return value type.

And as a result, the type of add function return value type,

so of this thing here, is number,

which is the return value type of this function type here.

So that definitely can again, be a bit tricky

to wrap your head around.

But in the end, the idea behind infer

is that you can use it in a conditional type,

in your check, in your condition

to extract some, you could say nested type information

from that type your checking against.

And you can then use it to return it, change it

whatever you want.

And with that, you can build utility types

like this return value type here.



*/
