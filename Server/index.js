var SerialPort = require('serialport');
const WebSocket = require('ws');
var express = require('express');
var app = express();


app.get('/', function (req, res) {
	res.send('Hello World!');
});


/*var port = new SerialPort('COM3');

port.on("open", function () {
	console.log('open');
	port.on('data', function(data) {
		jsonText = "";
		data.forEach((el, index) => {
			jsonText += String.fromCharCode(el);
		});
		console.log(jsonText);
	});
});*/

app.listen(3000);

const wss = new WebSocket.Server({ port: 8080 });
console.log("OK WS");
wss.on('connection', function connection(ws) {
	console.log("Connected..");
	
	ws.send("SALUT");

});


