angular.module("App")

.controller("slide26", function($scope, Data) {

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

  function getFactors(data) {
    var sorted = _.sortBy(data, function(d) {
      return parseInt(d.maxCode);
    });
    var factors = _.map(sorted, function(d) {
      return d.status;
    });
    return _.unique(factors);
  }




  Data.get(function(dataset) {

    console.log(getFactors(dataset))

      $("svg").remove();

      var layout = Data.initSvg("#plot");

      var x = d3.scale.ordinal()
        .domain(_.map(dataset, function(d) { 
          return d.status;
        }))
        .rangeRoundBands([0, layout.width], 0.1);

      var x1 = d3.scale.ordinal()

      var y = d3.scale.linear()
       .range([layout.height, 0]);


    var groupBy = "superkingdom";

    var sorted = _.sortBy(dataset, function(d) {
      return parseInt(d.maxCode);
    });

    var data = d3.nest()
      .key(function(d) { return d.status; })
      .key(function(d) { return d[groupBy]; })
      .entries(sorted.filter(filter));




  })

})
