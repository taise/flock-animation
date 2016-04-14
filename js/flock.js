var sideSize   = 600;
var circleSize = 5;
var restrict = sideSize / 20

var space  = d3.select("#space").append("svg");
var color  = "#ffea00";
var random = d3_random.randomNormal(sideSize/2, sideSize/6)

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
d3.range(300).forEach(function(d) {
    elements.push([d, random(), random(), Math.log(random()), color]);
});



var circles = createCircle(space, elements);

var moveTo = function(restrict, lastPositions) {
  // restrict = (|rx| + |ry| + |rz|) / denomi
  var rx = random() + lastPositions[0] * 200;
  var ry = random() + lastPositions[1] * 200;
  var rz = random() + lastPositions[2] * 200;
  var denomi = (Math.abs(rx) + Math.abs(ry) + Math.abs(rz)) / restrict
  return [rx, ry, rz].map(function(d, i) { return d / denomi; })
}

var color = function(d, positions, restrict) {
  var r = Math.round((d[1] + positions[0]) * restrict * 5 / 255);
  var g = Math.round((d[2] + positions[1]) * restrict * 5 / 255);
  var b = 0;
  var a = Math.abs(positions[2] / restrict) * 0.1 + 0.5;
  return ["rgba(" + r, g, b, a + ")"].join(', ');
}

function swim(restrict, lastPositions) {
  var positions = moveTo(restrict, lastPositions);

  d3.selectAll(".fish").transition()
         .duration(function(d) { return 0; })
         .ease("cubic-out")
         .attr("cx", function(d) { return d[1] + positions[0]; })
         .attr("cy", function(d) { return d[2] + positions[1]; })
         .attr("r",  function(d) { return d[3] + positions[2] * 0.05; })
         .attr("fill", function(d) { return color(d, positions, restrict); });
  return positions;
}

var lastPositions = [100, 100, 100];
setInterval(function() { lastPositions = swim(restrict, lastPositions); }, 0.1);
