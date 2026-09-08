// Intersection Types

type FileData = {
  path: string;
  content: string;
};

type DatabaseData = {
  connectionUrl: string;
  credentials: string;
};

type Status = {
  isOpen: boolean;
  errorMessage?: string;
};

type AccessedFileData = FileData & Status;
type AccessedDatabaseData = DatabaseData & Status;

// alternative approach using interfaces

// interface FileData = {
//   path: string;
//   content: string;
// };

// interface DatabaseData = {
//   connectionUrl: string;
//   credentials: string;
// };

// interface Status = {
//   isOpen: boolean;
//   errorMessage?: string;
// };

// interface AccessedFileData extends FileData , Status{}
// interface AccessedDatabaseData extends DatabaseData , Status{}
