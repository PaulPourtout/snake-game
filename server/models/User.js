const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {type: String, required: true, unique: true},
	lastScore: Number,
	lastScore_date: Date,
	bestScore: Number,
	bestScore_date: Date 
})

const User = mongoose.model('User', userSchema);

module.exports = User;