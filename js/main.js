let game = new Vue({
    el: "#game",
    data: {
        // x: null,
        // y: null,
        gameOn: null,
        gameStr: "",
        gameBtn: "gameBtn",
        backStr: "",
    },
    methods: {
        startGame: function () {
            this.gameOn = new Game(10, 10);
            this.gameStr = this.gameOn.getFront("<br>");
            console.log(this.gameOn.getBack("\n"));
        },
        openBlock: function (x, y) {
            this.gameOn.openBlock(x, y);
            this.gameStr = this.gameOn.getFront("<br>");
            if (this.gameOn.checkWin()) {
                alert('You win');
                this.backStr = this.gameOn.getBack("<br>");
                this.gameOn = null;
            }
        },
        autoClear: function () {
            for(let i = 0; i < 10; i ++) {
                for(let j = 0; j < 10; j ++) {
                    if (this.gameOn.getBackBoard()[i][j] !== -1) {
                        this.openBlock(i, j);
                    }
                }
            }
            console.log("finish");
        },
    },
    components: {
        'block': {
            template: `
                <button @click="open" style="
                    width: 30px;
                    height: 30px;
                    padding: 0;
                    margin: 0;
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
            },
        },
    },
});

