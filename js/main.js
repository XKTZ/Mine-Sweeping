let game = new Vue({
    el: "#game",
    data: {
        x: null,
        y: null,
        gameOn: null,
        gameStr: "",
    },
    methods: {
        startGame: function () {
            this.gameOn = new Game(10, 10);
            this.gameStr = this.gameOn.getFront();
            console.log(this.gameOn.getBack());
        },
        openBlock: function () {
            this.gameOn.openBlock(this.x, this.y);
            this.gameStr = this.gameOn.getFront();
        }
    },
});