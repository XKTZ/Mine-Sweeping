let game = new Vue({
    el: "#game",
    data: {
        gameOn: null,
        blockHead: "#block",
        squareSide: 10,
        numMine: 10,
        // False -> True to End | True -> Turn to Start
        inGame: false,
        strBtnOperate: "Start A New Game!",
        intervalIn: null,
        timeClock: {
            sec: 0,
            min: 0,
        },
    },
    methods: {
        // Method to start a new game
        btnOperateClick: function () {
            // need to start a game
            if (this.inGame === false) {
                this.inGame = true;
                this.strBtnOperate = "End This Game";
                // check if the blocks are enough for mine
                if (this.numMine > this.squareSide * this.squareSide) {
                    alert("Not enough block for mines");
                    return;
                }
                // show the game board and set the top margin
                $(".gameBoard").css("margin-top", "5%");
                // hide the operation board
                $(".operationBoard").css("display", "none");
                // show the end button and cancel the start button
                // Start the game
                this.gameOn = new Game(this.squareSide, this.numMine);
                // Fresh
                this.showBoard();
                // the clock object (interval can not get the object in Vue)
                let clock = this.timeClock;
                // set interval
                this.intervalIn = setInterval(function () {
                    // check if need to add one minute
                    if (clock.sec === 59) {
                        clock.sec = 0;
                        clock.min += 1;
                    } else {
                        clock.sec += 1;
                    }
                }, 1000);
                // Already in a game -> End the game
            } else {
                // End the game
                this.endGame();
            }
        },
        // Method to end a game
        endGame: function () {
            // turn to end
            this.inGame = false;
            this.strBtnOperate = "Start A New Game!";
            // cancel the game
            this.gameOn = null;
            // clear interval
            clearInterval(this.intervalIn);
            this.timeClock.min = 0;
            this.timeClock.sec = 0;
            // show the operation board and cancel the margin of game board
            $(".operationBoard").css("display", "block");
            $(".gameBoard").css("margin-top", "0px");

        },
        // Method to show the blocks
        showBoard: function () {
            // Get the front board
            let fb = this.gameOn.getFrontBoard();
            // Iterate X axis
            for (let x = 0; x < this.squareSide; x++) {
                // Iterate Y axis
                for (let y = 0; y < this.squareSide; y++) {
                    // Change the word of x, y
                    $(this.blockHead + x + "-" + y).html(fb[x][y]);
                }
            }
        },
        // Method to open the block
        openBlock: function (x, y) {
            try {
                // open the block of the game
                this.gameOn.openBlock(x, y);
                // Show the new board
                this.showBoard();
                if (this.gameOn.checkWin()) {
                    // Alert that player win
                    alert('You Win');
                    // Play victory sound
                    $.playSound("sound/Victory.mp3");
                    // show the board
                    this.gameOn.openAll();
                    this.showBoard();
                    // end the game
                    this.endGame();
                }
                // if player lose
                else if (this.gameOn.getWin() === false) {
                    // Alert that player lose
                    alert('You Lose');
                    // Show the board
                    this.gameOn.openAll();
                    this.showBoard();
                    // end the game
                    this.endGame();
                }
                // if player is not win & not lose
                else {
                }
            } catch (e) {
                // if it is type error -> it is because the game is not start
                if (e instanceof TypeError){
                    console.log("game is not start yet");
                }
            }
        },
    },
    components: {
        'block': {
            template: `
                <button :id='"block"+x+"-"+y' @click="open" style="
                    width: 30px;
                    height: 30px;
                    padding: 0;
                    margin: 0;
                    font-size: 125%;
                "
                >
                    {{word}}
                </button>
            `,
            props: ['x', 'y', 'word'],
            methods: {
                open: function () {
                    // if the button is clicked, open the button
                    game.openBlock(parseInt(this.x), parseInt(this.y));
                },
            },
        },
    },
});

