define(["lib/d3"],function(d3) {

  var svg, x, y, dataset = [],blockHeight,blockWidth, width,height;

  //the renderer actually draws out the chart
  var Renderer = {
   
    init: function(target){
      //reset the viewport each time we start a new 
      width =  document.documentElement.clientWidth   || 800;
      height = document.documentElement.clientHeight - 100 || 800;
      //set up our initial scale for the first element
      x = d3.scale.linear()
          .range([0,width])
          .domain([-2,2]);

      y = d3.scale.linear()
          .range([0,height])
          .domain([1,1]);
      
      blockHeight = height/2;
      blockWidth = width*4/25;

      // we're creating an SVG container in the target div to hold our automaton
      svg = d3.select(target).append("svg")
          .attr("width", width )
          .attr("height", height);
    },

    //this renders a new row and transforms the old rows to match the new sizes
    render: function(row,iteration) {
      if(iteration > 200) {
        //don't run forever and blow up someone's browser
        return false;
      }

      x = x.domain([0-iteration,iteration]);
      y = y.domain([2,iteration]);
      blockHeight = height / iteration ;
      blockWidth = width / (iteration * 2 + 1) * 0.8;

      var dataPoints = row.map(function(point,index,fullrow) {
        return {
          x: index - Math.floor(fullrow.length/2),
          y: iteration,
          color: point === 1 ? "#2d578b" : "#FCFCFC"
        };
      });
      dataset = dataset.concat(dataPoints);
      
      svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("svg:rect")
        .attr("fill",function(d) { 
          return d.color; 
        });


      svg.selectAll("rect")
        .transition()
        .attr("height",blockHeight)
        .attr("width",blockWidth)
        .attr("x", function(d) {
          return x(d.x);
        })
        .attr("y", function(d) {
          return y(d.y);
        });
      
    },

    //just remove the contents of the target div and clear the dataset
    clear: function(target) {
      dataset = [];
      target.innerHTML = "";
    }

  };
 
  return Renderer;

});
