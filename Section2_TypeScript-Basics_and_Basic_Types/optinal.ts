// Optional Values

function generateError(msg?: string) {
  throw new Error(msg);
}

// optional parameters

generateError();
generateError("An error occurred!");

// optional properties

type User = {
  name: string;
  age: number;
  role?: "admin" | "guest";
};

// Nullish Coalescing => ??

let input = "";

const didProvideInput = input || "yes"; // falsy values => 0, false, "", null, undefined
const didProvideInput2 = input ?? "yes"; // just null or undefined => input => ""
