var sideSize   = 600;
var circleSize = 5;
var restrict = sideSize / 20

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
d3.range(300).forEach(function(d) {
    elements.push([d, random(), random(), Math.log(random()), color]);
});



var circles = createCircle(space, elements);

var moveTo = function(restrict) {
  // restrict = (|rx| + |ry| + |rz|) / denomi
  var rx = Math.random(Math.random()) * 2 - 1;
  var ry = Math.random(Math.random()) * 2 - 1;
  var rz = Math.random(Math.random()) * 2 - 1;
  var denomi = (Math.abs(rx) + Math.abs(ry) + Math.abs(rz)) / restrict
  return [rx, ry, rz].map(function(d) { return d / denomi; })
}

var color = function(d, positions, restrict) {
  var r = Math.round((d[1] + positions[0]) * restrict * 5 / 255);
  var g = Math.round((d[2] + positions[1]) * restrict * 5 / 255);
  var b = 0;
  var a = Math.abs(positions[2] / restrict);
  return ["rgba(" + r, g, b, a + ")"].join(', ');
}

function swim(restrict) {
  var positions = moveTo(restrict);
  // positionとcolorをひも付け

  d3.selectAll(".fish").transition()
         .delay(50)
         .duration(function(d) { return 1; })
         .ease("cubic-out")
         .attr("cx", function(d) { return d[1] + positions[0]; })
         .attr("cy", function(d) { return d[2] + positions[1]; })
         .attr("r",  function(d) { return d[3] + positions[2] * 0.05; })
         .attr("fill", function(d) { return color(d, positions, restrict); });
  console.log(positions);
}

setInterval(function() { swim(restrict); }, 100);
