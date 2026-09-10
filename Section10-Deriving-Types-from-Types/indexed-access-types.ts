const appUser = {
  name: "Omar",
  age: 35,
  permissions: [{ id: "p1", title: "Admin", description: "Admin Access" }],
};

type AppUser = typeof appUser;

// type AppUser = {
//   name: string;
//   age: number;
//   permissions: {
//     id: string;
//     title: string;
//     description: string;
//   }[];
// };

// now, what is an indexed-access now?

type Perms = AppUser["permissions"];

/*
And that's simply a more convenient way of storing
a supp type or part of an object type
in a separate type alias
or under a separate type alias, for example.
But again, you can use this feature
in any place where types are defined,
not just in conjunction with the type keyword,
but for example, also when defining the types
for function parameters or anywhere else
where types are defined.
*/

// Accessing Array Elements with Indexed Access Types

type Perm = Perms[number];

type Names = string[];
type Name = Names[number];
