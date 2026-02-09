export function arrayOfInnerReducedArr(input_text) {
  const twoDArray = input_text.split('\n').filter((line) => line.trim());
  const mathSymbols = twoDArray
    .pop()
    .split(' ')
    .filter((elm) => elm.trim());
  const strToOpt = {};
  const strToStartingValue = {};
  mathSymbols.forEach((symbol) => {
    if (symbol == '+') {
      strToOpt[symbol] = (a, b) => a + b;
      strToStartingValue[symbol] = 0;
    } else if (symbol == '*') {
      strToOpt[symbol] = (a, b) => a * b;
      strToStartingValue[symbol] = 1;
    }
  });

  twoDArray.forEach((line, ind) => {
    twoDArray[ind] = line.split(' ').filter((elm) => elm.trim());
  });

  const sumInnerArr = mathSymbols.map((symbol) => strToStartingValue[symbol]);
  twoDArray.forEach((inner_array, out_ind) => {
    inner_array.forEach((elm, ind) => {
      const symbol = mathSymbols[ind];
      sumInnerArr[ind] = strToOpt[symbol](sumInnerArr[ind], elm * 1);
    });
  });
  return sumInnerArr;
}

export function sumOfInnerResult(arrayOfInnerReducedResult) {
  return arrayOfInnerReducedResult.reduce((a, b) => a + b, 0);
}
