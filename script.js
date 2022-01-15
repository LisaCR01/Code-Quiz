
// Multiple choice question bank, for the quiz taken by the user.
var questionBank=[
    {question:"How is a single line comment started in JavaScript ?",
    ans:{a:"%",
    b:"#",
    c:"//",
    d:"- -"},
    correct: "c"},
  
  {question:"What is the difference between '5' and 5 when referenced in JavaScript?",
  ans:{a:"value",
  b:"type",
  c:"value and type",
  d:"nothing"},
  correct:"b"},
  
  {question:"Why is JavaScript important to use on a webpage?",
  ans:{a:"Adds behavior making it interactive.",
  b:"Controls all design-related aspects of your website.",
  c:"Used to describe the structure of information on a webpage.",
  d:"Helpful to other programmers to understand the code better."},
  correct:"a"},
  
  {question:"What is a string in JavaScript?",
  ans:{a:"Something that stores the data value that can be changed later on.",
  b:"A sequence of one or more characters that may consist of letters, numbers, or symbols.",
  c:"A single variable that is used to store different elements.",
  d:"A way to repeatedly run a block of code - until a certain condition is met."},
  correct:"b"},
  
  {question:"In HTML which tags is JavaScript code found between?",
  ans:{a:"figure",
  b:"nav",
  c:"ul",
  d:"script"},
  correct:"d"},
  ];

// When the user clicks the button,it disappears and a timer starts counting from 75 seconds.
// The timer is displayed instead of good luck on the screen.
var timeEl = document.querySelector(".timer");
var mainEl = document.getElementById("main");
var secondsLeft = 75;
var quizComplete=false
var score=0

var maxQuest=questionBank.length
var istep=-1

// When the user completes the quiz the timer stops.
function setTime() {secondsLeft = 75;
    quizComplete=false
   var timerInterval = setInterval(function() {
     secondsLeft--
     if(secondsLeft <= 0 ||quizComplete==true) {
       //Stops execution of action at set interval
       clearInterval(timerInterval);
       //Reveals leaderboard to user
       init()
       document.getElementById("try").innerHTML = "all done"
            timeEl.textContent = "Your score is "+ Math.max(secondsLeft,0);
            document.querySelector(".rules_card").innerHTML="" 
            document.getElementById("todo-form").style.display = "inline"
    } 
     else{timeEl.textContent = Math.max(secondsLeft,0) + " seconds left of quiz"};
   }, 1000);
   }

var button = document.querySelector("#start_btn");

button.addEventListener("click", startTimer)

// User can restart the quiz at any point by clicking the button "refreshButton".
const refreshButton=document.querySelector('.refresh-button')

const refreshPage = () => {
  location.reload();

}
refreshButton.addEventListener('click', refreshPage)

var istep=-1
function startTimer(event) {
if(istep==-1){  
  button.parentNode.removeChild(button);
  // button.disabled = true;document.getElementById("start_btn").innerHTML = "".
    document.querySelector(".rules_card").innerHTML=codeBlock // event.stopPropagation();

setTime();button.disabled = true;
 ;}

 console.log("istep cr "+ istep)

 // genQ initiates the questions for the user.
genQ() ;

}

function genQ(){
    if (istep==maxQuest-1){quizComplete=true}
    else 
    {istep++;
    document.getElementById("questP").value="e"
    document.getElementById("javaselect").innerHTML=questionBank[istep].question
    document.getElementById("achoice").innerHTML=questionBank[istep].ans.a
    document.getElementById("bchoice").innerHTML=questionBank[istep].ans.b
    document.getElementById("cchoice").innerHTML=questionBank[istep].ans.c
    document.getElementById("dchoice").innerHTML=questionBank[istep].ans.d}
    }

    // When the user answers the question incorrectly they are presented with a cross.
    // When the user answers the question correctly they are presented with a tick.
   var failPic='<p>&#x2718; </p>'
    var rightPic='<p>&#10004;</p>'
    
  // Computer compares the user's answer to the correct answer in the question bank.
    const selVal=[]
    function getAns(){
    selVal[istep]=document.getElementById("questP").value;
    if (selVal[istep].charAt(0)!=questionBank[istep].correct)
    // When the user answers incorrectly they lose 5 seconds.
    {secondsLeft-=5; 
      document.getElementById("try").style.color = "rgb(234, 200, 231)"
      document.getElementById("try").innerHTML = failPic}
      else
      {document.getElementById("try").style.color = "rgb(234, 200, 231)";document.getElementById("try").innerHTML = rightPic}
    genQ()
    }

  // Replaces the quiz rules when the timer starts.  
    var codeBlock = 
  '<section class="content">' +
    '<h2 id="javaselect"></h2>'+
    '<select name=questQ onchange="getAns()" id="questP"  size="4"  >' +
    '<optgroup>' +
    '<option id=achoice value="achoice">A</option>' +
    '<option id=bchoice value="bchoice">B</option>' +
    '<option id=cchoice value="cchoice">C</option>' +
    '<option id=dchoice value="dchoice">D</option>' +
    '</optgroup>' +
    '</select>' +
    '</section>'
  ;
  
// computer stores content for the leaderboard.
var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = [];

// The following function renders items in a todo list as <li> elements.
function renderTodos() {
  // Clear todoList element and update todoCountSpan.
  todoList.innerHTML = "";
  todoCountSpan.textContent = "scores on the leaderboard " +todos.length;

  // Render a new li for each todo.
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo.initialS +" High Score "+todo.score;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Delete";

    li.appendChild(button);
    todoList.appendChild(li);
  }
}

// This sets up the leaderboard and finds any prior scores that are in local storage.
function init() {
  var storedTodos = JSON.parse(localStorage.getItem("todos"));
  if (storedTodos !== null) {
    todos = storedTodos;
  }
  if(quizComplete==true){ renderTodos()};
}

function storeTodos() {
  // Sorts the scores from highest to lowest before saving.
  todos.sort(function(a, b){return b.score - a.score});
  console.log(todos)
  // Stringify and set key in localStorage to todos array.
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Allows user to put initials along with their score into the leaderboard.
todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var todoText = todoInput.value.trim();

  // If user puts no initials into the leaderboard then the computer can not save it.
  if (todoText === "") {
    return;
  }

  // After initials have been put into input and stored in local storage it is cleared.
  var elementNew={initialS:todoText,score:secondsLeft}
  todos.push(elementNew)
  todoInput.value = "";
  
  storeTodos();
  if(quizComplete==true){ renderTodos()};

  setInterval(function(){ document.location.reload(); }, 3000);
});

// User can delete their score from the leaderboard by clicking the delete button next to their initials and score.
todoList.addEventListener("click", function(event) {
  var element = event.target;
  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);

    // Computer deletes this score from local storage.
    storeTodos();
    if(quizComplete==true){ renderTodos()};
  }
});

// The computer calls init initializes the leaderboard but does not display it until the quiz is over.
init()

if(quizComplete==false){document.getElementById("todo-form").style.display = "none"}

    