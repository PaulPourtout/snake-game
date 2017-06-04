
// Test if the player lose the game
function testGameOver() {
	// If the snake bites itself
	snake.presence.forEach(function (element) {
		if (snake.positionX === element.x
			&& snake.positionY === element.y
			&& element !== snake.presence[snake.presence.length - 1]) {
			gameOver('bite yourself !');
		}
	});

	// If the snake touch borders
	if (snake.positionX < 0 || snake.positionX > cellNumbers
		|| snake.positionY < 0 || snake.positionY > cellNumbers) {
		gameOver('crossed the borders !');
	}
}

// When the game is over it resets
function gameOver(reason) {
	playAudio.currentTime = 0;
	playAudio.pause();
	window.clearInterval(snakeUp);
	window.clearInterval(snakeLeft);
	window.clearInterval(snakeRight);
	window.clearInterval(snakeDown);
	// alert('Game over ! try again');
	reasonLost.innerHTML = "You just " + reason;
	gameOverScreen.style.display = 'flex';
	gameOverAudio.play();
	gameOverAudio.volume = globalVolume;
}

function newGame() {
	// Restarting all game variables
	snake.presence = [];
	snake.speed = 200;
	snake.length = 3;
	snake.apples = 0;
	score.innerHTML = '00';
	snake.positionX = startingPositionX;
	snake.positionY = startingPositionY;

	generateArea();
	apple.generateApple();
	displaySnakeAndApples();

	gameOverScreen.style.display = 'none';
	startingInfo.style.display = "flex";

	hideStartingInfoDisplay();
	gameOverAudio.currentTime = 0;
	gameOverAudio.pause();
}

// On click on the restart button launch newGame function
restart.addEventListener('click', newGame);