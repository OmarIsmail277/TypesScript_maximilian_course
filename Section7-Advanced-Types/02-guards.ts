type FileSource = { type: "file"; path: string };
const fileSource: FileSource = {
  type: "file",
  path: "some/path/to/file.csv",
};

type DBSource = { type: "db"; connectionUrl: string };

const dbSource: DBSource = {
  type: "db",
  connectionUrl: "some-connection-url",
};

type Source = FileSource | DBSource;

function loadData(source: Source) {
  // Open + read file OR reach out to database server

  if ("path" in source) {
    // source.path => use that to open the file
    return;
  }
  //   source.connectionUrl; => to reach out to database
}

// Discriminated Unions

function loadData2(source: Source) {
  // Open + read file OR reach out to database server

  if (source.type === "file") {
    // source.path;
    return;
  }
  //   source.connectionUrl
}

// Type Guards via "instanceof"

class User {
  constructor(public name: string) {}

  join() {}
}

class Admin {
  constructor(permissions: string[]) {}

  scan() {
    // ...
  }
}

const user = new User("Omar");
const admin = new Admin(["ban", "restore"]);

type Entity = User | Admin;

function init(entity: Entity) {
  // .join() OR .scan() ...

  if (entity instanceof User) {
    entity.join();
    return;
  }

  entity.scan();
}

// Outsourcing" Type Guards & Using Type Predicates

// A type guard can be moved into a reusable function.
//
// A type predicate (`source is FileSource`) tells TypeScript:
// "If this function returns true, `source` is a FileSource."
//
// This lets us reuse the same type-checking logic in different places.
//
// Example:
// function isFile(source: Source): source is FileSource {
//   return source.type === "file";
// }
//
// if (isFile(source)) {
//   // TypeScript knows `source` is FileSource here ✅
// }
