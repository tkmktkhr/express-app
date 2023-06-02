interface User {
  id: number;
  name: string;
}

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: 101, name: 'Alice' },
  { id: 102, name: 'Bob' },
  { id: 103, name: 'Caroline' },
];

// const VERSION_FORMAT = /^[1-9][0-9]*\.[0-9]*\.[0-9]+$/;

// const versionFormat = (version: string) => {
//   return VERSION_FORMAT.test(version);
// };
