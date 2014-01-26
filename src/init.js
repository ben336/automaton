requirejs.config({
  "lib/d3": {
    exports:["d3"]
  }
});

require( ["src/Automaton",
          "src/Renderer"],

function(Automaton,Renderer) {

  var row = [1],
      iteration = 1,
      timeinterval = 2000,
      startBtn = document.getElementById("startbtn"),
      stopBtn = document.getElementById("stopbtn"),
      content = document.getElementById("content"),
      rule =30,
      interval;
  
  startBtn.addEventListener("click",function() {
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


    //do the first draw now and schedule the rest
    drawAndCalculate();
    interval = setInterval(drawAndCalculate , timeinterval); 

    //toggle button classes
    startBtn.classList.add("disabled");
    stopBtn.classList.remove("disabled");
  });

  stopBtn.addEventListener("click",function() {
    //go back to the start and kill the repeating process
    iteration = 1;
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

