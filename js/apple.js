// Apples' settings and methods
const apple = {
	color: color2,
	width: (canvas.width / cellNumbers), // 25
	positionX: null,
	positionY: null,
	getApplePosition: function () {
		// Create random apple position in area
		apple.positionX = Math.floor(Math.random() * (cellNumbers));
		apple.positionY = Math.floor(Math.random() * (cellNumbers));

		snake.presence.forEach(function (element) {
			if (apple.positionX === element.x && apple.positionY === element.y) {
				apple.positionX = Math.floor(Math.random() * (cellNumbers));
				apple.positionY = Math.floor(Math.random() * (cellNumbers));
			}
		});
	},
	generateApple: function () {
		apple.getApplePosition();
		area[apple.positionY][apple.positionX] = 2;
	}
};