function getLineArray(input_text) {
  const lineArray = input_text.split('\n').filter((line) => line);
  return lineArray;
}

function createMap(lastLine) {
  const mathSymbols = lastLine.split(' ').filter((x) => x.trim());
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
  return { strToOpt, strToStartingValue, mathSymbols };
}

export function arrayOfInnerReducedArrPart2(input_text) {
  const lineArray = getLineArray(input_text);
  const twoDArray = Array(lineArray.length);

  for (let row_i = 0; row_i < lineArray.length; row_i++) {
    const line = lineArray[row_i];
    let char_i = 0;
    let col_i = 0;

    let number = '';
    let pre_char = '';
    for (let char of line) {
      if (pre_char !== '' && char == ' ') {
        const col_arr = twoDArray[col_i];
        col_i++;
        col_arr.push(number);
        number = '';
      } else {
        number += char;
      }
      char_i++;
    }
  }

  twoDArray.forEach((col, ind, twoDArray) => {
    twoDArray[ind] = col.map((elm) => elm.split(''));
  });

  const reducedTwoArray = Array(twoDArray.length);
  for (let col_ind = 0; col_ind < twoDArray.length; col_ind++) {
    const col = twoDArray[col_ind];
    console.log(' col ', col);
    const sumInnerElm = Array(col.length).map((x) => '');
    for (let inner_elm = 0; inner_elm < col.length; inner_elm++) {
      inner_elm.forEach((end_elm, ind) => {
        sumInnerElm[ind] += end_elm;
      });
    }
    reducedTwoArray[col_ind] = sumInnerElm;
  }
  const { strToOpt, strToStartingValue, mathSymbols } = createMap(
    lineArray.pop(),
  );
  reducedTwoArray.forEach((col, ind) => {
    reducedTwoArray[ind] = col
      .map((x) => x.trim() * 1)
      .reduce(strToOpt[mathSymbols[ind]], strToStartingValue[mathSymbols[ind]]);
  });
  // .map((elm) => elm.split(' ').filter((x) => x.trim()));
  return reducedTwoArray;
}

export function arrayOfInnerReducedArrPart1(input_text) {
  const lineArray = getLineArray(input_text);
  const { strToOpt, strToStartingValue, mathSymbols } = createMap(
    lineArray.pop(),
  );

  const twoDArray = lineArray.map((element) =>
    element.split(' ').filter((x) => x.trim()),
  );

  const sumInnerArr = mathSymbols.map((symbol) => strToStartingValue[symbol]);
  twoDArray.forEach((inner_array) => {
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
