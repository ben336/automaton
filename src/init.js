requirejs.config({ "lib/d3": { exports:["d3"]} });

// Set up click handlers for the buttons, and then delegate drawing to 
//the renderer and calculation to the Automaton
require( ["src/Automaton", "src/Renderer"], function(Automaton,Renderer) {

  var row, iteration, interval,
      timeinterval = 2000,
      rule = 30,
      startBtn = document.getElementById("startbtn"),
      stopBtn = document.getElementById("stopbtn"),
      content = document.getElementById("content");
  
  startBtn.addEventListener("click",startRendering);
  stopBtn.addEventListener("click",stopRendering);

  function startRendering() {
    if(iteration > 1) { 
      //don't want to do anything if we're already running
      return false;
    }

    //reset variables
    row= [1];
    //start with iteration 2 so we're drawing right away
    //iteration 1 would be empty / all 0s
    iteration = 2;

    //set up the renderer with first time stuff
    Renderer.clear(content);
    Renderer.init(content);

    //do the first draw now, add an iteration and schedule the rest
    drawAndCalculate();
    drawAndCalculate();
    interval = setInterval(drawAndCalculate , timeinterval); 

    //toggle button classes
    startBtn.classList.add("disabled");
    stopBtn.classList.remove("disabled");
  }

  function stopRendering() {
    //go back to the start and kill the repeating process
    iteration = 1;
    clearInterval(interval);

    //toggle the button classes
    stopBtn.classList.add("disabled");
    startBtn.classList.remove("disabled");
  }


  //draws the new row and then runs the calculation for the next one
  function drawAndCalculate() {
    Renderer.render(row,iteration);
    row = Automaton.translate(row,rule);
    iteration++;
  }

});