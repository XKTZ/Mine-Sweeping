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
    let win = null;
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
                        && (!(i === 0 && j === 0))
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
    this.openOnePosition = function (x, y) {
        try {
            if (
                // top is in 1~10
                (x >= 0 && x <= 9)
                // top is not mine
                && (backBoard[x][y] >= 0)
                // coordinate is not opened
                && (frontBoard[x][y] === "P")
            ) {
                this.openBlock(x, y);
            }
        } catch (e) {
            console.log(e);
            this.logFront();
            this.logBack();
            console.log(x, y);
        }
    };
    // The function to open the blocks -> x, y is the coordinate
    this.openBlock = function (x, y) {
        // if the coordinate is not a mine
        if (backBoard[x][y] !== -1) {
            // Show the coordinate
            frontBoard[x][y] = backBoard[x][y];
            // Check if the coordinate is empty
            if (backBoard[x][y] === 0) {
                // Iterate the x axis
                for(let i = -1; i < 2; i ++) {
                    // Iterate the y axis
                    for (let j = -1; j < 2; j ++) {
                        // Check if it is its own point
                        if (!(i === 0 && j === 0)) {
                            this.openOnePosition(x + i, y + j);
                        }
                    }
                }
            }
        } else {
            // condition that it is on the mine
            console.log("You Lose");
            win = false;
            return null;
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
    // Function to log the front board
    this.logFront = function () {
        let k = "";
        for(let i = 0; i < 10; i ++) {
            let str = "";
            for(let j = 0; j < 10; j ++) {
                if (frontBoard[i][j] === "P") {
                    str += "P "
                } else {
                    str += frontBoard[i][j] + " ";
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