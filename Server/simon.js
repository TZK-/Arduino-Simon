
class Game {

	constructor(wss, serial) {
		this.serial = serial
		this.res = []
		this.expected = this.serial.getLeds();

		this.lost = false;
		this.over = false;

		this.wss = wss

		this.wss.on('connection', (ws) => {
			this.ws = ws
			this.sendToClient('test')
			this.ws.on('message', (led) => {
				this.play(led)
                //console.log(this.expected, this.res, this.over, this.lost)
				if(this.over && !this.lost) {
					this.notify(10)
					this.resetGame()
				}
				if(this.over && this.lost) {
					this.notify(20)
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
			this.lost = false;
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
		this.serial.send(message);
	}

}

module.exports = {
	Game
}