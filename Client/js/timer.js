
let seconds = 5;
let timer = function secondPassed(success) {
    let minutes = Math.round((seconds - 30)/60),
        remainingSeconds = seconds % 60;

    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }

    document.getElementById('countdown').innerHTML = minutes + ":" + remainingSeconds;
    if (seconds == 0) {
        clearInterval(startTimer);
        document.getElementById('countdown').innerHTML = "00:00";
        return success();
    } else {
        seconds--;
    }
};

let startTimer = setInterval(function() {
    timer(function () {
        alert("ok");
    });
}, 1000);