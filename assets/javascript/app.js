//global variables
// create a variable to store data that will display in .game-content div
var gameDisplay;
// create a variable to hold a div with class name start-button to display a start button
var startButton = '<button type="button" class="btn btn-info btn-block start-button">Start</button>';
// create a variable to hold a div with class name reset-button to display a reset button
var resetButton = '<button type="button" class="btn btn-success btn-block reset-button">Replay</button>';
// create a variable to store time rules
var timeState;
// use triviaTimer to set timer for each quesiton
// use 5 seconds to test the result
var triviaTimer = 5;
// create a variable to hold a div with class name timer to display time remaining
var timeRemaining = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + triviaTimer + "</span></p>";
// use to identify the index for each trivia question
var triviaIndex = 0;
// create an array to store trivia questions
var triviaQuestions = ["What is the highest mountain in Washington?","What is the river that makes up most of Washington's southern border?","What is the mountain range running north-south through the middle of the state?", "Which is the largest city in Washington?", "Many of the largest western Washington cities are located on which saltwater inlet?"];
// create an array to store option choices assoicate with each question
var optionLists = [["Mt. Rainier", "Mt. Baker", "Mt. Olympus", "Mt. St. Helens"],["Snake River", "Yakima River", "Columbia River", " Snake River"], ["Olympic Mountains", "Cascade Mountains", "Rocky Mountains", "Coast range"],["Tacoma", "Olympia", "Bellevue", "Seattle"],["Gray's Harbor", "Puget Sound", "Hood Canal", "Strait of Juan de Fuca"]];
// create an arrary to store correct answers associate with each question
var triviaAnswers = ["Mt. Rainier", "Columbia River", "Cascade Mountains", "Seattle", "Puget Sound"];
// create a variable to store a correct answer
var showCorrectAnswer;
// create an array to store images assoicate with each question
var triviaImages = ["assets/images/mt-rainier.jpg", "assets/images/columbia-river.jpg", "assets/images/cascades-mountains.jpg", "assets/images/seattle.jpg", "assets/images/puget-sound.jpg"];
// create a variable for later use to show images based on what player answers
var showImage;
// create a variable to store player chosen answer
var chosenAnswer;
// create a variable to store messege to player 
var message;
// create a variable to count the correct answers
var correctTally = 0;
// create a variable to count the wrong answers
var incorrectTally = 0;
// create a variable to count the missed answers
var missedTally = 0;

// use resetGame() function to get everything be ready for the replay
function resetGame() {
	triviaIndex = 0;
	correctTally = 0;
	incorrectTally = 0;
	missedTally = 0;
	triviaTimer = 5;
	showGameContent();
	countDown();
}

// Create a function to get the page loaded
$(document).ready(function() {
	//use gameIntro() function to dynamically show startButton in game-content div - interact with the player to start the game
	function gameIntro() {
	$(".game-content").html(startButton);
	}
	
	gameIntro();
	
	//create an event listener to manipulate .start-button div when StartButton is clicked
	$("body").on("click", ".start-button", function(event){
		event.preventDefault();  
		//call showGameContent() function to display game content
		showGameContent();
		//call countDown() function to begin countdown
		countDown();
	});
	
	//create an event listener to manipulate .selector div when particular trivia option is clicked
	$("body").on("click", ".selector", function(event){
		//assign value into chosenAnswer variable based on what player clicks
		chosenAnswer = $(this).text();
		//use if condition to check if chosenAnswer matches the triviaAnswer 
		if(chosenAnswer === triviaAnswers[triviaIndex]) {
			//when answer is correct
			//use clearInterval() method to stop timeState
			clearInterval(timeState);
			//call getCorrectTrivia() function to display right answer interface dynamically 
			getCorrectTrivia();
		}
		else {
			//when answer is wrong
			//use clearInterval() method to stop timeState
			clearInterval(timeState);
			//call getWrongTrivia() function to display wrong answer interface dynamically
			getWrongTrivia();
		}
	}); 
	
	//create an event listener to manipulate .reset-button div when resetButton is clicked
	$("body").on("click", ".reset-button", function(event){
		resetGame();
	}); 	
}); //.ready() function ends
	
//use showGameContent() function to generate a question from triviaQuestions array, a list of options from optionLists array and a timer to count time remaining
function showGameContent() {
	var questionSelected = "<p class='text-center' id='question-holder'>" + triviaQuestions[triviaIndex] + "</p><br>";
	//create a for loop to show each option for player to select
	var optionListSelected = optionLists[triviaIndex];
	var showOptions = '';
	var i;
	for(i = 0; i < optionListSelected.length; i++){
		showOptions += '<button type="button" class="btn btn-default btn-block selector">'+ optionListSelected[i] + '</button><br>';
	}
	gameDisplay = timeRemaining + questionSelected + showOptions
	$(".game-content").html(gameDisplay);
}

