const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What is broccoli?',
      answers: ['An alien watchdog', 'A miniature tree', 'A form of torture', 'All of the above'],
      correctAnswer: 'All of the above',
    },
    {
      question: 'What is the current year?',
      answers: ['1970', '2015', '2020', '2005'],
      correctAnswer: '2020',
    },
    {
      question: 'What is a dolpin?',
      answers: ['Person', 'Place', 'Thing', 'Animal'],
      correctAnswer: 'Animal',
    },
    {
      question: 'What is your level of pain?',
      answers: ['No pain', 'Discomfort', 'Intense', 'Unbearable'],
      correctAnswer: 'Unbearable',
    },
    {
      question: 'What is Winnie the Pooh?',
      answers: ['A cartoon', 'A stuffed bear', 'A living creature', 'A severe delusion'],
      correctAnswer: 'A severe delusion',
    },
    {
      question: 'What is Javascript?',
      answers: ['A hip new brand of coffee', 'A type of language', 'A writers tool', 'A tool actors use to memorize lines'],
      correctAnswer: 'A type of language',
    },
    {
      question: 'What is the hero\'s name in the Karate kid?',
      answers: ['Daniel Laruso', 'Johnny Lawrence', 'Tim Burton', 'Luke Skywalker'],
      correctAnswer: 'Johnny Lawrence',
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
};

const isAnswered = () => {
// check for undefined answers and reset the appropriate variables if found.

	//console.log ( 'isAnswered started' );

	if ( store.selectedAnswer === undefined ) {

		//console.log ( 'isAnswered completed' );
	
		return false;

	}

	else {

		//console.log ( 'isAnswered completed' );

		return true;

	}

};

const render = () => {
//renders the content to the page.
	
	//console.log ( 'render started' );

	// Grab the relevant question data for use.
	if ( store.quizStarted === 0 ) {

		currentQuestion = store.questions [ store.questionNumber ].question;
	
		currentAnswers = store.questions [ store.questionNumber ].answers;

		currentCorrectAnswer = store.questions [ store.questionNumber ].correctAnswer;

	}

	let html = '';

	if ( store.quizStarted === false ) $ ( 'main' ).html ( generateStartScreen ( html ) );

	if ( store.quizStarted === 0 ) $ ( 'main' ).html ( generateQuestionScreen ( html ) );

	else if ( store.quizStarted === 1 ) $ ( 'main' ).html ( generateAnswerScreen ( html ) );

	else if ( store.quizStarted === 2 ) $ ( 'main' ).html ( generateFinishScreen ( html ) );

	//console.log ( 'render completed' );
	
};

const generateStartScreen = () => {
// Start screen html.

	return `
			<div class="wrapper">
				<div id="quiz-container">
					<form id="quiz-app-form" action="http://someform.php">
						<legend id="quiz-app-form-legend">Click the button below if you dare...</legend>
						<button type="submit" id="quiz-app-form-submit-button">Begin</button>
					</form>
				</div>
			</div>
		`;

};

const generateQuestionScreen = () => {
// Question screen html.

	let liString = '';

	// Iteration here to build the <li>s for insertion into the output HTML.
	currentAnswers.forEach ( ( item, index ) => {

		// I realize that there is a better way to implement the button click functionality
		// through declaring an event handler rather than the onclick used here. This is an 
		// improvement I would like to see made, but I struggled with the other implementation.
		// - Bice
		liString += `<li><input class="quiz-app-form-button" id="form-button-${ index }" type="button" value="${ item }"></input></li>`;
		
	});

	return `
		<div class="wrapper">
			<div id="quiz-container">
				<form id="quiz-app-form" action="http://someform.php">
					<legend id="quiz-app-form-legend">${ currentQuestion }</legend>
						<ul id="quiz-app-form-ul"> 
							${ liString }
						</ul>
						<button type="submit" id="quiz-app-form-submit-button">Next Question</button>
				</form>
				<div>Total questions: ${ store.questions.length }</div>
				<div>Unanswered questions: ${ store.questions.length - store.questionNumber }</div>
				<div>Incorrect questions: ${ store.score [ 0 ] }</div>
				<div>Correct questions: ${ store.score [ 1 ] }</div>
			</div>
		</div>
	`;

};

const generateAnswerScreen = () => {
// Answer screen html.

	let answerMsg = '';
		
		if ( store.selectedAnswer !== currentCorrectAnswer ) answerMsg = 'Incorrect!';

		else answerMsg = 'Correct!';
		
		return `
			<div class="wrapper">
				<div id="quiz-container">
					<form id="quiz-app-form" action="http://someform.php">
						<legend id="quiz-app-form-legend"><h2>${ answerMsg }</h2></legend>
						<p>${ currentQuestion }<p>
						<p>You chose: ${ store.selectedAnswer }</p>
						<p>The correct answer was: ${ currentCorrectAnswer }</p>
						<button type="submit" id="quiz-app-form-submit-button">Next question</button>
					</form>
				</div>
			</div>
		`;

};

