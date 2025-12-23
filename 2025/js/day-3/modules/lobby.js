export function print_hello() {
  console.log('This is an hello world print statement!!');
}

export function lobbyPart1(banks) {
  const banksList = banks.split('\n').map((x) => x.trim());
  let joltSum = 0;
  for (let l = 0; l < banksList.length; l++) {
    let bank = banksList.at(l);
    if (bank == '') {
      continue;
    }
    //   Convert to int
    const joltArr = bank.split('').map((x) => x * 1);

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
