	// Area related variables
	let area = [];
	const cellNumbers = 30;

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

	export default area;