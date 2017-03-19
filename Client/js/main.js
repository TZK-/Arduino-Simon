
var vue = new Vue({
    el: '#app',
    data: {
        count: 0,
        started: false,
        failed: false
    },

    methods: {
        countIterator() {
            this.count++;
        },

        countReset() {
            this.count = 0;
        },

        startGame() {
           this.countReset();
           this.started = true;
           this.failed = false;
           // startTimer();
        },

        failedGame() {
            this.countReset();
            this.failed = true;
        },

        send(num) {
            console.log(num);
            socket().send(num);
        }
    }
});
