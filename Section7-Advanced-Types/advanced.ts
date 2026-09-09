// index types

// wanna make it flexible
type DataStore = {
  //add any amount of properties (dynaimc properties)
  // placeholder
  [prop: string]: number | boolean;
  // string, symbol, number
};

let store: DataStore = {};

store.id = 5;

store.isOpen = false;

// store.name = "omar" xxx

// constant types with "as const"

let roles = ["admin", "guest", "editor"] as const;

// roles => became readonly

// roles.push("omar")

const firstRole = roles[0]; // admin

// when you dont want a broad pretty generic type but instead a super narrow type

// revisiting the Record type

// we can say that we build a bit less flexible version of the record type

type DataStore2 = {
  [prop: string]: number | boolean;
};

let someObj: Record<string, number | boolean>;

// --------

// satisfies keyword

// another more advanced feature - relatively new

const dataEntries: Record<string, number> = {
  entry1: 0.51,
  entry2: -1.23,
};

// ....

// valid property name
dataEntries.entry3;

///

const dataEntries2 = {
  entry1: 0.51,
  entry2: -1.23,
} satisfies Record<string, number>;

// not used a lot

// used in React Router

// usecase -> type-safety combined with flexibilty
