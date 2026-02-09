import {
  sumOfInnerResult,
  arrayOfInnerReducedArr,
} from './modules/cepaloposMathProblem.js';

const mathSheet = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   + 
`;

const sumOfInnerArray = arrayOfInnerReducedArr(mathSheet);

console.log(' Total sum ', sumOfInnerResult(sumOfInnerArray));
