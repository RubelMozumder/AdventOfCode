class CoordinateSpace {
  #coordNames = ['x', 'y', 'z', 'w'];
  #dim = null;

  // coordsBoundaries --> (xMin, xMax, yMin, yMax, ...)
  constructor(...coordsBoundaries) {
    this.#dim = coordsBoundaries.length / 2;
    for (let ind = 0; ind < coordsBoundaries.length; ind = ind + 2) {
      this[`${this.#coordNames[ind]}min`] = coordsBoundaries[ind];
      this[`${this.#coordNames[ind]}max`] = coordsBoundaries[ind + 1] - 1;
    }
  }

  // args = [x, y]
  getAdjacentCircleAndPoints(maxAdjacentPoint, ...args) {
    const p1 = new CoordinatePoint(...args);
    let totalPoints = 0;
    const circleToPoints = new Map();

    for (let step = 1; step < 10000000; step++) {
      if (totalPoints >= maxAdjacentPoint) {
        return circleToPoints;
      }
      const pAround = [];
      const initialPoint = [];
      if (pAround.length === 0) {
        initialPoint.push(Array.from({ length: this.#dim }, (_, i) => args[i]));
      } else {
        initialPoint.pop();
      }
      for (let axInd = 0; axInd < this.#dim; axInd++) {
        const extendPointsAround = [];
        for (let point of [...pAround, ...initialPoint]) {
          for (const move of [1, -1]) {
            const newPoint = Array.from(point);

            newPoint[axInd] = newPoint.at(axInd) + move * step;
            let sum = newPoint.reduce(
              (accumulator, element) => accumulator + element ** 2,
              0
            );
            let norm = Math.sqrt(sum);
            if (!circleToPoints.has(norm)) {
              circleToPoints.set(norm, []);
            }
            let arr = circleToPoints.get(norm);
            arr.push(newPoint);
            extendPointsAround.push(newPoint);
            totalPoints += 1;
          }
        }
        pAround.push(...extendPointsAround);
      }
    }
  }
}

class CoordinatePoint {
  #coordNames = ['x', 'y', 'z', 'w'];
  #dim = null;
  #norm = null;
  constructor(...args) {
    if (args.length > 4) {
      throw new Error('CoordinatePoint can handle only upto 4 dimensions');
    }
    this.#dim = args.length;
    for (let i = 0; i < args.length; i++) {
      if (typeof args.at(i) === 'number') {
        this[this.#coordNames.at(i)] = args.at(i);
      } else {
        throw new Error('Coordinate point must be composed of number');
      }
    }
    for (let i = 0; i < this.#dim; i++) {
      this.#norm += this[this.#coordNames[i]] ** 2;
    }
    return Math.sqrt(this.#norm);
  }

  hasSameDim(...points) {
    for (const p of points) {
      if (!(p instanceof CoordinatePoint)) {
        throw new Error(
          `Given argument(s) is(are) not instance of 'CoordinatePoint'`
        );
      }
      if (p.#dim !== this.#dim) {
        throw new Error(
          `Given point(s) has(have) different dimension of ${p.#dim}.`
        );
      }
    }
  }

  subtruct(rightPoint) {
    this.hasSameDim(rightPoint);
    const coordDiff = [];
    for (let i = 0; i < rightPoint.#dim; i++) {
      coordDiff.push(
        this[this.#coordNames[i]] - rightPoint[rightPoint.#coordNames[i]]
      );
    }
    return new CoordinatePoint(...coordDiff);
  }
}

export function findRollAround1(diagram, allowedPaperRolls, AdjacentSpots) {
  const diagramArray = diagram.split('\n').filter((x) => x !== '');
  const row = diagramArray.length;
  for (let i = 0; i < diagramArray.length; i++) {
    diagramArray[i] = diagramArray[i].split('').filter((x) => x !== '');
  }
  Object.freeze(diagramArray);
  const col = diagramArray[0].length;
  const coordSpace = new CoordinateSpace(0, col, 0, row);
  // Total points those have maximum or lower number of paper rolls at the adjacent
  let totalAccesiblePoints = 0;
  for (let y = 0; y < row; y++) {
    for (let x = 0; x < col; x++) {
      //  Only consider the point where the paper roller is available
      if (diagramArray[y][x] === '.') {
        continue;
      }
      let circleToPoints = coordSpace.getAdjacentCircleAndPoints(
        AdjacentSpots,
        x,
        y
      );

      let checkTotalPoint = 0;
      let paperRoll = 0;
      for (const [key, value] of circleToPoints) {
        if (AdjacentSpots <= checkTotalPoint) {
          break;
        }
        paperRoll += value.reduce((accumulator, point) => {
          const [x, y] = point;
          if (x < 0 || y < 0) {
            return accumulator;
          } else if (x > col - 1 || y > row - 1) {
            return accumulator;
          }
          if (diagramArray[y][x] === '@') {
            return accumulator + 1;
          }

          return accumulator;
        }, 0);
        checkTotalPoint += value.length;
      }
      if (paperRoll <= allowedPaperRolls) {
        totalAccesiblePoints += 1;
      }
    }
  }
  return totalAccesiblePoints;
}
