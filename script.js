//when button clicked it disappears and timer starts
//timer displayed instead of good luck
var timeEl = document.querySelector(".timer");
// Selects element by id
var secondsLeft = 75;
function setTime() {secondsLeft = 75;
   // Sets interval in variable
   var timerInterval = setInterval(function() {
     secondsLeft--
     if(secondsLeft <= 0 ) {
       // Stops execution of action at set interval
       clearInterval(timerInterval);
       // Calls function to do leadership board
     } 
     //need the max in here -in case my score goes negative. 
     else{timeEl.textContent = Math.max(secondsLeft,0) + " seconds left of quiz"};
   }, 1000);
   }
var button = document.querySelector("#start_btn");

button.addEventListener("click", startTimer)
var istep=-1
function startTimer(event) {
if(istep==-1){    // event.stopPropagation();
    
setTime();
 ;}

}