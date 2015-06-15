angular.module("App")

.controller("main", function($scope, $document, $state) {

  var stateCount = $state.get().length-1;

  $scope.slides = $state.get();
  $scope.slides.splice(0,1);
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
      $state.go(state < 10 ? "0" + state : state)
    } else if (event.keyCode == 37) {
      state = state-1
      if (state < 1) state = stateCount;
      $state.go(state < 10 ? "0" + state : state)
    }
  });

})

.controller("slide01", function($scope, Data) {})

.controller("slide02", function($scope, Data) {

  Data.get(function(data) {
    console.log(data)
  })

})

.controller("slide03", function($scope) {})

.controller("slide04", function($scope) {})

.controller("slide05", function($scope) {})

.controller("slide06", function($scope) {})

.controller("slide07", function($scope) {})

.controller("slide08", function($scope) {})

.controller("slide09", function($scope) {})

.controller("slide10", function($scope) {})