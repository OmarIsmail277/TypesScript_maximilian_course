// Classes themselves are JavaScript feature, enhanced by Typescript.
// Interfaces, however are a TS-exclusive feature, that can be used in conjunction with classes though.

// What are Classes?

/*
Classes are blueprints for objects

The idea is that you can create a class definition once and then create multiple objects, or (multiple object instances)

so that you have the same shape, the same methods, but different data, different values for their properties because they are all based on that same class definition

*/

class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hi I am ${this.name}`);
  }
}
