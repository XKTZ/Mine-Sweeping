// game Package
function Game(sideLen, numMine) {
    // background array
    const backArr = getLenArr(sideLen, 0);
    // front array
    const frontArr = getLenArr(sideLen, "P");
    // backboard -> the board of mines
    let backBoard = [];
    // front board -> the board show to users
    let frontBoard = [];
    // is wined or not
    let win = null;
    // Function to init a board
    this.initBoards = function () {
        for (let i = 0; i < sideLen; i++) {
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
                        // x-axis is not negative or more than side
                        (0 <= (x + i) && (x + i) <= sideLen - 1)
                        // y-axis is not negative or more than side
                        && (0 <= (y + j) && (y + j) <= sideLen - 1)
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
        for (let x = 0; x < sideLen; x++) {
            for (let y = 0; y < sideLen; y++) {
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
                let x = getRandomInt(sideLen);
                let y = getRandomInt(sideLen);
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
    // The function to open the blocks -> x, y is the coordinate
    this.openBlock = function (x, y) {
        // if the coordinate is not a mine
        if (backBoard[x][y] !== -1) {
            // Show the coordinate
            frontBoard[x][y] = backBoard[x][y];
            // Check if the coordinate is empty
            if (backBoard[x][y] === 0) {
                // Iterate the x axis
                for (let i = -1; i < 2; i++) {
                    // Iterate the y axis
                    for (let j = -1; j < 2; j++) {
                        // Check if it is its own point
                        if (!(i === 0 && j === 0)) {
                            let cx = x + i, cy = y + j;
                            if (
                                // top is in 1~10
                                (cx >= 0 && cx <= sideLen - 1)
                                // btn is in 1~10
                                && (cy >= 0 && cy <= sideLen - 1)
                                // top is not mine
                                && (backBoard[cx][cy] >= 0)
                                // coordinate is not opened
                                && (frontBoard[cx][cy] === "P")
                            ) {
                                this.openBlock(cx, cy);
                            }
                        }
                    }
                }
            }
        } else {
            // condition that it is on the mine
            console.log("You Lose");
            frontBoard[x][y] = "M";
            win = false;
        }
    };
    // Function to get the back board
    this.getBack = function (sp) {
        let k = "";
        for (let i = 0; i < sideLen; i++) {
            let str = "";
            for (let j = 0; j < sideLen; j++) {
                if (backBoard[i][j] === -1) {
                    str += "M "
                } else {
                    str += backBoard[i][j] + " ";
                }
            }
            k += str + sp;
        }
        return k;
    };
    // Function to get the front board
    this.getFront = function (sp) {
        let k = "";
        for (let i = 0; i < sideLen; i++) {
            let str = "";
            for (let j = 0; j < sideLen; j++) {
                if (frontBoard[i][j] === "P") {
                    str += "P "
                } else {
                    str += frontBoard[i][j] + " ";
                }
            }
            k += str + sp;
        }
        return k;
    };
    // Function to log the back board
    this.logBack = function () {
        console.log(this.getBack());
    };
    // Function to log the front board
    this.logFront = function () {
        console.log(this.getFront());
    };
    // Function to check if win or not
    this.checkWin = function () {
        let numUnopened = 0;
        // Iterate x
        for (let i = 0; i < sideLen; i++) {
            // Iterate y
            for (let j = 0; j < sideLen; j++) {
                if (frontBoard[i][j] === "P") {
                    numUnopened += 1;
                }
            }
        }
        return numUnopened <= numMine;
    };
    this.getBackBoard = function () {
        return backBoard;
    };
    this.getFrontBoard = function () {
        return frontBoard;
    };
    this.getWin = function () {
        return win;
    };
    // Init the game
    this.initGame = function () {
        // Init the boards
        this.initBoards();
        // randomly give the mine
        this.ranMine();
        // Cal all the sums
        this.calAll();
    };
    this.initGame();
}