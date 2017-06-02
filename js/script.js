generateArea(); // Generate the area and the first apple before the player starts playing
apple.generateApple(); // Generate the first apple the player has to catch
displaySnakeAndApples(); // Draw shapes of apple and snake in the game area

function hideStartingInfoDisplay() {
	// On any arrow key press hide the first panel
	document.addEventListener('keydown', (e) => {
		if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
			startingInfo.style.display = "none";
		}
	});
}

hideStartingInfoDisplay();

