const gameButtons = document.querySelectorAll('.game__item-player');
const chosenByPlayer = document.querySelector('.player');
const aiBox = document.querySelector('.box__ai');
const playerBox = document.querySelector('.box__player');
const result = document.querySelector('.result');
const retryBtn = document.querySelector('.box__game-btn');
const gameResult = document.querySelector('.box__game-result-text');
const gameTitle = document.querySelector('.main__title');
const win = document.querySelector('.counter__win');
const lose = document.querySelector('.counter__lose');
const draw = document.querySelector('.counter__draw');
const clearBtn = document.querySelector('.delete');

const winCountLSK = `winCount`;
const drawCountLSK = `drawCount`;
const loseCountLSK = `loseCount`;

let state = {
	winCount: Number(localStorage.getItem(winCountLSK)) || 0,
	drawCount: Number(localStorage.getItem(drawCountLSK)) || 0,
	loseCount: Number(localStorage.getItem(loseCountLSK)) || 0,
};

let newPlayerPick;
let newAiPick;
let playerWeapon;
let aiWeapon;

const itemsMap = ['rock', 'paper', 'scissors'];
const winMap = {
	paper: ['rock'],
	scissors: ['paper'],
	rock: ['scissors'],
};

const pickAi = () => {
	newAiPick = itemsMap[Math.floor(Math.random() * 3)];
};

const play = (e) => {
	newPlayerPick = e.target.dataset.pick;
	gameButtons.forEach((btn) => btn.classList.remove('show-buttons-animation'));
	pickAi();

	gameButtons.forEach((btn) => btn.classList.add('hide-buttons-animation'));
	setTimeout(() => {
		battle();
	}, 400);
};

const battle = () => {
	createPlayerChose(newPlayerPick);
	createAIChose();
	result.style.display = 'flex';

	if (newPlayerPick === newAiPick) {
		playerWeapon.classList.add('player-draw-animation');
		aiWeapon.classList.add('rotate-draw-animation');
		gameResult.classList.add('show-result-animation');
		gameResult.textContent = 'Draw';

		localStorage.setItem(drawCountLSK, state.drawCount + 1);
		state = {
			...state,
			drawCount: state.drawCount + 1,
		};
	} else if (winMap[`${newPlayerPick}`] == newAiPick) {
		playerWeapon.classList.add('player-win-animation');
		aiWeapon.classList.add('rotate-lose-animation');
		gameResult.classList.add('show-result-animation');
		gameResult.textContent = 'You win!';
		localStorage.setItem(winCountLSK, state.winCount + 1);
		state = {
			...state,
			winCount: state.winCount + 1,
		};
	} else {
		playerWeapon.classList.add('player-lose-animation');
		aiWeapon.classList.add('rotate-win-animation');
		gameResult.classList.add('show-result-animation');
		gameResult.textContent = 'You lose!';
		localStorage.setItem(loseCountLSK, state.loseCount + 1);

		state = {
			...state,
			loseCount: state.loseCount + 1,
		};
	}
	setTimeout(() => {
		showResult();
	}, 1500);
};

const createAIChose = () => {
	aiWeapon = document.createElement('button');
	aiWeapon.classList.add('game__item');
	aiWeapon.classList.add('item');
	aiWeapon.classList.add(`${newAiPick}`);

	aiBox.appendChild(aiWeapon);
};
const createPlayerChose = (newPlayerPick) => {
	playerWeapon = document.createElement('button');
	playerWeapon.classList.add('game__item');
	playerWeapon.classList.add('item');
	playerWeapon.classList.add(`${newPlayerPick}`);
	playerBox.appendChild(playerWeapon);
};

const tryAgain = () => {
	playerBox.innerHTML = '<p class="box__player-text">You picked:</p>';
	aiBox.innerHTML = '<p class="box__ai-text">Chosen by computer:</p>';
	result.style.display = 'none';
	gameResult.textContent = '';
	gameButtons.forEach((btn) => btn.classList.remove('hide-buttons-animation'));
	gameButtons.forEach((btn) => btn.classList.add('show-buttons-animation'));
};

const showResult = () => {
	win.textContent = `Win: ${state.winCount}`;
	draw.textContent = `Draw: ${state.drawCount}`;
	lose.textContent = `Lose: ${state.loseCount}`;
};
const clearStorage = () => {
	localStorage.clear();
	location.reload();
};

showResult();
gameButtons.forEach((btn) => btn.addEventListener('click', play));
retryBtn.addEventListener('click', tryAgain);
clearBtn.addEventListener('click', clearStorage);
