// Working with Enums

// sometimes in your program, you're going to deal with choices, you're going to deal with scenarios, where you have a fixed set of available values you want to 
// accept in a certain place. abstract? example!

let userRole = 0; // 0 = Admin, 1 = User, 2 = Guest
// now userRole accepts any kind of number, but you might want to restrict it to these specific numbers.
// in addition, that's not just the only problem. Instead having just a number like 0 here does not really tell you much if you read the code.
// it's vague what 0 means, and what other kind of values should be allowed.

// well, that's where you could use an enum (typescript specific)


enum Role {Admin, Editor, Guest};

let userRole2 : Role = 0; // correct, because 0 is a valid value for the Role enum, which corresponds to Role.Admin

// also you can grab the value from the enum directly, which is more readable and less error-prone than using a number directly.
let userRole3 : Role = Role.Admin; // correct, because Role.Admin is a valid value for the Role enum

// ...

userRole3 = Role.Guest; 

// Being Specific with Literal Types

// you could use a union type here for the userRole variable, combined with another typscript feature, you haven't learned about yet, which is literal types.

// because in typescript, you cannot just setup general types like number or string, but you can also define very specific values as types

let userRole5: "admin";

// for example, you could set the string "admin" as a type for the userRole. 
// Now this might look very weird because this very much looks like a string value, and it "would" be if it were on the right side of the equal sign

// But here on the left side of the equal sign after the colon, no matter if you are using it on a variable or a parameter, in a function or anywhere else, 
// this thing here => "admin", is actually not a value but a type, and it tells typescript that the allowed value for userRole is this very specific string

// you might wonder what is the user of this very specific string here? it does not give us any flexiblitiy at all

// well it gets more useful, if you turn it into a union type

let userRole6: "admin" | "editor" | "guest" = "admin";

// later instead of using an enum, we can change it to guest, and even the ide suggests options because it understands which options we have

// And that's another very convenient way of working with options(choices) and as mentioned it's arguably more popular in the TypeScript community than using an enum.
// But you can use both alternatives for many of the same problems, and it comes down to personal preference as mentioned.


// now we with our newly gained knowledge about literal types, we can fine-tune this code of tuples

let possibleResults: [number, number]; 
possibleResults = [1, -1];

// refining

let possibleResults2: [1 | -1, 1 | -1];
possibleResults2 = [1,-1];

// -----------------

// Type Aliases and Custom Types

// now, when dealing with literal types combined with union types, we can end up with quite long definitions, which can especially become a problem if you want to use the 
// same type definition in different places in your code


// example

type Role7 = "admin" | "editor" | "guest" | "reader";

function access(role: Role7 ){
    // ... does something
    // ...
    // now we wanna accept a role paramter, which has the same type as user role, we can simply copy and assign it here

    // not DRY

    // solution? type aliases or custom types

}


// You could theoretically also store the built-in number type under your own custom name,
// but this would probably not make too much sense.
// type MyNumber = number;

// another common use case
type User = {
    name: string;
    age: number;
    role:Role;
    permissions: string[];
}

// ---------------


