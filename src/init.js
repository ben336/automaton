requirejs.config({
  "lib/d3": {
    exports:["d3"]
  }
});

require( ["src/Automaton",
          "src/Renderer"],

function(Automaton,Renderer) {

  var row = [1],
      iteration = 0,
      timeinterval = 2000,
      startBtn = document.getElementById("startbtn"),
      stopBtn = document.getElementById("stopbtn"),
      content = document.getElementById("content"),
      rule =30,
      interval;
  
  startBtn.addEventListener("click",function() {
    if(iteration>0) { 
      //don't want to do anything if we're already running
      return false;
    }
    //clear any existing chart
    Renderer.clear(content);
    //reset variables
    row= [1];
    iteration = 1;

    //set up the renderer with first time stuff
    Renderer.init(content);

    interval = setInterval(drawAndCalculate , timeinterval); 
    //do the first draw now
    drawAndCalculate();

    //toggle button classes
    startBtn.classList.add("disabled");
    stopBtn.classList.remove("disabled");
  });

  stopBtn.addEventListener("click",function() {
    //go back to the start and kill the repeating process
    iteration = 0;
    clearInterval(interval);

    //toggle the button classes
    stopBtn.classList.add("disabled");
    startBtn.classList.remove("disabled");
  });

  //draws the new row and then runs the calculation for the next one
  function drawAndCalculate() {
    Renderer.render(row,iteration);
    row = Automaton.translate(row,rule);
    iteration++;
  }

});