const generateFinishScreen = () => {
// Quiz completed screen html.

	return `
	<div class="wrapper">
		<div id="quiz-container">
			<form id="quiz-app-form" action="http://someform.php">
				<legend id="quiz-app-form-legend"><h2>Quiz Complete!</h2></legend>
				<p>Congratulations, you're smart!<p>
				<p>You answered ${ store.score [ 1 ] } of ${ store.questions.length } questions correctly.</p>
				<button type="submit" id="quiz-app-form-submit-button">Take the quiz again?</button>
			</form>
		</div>
	</div>
	`;

};

const updateState = () => {
// Function is responsible for updating the state of quiz.

	//console.log ( 'updateState started' );

	// Begin screen.
	if ( store.quizStarted === false ) store.quizStarted = 0;
	
	// Question screen.
	else if ( store.quizStarted === 0 ) store.quizStarted = 1;
	
	// Answer screen, not the end of the quiz rollback state to continue questions.
	else if ( store.quizStarted === 1 && store.questionNumber < store.questions.length ) store.quizStarted = 0;
	
	// Quiz Complete screen, end of quiz, update state for final screen.
	else if ( store.quizStarted === 1 && store.questionNumber === store.questions.length ) store.quizStarted = 2;

	// Quiz Complete screen, reset on submit.
	else if ( store.quizStarted === 2 ) store.quizStarted = false;

	//console.log ( 'updateState completed' );

};

const updateScore = () => {
// Increments store.score if an incorrect answer is submitted.

	//console.log ( 'updateScore started' );

	// Increment incorrect answers
	if ( store.selectedAnswer !== store.questions [ store.questionNumber ].correctAnswer ) store.score [ 0 ]++;

	// Increment correct answers
	else store.score [ 1 ]++;

	//console.log ( 'updateScore completed' );

};

const updateQuestion = () => {
// Increments store.questionNumber.
		
	//console.log ( 'updateQuestion started' );
		
	store.questionNumber++;

	//console.log ( 'updateQuestion completed' );
	
};

const clearLastAnswer = () => {
// Clear last answer.

	//console.log ( 'clearLastAnswer started' );

	if ( store.quizStarted === 1 ) store.selectedAnswer = undefined;

	//console.log ( 'clearLastAnswer completed' );

};

const formSubmit = () => {
// Form submit event.

	$ ( 'main' ).on ( 'submit', '#quiz-app-form', e => {
		
		//console.log ( 'formSubmitHandler started' );

		e.preventDefault ();

		if ( store.quizStarted === 0 && isAnswered () !== false ){

			updateScore ();

			updateQuestion ();

			updateState ();

		}

		else if ( store.quizStarted === 1 ) {

			clearLastAnswer ();

			updateState ();

		}

		else if ( store.quizStarted === 2 ) {
			
			updateState();

			render ();

		}

		else if ( store.quizStarted === false ) {

			store.questionNumber = 0;

			store.score = [ 0, 0 ];

			updateState();

			render ();
		}
		
		render ();

		//console.log ( 'formSubmitHandler completed' );

	});
};

const highlightAnswer = () => {
// Shows visual focus, records selection.

	$ ( 'main' ).on ( 'click', '.quiz-app-form-button', e => {
		
		//console.log ( 'highlightAnswer started' );
			
		// Reset any previous selection highlight.
	
		$ ( '.quiz-app-form-button' ).css ( 'background-color', '#000' );
	
		$ ( '.quiz-app-form-button' ).css ( 'color', '#fff' );
	
		// Highlight the selected answer.
	
		$ ( `#${ e.currentTarget.id }` ).css ( 'background-color', '#fff' );
	
		$ ( `#${ e.currentTarget.id }` ).css ( 'color', '#000' );
	
		// Store the answer for use.
	
		store.selectedAnswer = $ ( `#${ e.currentTarget.id }` ).val ();
		
		//console.log ( 'highlightAnswer completed' );
	
	});

};

const bindEventHandlers = () => {
// Bind event handlers.

	//console.log ( 'bindEventHandlers started' );

	// Form submit handler.
	formSubmit ();

	// Answer click handler.
	highlightAnswer ();

	//console.log ( 'bindEventHandlers completed' );

};

const init = () => {
// Initializes by rendering the begin screen, updating state and binding event handlers.

	//console.log ( 'init started' );

	// Set the score property to an array to contain the sums of both pos/neg answers.
	store.score = [ 0, 0 ];

	render ();

	updateState ();

	bindEventHandlers ();

	//console.log ( 'init completed' );

};

// On page load, call init ().
$( init );