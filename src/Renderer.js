define(["lib/d3"],function(d3) {

  var svg, x, y, dataset = [],blockHeight,blockWidth,max,
  viewWidth =  document.documentElement.clientWidth || 800,
  viewHeight = document.documentElement.clientHeight || 800;
  
  var Renderer = {
   
    init: function(target,numIterations){

      var enter,
          margin = {top: 40, right: 20, bottom: 40, left: 20},
          width = viewWidth- margin.left - margin.right,
          height = viewHeight - margin.top - margin.bottom;

      x = d3.scale.linear()
          .range([0,width])
          .domain([0-numIterations,numIterations]);

      y = d3.scale.linear()
          .range([0,height])
          .domain([0,numIterations]);
      
      blockHeight = height/numIterations;
      blockWidth = width/(numIterations*2+1);
      //stop after the max iterations
      max = numIterations;
      // An SVG element with a bottom-right origin.
      svg = d3.select(target).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);
    },

    render: function(row,iteration) {
      if(iteration > max) {
        //if we're not going to be able to see it, don't do anything
        return;
      }
      var dataPoints = row.map(function(point,index,fullrow) {
        return {
          x: index - Math.floor(fullrow.length/2),
          y: iteration,
          color: point === 1 ? "#2d578b" : "#FCFCFC"
        }
      });
      dataset = dataset.concat(dataPoints);
      svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("svg:rect")
        .attr("x", function(d) { 
          return x(d.x);
        })
        .attr("y", function(d) { 
          return y(d.y)
        })
        .attr("height",blockHeight)
        .attr("width",blockWidth)
        .attr("fill",function(d) { 
          return d.color 
        });
    },

    clear: function(target) {
      dataset = [];
      target.innerHTML = "";
    }

  }
 

  return Renderer;

});
