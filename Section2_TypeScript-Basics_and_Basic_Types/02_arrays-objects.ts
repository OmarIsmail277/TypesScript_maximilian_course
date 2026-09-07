// Arrays & Types

let hobbies = ["Sports", "Cooking"];

hobbies.push("Reading"); // correct, because hobbies is inferred to be of type string[], and "Reading" is a string
// hobbies.push(100); // This will cause a type error because hobbies is inferred to be of type string[], and 100 is a number, not a string

// Advanced Array Types

let users: (string | number)[] = ["Omar", 39, "Ahmed", 25]; 
// correct, because users is inferred to be of type (string | number)[], and all the values are either strings or numbers

// A First Glimpse At Generic Types - Alternative Array Type Declaration

let students: Array<string | number>;
// that is another way of decsribing an array type, just tells typescript that students should hold an array full of either string or number values.

// this is a so called generic type, which is a more advanced topic, and we will learn more about it in future insha'Allah.
// but in the end it's really just a combination of multiple types, which is exactly what an Array type is too, so it's not that complicated, 
// and you can use it if you want to, but it's not necessary for now, and you can just stick with the simpler array type declaration syntax.


// Making Sense of Tuples

// Related to array types, there is also another kind of array type in Typescript.
// There is the so-called tuple type.

// a variable called possibleResults, and you know that this variable should eventually store an array the accepts exactly two values with clearly defined types.
// let's say eventually we wanna store an array in there where we have [1, -1]
let possibleResults: [number, number]; 

possibleResults = [1, -1];
// instead of just defining it as a number array, we are defining it as a tuple, which is an array with a fixed length and fixed types for each element in the array.

// possibleResults = [1, -1, 0]; // This will cause a type error because possibleResults is defined as a tuple with exactly two elements, 
// and we are trying to assign an array with three elements to it.

// we can be also more precise, that not any number is allowed but maybe only 1 or -1, but that is feature we will talk about a little bit later insha'Allah.
// for now, it's just more important to know about tuples, which can be helpful if you are dealing with fixed-length arrays, 
// where you clearly know which element at a certain position in the array should have which type.

// ------------------

// Object Types

let user: { name: string; age: number, hobbies: string[], role:{description: string, id: number} } = {
    name: "Omar",
    age: 38, 
    hobbies: ["Sports", "Cooking"],
    role: {
        description: "Admin",
        id: 1
    }
}

// Tricky: The "Must Not Be Null" Type

// Now, when we are working with object types in typescript, there are two additional kinds of related typescript features that are important to know.

// First one is a rather weird type

let val: {} = "some text";
// weird, right? we are assigning a string to a variable that is defined as an object type.
// that means any value that is not undefined or null.
// trying to assign undefined or null to val will cause a type error, but any other value is allowed, even a string, number, boolean, array, function, object, etc.

// So this syntax is actually not related to object types, but it's mentioned here because it looks like it might be, when it actually isn't!
// It's a bit confusing, but it's important to know about it, because you might encounter it in other people's code, and you should know what it means.


// Flexible Objects with the "Record" Type - The second feature (but that time it's "really" related to object types)


// imagine that scenario where you want to create a variable and in there you plan to store an object, that may hold various key-value pairs, 
// but and that is the important part, right now when you write the code, you don't actually know yet which keys will be stored in that object.
// so you might eventually wanna say that data should eventually be any object with any key-value pairs and you might be tempted to use that syntax, 
let data: {};
// but as you learned in the last lecture, that will not work, because this just means data must be any value once a value is assigned

// anything else than undefined or null
data = ""

// so I want the data to be an object, not a string and not a number, but I actually don't care about the actual key-value pairs.
// I don't care about the actual key names, the actual property names, and I don't care about the actual value types,
// I just want to say that data should be an object with any key-value pairs.

// here comes the built in Record type to the rescue, which is a more flexible way to define object types in TypeScript.

let data2: Record<string, number | string>; // The Record type is actually a generic type.

// that means data2 should be an object with any key-value pairs, where the keys are strings and the values can be of one of the specified types(number or string).
// so now we can assign any object to data2, as long as it's an object with string keys and any values.

