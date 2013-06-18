var ALIVE = 1;
var DEAD = 0;
var YSIZE = 20;
var XSIZE = 20;

function LifeCtrl($scope, $timeout) {
    var animate;
    $scope.rows = randomBoard();

    $scope.animate = function() {
        animate = $timeout(function() {
            $scope.rows = updateGeneration($scope.rows);
            $scope.animate()
        }, 100);
    };

    $scope.animate();
}

function mod(x, y) {
  var t;
  t = x % y;
  return t < 0 ? t + y: t;
}

function updateGeneration(oldBoard) {
  var board = [];
  for (var y = 0; y < YSIZE; y++) {
    board[y] = [];
    for (var x = 0; x < XSIZE; x++) {
      var currentStatus = oldBoard[y][x];
      var neighbors = countNeighbors(oldBoard, x, y);
      board[y][x] = currentStatus; // copy old status
      if (!isDead(currentStatus)) {
        if (neighbors < 2 || neighbors > 3) {
          board[y][x] = DEAD;
        }
      }
      else {
        if (neighbors == 3) {
          board[y][x] = ALIVE;
        }
      }
    }
  }
  return board;
}

function countNeighbors(oldBoard, x, y) {
  var count = 0;
  for (i = -1; i < 2; i++) {
    for (j = -1; j < 2; j++) {
      var ly = mod(y+j, YSIZE);
      var lx = mod(x+i, XSIZE);
      if (i == j && j == 0) {
        continue;
      }
      if (!isDead(oldBoard[ly][lx])) {
        count++;
      }
    }
  }
  return count;
}

function isDead(x) {
  return (typeof x) == 'undefined' || x == DEAD;
}

function randomBoard() {
    var board = [];

    for (var i = 0; i < YSIZE; i++) {
        var row = [];
        for (var j = 0; j < XSIZE; j++) {
            row[j] = Math.round(Math.random());
        }
        board.push(row);
    }
    return board;
}
