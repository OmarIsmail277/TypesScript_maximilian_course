// template-literal-types

// template-literals

const mainUserName = "Omar";

const greeting = `Hi ${mainUserName}`;

// Typescript offers a type that works in a very similar way

// example

type ReadPermissions = "no-read" | "read";
type WritePermissions = "no-write" | "write";

// we could do that, if we want to combine all permissions

// type FilePermissions =
//   | "no-read-write"
//   | "read-no-write"
//   | "no-read-no-write"
//   | "read-write";

// we could instead use template literal type feature offered by TS

type FilePermissions = `${ReadPermissions}-${WritePermissions}`;

// another use

type DataFile = {
  data: string;
  permissions: FilePermissions;
};

type DataFileEventNames = `${keyof DataFile}Changed`;

type DataFileEvents = {
  [Key in DataFileEventNames]: () => void;
};

/**
 * So another pretty advanced TypeScript feature,

which you, as always, won't need all the time,

and which can be tricky to wrap your head around at first,

but which can also be pretty useful,

as you can hopefully see here.
 */
