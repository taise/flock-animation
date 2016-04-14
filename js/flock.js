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
d3.range(200).forEach(function(d) {
    elements.push([d, random(), random(), Math.log(random()), color]);
});



var circles = createCircle(space, elements);

var moveTo = function(sideSize) {
  // sideSize / 10 = (|rx| + |ry| + |rz|) / denomi
  var rx = Math.random(Math.random()) * 2 - 1;
  var ry = Math.random(Math.random()) * 2 - 1;
  var rz = Math.random(Math.random()) * 2 - 1;
  var denomi = 10 * (Math.abs(rx) + Math.abs(ry) + Math.abs(rz)) / sideSize
  return [rx, ry, rz].map(function(d) { return d / denomi})
}

function swim(sideSize) {
  var positions = moveTo(sideSize);
  // positionとcolorをひも付け

  d3.selectAll(".fish").transition()
         .delay(50)
         .duration(function(d) { return d[1]*5; })
         .ease("cubic-out")
         .attr("cx", function(d) { return d[1] + positions[0]; })
         .attr("cy", function(d) { return d[2] + positions[1]; })
         .attr("r",  function(d) { return d[3] + positions[2] * 0.05; });
  console.log(plusX, plusY)
}

setInterval(function() { swim(sideSize); }, 1000);
