/*
 * file: server.js
 */

const PORT = 8001; // process.env.PORT
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());

let logger = function (req, res, next)
{
	console.log(`-> ${req.method} request for: ${req.url}`);
	next();
}
app.use(logger);

app.get('*', (req, res, next) => {
	console.log(`<- [404 error] - invalid request url`);
	res.status(404)
	   .send('404 error - page not found');
});

app.listen(PORT, (err) => {
	if (err) {
		console.log("\x1b[31m" + err);
	} else {
		console.log(`==> Server listening on PORT: ${PORT}`);
	}
});
