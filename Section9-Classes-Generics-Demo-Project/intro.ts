/*

It's again, practice time

or time for a small demo project,

which allows us to use at least some of those features

that were introduced in the previous sections.

Most importantly, we'll work with classes and generic types

or generic classes to be precise,

to build a linked list data structure with TypeScript.

And I'll explain what a linked list is in the next lecture,

by the way.

But we'll use this small demo project here

to explore working with generic types and classes

in TypeScript so that we get some practice there

before we then in the next sections,

we'll dive deeper into TypeScript.

 */

/**
 * 
 * So as mentioned,

we'll build a linked list data structure

with TypeScript in this section.

And that of course brings up one question.

What is a linked list?

Well, it's a data structure in the end

where you store connected values

or connected value containers.

You could say it's a bit like an array,

but it can be more efficient

behind the scenes than an array.

But it also has some extra limitations they offer

because in the end, the idea behind a linked list

is that you have a bunch of nodes in there

and you can think of a node as a container

that contains some value, a string or a number or an object

or an array or anything, any kind of value.

And the list is made up by multiple nodes

where those nodes are linked together you could say.

So in the end, every node links to the node next to it,

so it knows about the node next to it,

but only about that node, and that can make storing

and all the retrieving values pretty efficient,

which is why it's a data structure

that can sometimes be better than using an array,

for example, though it is definitely an advanced topic

and in many use cases, it won't matter

and it's probably not worth the effort.

But it is a nice practice

to build such a linked list data structure together

with the help of TypeScript.


 */
