export function lobbyPart1(banks) {
  const banksList = banks.split('\n').map((x) => x.trim());
  let joltSum = 0;
  for (let l = 0; l < banksList.length; l++) {
    let bank = banksList.at(l);
    if (bank == '') {
      continue;
    }
    //  Convert to int
    const joltArr = bank.split('').map((x) => x * 1);

    // Total number of batteries to be turned on
    const noOfDigit = 2;
    let tenthDigit = joltArr.at(0);
    let onesDigit = joltArr.at(1);
    for (let i = 1; i < joltArr.length - 1; i++) {
      if (tenthDigit < joltArr.at(i)) {
        tenthDigit = joltArr.at(i);
        onesDigit = joltArr.at(i + 1);
        continue;
      }
      if (onesDigit < joltArr.at(i)) {
        onesDigit = joltArr.at(i);
      }
    }
    let lastElement = joltArr.at(joltArr.length - 1);
    if (onesDigit < lastElement) {
      onesDigit = lastElement;
    }
    joltSum = joltSum + tenthDigit * 10 + onesDigit;
  }
  return joltSum;
}

export function lobbyPart2(banks, maxLength) {
  let startPart = '';
  let largestJoltEachBank = [];
  let constructAFullNumber = function* (inputString, startPart, index) {
    let inputStrLength = inputString.length;
    // find left index of the end part
    let leftIndEndpart = inputStrLength - (maxLength - (index + 1));
    if (index === maxLength) {
      return null;
    }
    let endPart = '';
    if (leftIndEndpart < inputStrLength) {
      endPart = inputString.slice(leftIndEndpart, inputStrLength);
    }
    // Find largest number from the considered numbers to speed up the
    // calculation otherwise it take huge time
    let maxInt = 0;
    let indMaxInt = -1;
    for (let i = 0; i < leftIndEndpart; i++) {
      let intVal = inputString.charAt(i) * 1;
      if (maxInt < intVal) {
        indMaxInt = i;
        maxInt = intVal;
      }
    }
    let startPartNew = startPart + inputString.charAt(indMaxInt);
    let fullCombinationNew = startPartNew + endPart;
    yield fullCombinationNew * 1;
    yield* constructAFullNumber(
      inputString.slice(indMaxInt + 1, inputString.length),
      startPartNew,
      index + 1
    );
  };

  for (const bank of banks
    .split('\n')
    .map((x) => x.trim())
    .filter((x) => x)) {
    let largestJoltCombinations = Array.from(
      constructAFullNumber(bank, startPart, 0)
    );

    largestJoltEachBank.push(
      largestJoltCombinations
        .filter((item) => item)
        .sort((a, b) => b - a)
        .at(0)
    );
  }
  return largestJoltEachBank.reduce(
    (accumulative, currentValue) => accumulative + currentValue
  );
}
