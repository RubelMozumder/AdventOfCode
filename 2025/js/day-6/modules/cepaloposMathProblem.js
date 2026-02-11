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
    let skip_inter_col_sp = false;
    for (let char_i = 0; char_i < line.length; char_i++) {
      if (skip_inter_col_sp) {
        skip_inter_col_sp = false;
        continue;
      }
      number += line.at(char_i);
      if (numberIndices[col_i] == char_i) {
        twoDArray[col_i].push(number);
        number = '';
        col_i++;
        skip_inter_col_sp = true;
      }
    }
  }

  twoDArray.forEach((col, ind, twoDArray) => {
    twoDArray[ind] = col.map((elm) => elm.split(''));
  });

  const reducedTwoArray = Array(twoDArray.length);
  for (let col_ind = 0; col_ind < twoDArray.length; col_ind++) {
    const col = twoDArray[col_ind];
    const sumInnerElm = Array(col.at(0).length).fill(0);
    for (let row_ind = 0; row_ind < col.length; row_ind++) {
      col[row_ind].forEach((end_elm, ind) => {
        sumInnerElm[ind] += end_elm.trim();
      });
    }
    reducedTwoArray[col_ind] = sumInnerElm.map((x) => x * 1);
  }
  reducedTwoArray.forEach((col, ind) => {
    reducedTwoArray[ind] = col.reduce(
      strToOpt[mathSymbols[ind]],
      strToStartingValue[mathSymbols[ind]],
    );
  });
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
