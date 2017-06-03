const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {type: String, required: true, unique: true},
	lastScore: {type: Number, default: 0},
	lastScore_date: {type: Date, default: new Date()},
	bestScore: {type: Number, default: 0},
	bestScore_date: {type: Date, default: new Date()}
})

const User = mongoose.model('User', userSchema);

module.exports = User;