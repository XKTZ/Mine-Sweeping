let game = new Vue({
    el: "#game",
    data: {
        gameOn: null,
        blockHead: "#block",
        squareSide: 10,
        numMine: 10,
    },
    methods: {
        startGame: function () {
            // check if the blocks are enough for mine
            if (this.numMine > this.squareSide * this.squareSide) {
                alert("Not enough block for mines");
                return;
            }
            // Start the game
            this.gameOn = new Game(this.squareSide, this.numMine);
            // Fresh
            this.showBoard();
            this.backStr = "";
        },
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
        openBlock: function (x, y) {
            // open the block of the game
            this.gameOn.openBlock(x, y);
            // Show the new board
            this.showBoard();
            if (this.gameOn.checkWin()) {
                // Alert that player win
                alert('You Win');
                // show the board
                this.gameOn.openAll();
                this.showBoard();
                // Delete the game
                this.gameOn = null;
            }
            // if player lose
            else if (this.gameOn.getWin() === false) {
                // Alert that player lose
                alert('You Lose');
                // Show the board
                this.gameOn.openAll();
                this.showBoard();
                // Delete the game
                this.gameOn = null;
            }
            // if player is not win & not lose
            else {
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
                    game.openBlock(parseInt(this.x), parseInt(this.y));
                },
                changeWord: function (wordChange) {
                    this.word = wordChange;
                },
            },
        },
    },
});
