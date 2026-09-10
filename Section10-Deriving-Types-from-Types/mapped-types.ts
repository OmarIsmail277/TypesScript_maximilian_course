// introducing mapped-types
/*
Another kind of derived type, or feature for deriving types is the mapped-types feature offered by TS

and the idea behind mapped-types is that you have a relatively simple and straightforward way of 
converting one object type to another kind of object type
*/

// here's an example

// defining a type here not an object value
type Operations = {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
};

let mathOperations: Operations = {
  add(a: number, b: number) {
    return a + b;
  },
  subtract(a: number, b: number) {
    return a - b;
  },
};

type Results = {
  add: number;
  subtract: number;
};

let mathResults: Results = {
  add: mathOperations.add(1, 2),
  subtract: mathOperations.subtract(5, 4),
};

// till now, what is written above is nothing new

// better solution using mapped type

type Results2<T> = {
  [Key in keyof T]: number;
};

let anotherMathResults: Results2<Operations> = {
  add: mathOperations.add(1, 2),
  subtract: mathOperations.subtract(5, 2),
};

/*
And therefore this mapped-type feature can be very useful
if you wanna base one type, one object type, I should say,
on some other object type.
*/

// Readonly types & Optional Mapping

/*
Now, mapped types, of course,
like all the features we cover in this section here,
are a feature you won't need all the time
for all your projects,
but they can come in handy in certain situations.
They also allow you to do more than just map some properties
to some value type as we're doing it here.
Specifically, they also allow you to, for example,
make properties optional,
even though if they're not optional
in the original type you're mapping from or vice versa.
They allow you to make properties non-optional
if they have been optional before,
*/

// start by showing you how to make properties optional

type Results3<T> = {
  [Key in keyof T]?: number;
};

let thirdMathResults: Results3<Operations> = {
  add: mathOperations.add(1, 2),
};

// to make things optional -> non optional

type Results4<T> = {
  [Key in keyof T]-?: number;
};

type Operations2 = {
  add?: (a: number, b: number) => number;
  subtract?: (a: number, b: number) => number;
};

let fourthMathResults: Results4<Operations2> = {
  add: mathOperations.add(1, 2),
  subtract: mathOperations.subtract(10, 2),
};

// also we can properties readonly if there were not or also vice versa

type Results5<T> = {
  readonly [Key in keyof T]-?: number;
};

let fivthMathResults: Results5<Operations2> = {
  add: mathOperations.add(1, 2),
  subtract: mathOperations.subtract(10, 2),
};

// fivthMathResults.add = 10; xxx

// the oppsite is by adding "-readonly"

type Operations3 = {
  readonly add: (a: number, b: number) => number;
  readonly subtract: (a: number, b: number) => number;
};

type Results6<T> = {
  -readonly [Key in keyof T]-?: number;
};
