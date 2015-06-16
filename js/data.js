// Only need to load the dataset once

angular.module("App")

.factory("Data", function() {

  var data = false;

  function get(callback) {
    if (data) {
      console.log("DATA");
      callback(data);
    }
    d3.csv("data.csv" , function(dataset) {
      data = dataset;
      callback(dataset);
    });
  }

  function initDataset(dataset) {
    var sorted = _.sortBy(dataset, function(d) {
      return parseInt(d.maxCode);
    });

    data = d3.nest()
      .key(function(d) { return d.status })
      .entries(sorted);

    return data;
  }

  function initSvg(el) {
    var margin = {top: 10, right: 10, bottom: 65, left: 65},
      width = $(el).width() - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    var svg = d3.select(el).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    return {
      margin: margin,
      width: width,
      height: height,
      svg: svg
    }
  }

  function initScales(data, width, height) {
    var x = d3.scale.ordinal()
      .domain(_.map(data, function(d) { 
          return d.key;
        }))
      .rangeRoundBands([0, width], 0.1);

    var y = d3.scale.linear()
     .range([height, 0]);

     return { x:x, y:y }
  }

  function initAxes(scales) {
      // Initialize x axis function
    var xAxis = d3.svg.axis()
      .scale(scales.x)
      .orient("bottom")
      .ticks(21);

    // Initialize y axis function
    var yAxis = d3.svg.axis()
      .orient("left");

    return { x:xAxis, y:yAxis }

  }

  return {
    get: get,
    initDataset: initDataset,
    initSvg: initSvg,
    initScales: initScales,
    initAxes: initAxes
  }

});