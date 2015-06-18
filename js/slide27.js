angular.module("App")

.controller("slide28", function($scope, Data) {

  

  var filters = {
    "species": "",
    "clone" : "",
    "protein" : ""
  };

  function filter(d) {
    for (f in filters) {
      var filt = filters[f];
      filt = filt === "noFilter" ? "" : filt;
      if (d[f].indexOf(filt) < 0) {
        return false;
      }
    }
    return true;
  };

  Data.get(function(dataset) {

    $scope.filter = function(filt) {
      var current = filters[filt];
      filters[filt] = current ? "" : "Not available";
      plot();
    }

    $scope.isAvailable = function(filt) {
      return filters[filt] !== "";
    }

    dataset = _.sortBy(dataset, function(d) { return parseInt(d.maxCode); });

    var factors = _.unique(_.map(dataset, function(d) { return d.status; }));

    $("svg").remove();

    var layout = Data.initSvg("#plot");

    Data.addLabels(layout);

    var x = d3.scale.ordinal()
      .domain(factors)
      .rangeRoundBands([0, layout.width], 0.1);

    var x1 = d3.scale.ordinal()

    var y = d3.scale.linear()
     .range([layout.height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(21);

    var yAxis = d3.svg.axis()
      .orient("left");

    layout.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (layout.height + 5) + ")")
      .call(xAxis);

    layout.svg.append("g")
      .attr("class", "y axis");

    plot()


    function plot() {
    
      var groupBy = "superkingdom";

      var data = d3.nest()
        .key(function(d) { return d.status; })
        .key(function(d) { return d[groupBy]; })
        .entries(dataset.filter(filter));

      // The actual data is now two levels deep so we need 2 max functions
      y.domain([0, d3.max(data, function(d) {
        return d3.max(d.values, function(d) {
          return d.values.length;
        });
      })]);

      // Find the different levels of groupBy
      var groupFactors = _.unique(_.map(dataset, function(d) { return d[groupBy]; }));
      
      // For range, use the width of the x scale
      x1.domain(groupFactors)
        .rangeRoundBands([0, x.rangeBand()], 0.2)

      yAxis.scale(y);

      d3.select(".y.axis")
        .attr("transform", "translate(-5,0)")
        .call(yAxis)
        .selectAll("g");


      // Select the status groups and add the new dataset
      var barGroups = layout.svg.selectAll(".bar")
        .data(data);

      // ENTER groups for each status level
      barGroups
        .enter()
        .append("g")
        .attr("class", "bar")
        .attr("transform", function(d,i) {
          return "translate(" + x(d.key) + ",0)";
        });

      barGroups
        .exit()
        .remove();

      // Select and append data to rects
      var bars = barGroups.selectAll("rect")
        .data(function(d) { return d.values; });

      bars
        .attr("y", function(d) {
          return y(d.values.length);
        })
        .attr("height", function(d) {
          return layout.height - y(d.values.length);
        });

      // ENTER new rectangles
      bars
        .enter()
        .append("rect")
        .attr("class", function(d) {
          return d.key;
        })
        .attr("x", function(d) {
          return x1(d.key);
        })
        .attr("width", x1.rangeBand())
        .attr("y", function(d) {
          return y(d.values.length);
        })
        .attr("height", function(d) {
          return layout.height - y(d.values.length);
        });

      bars
        .exit()
        .remove();

    }

  })

})
.controller("slide29", function(){})
.controller("slide30", function($scope){

  var data = [0,6,2,4,9,8,1,3,5,3,2,6,8,1,7];  

  // Initial state
  var circle = d3.select("#canvas")
    .append("svg")
    .selectAll("circle")
    .data(data);

  circle
    .enter()
    .append("circle")
    .attr("r", 10)
    .attr("cx", function(d,i) {
      return (i+1) * 50;
    })
    .attr("cy", 40)
    .attr("fill", "#3498db")

  function animate() {
    
    circle
    .transition()
    .delay(function(d,i) {
      return 100 + 25*i;
    })
    .duration(1000)
    .attr("r", function(d,i) {
      return d * 3;
    })
    .attr("fill", "#9b59b6")

    .transition()
    .duration(250)
    .attr("fill", "#e74c3c")
    .attr("r", 0)

    .transition()
    .duration(250)
    .attr("fill", "#e67e22")
    .attr("r", 10)

    .transition()
    .duration(1000)
    .attr("fill", "#f1c40f")
    .attr("r", 15)
    .attr("cy", 20)

    .transition()
    .duration(1000)
    .style("opacity", 0)
    .attr("cy", 100)

    .transition()
    .duration(250)
    .attr("cy", 40)
    .style("opacity", 1)
    .attr("fill", "#3498db")

  }

  animate();

  setInterval(function(){ 
    console.log("GO"); 
    animate(); 
  }, 4000);

  // $scope.click = animate;
    
  


});