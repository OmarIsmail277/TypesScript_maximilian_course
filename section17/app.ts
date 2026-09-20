import _ from "lodash";

const numbers = [1, 2, 3, 4];

// split that into multiple arrays
const [x, y] = _.chunk(numbers, 2);

console.log(x, y);
