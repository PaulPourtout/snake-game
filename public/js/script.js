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

saveScore.addEventListener('click', e => {
	saveScoreForm.style.display = 'flex';
	actualScore.setAttribute("value", snake.apples);
})

fetch('/api/scores/best')
	.then(res => res.json())
	.then(scores => {
		scores.forEach(function (score, index) {
			const newScore = document.createElement('li');
			newScore.innerHTML = `<p>${index + 1}. Name : ${score.username}</p><p>Score : ${score.score}</p>`;
			playersScores.appendChild(newScore);
		})
	})
	.catch(err => console.log('error ', err));


displayBestScores.addEventListener('click', e => {
	window.getComputedStyle(scoresContainer).display === 'none'
		? scoresContainer.style.display = 'flex'
		: scoresContainer.style.display = 'none';
});

hideStartingInfoDisplay();

