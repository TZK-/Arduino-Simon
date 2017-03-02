
var ws = new WebSocket("ws://172.26.123.13:8080");


ws.onmessage = function(data, flags){
    //console.log("Récupération d'un message du serveur");
    console.log(data.data);

};

var expected = ['red', 'green', 'blue'];
var res = [];
var failed = false;
var over = false;

$('.simon').click(function() {
    if(over) {
        console.log("Game is over !");
        return false;
    }
    let color = $(this).attr('id');
    res.push(color);
    $.each(res, function(index, col){
        if(expected[index] != col) {
            console.log('Fail !');
            failed = true;
            over = true;
            return false;

        }
    });
    if(res.length == expected.length) {
        over = true;
        console.log("over");
    }

});
