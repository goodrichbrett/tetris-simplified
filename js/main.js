// Cached Element References
const gameDiv = document.querySelector("#game-div");
// Call initialization function after selecting the gameDiv, so the blocks can be adding to the html before selecting each block
init();
const blocksNodeList = document.querySelectorAll(".block");
const userScore = document.querySelector("#status #score");
const resetBtn = document.querySelector("#resetButton");
const startBtn = document.querySelector("#startButton");
const timer = document.querySelector("#timer");

// Variables
const blocks = Array.from(blocksNodeList);
const colors = ["#e3b505", "#95190c", "610345", "#107e7d", "#044b7f"];
let timerInterval;
let min,
	sec,
	seconds = 0;

// Define the shapes of each block using indexes
const blockShapes = [
	(blockL = [
		[1, 11, 21, 2],
		[10, 11, 12, 22],
		[1, 11, 21, 20],
		[10, 20, 21, 22],
	]),
	(blockI = [
		[1, 11, 21, 31],
		[10, 11, 12, 13],
		[1, 11, 21, 31],
		[10, 11, 12, 13],
	]),
	(blockSq = [
		[0, 1, 10, 11],
		[0, 1, 10, 11],
		[0, 1, 10, 11],
		[0, 1, 10, 11],
	]),
	(blockT = [
		[1, 10, 11, 12],
		[10, 11, 12, 21],
		[1, 11, 12, 21],
		[1, 10, 11, 21],
	]),
	(blockSn = [
		[1, 10, 11, 20],
		[0, 10, 11, 21],
		[1, 2, 10, 11],
		[0, 1, 11, 12],
	]),
];

let shape = blockShapes[Math.floor(Math.random() * blockShapes.length)][0];
let position = 4;

// Event Listeners
startBtn.addEventListener("click", () => startTimer());
resetBtn.addEventListener("click", () => {
	clearInterval(timerInterval);
	seconds = 0;
	clearInterval(timerInterval);
	removeBlock();
	timer.innerText = "0m 0s";
	return (timerInterval = null);
});

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

//  render on the page the shape with its specific color via CSS selected class by using if statements and adding class list
function render() {
	shape.forEach((idx) => {
		if (shape === blockShapes[0][0])
			blocks[position + idx].classList.add("blockL");
		if (shape === blockShapes[1][0])
			blocks[position + idx].classList.add("blockI");
		if (shape === blockShapes[2][0])
			blocks[position + idx].classList.add("blockSq");
		if (shape === blockShapes[3][0])
			blocks[position + idx].classList.add("blockT");
		if (shape === blockShapes[4][0])
			blocks[position + idx].classList.add("blockSn");
	});
	updateTimer();
}
render();

function removeBlock() {
	shape.forEach((idx) => {
		if (shape === blockShapes[0][0])
			blocks[position + idx].classList.remove("blockL");
		if (shape === blockShapes[1][0])
			blocks[position + idx].classList.remove("blockI");
		if (shape === blockShapes[2][0])
			blocks[position + idx].classList.remove("blockSq");
		if (shape === blockShapes[3][0])
			blocks[position + idx].classList.remove("blockT");
		if (shape === blockShapes[4][0])
			blocks[position + idx].classList.remove("blockSn");
	});
}

function startTimer() {
	clearInterval(timerInterval);
	timerInterval = setInterval(tick, 1000);
	updateTimer();
}

function tick() {
	seconds++;
	if (seconds === 0) clearInterval(timerInterval);
	render();
}

function updateTimer() {
	if (sec === 59) {
		min += 1;
		sec = 0;
		timer.innerText = `${min}m ${sec}s`;
	} else {
		min = Math.floor(seconds / 60);
		sec = seconds % 60;
		timer.innerText = `${min}m ${sec}s`;
	}
}
