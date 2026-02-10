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

  const endLine = lineArray.pop();

  const { strToOpt, strToStartingValue, mathSymbols } = createMap(endLine);
  const numberIndices = [];

  for (let ind = 1; ind < endLine.length; ind++) {
    if (Object.keys(strToOpt).includes(endLine.at(ind))) {
      numberIndices.push(ind - 2);
    }
  }
  numberIndices.push(endLine.length - 1);

  const twoDArray = Array(numberIndices.length)
    .fill(null)
    .map(() => []);

  for (let row_i = 0; row_i < lineArray.length; row_i++) {
    const line = lineArray[row_i];
    let col_i = 0;

    let number = '';
    for (let char_i = 0; char_i < line.length; char_i++) {
      number += line.at(char_i);
      if (numberIndices[col_i] == char_i) {
        twoDArray[col_i].push(number);
        number = '';
        col_i++;
      }

      // console.log('twoDArray : ', twoDArray);
      // if (char_i == line.length - 1) {
      // number += char;
      // twoDArray[char_i].push(number);
      // continue;
      // }
      // if (pre_char !== ' ' && char == ' ') {
      // const col_arr = twoDArray[col_i];
      // console.log(' col_arr : ', col_i);
      // twoDArray[col_i].push(number);
      // number = '';
      // col_i++;
      // pre_char = char;
      // } else {
      // number += char;
      // pre_char = char;
      // }
      // char_i++;
    }
  }
  console.log(' Two-D array : ', twoDArray);
  twoDArray.forEach((col, ind, twoDArray) => {
    twoDArray[ind] = col.map((elm) => elm.split(''));
  });

  const reducedTwoArray = Array(twoDArray.length);
  for (let col_ind = 0; col_ind < twoDArray.length; col_ind++) {
    const col = twoDArray[col_ind];
    const sumInnerElm = [];
    for (let row_ind = 0; row_ind < col.length; row_ind++) {
      col[row_ind].forEach((end_elm, ind) => {
        sumInnerElm[ind] += end_elm;
      });
    }
    console.log(sumInnerElm);
    reducedTwoArray[col_ind] = sumInnerElm;
  }

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
