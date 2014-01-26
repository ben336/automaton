requirejs.config({
  "lib/d3": {
    exports:["d3"]
  }

});
require( ["src/Automaton",
          "src/Renderer"],

function(Automaton,Renderer){
  var row = [1],
      iteration = 0,
      maxiteration = 50,
      startBtn = document.getElementById("startbtn"),
      stopBtn = document.getElementById("stopbtn"),
      content = document.getElementById("content"),
      rule =30,
      interval;
  
  startBtn.addEventListener("click",function() {
    //don't want to do anything if not setup
    if(iteration>0) { 
      return false;
    }
    Renderer.clear(content);
    row= [1];
    iteration = 1;
    Renderer.init(content,maxiteration);
    interval = setInterval(drawAndCalculate,2000); 
  });

  stopBtn.addEventListener("click",function() {
    iteration = 0;
    clearInterval(interval);
  });

  function drawAndCalculate() {
    //draw first, then calculate, so that we're ready to draw right away
    if(iteration > maxiteration) {
      iteration = 0;
      clearInterval(interval);
      return;
    }
    Renderer.render(row,iteration);
    row = Automaton.translate(row,rule);
    iteration++;
  }

});

