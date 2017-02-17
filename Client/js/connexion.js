const WebSocket = require('ws');

const ws = new WebSocket('ws://www.host.com/path');

ws.on('open', function open() {
    console.log('Récupération des informations du serveur')
    ws.send('OK');
});


ws.on('message', function(data, flags){
    // flags.binary will be set if a binary data is received.
    // flags.masked will be set if the data was masked.
});