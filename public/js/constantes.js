// const area = require('area.js');
const canvas = document.getElementById('gameArea');
const ctx = canvas.getContext('2d');

// DOM Elements
const score = document.getElementById('score');
const startingInfo = document.getElementById('starting-info');
const saveScoreForm = document.getElementById('save-score-form');
const saveScore = document.getElementById('saveScore');
const actualScore = document.getElementById('actual-score');
const displayBestScores = document.getElementById('display-best-scores');
const scoresContainer = document.getElementById('scores-container');
const playersScores = document.getElementById('players-scores');

// Game over DOM elements
const gameOverScreen = document.getElementById('game-over');
const restart = document.getElementById('restart');
const reasonLost = document.getElementById('reason-lost');

// Snake directions variables
let snakeLeft;
let snakeRight;
let snakeUp;
let snakeDown;

// Audio elements
const gameOverAudio = document.getElementById('game-over-audio');
const eatAppleAudio = document.getElementById('eat-apple-audio');
const audioControls = document.getElementsByClassName('audio-control');