const express = require('express');
const app = express();
const path = require('path');
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