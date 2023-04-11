// const board = generateSudoku()
// console.log(board)
// const playBoard = removeNumbers(board)

// function 

// function 

function removeNumbers(board) {
  let removedCount = 0;
  let maxRemoved = Math.floor(81 * 0.6); // maximum number of cells to remove, 60% of the total cells

  while (removedCount < maxRemoved) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);

    if (board[row][col] === 0) continue;

    let backup = board[row][col];
    board[row][col] = 0;

    let solution = solveSudoku(board);
    if (solution === null) {
      board[row][col] = backup;
      continue;
    }

    removedCount++;
  }

  return board;
}

function solveSudoku(board) {
  let row = -1, col = -1, isEmpty = true;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        row = i;
        col = j;
        isEmpty = false;
        break;
      }
    }
    if (!isEmpty) break;
  }

  if (isEmpty) return board;

  for (let num = 1; num <= 9; num++) {
    if (canPlace(board, row, col, num)) {
      board[row][col] = num;
      if (solveSudoku(board)) return board;
      board[row][col] = 0;
    }
  }

  return null;
}




//function that returs random boolean

