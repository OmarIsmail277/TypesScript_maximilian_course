interface Authenticatable {
  email: string;
  password: string;

  login(): void;
  logout(): void;
}

let user: Authenticatable;

user = {
  email: "test@test.com",
  password: "123456",
  login() {
    console.log("logging in...");
  },
  logout() {
    console.log("logged out successfully");
  },
};

// why use interface not type?

// ...

// contracts force class to have a certain shape
class AuthenticatableUser implements Authenticatable {
  constructor(
    public email: string,
    public password: string,
  ) {}

  login(): void {}

  logout(): void {}
}

// useful => bigger projects with other developers or if you're building some third-party library that should be used in a certain way
// you can have more, however it makes the class does have a certain minimal shape so to say

// ---

// An interface defines a required shape for an object.
// Using it as a function parameter guarantees that the object
// has the required properties/methods, like `login()`.
//
// Example:
// interface Authenticatable {
//   login(): void;
// }
//
// function authenticate(user: Authenticatable) {
//   user.login();
// }
//
// Anyone calling authenticate() must pass an object
// that has the required `login()` method.

// ----

// `extends` lets one interface build on another.
//
// The new interface gets everything from the base interface
// and can add extra properties or methods.
//
// Unlike declaration merging, the original interface is NOT changed.
//
// Example:
// interface Authenticatable {
//   login(): void;
// }
//
// interface Admin extends Authenticatable {
//   role: "admin" | "superadmin";
// }
//
// Admin must have:
// - login() → from Authenticatable
// - role   → added by Admin

// -----------

// Interfaces are a TypeScript-only feature.
//
// They help TypeScript check the structure/types of objects,
// but they do NOT exist at runtime in JavaScript.
//
// During compilation:
// TypeScript → JavaScript
// interface code → removed
//
// So interfaces help us while writing TypeScript,
// but they don't appear in the final JavaScript code.
