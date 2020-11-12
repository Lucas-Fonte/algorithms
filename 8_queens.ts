/*

Imagine a chess board in which every piece is Queen, create a function that 
validates if a queen can attack another one.

    *   *   *   *   *   *   *   *
    *   *   *   *   X   *   *   *
    *   *   *   *   *   *   *   *
    *   *   *   *   *   *   *   *
    *   *   *   *   *   *   *   *
    *   *   *   *   *   *   *   *
    X   *   *   *   *   *   *   *
    *   *   *   *   *   *   *   *
*/

// Queen 1
// TL = [0, 1] => [] (-1, +1)
// TR = [0, 1] => [[1, 2], [2, 3] , [3, 4], [4, 5], [5, 6], [6, 7]] (+1, +1)
// BL = [0, 1] => [] (-1, -1)
// BR = [0, 1] => [[1, 0]] (+1, -1)

// Queen 2
// TL = [4, 5] => [[3, 6], [2, 7]] (-1, +1)
// TR = [4, 5] => [[5, 6], [6, 7]] (+1, +1)
// BL = [4, 5] => [[3, 4], [2, 3], [1, 2], [0, 1]] (-1, -1)
// BR = [4, 5] => [[5, 4], [6, 3], [7, 2]] (+1, -1)

const queens = [
  {
    x: 1,
    y: 0,
  },
  {
    x: 4,
    y: 1,
  },
  {
    x: 6,
    y: 2,
  },
  {
    x: 3,
    y: 3,
  },
  {
    x: 0,
    y: 4,
  },
  {
    x: 7,
    y: 5,
  },
  {
    x: 5,
    y: 6,
  },
  {
    x: 2,
    y: 7,
  },
];

interface Queen {
  x: number;
  y: number;
}

const checkForQueens = (queens: Queen[]) => {
  return {
    perpendicular: validatePerpendicular(queens),
    diagonal: validateDiagonal(queens),
  };
};

const validatePerpendicular = (queens: Queen[]) => {
  let valid = true;
  const visited = {};

  for (const queen of queens) {
    if (visited['x' + queen.x] || visited['y' + queen.y]) {
      console.log({
        visited,
        queen,
      });
      valid = false;
      break;
    }

    visited['x' + queen.x] = true;
    visited['y' + queen.y] = true;
  }

  return valid;
};

const validateDiagonal = (queens: Queen[]) => {
  let valid = true;
  let visited = {};

  for (const queen of queens) {
    const currentQueen = 'x' + queen.x + 'y' + queen.y;
    if (visited[currentQueen]) {
      console.log({ visited, queen });
      valid = false;
      break;
    }

    const generatedDiagonals = generateDiagonals(queen);
    visited = { ...visited, ...generatedDiagonals };
  }

  return valid;
};

const generateDiagonals = (queen: Queen) => {
  const possibleDiagonals = {};
  const diagonalGenerationMap = {
    upperLeft: [-1, 1],
    upperRight: [1, 1],
    bottomLeft: [-1, -1],
    bottomRight: [1, -1],
  };

  for (const direction of Object.keys(diagonalGenerationMap)) {
    let generateDiagonals = true;
    let currentX = queen.x;
    let currentY = queen.y;

    while (generateDiagonals) {
      if (currentX >= 0 && currentX <= 7 && currentY >= 0 && currentY <= 7) {
        possibleDiagonals['x' + currentX + 'y' + currentY] = true;

        currentX = currentX + diagonalGenerationMap[direction][0];
        currentY = currentY + diagonalGenerationMap[direction][1];
      } else {
        generateDiagonals = false;
      }
    }
  }

  return possibleDiagonals;
};

console.log(checkForQueens(queens));
