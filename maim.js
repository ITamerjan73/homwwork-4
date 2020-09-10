// questions
var questions = [{
    question: 'Commonly used date types Do Not include',
    choiceA: 'strings',
    choiceB: 'cods',
    choiceC: 'alerts',
    choiceD: 'numbers',
    correct: 'A'
  }, {
    question: 'The condition in an if / else statement is enclosed within________',
    choiceA: 'quotes',
    choiceB: 'curly brachets',
    choiceC: 'pangshewa',
    choiceD: 'square brackets',
    correct: 'B'
  }, {
    question: 'Arrays in javaScript can be used to store___________________',
    choiceA: 'number and strings',
    choiceB: 'other arrays',
    choiceC: 'store multiple valus in a single refrence',
    choiceD: 'all of the above',
    correct: 'C'
  }, {
    question: 'String values must be enclosed within______________',
    choiceA: 'commas',
    choiceB: 'curly brackets',
    choiceC: 'quotes',
    choiceD: 'parenthess',
    correct: 'B'
  }, {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is',
    choiceA: 'javascript',
    choiceB: 'terminal/bash',
    choiceC: 'for loops',
    choiceD: 'console log',
    correct: 'C'
  }];
  
  // global variables
  var start = document.getElementById('start-btn'),
      startContainer = document.getElementById('start-container'),
      quiz = document.getElementById('quiz-container'),
      question = document.getElementById('question'),
      choiceA = document.getElementById('choice-a'),
      choiceB = document.getElementById('choice-b'),
      choiceC = document.getElementById('choice-c'),
      counter = document.getElementById('counter'),
      timeGauge = document.getElementById('timeGauge'),
      progress = document.getElementById('progress'),
      scoreDiv = document.getElementById('score'),
      scoreContent = document.getElementById('score-content'),
      submitBtn = document.getElementById('submit-score'),
      userName = document.getElementById('user-name'),
      userScore = 0,
      highScoreDiv = document.getElementById('high-score-container'),
      runningQuestion = 0,
      count = 0,
      users = [],
      questionTime = 10, // 10s
      lastQuestion = questions.length - 1,
      gaugeWidth = 150, // 150px
      gaugeUnit = gaugeWidth / questionTime,
      score = 0;
  let TIMER;
  
  // start quiz
  function startQuiz() {
    startContainer.classList.add('d-none');
    quiz.classList.remove('d-none');
    renderQuestion();
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
  }
  
  // render a question
  function renderQuestion() {
    var q = questions[runningQuestion];
  
    question.innerHTML = q.question;
    choiceA.textContent = q.choiceA;
    choiceB.textContent = q.choiceB;
    choiceC.textContent = q.choiceC;
  }
  
  // render progress
  function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
      progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
  }
  
  // counter render
  function renderCounter() {
    if (count <= questionTime) {
      counter.textContent = count;
      timeGauge.style.width = count * gaugeUnit + "px";
      count++
    } else {
      count = 0;
      // change progress color to red
      answerIsWrong();
      if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
      } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
      }
    }
  }
  
      // checkAnwer
  function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
      // answer is correct
      score++;
      // change progress color to green
      answerIsCorrect();
    } else {
      // answer is wrong
      // change progress color to red
      answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      // end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
    }
  }
  
      // answer is correct
  function answerIsCorrect() {
    document.getElementById(runningQuestion).classList.add('correct');
  }
  
      // answer is Wrong
  function answerIsWrong() {
    document.getElementById(runningQuestion).classList.add('incorrect');
  }
  
      // score render
  function scoreRender(userscore) {
    quiz.classList.add('d-none');
    scoreDiv.classList.remove('d-none');
  
    // calculate the amount of question percent answered by the user
    userScore = Math.round(100 * score / questions.length);
  
    // return userScore;
  
    scoreContent.textContent = 'You scored ' + userScore + '%!';
  }
  
  
   submitBtn.addEventListener('click', function(event) {
    event.prevendDefault;
   
    var user = {
      userName: userName.value.trim().toUpperCase(),
      score: userScore.toString()
    };
  
    users.push(user);
  
    // users.sort(function(a, b) {
    //   return parseFloat(a.score) - parseFloat(b.score);
    // });
  
    localStorage.setItem('users', JSON.stringify(users));
  
    scoreDiv.classList.add('d-none');
  
    highScoreDiv.classList.remove('d-none');
  
    for (var i = 0; i < users.length; i++) {
  
      var highScoreList = document.querySelector('ul');
  
      var li = document.createElement('li');
  
      li.textContent = `${users[i].userName}: ${users[i].score}`;
  
      highScoreList.append(li);
    }
  });