// Snake's settings and methods
const snake = {
	apples: 0,
	width: (canvas.width / cellNumbers), // 25
	speed: 200,
	length: 3,
	color: color1,
	presence: [],
	positionX: startingPositionX,
	positionY: startingPositionY,
	setNewPosition: function () {
		testGameOver();
		snake.eatApple();
		area[snake.positionY][snake.positionX] = 1;
		const newPosition = { x: snake.positionX, y: snake.positionY };
		snake.presence.push(newPosition);

		if (snake.presence.length > snake.length) {
			const oldPosition = snake.presence.shift();
			area[oldPosition.y][oldPosition.x] = 0;
		}
	},
	goRight: function () {
		snake.positionX++;
		snake.setNewPosition();
		displaySnakeAndApples();
	},
	goLeft: function () {
		snake.positionX--;
		snake.setNewPosition();
		displaySnakeAndApples();
	},
	goDown: function () {
		snake.positionY++;
		snake.setNewPosition();
		displaySnakeAndApples();
	},
	goUp: function () {
		snake.positionY--;
		snake.setNewPosition();
		displaySnakeAndApples();
	},
	// If the snake eat an apple increase snake's length and speed
	eatApple: function () {
		// If head of the snake touch an apple
		if (apple.positionX === snake.positionX && apple.positionY === snake.positionY) {
			snake.apples++;
			score.innerHTML = snake.apples < 10 ? '0' + snake.apples : snake.apples;
			apple.generateApple();
			snake.speed = snake.speed - 5;
			snake.length++;
			eatAppleAudio.play();
			eatAppleAudio.volume = globalVolume;
		}
	}
}