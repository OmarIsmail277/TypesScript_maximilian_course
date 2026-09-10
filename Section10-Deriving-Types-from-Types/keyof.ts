// Extracting Keys with "keyof"

type User = { name: string; age: number };
// unlike typeof, keyof needs to be followed by a type
type UserKeys = keyof User;

let validKey: UserKeys;

validKey = "name";
validKey = "age";

// more useful example

function getProp<T extends object, U extends keyof T>(obj: T, key: U) {
  const val = obj[key];

  if (val === undefined || val === null)
    throw new Error("Accessing udefined or null value");

  return val;
}

const data = { id: 1, isStored: false, values: [1, -5, 10] };
const isStored = getProp(data, "isStored");

const user = { name: "Omar", age: 30 };

const val = getProp(user, "age");

/*
And that's an example
where the keyof operator is pretty useful
because it in this case, allows you
to kind of link these two placeholders together
by saying that the second placeholder, U, the type
that will be inserted for that placeholder
should be one of the keys of the value that's received
for the first placeholder, for T in this example.
 */
