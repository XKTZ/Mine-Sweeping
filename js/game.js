// game Package
function Game(numMine) {
    // background array
    const backArr = getLenArr(numMine, 0);
    // front array
    const frontArr = getLenArr(numMine, "P");
    // backboard -> the board of mines
    let backBoard = [];
    // front board -> the board show to users
    let frontBoard = [];
    // is wined or not
    let win = false;
    // Function to init a board
    this.initBoards = function () {
        for (let i = 0; i < 10; i++) {
            backBoard.push(backArr.slice(0));
            frontBoard.push(frontArr.slice(0));
        }
    };
    // The function use to cal sum of a board
    this.calSum = function (x, y) {
        // Condition that this point is not mine
        if (backBoard[x][y] !== -1) {
            // iterate the x axis
            for (let i = -1; i < 2; i++) {
                // iterate the y axis
                for (let j = -1; j < 2; j++) {
                    // check if the point is mine
                    if (
                        // x-axis is not negative or more than 10
                        (0 <= (x + i) && (x + i) <= 9)
                        // y-axis is not negative or more than 10
                        && (0 <= (y + j) && (y + j) <= 9)
                        // it is not self
                        && (i !== 0 && j !== 0)
                        // it is a mine
                        && backBoard[x + i][y + j] === -1
                    ) {
                        // let the number add one
                        backBoard[x][y] += 1;
                    }
                }
            }
        }
    };
    // The function use to cal sum of all the boards
    this.calAll = function () {
        // iterate x & y axis
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                this.calSum(x, y);
            }
        }
    };
    // The function to init the mines
    this.ranMine = function () {
        for (let i = 0; i < numMine; i++) {
            // while mine is not used
            while (true) {
                // Randomly get two values
                let x = getRandomInt();
                let y = getRandomInt();
                // If this position is not mine
                if (backBoard[x][y] !== -1) {
                    // Change it to mine
                    backBoard[x][y] = -1;
                    // Stop run
                    break;
                }
            }
        }
    };
    // log the back board
    this.logBack = function () {
        let k = "";
        for(let i = 0; i < 10; i ++) {
            let str = "";
            for(let j = 0; j < 10; j ++) {
                if (backBoard[i][j] === -1) {
                    str += "M "
                } else {
                    str += backBoard[i][j] + " ";
                }
            }
            k += str + "\n";
        }
        console.log(k);
    };
    // Init the game
    this.initGame = function () {
        // Init the boards
        this.initBoards();
        // randomly give the mine
        this.ranMine();
        // Cal all the sums
        this.calAll();
        this.logBack(); 
    };
}