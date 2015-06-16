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

.controller("slide01", function(){})

.controller("slide02", function(){})

.controller("slide03", function(){})

.controller("slide04", function(){})

.controller("slide05", function(){})

.controller("slide06", function(){})
