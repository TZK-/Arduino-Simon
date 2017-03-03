
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

    ws.send($(this).attr('id'));

});
