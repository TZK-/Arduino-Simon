let WebSocket = require('ws')

class Simon {

	constructor(port, serial) {
		this.serial = serial
		this.res = []
		this.expected = ['red', 'green', 'blue']
		this.lost = false;
		this.over = false;

		this.wss = new WebSocket.Server({
			port: port,
			perMessageDeflate: false
		})

		this.wss.on('connection', (ws) => {
			this.ws = ws
			this.sendToClient('test')
			this.ws.on('message', (led) => {
				console.log(led)
				this.play(led)
				if(this.checkWon()) {
					this.notify('win')
					this.resetGame()
				}
			})
		})
	}

	notify(message) {
		this.sendToClient(message)
		this.sendToArduino(message)
	}

	resetGame() {
		this.lost = false
		this.over = false
		this.res = []
	}

	play(led) {
		if(this.over) 
			return false;
		this.res.push(led);
		this.res.forEach((val, index) => {
			if(this.expected[index] != val) {
				this.lost = true;
				this.over = true;
				return false;
			}
		})

		if(this.expected.length === this.res.length) {
			this.over = true;
			return true;
		} 

		return false;
	}

	checkWon() {
		return this.over && !this.lost
	}

	sendToClient(message) {
		this.ws.send(message)
	}

	sendToArduino(message) {
		console.log(message)
		// this.serial.send(message);
	}

}

module.exports = {
	Simon
}