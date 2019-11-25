/*
 * file: server.js
 */

const PORT = 8001; // process.env.PORT
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());

app.get('*', (req, res, next) => {
	res.send('404 error - page not found');
});

app.listen(PORT, (err) => {
	if (err) {
		console.log("\x1b[31m" + err);
	} else {
		console.log(`==> Server listening on PORT: ${PORT}`);
	}
});
