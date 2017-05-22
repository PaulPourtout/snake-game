(function () {
	const canvas = document.getElementById('gameArea');
	const ctx = canvas.getContext('2d');

	// object representing the game area as an array
	const area = [];
	for (let i = 0; i < 20; i++) {
		area.push([]);
		for (let y = 0; y < 20; y++) {
			area[i].push(0);
		}
	}


	const score = document.getElementById('score');
	const areaBackgroundColor = "#FFFFFF";
	const startingPositionX = 3;
	const startingPositionY = 3;


	// Apples' settings and methods
	const apple = {
		color: "#ea6b20",
		width: 25,
		positionX: null,
		positionY: null,
		getApplePosition: function () {
			// Create random apple position in area
			let applePositionX = Math.floor(Math.random() * (20));
			let applePositionY = Math.floor(Math.random() * (20));

			snake.presence.forEach(function(element) {
				
					if (applePositionX === element.x && applePositionY === element.y) {
						apple.positionX = applePositionX;
						apple.positionY = applePositionY;
					}
					else {
						applePositionX = Math.floor(Math.random() * (20));
						applePositionY = Math.floor(Math.random() * (20));
					}
			});
		},
		generateApple: function () {
			apple.getApplePosition();
			area[apple.positionY][apple.positionX] = 2;
		}
	};


	// Snake's settings and methods
	const snake = {
		apples: 0,
		width: 25,
		speed: 200,
		length: 3,
		color: "#64b5f6",
		presence: [],
		positionX: startingPositionX,
		positionY: startingPositionY,
		setNewPosition: function () {
			testGameOver();
			eatApple();
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
	}

	// displaySnakeAndApples function draw the snake in the canvas area with informations from the area array
	let snakePositionY;
	let snakePositionX;

	function displaySnakeAndApples() {
		area.forEach(function (element, index) {
			// Calcul snake position by multiplying cell's width by index in the area array
			// ex: snake.width = 25 and index of Y axes is 2 => positionY would be 25 * 2 = 50
			snakePositionY = snake.width * index;

			element.forEach(function (element, index, array) {
				// Same as the Y position but for the X axes here
				snakePositionX = snake.width * index;

				// If it's a 1 then fill with snake background color
				if (element === 1) {
					ctx.fillStyle = snake.color;
					ctx.fillRect(snakePositionX, snakePositionY, snake.width, snake.width);
				}

				// If it's a 2 then fill with apple background color
				else if (element === 2) {
					const applePositionX = snakePositionX + snake.width / 2;
					const applePositionY = snakePositionY + snake.width / 2;

					ctx.beginPath();
					ctx.fillStyle = apple.color;
					ctx.arc(applePositionX, applePositionY, snake.width / 2, 0, Math.PI * 2);
					ctx.fill();
					ctx.closePath();
				}

				// If it's a 0 then fill with area background color
				else {
					ctx.fillStyle = areaBackgroundColor;
					ctx.fillRect(snakePositionX, snakePositionY, snake.width, snake.width);
				}
			});
		});
	}


	// Test if the player lose the game
	function testGameOver() {
		// If the snake bites itself
		snake.presence.forEach(function (element) {
			if (snake.positionX === element.x
				&& snake.positionY === element.y
				&& element !== snake.presence[snake.presence.length - 1]) {
				gameOver();
			}
		});

		// If the snake touch borders
		if (snake.positionX < 0 || snake.positionX > 20
			|| snake.positionY < 0 || snake.positionY > 20) {
			gameOver();
		}
	}


	// If the snake eat an apple increase snake's length and speed
	function eatApple() {
		// If head of the snake touch an apple
		if (apple.positionX === snake.positionX && apple.positionY === snake.positionY) {
			snake.apples++;
			score.innerHTML = snake.apples < 10 ? '0' + snake.apples : snake.apples;
			apple.generateApple();
			snake.speed = snake.speed - 5;
			snake.length++;
		}
	}

	let snakeLeft;
	let snakeRight;
	let snakeUp;
	let snakeDown;

	// When the game is over is resets
	function gameOver() {
		alert('Game over ! try again');
		window.clearInterval(snakeUp);
		window.clearInterval(snakeLeft);
		window.clearInterval(snakeRight);
		window.clearInterval(snakeDown);

		location.reload();
		snake.positionX = startingPositionX;
		snake.positionY = startingPositionY;
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

	// Generate the first apple before the player starts playing
	apple.generateApple();
	displaySnakeAndApples();

})()