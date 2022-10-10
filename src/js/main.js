const gameButtons = document.querySelectorAll('.game__item-player');
const chosenByPlayer = document.querySelector('.player');
const aiBox = document.querySelector('.box__ai');
const playerBox = document.querySelector('.box__play');
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
	gameButtons.forEach((btn) => btn.classList.remove('show-buttons-animation'));
	newPlayerPick = e.target.dataset.pick;
	pickAi();
	createAIChose();
	createPlayerChose(newPlayerPick);
	result.style.display = 'flex';
	gameButtons.forEach((btn) => btn.classList.add('hide-buttons-animation'));
	battle()
};

const battle = () => {
	if (newPlayerPick === newAiPick) {
		gameResult.textContent = 'Draw';
		playerWeapon.classList.add('draw-animation');
		aiWeapon.classList.add('draw-animation');
		drawCount++;
		draw.textContent = `Draw: ${drawCount}`;
	} else if (winMap[`${newPlayerPick}`] == newAiPick) {
		gameResult.textContent = 'You win!';
		playerWeapon.classList.add('win-animation');
		aiWeapon.classList.add('lose-animation');
		winCount++;
		win.textContent = `Win: ${winCount}`;
	} else {
        gameResult.textContent = 'You lose!';
		playerWeapon.classList.add('lose-animation');
		aiWeapon.classList.add('win-animation');
		loseCount++;
		lose.textContent = `Lose: ${loseCount}`;
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
	playerBox.innerHTML = '';
	aiBox.innerHTML = '';
	result.style.display = 'none';

	gameButtons.forEach((btn) => btn.classList.remove('hide-buttons-animation'));
	gameButtons.forEach((btn) => btn.classList.add('show-buttons-animation'));
};

gameButtons.forEach((btn) => btn.addEventListener('click', play));
retryBtn.addEventListener('click', tryAgain);