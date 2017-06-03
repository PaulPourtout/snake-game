const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// admin and mdp must go into variables
mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ds159591.mlab.com:59591/snake-game`)

const PORT = process.env.PORT || 8080;

// Serve statics files (HTML, CSS, Js)
app.use(express.static(path.join(__dirname, 'public')));

// Set the API route 
const api = express();

api.get('/scores', (req, res) => {
	res.send('this is the api/users');
});

app.use('/api', api);

app.listen(PORT, (req, res) => console.log(`Server runing on Port ${PORT}`));