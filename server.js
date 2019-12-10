/*
 * file: server.js
 */

const PORT = process.env.PORT || 8001;

//Load Dependencies
let path = require('path');
let fs = require('fs');
let exec = require('child_process').exec;
let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');

//Server Setup
let app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Database Setup
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ gifs: [], count: 0})
  .write()

//Logger Function that logs any request tot the console
let logger = function (req, res, next)
{
	console.log(`-> ${req.method} request for: ${req.url}`);
	next();
}
app.use(logger);

/*
 * API ROUTES:
 * -GET /gifs (return all gifs in database)
 *
 */

 //GET /gifs
 app.get('/gifs', (req, res, next) => {
	let data = db.get('gifs')
				 .value();
	if (data) {
		res.status(200).send(data);
	} else {
		next();
	}
 });

 //GET /gifs/:id 
 app.get('/gifs/:id', (req, res, next) => {
	let data = db.get('gifs')
				 .find({ "id": req.params.id })
				 .value();
	if (data) {
		res.status(200).send(data);
	} else {
		next();
	}
 });

 //POST /newgif
 app.post('/newgif', (req, res, next) => {
	let url, start, time, gif, resp;
	if (req.body.url && req.body.start && req.body.time) {
		url = req.body.url;
		start = req.body.start;
		time = req.body.time;
		if (time > 60) {
			res.status(500).send("Error: time too long maximum is 60s");
		}
		gif = exec(`./gif.sh ${url} ${start} ${time}`, (err, stdout, stderr) => {
			console.log(stdout, stderr);
			resp = stdout;
		}).on("close", (code) => {
			if (code != 0) {
				res.status(500).send("Error: There as been an error while processing your request");
			}
			let newGif = {
				"id": resp.replace(/\.[^/.]+$/, ""),
				"url": url,
				"filename": `/gif/${resp}`,
				"date": Date(resp.replace(/\.[^/.]+$/, ""))
			};
			db.get('gifs')
			  .push(newGif)
			  .write();

			db.update('count', n => n + 1)
			  .write();
				
			res.send(resp);
		});
	} else {
		res.send(500).send("Error: Missing arguments for request");
	}
 });

//Handles 404
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
