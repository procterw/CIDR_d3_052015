angular.module("App")

.controller("slide07", function(){})

.controller("slide08", function($scope) {

  data = [3,5,2,4,1];

  d3.select("#canvas")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d,i) { return (i+1) * 30; })
    .attr("cy", function(d,i) { return d * 10; })
    .attr("r", function(d,i) { return d * 3; });

})

.controller("slide09", function(){})

.controller("slide10", function(){})

.controller("slide11", function(){})

.controller("slide12", function(){})

.controller("slide13", function(){})

.controller("slide14", function($scope, Data) {

  var layout = Data.initSvg("#plot");

})

.controller("slide15", function(){})

.controller("slide16", function($scope, Data) {

  Data.get(function(dataset) {

    $("svg").remove();

    var data = Data.initDataset(dataset);

    var layout = Data.initSvg("#plot");

    var scales = Data.initScales(data, layout.width, layout.height);

    var axes = Data.initAxes(scales);

    // The x axis never changes so we can just draw it now
    layout.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (layout.height) + ")")
      .call(axes.x);

   layout.svg.append("g")
    .attr("class", "y axis")

  })

})

.controller("slide17", function($scope, Data) {

  Data.get(function(dataset) {

    $("svg").remove();

    var data = Data.initDataset(dataset);

    var layout = Data.initSvg("#plot");

    var scales = Data.initScales(data, layout.width, layout.height);

    var axes = Data.initAxes(scales);

    // The x axis never changes so we can just draw it now
    layout.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (layout.height) + ")")
      .call(axes.x);

    layout.svg.append("g")
      .attr("class", "y axis")


    // plot stuff

    scales.y.domain([0, d3.max(data, function(d) {
      return d.values.length;
    })]);

    axes.y.scale(scales.y);

    d3.select(".y.axis")
      .attr("transform", "translate(-5,0)")
      .call(axes.y)
      .selectAll("g");

  })

})





