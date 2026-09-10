/*
So that were a lot of advanced features,

features that help you with deriving types from other types.

And as you saw throughout this section,

often we build utility helper types

like this return value type,

which we primarily built

so that we could use it in different places

of our application code

to extract type information from other types,

which we could then use in yet other places

to annotate our values, our variables, parameters,

and so on.

Now, this is such a common requirement

that the TypeScript team actually already built a bunch

of utility types into TypeScript.

Under the hood, those types use exactly the kind

of features we covered here, though, conditional types,

mapped types, the infer keyword and so on.

But if you browse the official documentation

and you find a link to this page attached to this lecture,

you'll see which utility types are built into TypeScript.

For example, also a return type utility type,

which in the end works exactly

like our return value type here.

So what we wrote here, that's what the TypeScript team wrote

for you, so that you can use this built

and return type instead of writing

and building this custom type yourself.

So instead of using our return value type here,

we could just use return type,

which is provided by TypeScript.

So this is not built by us.

This instead is a utility type provided by TypeScript

and it yields number just as our custom type did.

I, of course, showed you how you can build it on your own

because this is useful information which you might need

for your next projects.

But if you have a need for a certain kind of utility

or helper type,

it is worth checking the official documentation

to see whether such a type is maybe already built

into TypeScript.

For example, there you also have a partial type

that makes all properties of an object optional.

You also learned how you could do this on your own

with mapped types

by adding such a question mark as you learned.

But again, you don't need

to build it on your own necessarily.

There is a building utility type,

and therefore going through these types,

understanding what they do,

and which utility types exist is definitely a good idea

so that you can use them in your future projects.

https://www.typescriptlang.org/docs/handbook/utility-types.html

*/
