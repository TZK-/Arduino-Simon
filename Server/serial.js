let SerialPort = require('serialport')

class Serial {

	constructor(port, config) {
		this.serial = new SerialPort(port, config)
		this.leds = []

		this.serial.on('open', () => {
			console.log('Serial port opened on ' + port)
		})

		this.serial.on('error', (err) => {
			console.log('Serial ' + err.message);
		})

		this.serial.on('data', (message) => {
			this.leds.push(message)
		})
	}
 
	send(message) {
		this.serial.write(message)
	}

	getLeds() {
		return this.leds;
	}

}

module.exports = {
	Serial
}