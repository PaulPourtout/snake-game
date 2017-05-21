(function () {
	const canvas = document.getElementById('gameArea');
	const ctx = canvas.getContext('2d');

	let startX = 0;
	let startY = 0;

	// object representing the game area as an array
	const area =
		[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

	// Snake's settings and methods
	const snake = {
		width: 25,
		speed: 150,
		color: "#64b5f6",
		actualPosition: [area[startY][startX]],
		setNewPosition: function () {
			snake.actualPosition = [area[startY][startX]] = 1;
		},
		goRight: function () {
			startX++;
			console.log(startX);
		},
		goLeft: function () {
			startX--;
			console.log(startX);
		},
		goDown: function () {
			startY++;
			console.log(startY);
		},
		goUp: function () {
			startY--;
			console.log(startY);
		},
	}



	let positionY;

	function displaySnake() {
		area.forEach(function (element, index) {
			positionY = snake.width * index;

			element.forEach(function (element, index, array) {
				if (element === 1) {
					positionX = snake.width * index;
					ctx.fillStyle = snake.color;
					ctx.fillRect(positionX, positionY, snake.width, snake.width);
				}
			});
		});
	}



	let snakeLeft;
	let snakeRight;
	let snakeUp;
	let snakeDown;

	function gameOver() {
		if (startX > 20 || startX < 0 || startY > 20 || startY < 0) {
			alert('game over');
			window.clearInterval(snakeUp);
			window.clearInterval(snakeLeft);
			window.clearInterval(snakeRight);
			window.clearInterval(snakeDown);
			startX = 0;
			startY = 0;
		}
	}
	// Change snake direction with arrow keys
	document.addEventListener('keydown', (e) => {
		// On arrow left key press 
		if (e.keyCode === 37) {
			snakeLeft = setInterval(snake.goLeft, snake.speed);
			window.clearInterval(snakeRight);
			window.clearInterval(snakeUp);
			window.clearInterval(snakeDown);
			snake.setNewPosition();
			displaySnake();
			gameOver();
		}
		// On arrow up key press 
		else if (e.keyCode === 38) {
			snakeUp = setInterval(snake.goUp, snake.speed);
			window.clearInterval(snakeRight);
			window.clearInterval(snakeLeft);
			window.clearInterval(snakeDown);
			snake.setNewPosition();
			displaySnake();
			gameOver();
		}
		// On arrow right key press 
		else if (e.keyCode === 39) {
			snakeRight = setInterval(snake.goRight, snake.speed);
			window.clearInterval(snakeUp);
			window.clearInterval(snakeLeft);
			window.clearInterval(snakeDown);
			displaySnake();
			gameOver();
		}
		// On arrow down key press 
		else if (e.keyCode === 40) {
			snakeDown = setInterval(snake.goDown, snake.speed);
			window.clearInterval(snakeUp);
			window.clearInterval(snakeLeft);
			window.clearInterval(snakeRight);
			displaySnake();
			gameOver();
		}
	});

})()