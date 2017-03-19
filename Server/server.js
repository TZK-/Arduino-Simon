let express = require('express')

let start = (port, callback) => {
	let app = express()

	app.listen(port, () => {
		console.log('Express server started on port ' + port)
	})

	return app
}


module.exports = {
	start
}