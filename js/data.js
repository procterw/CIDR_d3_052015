// Only need to load the dataset once

angular.module("App")

.factory("Data", function() {

  var data = false;

  function get(callback) {
    if (data) {
      console.log("DATA");
      return data;
    }
    d3.csv("data.csv" , function(dataset) {
      data = dataset;
      callback(dataset);
    });
  }

  return {
    get: get
  }

});