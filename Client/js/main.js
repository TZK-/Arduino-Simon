
new Vue({
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

        startGame() {
           this.count = 0;
           this.started = true;
           this.failed = false;
           startTimer();
        },

        failGame() {
            this.failed = true;
            socket().send(0);
        },

        send(num) {
            console.log(num);
            socket().send(num);
        }
    }
});
