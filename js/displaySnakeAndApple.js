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