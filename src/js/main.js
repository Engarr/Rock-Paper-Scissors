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
let winCount = 0;
let drawCount = 0;
let loseCount = 0;
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
let state = {
	// playerWins: Number(localStorage.getItem(playerWinsLSKey)) || 0,
	// AIWins: Number(localStorage.getItem(AIWinsLSKey)) || 0,
	newPlayerPick: null,
	newAiPick: null,
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
		playerWeapon.classList.add('rotate-draw-animation');

		aiWeapon.classList.add('rotate-draw-animation');
		gameResult.classList.add('show-result-animation');
		gameResult.textContent = 'Draw';
		drawCount++;
		setTimeout(() => {
			draw.textContent = `Draw: ${drawCount}`;
		}, 1500);
	} else if (winMap[`${newPlayerPick}`] == newAiPick) {
		playerWeapon.classList.add('rotate-win-animation');
		aiWeapon.classList.add('rotate-lose-animation');
		gameResult.classList.add('show-result-animation');
		gameResult.textContent = 'You win!';
		winCount++;
		setTimeout(() => {
			win.textContent = `Win: ${winCount}`;
		}, 1500);
	} else {
		playerWeapon.classList.add('rotate-lose-animation');
		aiWeapon.classList.add('rotate-win-animation');
		gameResult.classList.add('show-result-animation');
		gameResult.textContent = 'You lose!';
		loseCount++;
		setTimeout(() => {
			lose.textContent = `Lose: ${loseCount}`;
		}, 1500);
	}
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
	playerBox.innerHTML = '<p class="box__player-text">You choiced:</p>';
	aiBox.innerHTML = '<p class="box__ai-text">Computer choiced:</p>';
	result.style.display = 'none';
	gameResult.textContent = '';
	gameButtons.forEach((btn) => btn.classList.remove('hide-buttons-animation'));
	gameButtons.forEach((btn) => btn.classList.add('show-buttons-animation'));
};

gameButtons.forEach((btn) => btn.addEventListener('click', play));
retryBtn.addEventListener('click', tryAgain);
