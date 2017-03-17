
class Game {

	constructor(wss, serial) {
		this.serial = serial
		this.res = []

		this.lost = false;
		this.over = false;

		this.wss = wss

		this.wss.on('connection', (ws) => {
			this.ws = ws
			this.sendToClient('test')
			this.ws.on('message', (led) => {
				this.play(led)
				
				if(this.over && !this.lost) {
					this.notify("1")
					this.resetGame()
				}
				if(this.over && this.lost) {
					this.notify("0")
				}
			})
		})
	}

	notify(message) {
		this.sendToClient(message)
		this.sendToArduino(message)
		this.serial.leds = []
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
			if(this.serial.getLeds()[index] != val) {
				this.lost = true;
				this.over = true;
				return false;
			}
		})

		if(this.serial.getLeds().length === this.res.length) {
			this.over = true;
			this.lost = false;
			return true;
		} 

		return false;
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