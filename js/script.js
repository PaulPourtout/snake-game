(function () {
	const canvas = document.getElementById('gameArea');
	const ctx = canvas.getContext('2d');

	// object representing the game area as an array
	// let area =
	// 	[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

		const area = [];
		for(let i = 0; i < 20; i++) {
			area.push([]);
			for(let y = 0; y < 20; y++) {
				area[i].push(0);
			}
		}
const areaBackgroundColor = "#FFFFFF";
const startingPositionX = 3;
const startingPositionY = 3;

		console.log(area);

	// Snake's settings and methods
	const snake = {
		width: 25,
		speed: 150,
		length: 3,
		color: "#64b5f6",
		snakePosition: [],
		positionX: startingPositionX,
		positionY: startingPositionY,
		setNewPosition: function () {
			gameOver();
			const newPosition = area[snake.positionY][snake.positionX] = 1;
			snake.snakePosition.push(newPosition);


		},
		goRight: function () {
			snake.positionX++;
			snake.setNewPosition();
			console.log("x", snake.positionX);
			displaySnake();
		},
		goLeft: function () {
			snake.positionX--;
			snake.setNewPosition();
			console.log("x", snake.positionX);
			displaySnake();
		},
		goDown: function () {
			snake.positionY++;
			snake.setNewPosition();
			console.log("y", snake.positionY);
			displaySnake();
		},
		goUp: function () {
			snake.positionY--;
			snake.setNewPosition();
			console.log("y", snake.positionY);
			displaySnake();
		},
	}


// displaySnake function draw the snake in the canvas area with informations from the area array
	let positionY;
	let positionX;

	function displaySnake() {
		area.forEach(function (element, index) {
			positionY = snake.width * index;

			element.forEach(function (element, index, array) {
				positionX = snake.width * index;

				if (element === 1) {
					ctx.fillStyle = snake.color;
					ctx.fillRect(positionX, positionY, snake.width, snake.width);
				}

				else {
					ctx.fillStyle = areaBackgroundColor;
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
		if (snake.positionX < 0
		 || snake.positionX > 20 
		 || snake.positionY < 0 
		 || snake.positionY > 20
		 ) {
			alert('game over');
			window.clearInterval(snakeUp);
			window.clearInterval(snakeLeft);
			window.clearInterval(snakeRight);
			window.clearInterval(snakeDown);

			snake.positionX = startingPositionX;
			snake.positionY = startingPositionY;
			location.reload();
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
		}
		// On arrow up key press 
		else if (e.keyCode === 38) {
			snakeUp = setInterval(snake.goUp, snake.speed);
			window.clearInterval(snakeRight);
			window.clearInterval(snakeLeft);
			window.clearInterval(snakeDown);
			snake.setNewPosition();
		}
		// On arrow right key press 
		else if (e.keyCode === 39) {
			snakeRight = setInterval(snake.goRight, snake.speed);
			window.clearInterval(snakeUp);
			window.clearInterval(snakeLeft);
			window.clearInterval(snakeDown);
			snake.setNewPosition();
		}
		// On arrow down key press 
		else if (e.keyCode === 40) {
			snakeDown = setInterval(snake.goDown, snake.speed);
			window.clearInterval(snakeUp);
			window.clearInterval(snakeLeft);
			window.clearInterval(snakeRight);
			snake.setNewPosition();
		}
	});

})()