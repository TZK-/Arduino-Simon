const WebSocket = require('ws');

const ws = new WebSocket('ws://www.host.com/path');

ws.on('open', function open() {
    console.log('Ouverture de la communication avec le serveur');

});


ws.on('message', function(data, flags){
    console.log("Récupération d'un message du serveur");


});

