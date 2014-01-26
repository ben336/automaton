define(["lib/d3"],function(d3) {

  var svg, x, y, dataset = [],blockHeight,blockWidth,
    viewWidth =  document.documentElement.clientWidth   || 800,
    viewHeight = document.documentElement.clientHeight -100 || 800,
    width = viewWidth,
    height = viewHeight;

  var Renderer = {
   
    init: function(target){

      x = d3.scale.linear()
          .range([0,width])
          .domain([0,0]);

      y = d3.scale.linear()
          .range([0,height])
          .domain([1,1]);
      
      blockHeight = height/2;
      blockWidth = width/3;
      // An SVG element with a bottom-right origin.
      svg = d3.select(target).append("svg")
          .attr("width", width )
          .attr("height", height);
    },

    render: function(row,iteration) {
      if(iteration > 500) {
        //don't run forever and blow up someone's browser
        return false;
      }

      if(iteration > 1) {
        x = x.domain([0-iteration,iteration]);
        y = y.domain([1,iteration]);
        blockHeight = height / iteration ;
        blockWidth = width/(iteration * 2 + 1)*.8;
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
        .transition()
        .attr("height",blockHeight)
        .attr("width",blockWidth)
        .attr("x", function(d) {
          return x(d.x);
        })
        .attr("y", function(d) {
          return y(d.y);
        });
      
      svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("svg:rect")
        .attr("x", function(d) { 
          return x(d.x);
        })
        .attr("y", function(d) { 
          return y(d.y);
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
