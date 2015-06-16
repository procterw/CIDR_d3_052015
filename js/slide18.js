angular.module("App")

.controller("slide18", function($scope, Data) {

  Data.get(function(dataset) {

    $("svg").remove();

    var data = Data.initDataset(dataset);

    var layout = Data.initSvg("#plot");

    var scales = Data.initScales(data, layout.width, layout.height);

    var axes = Data.initAxes(scales);

    // The x axis never changes so we can just draw it now
    layout.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (layout.height + 5) + ")")
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

    layout.svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d) {
        return scales.x(d.key)
      })
      .attr("width", scales.x.rangeBand())
      .attr("y", function(d) {
        return scales.y(d.values.length);
      })
      .attr("height", function(d) {
        return layout.height - scales.y(d.values.length)
      });


  })

})

.controller("slide19", function($scope, Data) {

  Data.get(function(dataset) {

    var sorted = _.sortBy(dataset, function(d) {
      return parseInt(d.maxCode);
    });

    var data = d3.nest()
      .key(function(d) { return d.status; })
      .key(function(d) { return d.superkingdom; })
      .entries(sorted);

    console.log(data)

  })

})

.controller("slide20", function(){})

.controller("slide21", function(Data){

  var filters = {
    "species": "",
    "clone" : "Not available",
    "protein" : "Not available",
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

    var sorted = _.sortBy(dataset, function(d) {
      return parseInt(d.maxCode);
    });

    var data = d3.nest()
      .key(function(d) { return d.status; })
      .key(function(d) { return d.superkingdom; })
      .entries(sorted.filter(filter));

  })

})

.controller("slide22", function(){})

.controller("slide23", function(){})

.controller("slide24", function(){})

.controller("slide25", function(){})