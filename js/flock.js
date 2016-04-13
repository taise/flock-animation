var sideSize   = 600;
var circleSize = 5;

var space  = d3.select("#space").append("svg");
var color  = "#ffea00";
var random = d3_random.randomNormal(sideSize/2, sideSize/8)

space.style("height", sideSize)
     .style("width",  sideSize)
     .style("background-color", "#212121");


function createCircle(space, elements) {
  return space.selectAll('circle')
              .data(elements)
              .enter()
              .append('circle')
              .attr({
                  'class': 'fish',
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



var circles = createCircle(space, elements);



function swim() {
  var plusX = random() * 0.35;
  var plusY = random() * 0.35;

  d3.selectAll(".fish").transition()
         .delay(100)
         .duration(function(d) { return d[1]*10; })
         .ease("cubic-out")
         .attr("cx", function(d) { return d[1] + plusX - 20 * Math.random(); })
         .attr("cy", function(d) { return d[2] + plusY - 20 * Math.random(); });
  console.log(plusX, plusY)
}

setInterval(swim, 2000);
