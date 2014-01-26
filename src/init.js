
require( ["src/Automaton",
          "src/Renderer"],

function(Automaton,Renderer){
  var rows = [[1]],
      startBtn = document.getElementById("startbtn"),
      stopBtn = document.getElementById("stopbtn"),
      content = document.getElementById("content"),
      rule =30,
      interval;
  
  startBtn.addEventListener("click",function() {
   interval = setInterval(drawAndCalculate,2000); 
  });

  stopBtn.addEventListener("click",function() {
    clearInterval(interval);
    rows = [[1]];
    Renderer.clear(content)
  });

  function drawAndCalculate() {
    //draw first, then calculate, so that we're ready to draw right away
    Renderer.render(rows,content);
    rows.push(Automaton.translate(rows[rows.length-1],rule));
  }

});

