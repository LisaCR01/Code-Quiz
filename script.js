
//question bank
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

  

  

//when button clicked it disappears and timer starts
//timer displayed instead of good luck
var timeEl = document.querySelector(".timer");
var mainEl = document.getElementById("main");
// Selects element by id
var secondsLeft = 75;
var quizComplete=false
var score=0

var maxQuest=questionBank.length
var istep=-1

function setTime() {secondsLeft = 75;
    quizComplete=false
   // Sets interval in variable
   var timerInterval = setInterval(function() {
     secondsLeft--
     if(secondsLeft <= 0 ||quizComplete==true) {
       // Stops execution of action at set interval
       clearInterval(timerInterval);
       // Calls function to do leadership board
     
     timeEl.textContent = "Your score is "+ Math.max(secondsLeft,0);
     document.querySelector(".rules_card").innerHTML=codeBlockend 
    }
     //need the max in here -in case my score goes negative. 
     else{timeEl.textContent = Math.max(secondsLeft,0) + " seconds left of quiz"};
   }, 1000);
   }

var button = document.querySelector("#start_btn");

button.addEventListener("click", startTimer)
var istep=-1
function startTimer(event) {
if(istep==-1){  
  button.parentNode.removeChild(button);
  //button.disabled = true;document.getElementById("start_btn").innerHTML = ""
    document.querySelector(".rules_card").innerHTML=codeBlock // event.stopPropagation();

setTime();button.disabled = true;
 ;}

 console.log("istep cr "+ istep)
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

   var failPic='<p>&#x2718; </p>'
    var rightPic='<p>&#10004;</p>'
    
  
    const selVal=[]
    function getAns(){
    selVal[istep]=document.getElementById("questP").value;
    if (selVal[istep].charAt(0)!=questionBank[istep].correct)
    {secondsLeft-=5; 
      //document.getElementById("try").style.color = "green";
      document.getElementById("try").style.color = "rgb(234, 200, 231)"
      document.getElementById("try").innerHTML = failPic}
      else
      {document.getElementById("try").style.color = "rgb(234, 200, 231)";document.getElementById("try").innerHTML = rightPic}
    genQ()
    }

    
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
  
//the leaderboard

var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = [];

// The following function renders items in a todo list as <li> elements
function renderTodos() {
  // Clear todoList element and update todoCountSpan
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    //changed this line here
    li.textContent = todo.initialS +" High Score "+todo.score;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Delete";

    li.appendChild(button);
    todoList.appendChild(li);
  }
}

// This function is being called below and will run when the page loads.
function init() {
  // Get stored todos from localStorage
  var storedTodos = JSON.parse(localStorage.getItem("todos"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedTodos !== null) {
    todos = storedTodos;
  }

  // This is a helper function that will render todos to the DOM
  renderTodos();
}

function storeTodos() {
  //sort first
  todos.sort(function(a, b){return b.score - a.score});
  console.log(todos)
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add submit event to form
todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var todoText = todoInput.value.trim();

  // Return from function early if submitted todoText is blank
  if (todoText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  var elementNew={initialS:todoText,score:secondsLeft}
  // Add new todoText to todos array, clear the input
  todos.push(elementNew)
  todoInput.value = "";
  

  // Store updated todos in localStorage, re-render the list
  storeTodos();
  renderTodos();

  setInterval(function(){ document.location.reload(); }, 3000);
});

// Add click event to todoList element
todoList.addEventListener("click", function(event) {
  var element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);

    // Store updated todos in localStorage, re-render the list
    storeTodos();
    renderTodos();
  }
});

// Calls init to retrieve data and render it to the page on load
init()

    