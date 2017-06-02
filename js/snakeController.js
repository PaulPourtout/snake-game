// Change snake direction with arrow keys
let previousKey;
document.addEventListener('keydown', (e) => {
	// On arrow left key press 
	if (e.keyCode === 37 && e.keyCode !== previousKey) {
		snakeLeft = setInterval(snake.goLeft, snake.speed);
		window.clearInterval(snakeRight);
		window.clearInterval(snakeUp);
		window.clearInterval(snakeDown);
		snake.setNewPosition();
	}
	// On arrow up key press 
	else if (e.keyCode === 38 && e.keyCode !== previousKey) {
		snakeUp = setInterval(snake.goUp, snake.speed);
		window.clearInterval(snakeRight);
		window.clearInterval(snakeLeft);
		window.clearInterval(snakeDown);
		snake.setNewPosition();
	}
	// On arrow right key press 
	else if (e.keyCode === 39 && e.keyCode !== previousKey) {
		snakeRight = setInterval(snake.goRight, snake.speed);
		window.clearInterval(snakeUp);
		window.clearInterval(snakeLeft);
		window.clearInterval(snakeDown);
		snake.setNewPosition();
	}
	// On arrow down key press 
	else if (e.keyCode === 40 && e.keyCode !== previousKey) {
		snakeDown = setInterval(snake.goDown, snake.speed);
		window.clearInterval(snakeUp);
		window.clearInterval(snakeLeft);
		window.clearInterval(snakeRight);
		snake.setNewPosition();
	}

	if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
		previousKey = e.keyCode;
	}
});
