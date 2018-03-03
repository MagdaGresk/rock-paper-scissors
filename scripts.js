const newGameBtn = document.getElementById('js-newGameButton'),
pickRock = document.getElementById('js-playerPick_rock'),
pickPaper = document.getElementById('js-playerPick_paper'),
pickScissors = document.getElementById('js-playerPick_scissors'),
newGameElem = document.getElementById('js-newGameElement'),
pickElem = document.getElementById('js-playerPickElement'),
resultsTable = document.getElementById('js-resultsTableElement'),
playerPointsElem = document.getElementById('js-playerPoints'),
playerNameElem = document.getElementById('js-playerName'),
computerPointsElem = document.getElementById('js-computerPoints'),
computerChoice = Math.floor(Math.random()*3),
playerPickElem = document.getElementById('js-playerPick'),
computerPickElem = document.getElementById('js-computerPick'),
playerResultElem = document.getElementById('js-playerResult'),
computerResultElem = document.getElementById('js-computerResult'),
playerWelcome = document.getElementById('js-welcome');

let gameState = 'notStarted',  //started // ended //notStarted
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };


//SET STRUCTURE

function setGameElements() {
	switch(gameState) {
		case 'started' :
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
        	resultsTable.style.display = 'block';
        	playerWelcome.style.display = 'none';
			break;
		case 'ended':
			newGameBtn.innerText = 'Jeszcze raz';
		case 'notStarted':
		default: 
			newGameElem.style.display = 'block';
	        pickElem.style.display = 'none';
	        resultsTable.style.display = 'none';
	}
}

setGameElements();
// NOWA GRA

function newGame() {
	player.name = prompt('Enter your name');
	if (player.name) {
		player.score = 0;
		computer.score = 0;
		gameState = 'started';
		setGameElements();
		playerNameElem.innerHTML = player.name;
	}
}
newGameBtn.addEventListener('click', newGame);




// WYBÓR KOMPUTERA
function getComputerPick() {
	const possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random()*3)];
}

// WYBÓR GRACZA
pickRock.addEventListener('click', function() {
	playerPick('rock')
});

pickPaper.addEventListener('click', function() {
	playerPick('paper')
});

pickScissors.addEventListener('click', function() {
	playerPick('scissors')
});

function playerPick(playerPick) {
	const computerPick = getComputerPick();
	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;
	checkRoundWinner(playerPick, computerPick);
	endGame();
	setGamePoints();
	setGameElements();
}

// KTO ZWYCIĘŻYŁ

function checkRoundWinner (playerPick, computerPick) {
	playerResultElem.innerHTML = '';
	computerResultElem.innerHTML = '';
	let winnerIs = 'player';
	if (playerPick == computerPick) {
		winnerIs = 'none'; //remis
	}
	else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
    	playerResultElem.innerText = 'Win!';
    	player.score++;
    }
    else if (winnerIs == 'computer') {
    	computerResultElem.innerText = 'Win!';
    	computer.score++;
    }
    else {
    	computerResultElem.innerText = 'Draw!';
    	playerResultElem.innerText = 'Draw!';
    }

}

//USTAWIANIE PUNKTÓW

function setGamePoints() {
    playerPointsElem.innerText = player.score;
    computerPointsElem.innerText = computer.score;
    console.log(player.score, computer.score);
}

// KONIEC

function endGame() {
	if (player.score == 10) {
		alert('Wygrywasz')
		gameState = 'ended';
		computer.score = player.score = 0;
		playerResultElem.innerHTML = 'Player score';
		computerResultElem.innerHTML = 'Computer score';
		playerPickElem.innerHTML = 'Player Selection';
		computerPickElem.innerHTML = 'Computer Score';

	}
	else if (computer.score == 10) {
		alert('Komputer wygrał')
		gameState = 'ended';
		computer.score = player.score = 0;
		playerResultElem.innerHTML = 'Player Score';
		computerResultElem.innerHTML = 'Computer Score';
		playerPickElem.innerHTML = 'Player Selection';
		computerPickElem.innerHTML = 'Computer Selection';

	}
	setGamePoints();
}