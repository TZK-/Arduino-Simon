let Server = require('./server')
let WebSocket = require('ws')
let Serial = require('./serial').Serial
let Simon = require('./simon')

Server.start(8001, () => {
	console.log("Express server started on port")
})

let serial = new Serial('/dev/ttyACM4', {
	baudRate: 9600
})

let wss = new WebSocket.Server({
	port: 8082,
	perMessageDeflate: false
})

let simon = new Simon.Game(wss, serial)
