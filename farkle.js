var diceArr = [];
var score = 0;

function initializeDice() {
	for (i = 0; i < 6; i++) {
		var j = i + 1;
		diceArr[i] = {};
		diceArr[i].id = "die" + j;
		diceArr[i].value = j;
		diceArr[i].clicked = 0;
	}
	var updateScore = document.getElementById("total");
	updateScore.innerHTML = 0;
}

/* Rolling dice values */
function rollDice() {
	for (var i = 0; i < 6; i++) {
		if (diceArr[i].clicked === 0) {
			diceArr[i].value = Math.floor((Math.random() * 6) + 1);
		}
	}
	updateDiceImg();
	calcScore();
	if (score === 0) {
		farkle();
	}
	else {
		setAsideBeforeRolling();
	}
	var updateScore = document.getElementById("total");
	updateScore.innerHTML = score;
	score = 0;
}

/* Updating images of dice given values of rollDice */
function updateDiceImg() {
	var diceImage;
	for (var i = 0; i < 6; i++) {
		diceImage = "images/" + diceArr[i].value + ".png";
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
}

function diceClick(img) {
	var i = img.getAttribute("data-number");
	img.classList.toggle("transparent");
	if (diceArr[i].clicked === 0) {
		diceArr[i].clicked = 1; // when .clicked==1, die is set aside
	}
	else {
		diceArr[i].clicked = 0;
	}
	setAsideBeforeRolling();
}

/* User is prompted to set aside at least one die before re-rolling */
function setAsideBeforeRolling() {
	var setAside = false;
	for (var i = 0; i < 6; i++) { // check each die
		if (diceArr[i].clicked === 1) {
			setAside = true;
		}
	}
	if (!setAside) { // no dice set aside
		document.getElementById("rollDiceBtn").disabled = true;
		message.innerHTML = "You must set aside at least one die before re-rolling.";
	} else {
		document.getElementById("rollDiceBtn").disabled = false;
		message.innerHTML = "Roll again or bank your score!";
	}
	return setAside;
}

function farkle() {
	var message = document.getElementById("message");
	message.innerHTML = "That's a Farkle! Game over.";
	document.getElementById("rollDiceBtn").disabled = true;
	document.getElementById("bankScoreBtn").disabled = true;
	document.getElementById("rollDiceBtn").classList.toggle("disabled");
	document.getElementById("bankScoreBtn").classList.toggle("disabled");
}

function bankScore() {
	calcScore();
	var message = document.getElementById("message");
	message.innerHTML = "You banked your score. Pass your turn.";
	var updateScore = document.getElementById("total");
	updateScore.innerHTML = score;
	score = 0;
}

function calcScore() {
	var faceCount = [0, 0, 0, 0, 0, 0]; // array of 1s 2s 3s 4s 5s 6s, sum should be 6
	for (var i = 0; i < 6; i++) { // looking at each die
		// die face is 1
		if (diceArr[i].value === 1) {
			faceCount[0]++;
			score += 100; // each 1 rolled = 100
			if (faceCount[0] === 3) {
				score += 700; // three 1s = 1000 = 100*3 + 700
			}
			if (faceCount[0] === 6) {
				score = 2000; // three 1s twice = 2*1000
			}
		}
		// die face is 2
		if (diceArr[i].value === 2) {
			faceCount[1]++;
			if (faceCount[1] === 3) {
				score += 200; // three 2s = 200
			}
			if (faceCount[1] === 6) {
				score = 400; // three 2s twice = 400
			}
		}
		// die face is 3
		if (diceArr[i].value === 3) {
			faceCount[2]++;
			if (faceCount[2] === 3) {
				score += 300; // three 3s = 300
			}
			if (faceCount[2] === 6) {
				score = 600; // three 3s twice = 600
			}
		}
		// die face is 4
		if (diceArr[i].value === 4) {
			faceCount[3]++;
			if (faceCount[3] === 3) {
				score += 400; // three 4s = 400
			}
			if (faceCount[3] === 6) {
				score = 800; // three 4s twice = 800
			}
		}
		// die face is 5
		if (diceArr[i].value === 5) {
			faceCount[4]++;
			score += 50; // each 5 rolled = 50
			if (faceCount[4] === 3) {
				score += 350; // three 5s = 500 = 50*3 + 350
			}
			if (faceCount[4] === 6) {
				score = 1000; // three 5s twice = 2*500
			}
		}
		// die face is 6
		if (diceArr[i].value === 6) {
			faceCount[5]++;
			if (faceCount[5] === 3) {
				score += 600; // three 6s = 600
			}
			if (faceCount[5] === 6) {
				score = 1200; // three 6s twice = 1200
			}
		}
	}
	console.log(faceCount[0], "1s");
	console.log(faceCount[1], "2s");
	console.log(faceCount[2], "3s");
	console.log(faceCount[3], "4s");
	console.log(faceCount[4], "5s");
	console.log(faceCount[5], "6s");
	console.log(score, "calculated score");
	return faceCount;
}
