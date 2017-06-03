const express = require('express');
const app = express();
const cookieSession = require('cookie-session')
const path = require('path');
const mongoose = require('mongoose');
const User = require('./server/models/User');
const Score = require('./server/models/Score');
// Set env variable for dev
const dotenv = require('dotenv');
dotenv.load();

const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD

// admin and passwrd must go into variables
mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ds159591.mlab.com:59591/snake-game`)

const bodyParser = require('body-parser');

// App config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the app server port
const PORT = process.env.PORT || 8080;

// Serve statics files (HTML, CSS, Js)
app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieSession({
	name: 'session',
	keys: ['key1', 'key2'],
	// Cookie Options 
	maxAge: 24 * 60 * 60 * 1000 // 24 hours 
}));


// Set the API route 
const apiRouter = express();

apiRouter.get('/scores', (req, res) => {
	Score.find({}, (err, scores) => {
		if (err) console.log('error ', err);

		res.json(scores);
	});
});

apiRouter.get('/scores/best', (req, res) => {
	Score.find({})
		.sort('-score')
		.limit(10)
		.exec(function (err, scores) {
			if (err) console.log('error ', err);

			console.log(scores);
			res.json(scores);
		});
});

// Record a user's score
apiRouter.post('/scores', (req, res) => {
	const newScore = new Score;
	newScore.username = req.body.username === "" ? "Unknown" : req.body.username;
	newScore.score = req.body.score;

	newScore.save(err => {
		if (err) res.send('error', err);

		res.redirect('/');
	})
});



app.use('/api', apiRouter);

app.listen(PORT, (req, res) => console.log(`Server runing on Port ${PORT}`));