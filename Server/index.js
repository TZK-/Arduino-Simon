let Server = require('./server')
let Serial = require('./serial').Serial
let Simon = require('./simon')

Server.start(3000, () => {
	console.log("Express server started on port")
})

let serial = new Serial('COM1', {
	baudRate: 9600
})

let simon = new Simon.Simon(8080, serial)
