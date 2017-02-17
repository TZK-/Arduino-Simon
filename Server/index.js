var SerialPort = require('serialport');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var port = new SerialPort('COM3');

port.on("open", function () {
	console.log('open');
	port.on('data', function(data) {
		jsonText = "";
		data.forEach((el, index) => {
			jsonText += String.fromCharCode(el);
		});
		console.log(jsonText);
	});
});