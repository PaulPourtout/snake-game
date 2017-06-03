const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
	username: {type: String, default: 'Unknown'},
	score: {type: Number, require: true},
	score_date: {type: Date, default: new Date()},
})

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;