d3.chart = d3.chart || function() {
  var o = {
    data: null,
    xMax: null,
    yMax: null,
    draw: null,
    render: null
  }

  var chart = function() {

  }

  chart.xAxis = function() {
    
  }

  chart.datum = function(data) {
    o.data = data;
    return chart;
  }

  chart.xMax = function(max) {
    o.xMax = max;
    return chart;
  }

  chart.yMax = function(max) {
    o.yMax = max;
    return chart;
  }

  chart.render = function(renderer) {
    o.render = renderer;
    return chart;
  }

  chart.draw = function() {
    


    return chart;
  }
  
  return chart;
};