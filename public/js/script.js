function hideStartingInfoDisplay() {
	// On any arrow key press hide the first panel
	if (window.getComputedStyle(startingInfo).display === 'flex') {
		document.addEventListener('keydown', (e) => {
			if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
				startingInfo.style.display = "none";
				// playAudio.play();
			}
		});
	}
}

// Display the player's score before saving it to the database with username
saveScore.addEventListener('click', e => {
	saveScoreForm.style.display = 'flex';
	actualScore.setAttribute("value", snake.apples);
});

// Call the top ten scores from database
fetch('/api/scores/best')
	.then(res => res.json())
	.then(scores => {
		// Display the best score ever to beat over the game area
		bestScoreEverValue = scores[0].score;
		bestScoreEver.innerHTML = bestScoreEverValue;
		// For each score create a list item
		scores.forEach(function (score, index) {
			const newScore = document.createElement('li');
			newScore.innerHTML = `<p>${index + 1}. Name : ${score.username}</p><p>Score : ${score.score}</p>`;
			playersScores.appendChild(newScore);
		})
	})
	.catch(err => console.log('error ', err));

// On click display the top ten best scores
displayBestScores.addEventListener('click', e => {
	window.getComputedStyle(scoresContainer).display === 'none'
		? scoresContainer.style.display = 'flex'
		: scoresContainer.style.display = 'none';
});


generateArea(); // Generate the area and the first apple before the player starts playing
apple.generateApple(); // Generate the first apple the player has to catch
displaySnakeAndApples(); // Draw shapes of apple and snake in the game area
hideStartingInfoDisplay(); // On arrow key press hide the info screen and launch the game

