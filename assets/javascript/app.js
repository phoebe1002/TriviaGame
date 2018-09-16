//global variables
// use to store data that will display on game-content div
var gameDisplay;
// create a variable to hold the start button with div name start-button
var startButton= "<button type='button' class='btn btn-info btn-lg btn-block start-button'>Start</button>";
// declare a variable to store time interval 
var timeState;
// use triviaTimer to set timer for each quesiton - begins with 30 seconds
var triviaTimer = 5;
// use to identify the index for each trivia question
var triviaIndex = 0;
// create an array to store trivia questions
var triviaQuestions = ["What is the highest mountain in Washington?","What is the river that makes up most of Washington's southern border?","What is the mountain range running north-south through the middle of the state?", "Which is the largest city in Washington?", "Many of the largest western Washington cities are located on which saltwater inlet?"];
// create an array to store option choices assoicate with each question by its index
var optionLists = [["Mt. Rainier", "Mt. Baker", "Mt. Olympus", "Mt. St. Helens"],["Snake River", "Yakima River", "Columbia River", " Snake River"], ["Olympic Mountains", "Cascade Mountains", "Rocky Mountains", "Coast range"],["Tacoma", "Olympia", "Bellevue", "Seattle"],["Gray's Harbor", "Puget Sound", "Hood Canal", "Strait of Juan de Fuca"]];
// create an arrary to store correct answers associate with each question by its index
var triviaAnswers = ["Mt. Rainier", "Columbia River", "Cascade Mountains", "Seattle", "Puget Sound"];
// create an array to store images assoicate with each question by its index
var associatedImages = ["<img class='center-block img-right' src='assets/images/mt-rainier.jpg'>", "<img class='center-block img-right' src='assets/images/columbia-river.jpg'>", "<img class='center-block img-right' src='assets/images/cascades-mountains.jpg'>", "<img class='center-block img-right' src='assets/images/seattle.jpg'>", "<img class='center-block img-right' src='assets/images/puget-sound.jpg'>"];
var showImage = associatedImages[triviaIndex];
// create a variable to store player chosen answer
var chosenAnswer;
// create a variable to count the correct answers
var correctTally = 0;
// create a variable to count the wrong answers
var incorrectTally = 0;
// create a variable to count the missed answers
var missedTally = 0;

var timeRemaining = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p>"
var correctAnswer = "<p class='text-center'> The correct answer was: " + triviaAnswers[triviaIndex] + "</p>";
var message;

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
	
	//triva game executing.... 
	//create an event listener to manipulate .answer div when particular trivia option is clicked
	$("body").on("click", ".answer", function(event){
		//answeredQuestion = true;
		//use choseAnswer store what player choose from the optionList on .answer div 
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
	
	//create an event listener to manipulate .reset-button div when StartButton is clicked
	$("body").on("click", ".reset-button", function(event){
		resetGame();
	}); 	
}); //.ready() function ends
	
//use showGameContent() function to generate a question from triviaQuestions array, a list of options from optionLists array and a timeState to that counts time remaining
function showGameContent() {
	var questionSelected = "<p class='text-center'>" + triviaQuestions[triviaIndex] + "</p>";
	var answerOptions = "<p class='answer'>" + optionLists[triviaIndex][0] + "</p><p class='answer'>" + optionLists[triviaIndex][1] + "</p><p class='answer'>"+optionLists[triviaIndex][2]+"</p><p class='answer'>"+optionLists[triviaIndex][3]+"</p>";

	gameDisplay = timeRemaining + questionSelected + answerOptions
	$(".game-content").html(gameDisplay);
}

// use getMisssedTrivia() function to manipulate the .game-content display time remaining, sum of missed questions which stored in missedTally variable, a message interact with player which stored in message variable for missed anwser situation, and a correct answer which stored in correctAswer variable, and then go to next question when pause function is executed
function getMissedTrivia() {
	missedTally++;
	message = "<p class='text-center'>You ran out of time!</p>";
	gameDisplay = timeRemaining + message + correctAnswer
	$(".game-content").html(gameDisplay);
	goToNext();
}

// use getMisssedTrivia() function to manipulate the .game-content display time remaining, sum of missed questions which stored in missedTally variable, a message interact with player which stored in message variable for correct anwser situation, and a correct answer which stored in correctAswer variable, and then go to next question when pause function is executed
function getCorrectTrivia() {
	correctTally++;
	message = "<p class='text-center'>Correct!</p>";
	gameDisplay = timeRemaining + message + correctAnswer + showImage;
	$(".game-content").html(gameDisplay);
	goToNext();
}

// use getMisssedTrivia() function to manipulate the .game-content display time remaining, sum of missed questions which stored in missedTally variable, a message interact with player which stored in message variable for wrong anwser situation, and a correct answer which stored in correctAswer variable, and then go to next question when pause function is executed
function getWrongTrivia() {
	incorrectTally++;
	message = "<p class='text-center'>oops. Wrong Answer!</p>";
	gameDisplay = timeRemaining + message + correctAnswer + showImage;
	$(".game-content").html(gameDisplay);
	goToNext();
}

//use toGoNext () funtion to set time out for each question break
function goToNext (){
	setTimeout(pause, 3000); 
}

//use pause() function to set question break and manipuate what/when to show dynamic content on .game-content div
function pause() {
	//tell the program to continue showing next questions until questions in triviaQuestions array are all pulled out
	var boundary = triviaQuestions.length - 1
	if (triviaIndex < boundary) {
	triviaIndex++;
	showGameContent();
	triviaTimer = 5;
	countDown();
	}
	// otherwise tell the program to stop showing questions and display game summary
	else {
		gameSummary();
	}
}

// use countDown() function to make the Trivertimer run properly and tell it when to stop or continue based on the following conditions. 
function countDown() {
	//set time interval and store it in timeState variable
	timeState = setInterval(timesUp, 1000);
	//create a timesUp() function to the program what to show based on triviaTimer we set 
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

	message = "<p class='text-center'>Well done</p>";
 
	gameDisplay= timeRemaining + message + "<p>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Missed Answers: " + missedTally + "</p>" + startButton;
	$(".game-content").html(gameDisplay);
}

// use resetGame() function to reset everything and be ready for next play
function resetGame() {
	triviaIndex = 0;
	correctTally = 0;
	incorrectTally = 0;
	missedTally = 0;
	triviaTimer = 5;
	showGameContent();
	countDown();
}


	