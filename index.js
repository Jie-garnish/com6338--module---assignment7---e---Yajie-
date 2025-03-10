// Your code here

var questionsArr = [
    {
      question: "Who created JavaScript?",
      answer: "Brendan Eich",
      options: ["Linus Torvalds", "Brendan Eich", "Dan Abramov", "Douglas Crockford"]
    },
    {
      question: "What does HTML stand for?",
      answer: "Hypertext Markup Language",
      options: ["Hypertext Markdown Language", "Hyperlink Text Markup Language", "Hypertext Markup Language", "Hypertext Machine Learning"]
    },
    {
      question: "Which company developed React?",
      answer: "Meta (Facebook)",
      options: ["Google", "Meta (Facebook)", "Microsoft", "Apple"]
    },
    {
      question: "What year was JavaScript created?",
      answer: "1995",
      options: ["1985", "1995", "2000", "2010"]
    },
    {
      question: "What does CSS stand for?",
      answer: "Cascading Style Sheets",
      options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Styling System", "Colorful Style Syntax"]
    }
  ];
  
  var quizContainer = document.getElementById("quiz");
  var currentQuestionIndex = 0;
  var score = 0;
  var timer;
  var timeLeft = 30;
  

  function loadQuiz() {
    quizContainer.innerHTML = "";
    
    var previousScore = localStorage.getItem("previous-score");
    if (previousScore !== null) {
      var scoreDisplay = document.createElement("p");
      scoreDisplay.textContent = `Previous Score: ${previousScore}%`;
      quizContainer.appendChild(scoreDisplay);
    }
  
    var startButton = document.createElement("button");
    startButton.id = "start-quiz";
    startButton.textContent = "Start Quiz!";
    startButton.addEventListener("click", startQuiz);
    quizContainer.appendChild(startButton);
  }
  
  function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    showQuestion();
  }
  
  function showQuestion() {
    if (currentQuestionIndex >= questionsArr.length) {
      endQuiz();
      return;
    }
  
    quizContainer.innerHTML = "";
  
    var questionObj = questionsArr[currentQuestionIndex];
    var questionText = document.createElement("p");
    questionText.textContent = questionObj.question;
    quizContainer.appendChild(questionText);
  
    var optionsContainer = document.createElement("div");
  
    questionObj.options.forEach(function (option) {
      var button = document.createElement("button");
      button.textContent = option;
      button.addEventListener("click", function () {
        checkAnswer(option);
      });
      optionsContainer.appendChild(button);
    });
  
    quizContainer.appendChild(optionsContainer);
  
    timeLeft = 30;
    var timerDisplay = document.createElement("p");
    timerDisplay.textContent = timeLeft;
    quizContainer.appendChild(timerDisplay);
  
    timer = setInterval(function () {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        nextQuestion();
      }
    }, 1000);
  }
  
  function checkAnswer(selectedOption) {
    clearInterval(timer);
  
    if (selectedOption === questionsArr[currentQuestionIndex].answer) {
      score++;
    }
  
    nextQuestion();
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
  }
  
  function endQuiz() {
    quizContainer.innerHTML = "";
  
    var finalScore = Math.round((score / questionsArr.length) * 100);
    localStorage.setItem("previous-score", finalScore);
  
    var scoreDisplay = document.createElement("p");
    scoreDisplay.textContent = `Your Score: ${finalScore}%`;
    quizContainer.appendChild(scoreDisplay);
  
    var restartButton = document.createElement("button");
    restartButton.id = "start-quiz";
    restartButton.textContent = "Start Quiz!";
    restartButton.addEventListener("click", startQuiz);
    quizContainer.appendChild(restartButton);
  }
  
  document.addEventListener("DOMContentLoaded", loadQuiz);