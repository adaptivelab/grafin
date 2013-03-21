d3.chart = d3.chart || function() {};
d3.chart.add = function(chart) {
  var prop;
  for (prop in this.prototype) {
    if (!chart.prototype[prop]) chart.prototype[prop] = this.prototype[prop];
  }
}
d3.chart.prototype = {
  setOptions: function(options) {
    var option;
    for (option in this.defaults) {
      options[option] = !options[option] ? this.defaults[option] : options[option];
    }
    this.o = options;
  }
}