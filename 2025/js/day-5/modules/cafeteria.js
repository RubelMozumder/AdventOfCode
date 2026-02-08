export function allNumberOfValidIds(sortedRangeList) {
  let count = 0;
  for (let [l, r] of sortedRangeList) {
    count += r - l + 1;
  }
  return count;
}

export function listOfValidIds(idsToCheck, sortedRangeList) {
  return idsToCheck.filter(isIdInRanges, { sortedRangeList });
}

export function getRangesAndIds(inputText) {
  const lines = inputText.split('\n').filter((x) => x);
  const sortedRangeList = [];
  const ids = [];
  const mergedSortedRanges = [];

  for (let i of lines) {
    if (i.includes('-')) {
      let range = i
        .split('-')
        .map((x) => parseInt(x.trim()))
        .filter((x) => x);
      // console.log(`range ${range instanceof Array}`);
      sortedRangeList.push(range);
    } else {
      ids.push(i * 1);
    }
  }

  sortedRangeList.sort((a, b) => a[0] - b[0]);

  for (let rng of sortedRangeList) {
    mergeRanges(mergedSortedRanges, rng);
  }
  return [mergedSortedRanges, ids];
}
// const rangeAndids = { sortedRangeList };
// return ids.filter(isIdInRanges, rangeAndids);
// }

function mergeRanges(sortedRangeList, range) {
  let [lCur, rCur] = range;
  let updatedItem = null;
  let updatedIndex = 0;
  for (let i = 0; i < sortedRangeList.length; i++) {
    let [l, r] = sortedRangeList[i];

    if (l == lCur || (lCur > l && lCur <= r)) {
      if (rCur >= r) {
        updatedIndex = i;
        updatedItem = [l, rCur];
        // rCur < r
      } else {
        updatedIndex = i;
        updatedItem = [l, r];
      }
    }
  }
  if (updatedItem == null) {
    sortedRangeList.push(range);
  } else {
    sortedRangeList[updatedIndex] = updatedItem;
  }
}

function isIdInRanges(id, sortedRange = null) {
  let sortedRangeList = sortedRange;
  if (!Array.isArray(sortedRange)) {
    sortedRangeList = this.sortedRangeList;
  }
  for (let [l, r] of sortedRangeList) {
    if (id >= l && id <= r) {
      return true;
    }
  }
  return false;
}
