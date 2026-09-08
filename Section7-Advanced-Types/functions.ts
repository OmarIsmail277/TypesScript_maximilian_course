function getLength(val: string | any[]) {
  if (typeof val === "string") {
    const numberOfWords = val.split(" ").length;
    return `${numberOfWords} words`;
  }
  return val.length;
}

const numberOfWords = getLength("does this work?");
const numItems = getLength(["sports", "cookies"]);
