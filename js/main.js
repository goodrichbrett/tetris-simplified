// Cached Element References
const gameDiv = document.querySelector("#game-div");
init();
const blocksNodeList = document.querySelectorAll(".block");
const blocks = Array.from(blocksNodeList);
const userScore = document.querySelector("#status #score");
const resetBtn = document.querySelector("#resetButton");
const startBtn = document.querySelector("#startButton");
const colors = ["#e3b505", "#95190c", "610345", "#107e7d", "#044b7f"];

// Variables

// Event Listeners

// Functions

function init() {
	// Create 200 divs for the playing field under gameDiv
	for (let i = 0; i < 200; i++) {
		const newDiv = document.createElement("div");
		newDiv.id = i;
		newDiv.className = "block";
		gameDiv.appendChild(newDiv);
	}
}
