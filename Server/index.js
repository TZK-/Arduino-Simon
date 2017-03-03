let Server = require('./server')
let WebSocket = require('ws')
let Serial = require('./serial').Serial
let Simon = require('./simon')

Server.start(3000, () => {
	console.log("Express server started on port")
})

let serial = new Serial('COM1', {
	baudRate: 9600
})

let wss = new WebSocket.Server({
	port: 8080,
	perMessageDeflate: false
})

let simon = new Simon.Game(wss, serial)
