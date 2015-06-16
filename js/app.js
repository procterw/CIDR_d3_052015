angular.module("App", ["ui.router"])


.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/slide01");

  var slideCount = 12;

  //
  // Now set up the states
  for (var i=1; i<slideCount+1; i++) {
    var slide = (i < 10 ? "0" + i : i);
    $stateProvider
      .state("" + slide, {
        url: "/slide" + slide,
        templateUrl: "views/slide" + slide + ".html",
        controller: "slide" + slide
      });
  }

});