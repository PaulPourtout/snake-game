(function () {
	const canvas = document.getElementById('gameArea');
	const ctx = canvas.getContext('2d');

	// Aspects variables
	const startingPositionX = 3;
	const startingPositionY = 3;
	const areaBackgroundColor = "#FFFFFF";
	const color1 = "#aadd39";
	const color2 = "#ea6b20";

	// DOM Elements
	const score = document.getElementById('score');
	const startingInfo = document.getElementById('starting-info');

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

	// Area related variables
	let area = [];
	const cellNumbers = 20;

	// Array representing the game area
	function generateArea() {
		area = [];
		for (let i = 0; i < cellNumbers; i++) {
			area.push([]);
			for (let y = 0; y < cellNumbers; y++) {
				area[i].push(0);
			}
		}
	}

	// Apples' settings and methods
	const apple = {
		color: color2,
		width: (canvas.width / cellNumbers), // 25
		positionX: null,
		positionY: null,
		getApplePosition: function () {
			// Create random apple position in area
			apple.positionX = Math.floor(Math.random() * (20));
			apple.positionY = Math.floor(Math.random() * (20));

			snake.presence.forEach(function (element) {
				if (apple.positionX === element.x && apple.positionY === element.y) {
					apple.positionX = Math.floor(Math.random() * (20));
					apple.positionY = Math.floor(Math.random() * (20));
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
		width: (canvas.width / cellNumbers), // 25
		speed: 200,
		length: 3,
		color: color1,
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


	// If the snake eat an apple increase snake's length and speed
	function eatApple() {
		// If head of the snake touch an apple
		if (apple.positionX === snake.positionX && apple.positionY === snake.positionY) {
			snake.apples++;
			score.innerHTML = snake.apples < 10 ? '0' + snake.apples : snake.apples;
			apple.generateApple();
			snake.speed = snake.speed - 5;
			snake.length++;
			eatAppleAudio.play();
		}
	}

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
		if (snake.positionX < 0 || snake.positionX > 20
			|| snake.positionY < 0 || snake.positionY > 20) {
			gameOver('crossed the borders !');
		}
	}

	// When the game is over it resets
	function gameOver(reason) {
		window.clearInterval(snakeUp);
		window.clearInterval(snakeLeft);
		window.clearInterval(snakeRight);
		window.clearInterval(snakeDown);
		// alert('Game over ! try again');
		reasonLost.innerHTML = "You just " + reason;
		gameOverScreen.style.display = 'flex';
		gameOverAudio.play();
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

	function hideStartingInfoDisplay() {
		document.addEventListener('keydown', (e) => {
			if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
				startingInfo.style.display = "none";
			}
		});
	}

	// Generate the area and the first apple before the player starts playing
	generateArea();
	apple.generateApple();
	displaySnakeAndApples();
	restart.addEventListener('click', newGame);
	hideStartingInfoDisplay();
	

})()