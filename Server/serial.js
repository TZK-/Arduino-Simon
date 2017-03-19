let SerialPort = require('serialport')

class Serial {

	constructor(port, config) {
		config.parser = SerialPort.parsers.byteDelimiter([0])

		this.serial = new SerialPort(port, config)
		this.leds = []

		this.serial.on('open', () => {
			console.log('Serial port opened on ' + port)
		})

		this.serial.on('error', (err) => {
			console.log('Serial ' + err.message)
		})

		this.serial.on('data', (message) => {
			message.pop()
			message.forEach((el) => {
				this.leds.push(el)
			})
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
