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
let blocks = Array.from(blocksNodeList);
let timerInterval;
let min,
	sec,
	seconds = 0;
let newTimerInterval;
let score = 0;
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
let shapeDirection = 0;
let randomShape = Math.floor(Math.random() * blockShapes.length);
let shape = blockShapes[randomShape][shapeDirection];
let position = 4;

// Event Listeners
document.addEventListener("keydown", keyToMove);
startBtn.addEventListener("click", () => startTimer());
resetBtn.addEventListener("click", () => {
	position = 4;
	blocks.forEach((block) => {
		block.classList.remove(
			"blockL",
			"blockI",
			"blockSq",
			"blockT",
			"blockSn"
		);
	});
	for (let i = 0; i <= 199; i++) {
		blocks[i].classList.remove("OOB");
	}
	newTimerInterval = clearInterval(newTimerInterval);
	clearInterval(timerInterval);
	seconds = 0;
	clearInterval(timerInterval);
	timer.innerText = "0m 0s";
	return (newTimerInterval = 0);
});

// Functions
function init() {
	// Create 200 divs for the playing field under gameDiv, 10 div for bottom row detection
	for (let i = 0; i < 210; i++) {
		const newDiv = document.createElement("div");
		newDiv.id = i;
		if (i >= 200) {
			newDiv.className = "OOB";
		}
		newDiv.classList.add("block");
		gameDiv.appendChild(newDiv);
	}
}
//  render on the page the shape with its specific color via CSS selected class by using if statements and adding class list
function render() {
	shape.forEach((idx) => {
		if (shape === blockShapes[0][shapeDirection])
			blocks[position + idx].classList.add("blockL");
		if (shape === blockShapes[1][shapeDirection])
			blocks[position + idx].classList.add("blockI");
		if (shape === blockShapes[2][shapeDirection])
			blocks[position + idx].classList.add("blockSq");
		if (shape === blockShapes[3][shapeDirection])
			blocks[position + idx].classList.add("blockT");
		if (shape === blockShapes[4][shapeDirection])
			blocks[position + idx].classList.add("blockSn");
	});
	updateTimer();
}

function removeBlock() {
	shape.forEach((idx) => {
		blocks[position + idx].classList.remove(
			"blockL",
			"blockI",
			"blockSq",
			"blockT",
			"blockSn"
		);
	});
}

function startTimer() {
	clearInterval(newTimerInterval);
	newTimerInterval = setInterval(gravity, 1000);
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

function updateScore() {
	for (let i = 0; i < 199; i += 10) {
		const fullRow = [
			i,
			i + 1,
			i + 2,
			i + 3,
			i + 4,
			i + 5,
			i + 6,
			i + 7,
			i + 8,
			i + 8,
		];
		if (fullRow.every((idx) => blocks[idx].classList.contains("OOB"))) {
			score += 10;
			userScore.innerText = `${score}`;
			fullRow.forEach((idx) => {
				blocks[idx].classList.remove("OOB");
				blocks[idx].classList.remove(
					"blockL",
					"blockI",
					"blockSq",
					"blockT",
					"blockSn"
				);
			});
			const blocksRemoved = blocks.splice(i, 10);
			blocks = blocksRemoved.concat(blocks);
			blocks.forEach((elm) => gameDiv.appendChild(elm));
		}
	}
}

// Moving the Blocks

function gravity() {
	outOfBounds();
	removeBlock();
	position += 10;
	render();
}

function keyToMove(e) {
	if (e.keyCode === 65) blockLeft();
	if (e.keyCode === 68) blockRight();
	if (e.keyCode === 83) blockDown();
	if (e.keyCode === 87) blockRotate();
}

function blockLeft() {
	removeBlock();
	const outOfLeft = shape.some((idx) => (position + idx) % 10 === 0);
	if (!outOfLeft) position--;
	if (shape.some((idx) => blocks[position + idx].classList.contains("OOB"))) {
		position++;
	}
	render();
}

function blockRight() {
	removeBlock();
	const outOfRight = shape.some((idx) => (position + idx) % 10 === 9);
	if (!outOfRight) position++;
	if (shape.some((idx) => blocks[position + idx].classList.contains("OOB")))
		position--;
}

function blockDown() {
	removeBlock();
	position += 10;
	render();
	outOfBounds();
}

function blockRotate() {
	removeBlock();
	shapeDirection++;
	if (shapeDirection === shape.length) shapeDirection = 0;
	shape = blockShapes[randomShape][shapeDirection];
	render();
}

function outOfBounds() {
	if (
		shape.some((idx) =>
			blocks[position + idx + 10].classList.contains("OOB")
		)
	) {
		shape.forEach((idx) => blocks[position + idx].classList.add("OOB"));
		randomShape = Math.floor(Math.random() * blockShapes.length);
		shape = blockShapes[randomShape][shapeDirection];
		position = 4;
		render();
		updateScore();
	}
}
