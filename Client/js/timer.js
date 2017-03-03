var interval;
let seconds = 5;
let timer = function secondPassed(end) {
    let minutes = Math.round((seconds - 30)/60),
        remainingSeconds = seconds % 60;

    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }

    document.getElementById('countdown').innerHTML = minutes + ":" + remainingSeconds;
    if (seconds == 0) {
        clearInterval(interval);
        document.getElementById('countdown').innerHTML = "00:00";
        return end();
    } else {
        seconds--;
    }
};

function startTimer() {
    interval = setInterval(function() {
        timer(function () {
            alert("ok");
        });
    }, 1000);
}