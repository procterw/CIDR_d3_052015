angular.module("App")

.controller("slide07", function($scope) {

  data = [3,5,2,4,1];

  d3.select("#canvas1")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d,i) { return (i+1) * 30; })
    .attr("cy", 20)
    .attr("r", 10)
    .attr("fill", "#3498db");

  d3.select("#canvas2")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d,i) { return (i+1) * 30; })
    .attr("cy", function(d,i) { return d * 10; })
    .attr("r", function(d,i) { return d * 3; })
    .attr("fill", "#3498db");

})

.controller("slide08", function($scope) {})

.controller("slide09", function($scope) {})

.controller("slide10", function($scope) {})

.controller("slide11", function($scope) {})