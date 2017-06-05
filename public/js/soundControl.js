(function changeVolume() {
	for (let i = 0; i < audioControls.length; i++) {
		const volumeStep = 1 / (audioControls.length - 1);

		audioControls[i].addEventListener('click', e => {
			for (let y = 0; y <= i; y++) {
				audioControls[y].classList.add('active');
			}
			for (let z = i + 1; z < audioControls.length; z++) {
				audioControls[z].classList.remove('active');
			}

			globalVolume = i * volumeStep;

			// change volumen of all elements
			eatAppleAudio.volume = globalVolume;
			gameOverAudio.volume = globalVolume;
			// playAudio.volume = globalVolume;
		});
	}
})();