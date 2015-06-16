angular.module("App")

.controller("main", function($scope, $document, $state) {

  var stateCount = $state.get().length-1;

  $scope.slides = _.sortBy($state.get(), function(a) { return parseInt(a.name); });
  $scope.slides.splice($scope.slides.length-1, 1);
  $scope.slides.isCurrent = function(slide) {
    return slide.name === $state.current.name;
  };
  $scope.slides.click = function(slide) {
    $state.go(slide.name);
  };

  $document.bind("keydown", function(event) {
    // Get current state number
    var state = parseInt($state.current.name);

    // Bind forward and back keys. Loop around to first/last states
    if (event.keyCode == 39) {
      state = state+1
      if (state > stateCount) state = 1;
      state = state < 10 ? "0" + state : "" + state;
      $state.go(state);
    } else if (event.keyCode == 37) {
      state = state-1
      if (state < 1) state = stateCount;
      state = state < 10 ? "0" + state : "" + state;
      $state.go(state)
    }
  });

})

.controller("slide01")

.controller("slide02", function($scope, Data) {

  Data.get(function(data) {
    console.log(data)
  })

})

.controller("slide03")

.controller("slide04")

.controller("slide05")

.controller("slide06")

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