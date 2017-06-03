const express = require('express');
const app = express();
const cookieSession = require('cookie-session')
const path = require('path');
const mongoose = require('mongoose');
const User = require('./server/models/User');
// Set env variable for dev
const dotenv = require('dotenv');
dotenv.load();

const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD

// admin and passwrd must go into variables
mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ds159591.mlab.com:59591/snake-game`)

const bodyParser = require('body-parser');

// App config
app.use(bodyParser.urlencoded({extended: true}));
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
	res.send('this is the api/users');
});

apiRouter.get('/users', (req, res) => {
	User.find({}, (err, users) => {
		if (err) console.log('error ', err);

		res.json(users);
	});
});

// // Create a new user
apiRouter.post('/users', (req, res) => {
	const newUser = new User;
	newUser.username = req.body.username;

	User.find({username: newUser.username}, (err, user) => {
		if (err) console.log('error ', err);

		if (user.length > 0) {
			return 
		}
		res.json(user);
	})
});

// Search a user, if not found create it
apiRouter.post('/users/newscore', (req, res) => {

	const query = {username: req.body.username};
	const update = {lastScore_date : new Date()};
	const options = {upsert: true, new: true};

	User.findOneAndUpdate(query, update, options, (err, result) => {
		if (err) console.log(err);

		res.json({message: "User ok", data: result});
	})
});

app.use('/api', apiRouter);

app.listen(PORT, (req, res) => console.log(`Server runing on Port ${PORT}`));