d3.chart = d3.chart || function() {};
d3.chart.add = function(chart) {
  var prop;
  for (prop in this.prototype) {
    if (!chart.prototype[prop]) chart.prototype[prop] = this.prototype[prop];
  }
}
d3.chart.prototype = {
  primaryClass: 'd3-chart',
  defaultsCommon: {
    width: 1000,
    height: 500,
    margin: { top: 40, right: 10, bottom: 20, left: 10 },
  },

  setOptions: function(options) {
    var option;
    for (option in this.defaults) {
      options[option] = options[option] || this.defaults[option];
    } 
    this.opts = options;
    this.setCommon();
  },

  // add interface methods
  setData: function(data) { this.data = data; },
  setRanges: function() {},
  setMaxes: function() {},
  setAxes: function() {},
  setColors: function() {},

  setCommon: function() {
    var prop;
    for (prop in this.defaultsCommon) {
      this[prop] = this.opts[prop] || this.defaultsCommon[prop];
    }
    this.width = (this.width - this.margin.left - this.margin.right);
    this.height = (this.height - this.margin.top - this.margin.bottom);
  }
}