// use getMisssedTrivia() function to manipulate the .game-content display time remaining, sum of missed questions which stored in missedTally variable, a message interact with player which stored in message variable for missed anwser situation, and a correct answer which stored in correctAswer variable, and then go to next question when pause function is executed
function getMissedTrivia() {
	missedTally++;
	showCorrectAnswer = "<p class='text-center'> The correct answer was: " + triviaAnswers[triviaIndex] + "</p>";
	message = "<p class='text-center'>You ran out of time!</p>";
	showImage = "<img class='rounded mx-auto d-block' src='"+ triviaImages[triviaIndex] + "'>";
	gameDisplay = timeRemaining + message + showCorrectAnswer + showImage;
	$(".game-content").html(gameDisplay);
	goToNext();
}

// use getMisssedTrivia() function to manipulate the .game-content display time remaining, sum of missed questions which stored in missedTally variable, a message interact with player which stored in message variable for wrong anwser situation, and a correct answer which stored in correctAswer variable, and then go to next question when pause function is executed
function getWrongTrivia() {
	incorrectTally++;
	showCorrectAnswer = "<p class='text-center'> The correct answer was: " + triviaAnswers[triviaIndex] + "</p>";
	message = "<p class='text-center'>oops. Wrong Answer!</p>";
	showImage = "<img class='rounded mx-auto d-block' src='"+ triviaImages[triviaIndex] + "'>";
	gameDisplay = timeRemaining + message + showCorrectAnswer + showImage;
	$(".game-content").html(gameDisplay);
	goToNext();
}

// use getMisssedTrivia() function to manipulate the .game-content display time remaining, sum of missed questions which stored in missedTally variable, a message interact with player which stored in message variable for correct anwser situation, and a correct answer which stored in correctAswer variable, and then go to next question when pause function is executed
function getCorrectTrivia() {
	var respondImage = "https://media.giphy.com/media/l41YmQjOz9qg2Ecow/giphy.gif";
	correctTally++;
	showCorrectAnswer = "<p class='text-center'> The correct answer was: " + triviaAnswers[triviaIndex] + "</p>";
	showImage = "<img class='rounded mx-auto d-block' src='"+ respondImage + "'>";
	message = "<p class='text-center'>Correct!</p>";
	gameDisplay = timeRemaining + message + showCorrectAnswer + showImage;
	$(".game-content").html(gameDisplay);
	goToNext();
}

//use toGoNext () funtion to set time out for each question break
function goToNext (){
	setTimeout(pause, 3000); 
}

//use pause() function to set question break and manipuate what/when to show dynamic content on .game-content div
function pause() {
	//tell the program to continue showing questions until questions in triviaQuestions array are all pulled out
	var boundary = triviaQuestions.length - 1
	if (triviaIndex < boundary) {
	triviaIndex++;
	showGameContent();
	triviaTimer = 5;
	countDown();
	}
	// otherwise tell the program to show game summary directly to end the game
	else {
		gameSummary();
	}
}

// use countDown() function to make the Trivertimer run properly and tell the program when to stop or continue based on the following conditions. 
function countDown() {
	// set time interval and make timesUp counting
	timeState = setInterval(timesUp, 1000);
	//create a timesUp() function to manipulate the triviaTimer 
	function timesUp() {
		// tell program when to clear time interval and call getMisssedTrivia function as triviaTimer goes down to 0
		if (triviaTimer === 0) {
			clearInterval(timeState);
			getMissedTrivia();
		}
		// tell program to run countDwon and show the descreasing triviaTimer number on .timer div to display time remaining
		if (triviaTimer > 0) {
			triviaTimer--;
		}
		$(".timer").html(triviaTimer);
	}
}

// use gameSummary() function to display 3 different tally summaries and a replay button 
function gameSummary() {
	var score = Math.floor((correctTally/(correctTally+incorrectTally+missedTally)) * 100);

	var congratImage = "https://media.giphy.com/media/wp2cqPc30XSso/giphy.gif";

	var encourageImage = "https://media.giphy.com/media/zBQ97IopZv1du/giphy.gif";

 	if(score >= 70){
		message = "<p class='text-center'>You score is " + score + "% <br>Well Done!</p>";
		showImage = "<img class='rounded mx-auto d-block' src='"+ congratImage + "'>";
	} else {
		message = "<p class='text-center'>You score is " + score + "% <br>Nice try!</p>";
		showImage = "<img class='rounded mx-auto d-block' id='ajdust-img' src='"+ encourageImage + "'>";
	}
	var correctCount = '<li>'+ correctTally + ' correct answer(s)</li>';
	var incorrectCount = '<li>'+ incorrectTally + ' wrong answer(s)</li>';
	var missedCount = '<li>'+ missedTally + ' missed answer(s)</li>';
	
	var gameReport = "<div class='text-center'> Here is your result:<br>"  + correctCount + incorrectCount + missedCount +'</div><br>'

	gameDisplay = message + gameReport + showImage + resetButton;

	$(".game-content").html(gameDisplay);
}




	