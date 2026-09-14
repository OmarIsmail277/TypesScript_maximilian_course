/*
We had a look at a lot of decorators,

how you work with them,

how you can configure them,

how you can do stuff with them,

what you can do with them.

This hopefully shows you the complexity but also the power

of decorators and how you can think about them,

how you can use them.

You're not only able to create your own decorators,

there also is a rich ecosystem out there

of packages and frameworks that rely on decorators.

For example, class validator.

If you search for "ts class validator,"

you find a package which basically has

a more elaborate implementation of

our own custom validation logic we worked on.

This package can be added to any project

you are working on, and then you can

simply import a bunch of decorators

or decorator factories, as you can see,

since we execute them here.

Add them to your properties,

with or without some extra configuration,

depending on the validator it is,

and behind the scenes this will

manage such a registry, you could say,

such as configuration object in the end,

store your validator setup for the different properties

in your different classes.

And then, give you a validate method,

which you also import from the package,

which you can execute and pass your object to,

to apply all the validation logic

you set up in the class.

So it's basically doing what we just did,

just with more validators, and with all the

heavy lifting done for you.

But of course it helps to understand

how this generally works,

since we built it on our own here,

in a more naive version.

Now besides this package, of course,

we also have Angular, for example.

Angular is a framework,

which I mentioned earlier already,

which heavily relies on decorators,

like this component decorator,

which allows you to assign

some dynamic HTML code,

which taps into properties of your classes as well,

with a special syntax added by Angular,

to then render some dynamic content

onto the screen.

So here Angular does more than

just offer these decorators,

but the decorators are a core part of Angular.

And last, but not least,

I also want to show you NestJS.

NestJS is a server side JavaScript framework

for Node.js, which also heavily utilizes

typescript, and this also embraces decorators.

There you use decorators to define controllers,

and routes, the methods which users have to use

on their HTTP requests, to trigger certain functions,

and also a lot of other decorators you can use

to extract data from incoming requests,

and so on.

So here this framework also again,

offers all these decorators for you,

so that you can just add them to your properties,

to your methods, to your classes,

and add extra functionality,

which the framework then in turn

also takes into account when it executes your code.

So here again, decorators are used for

metaprogramming to add extra configuration,

extra logic, which then is taken into account by,

in this case, the code off the framework,

which executes your code or

which works together with your code.

And that's it for decorators.

This hopefully gives you a good overview

of what you can do with decorators,

why they can be very helpful,

and how they generally work.

*/

// These links might also be interesting:
// More on Decorators: https://www.typescriptlang.org/docs/handbook/decorators.html
