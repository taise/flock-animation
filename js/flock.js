var sideSize   = 600;
var circleSize = 5;

var space  = d3.select("#space").append("svg");
var color  = "#ffea00";
var random = d3_random.randomNormal(sideSize/2, sideSize/8)

space.style("height", sideSize)
     .style("width",  sideSize)
     .style("background-color", "#212121");


function createCircle(space, elements) {
  space.selectAll('circle')
  .data(elements)
  .enter()
  .append('circle')
  .attr({
      'name': function(d) { return d[0]; },
      'cx':   function(d) { return d[1]; },
      'cy':   function(d) { return d[2]; },
      'r':    function(d) { return d[3]; },
      'fill': function(d) { return d[4]; }
  });
}


var elements = [];
d3.range(50).forEach(function(d) {
    elements.push([d, random(), random(), circleSize, color]);
});

createCircle(space, elements);

var circles = space.selectAll("circle")
                   .data(elements)

