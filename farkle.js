var diceArr = [];
var score = 0;

function initializeDice(){
	for(i = 0; i < 6; i++){
		var j=i+1;
		diceArr[i] = {};
		diceArr[i].id = "die" + j;
		diceArr[i].value = j;
		diceArr[i].clicked = 0;
	}
	var updateScore = document.getElementById("total");
	updateScore.innerHTML = 0;
}

/* Rolling dice values.
Note: user is responsible for putting aside a die between rolls until coded
until function setAsideBeforeRolling() is complete and functional*/
function rollDice(){
	for(var i=0; i < 6; i++){
		if(diceArr[i].clicked === 0){
			diceArr[i].value = Math.floor((Math.random() * 6) + 1);
		}
	}
	updateDiceImg();
	calcScore();
	if (score===0){
		farkle();
	}
	else{
		setAsideBeforeRolling();
	}
	var updateScore = document.getElementById("total");
	updateScore.innerHTML = score;
	score = 0;
}

/* Updating images of dice given values of rollDice */
function updateDiceImg(){
	var diceImage;
	for(var i = 0; i < 6; i++){
		diceImage = "images/" + diceArr[i].value + ".png";
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
}

function diceClick(img){
	var i = img.getAttribute("data-number");
	img.classList.toggle("transparent");
	if(diceArr[i].clicked === 0){
		diceArr[i].clicked = 1;
	}
	else{
		diceArr[i].clicked = 0;
	}
	setAsideBeforeRolling();
}

// to be completed: user must set aside at least one die before re-rolling
function setAsideBeforeRolling(){
	for(var i=0; i < 6; i++){ // check each die
		if(diceArr[i].clicked===0){ // clicked value
		//   message.innerHTML = "You must set aside a die before rolling again.";
    //   document.getElementById("rollDiceBtn").disabled = true;
		//   document.getElementById("rollDiceBtn").classList.toggle("disabled");
		}
	}
}

function farkle(){
	var message = document.getElementById("message");
	message.innerHTML = "That's a Farkle! Game over.";
	document.getElementById("rollDiceBtn").disabled = true;
	document.getElementById("bankScoreBtn").disabled = true;
	document.getElementById("rollDiceBtn").classList.toggle("disabled");
	document.getElementById("bankScoreBtn").classList.toggle("disabled");
}

function bankScore(){
	calcScore();
	var message = document.getElementById("message");
	message.innerHTML = "You banked your score. Pass your turn.";
	var updateScore = document.getElementById("total");
	updateScore.innerHTML = score;
	score = 0;
}

function calcScore(){
	var count = [0,0,0,0,0,0]; // array of 1s 2s 3s 4s 5s 6s, sum should be 6
	for(var i=0; i < 6; i++){ // looking at each die
		// die face is 1
		if(diceArr[i].value===1){
			count[0]++;
			score += 100; // each 1 rolled = 100
			if(count[0]===3) {
				score += 700; // three 1s = 1000 = 100*3 + 700
			}
			if(count[0]===6) {
				score = 2000; // three 1s twice = 2*1000
			}
		}
		// die face is 2
		if(diceArr[i].value===2){
			count[1]++;
			if(count[1]===3){
				score += 200; // three 2s = 200
			}
			if(count[1]===6) {
				score = 400; // three 2s twice = 400
			}
		}
		// die face is 3
		if(diceArr[i].value===3){
			count[2]++;
			if(count[2]===3){
				score += 300; // three 3s = 300
			}
			if(count[2]===6) {
				score = 600; // three 3s twice = 600
			}
		}
		// die face is 4
		if(diceArr[i].value===4){
			count[3]++;
			if(count[3]===3){
				score += 400; // three 4s = 400
			}
			if(count[3]===6) {
				score = 800; // three 4s twice = 800
			}
		}
		// die face is 5
		if(diceArr[i].value===5){
			count[4]++;
			score += 50; // each 5 rolled = 50
			if(count[4]===3) {
				score += 350; // three 5s = 500 = 50*3 + 350
			}
			if(count[4]===6) {
				score = 1000; // three 5s twice = 2*500
			}
		}
		// die face is 6
		if(diceArr[i].value===6){
			count[5]++;
			if(count[5]===3){
				score += 600; // three 6s = 600
			}
			if(count[5]===6) {
				score = 1200; // three 6s twice = 1200
			}
		}
	}
	console.log(count[0], " 1s");
	console.log(count[1], " 2s");
	console.log(count[2], " 3s");
	console.log(count[3], " 4s");
	console.log(count[4], " 5s");
	console.log(count[5], " 6s");
	console.log("calculated score");
}
