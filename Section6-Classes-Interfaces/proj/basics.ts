class User {
  // a special method that belongs to the class, that will be executed automatically
  // whenever you instantiate the class with the new keyword

  name: string;
  age: number;

  // in ts, we add it here
  //   name = "Omar";
  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }
}

// js
// class Userr {
//   constructor(n, a) {
//     this.name = n;
//     this.age = a;
//   }
// }

// shortcut
// by adding public/private, infront of a parameter in the constructor, TypeScript will go ahead and create
// a property of the same name behind the scenes in that class

// and in does even more than that, it will not just create a property of that name in that class, it will also assign the value that
// is received on this parameter to that automatically created property

// so you can get rid of the commented code below
// class ShortUser {
//   constructor(
//     public name: string,
//     public age: number,
//   ) {
//     // this.name = n;
//     // this.age = a;
//   }
// }

class ShortUser {
  public hobbies: string[] = [];
  constructor(
    public name: string,
    private age: number,
  ) {}
  greet() {
    console.log(this.age);
  }
}

// private makes properties non-accessible outside the class
const omar = new ShortUser("Omar", 29);
// Property 'age' is private and only accessible within class 'ShortUser'.ts(2341)
// console.log(omar.age);

// protected ==> inheritance

// ----

// readonly - maybe read, accessed but not changed
// push works - in case of arrays - because you are manipulating that original array in memory

// understanding getters
