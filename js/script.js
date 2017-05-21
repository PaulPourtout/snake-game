(function () {
	const canvas = document.getElementById('gameArea');

	const ctx = canvas.getContext('2d');
	const snakeWidth = 25;
	const snakeColor = "#64b5f6";
	let gameSpeed = 200;
	let posX = 0;
	let posY = 0;


	function goRight() {
		ctx.fillStyle = snakeColor;
		ctx.fillRect(posX = posX + snakeWidth, posY, snakeWidth, snakeWidth);

		if (posX >= 500 || posY >= 500) {
			alert('game over !');
		}
	}

	function goLeft() {
		ctx.fillStyle = snakeColor;
		ctx.fillRect(posX = posX - snakeWidth, posY, snakeWidth, snakeWidth);
	}

	function goDown() {
		ctx.fillStyle = snakeColor;
		ctx.fillRect(posX, posY = posY + snakeWidth, snakeWidth, snakeWidth);
	}

	function goUp() {
		ctx.fillStyle = snakeColor;
		ctx.fillRect(posX, posY = posY - snakeWidth, snakeWidth, snakeWidth);
	}

	let snakeLeft;
	let snakeRight;
	let snakeUp;
	let snakeDown;

	document.addEventListener('keydown', (e) => {
		if (e.keyCode === 37) {
			snakeLeft = setInterval(goLeft, gameSpeed);
			window.clearInterval(snakeRight);
			window.clearInterval(snakeUp);
			window.clearInterval(snakeDown);
		}
		else if (e.keyCode === 38) {
			snakeUp = setInterval(goUp, gameSpeed);
			window.clearInterval(snakeRight);
			window.clearInterval(snakeLeft);
			window.clearInterval(snakeDown);
		}
		else if (e.keyCode === 39) {
			snakeRight = setInterval(goRight, gameSpeed);
			window.clearInterval(snakeUp);
			window.clearInterval(snakeLeft);
			window.clearInterval(snakeDown);
		}
		else if (e.keyCode === 40) {
			snakeDown = setInterval(goDown, gameSpeed);
			window.clearInterval(snakeUp);
			window.clearInterval(snakeLeft);
			window.clearInterval(snakeRight);
		}
	});
})()