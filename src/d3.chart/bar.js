d3.chart.bar = function(data, options) {
  'use strict';
  var options = options || {};

  var Chart = function(data, options) {
    // set data
    var option;
    for (option in this.defaults) {
      if (!options[options]) options[option] = this.defaults[option];
    }
    this.o = options;

    this.data = d3.layout.stack()(data);
    this.n = data.length;
    this.m = data[0].length;
    this.margin = this.o.margin;
    this.width = (this.o.width - this.margin.left - this.margin.right);
    this.height = (this.o.height - this.margin.top - this.margin.bottom);
    

    this.x = d3.scale.ordinal()
      .domain(d3.range(this.m))
      .rangeRoundBands([0, this.width], .08);

    this.y = d3.scale.linear()
      .domain([0, this.yMax])
      .range([this.height, 0]);
    
    this.yMax = {
      stacked: d3.max(this.data, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); }),
      grouped: d3.max(this.data, function(layer) { return d3.max(layer, function(d) { return d.y; }); })
    }

    this.xAxis = d3.svg.axis()
      .scale(this.x)
      .tickValues(this.o.xLabels)
      .tickSize(1)
      .tickPadding(10)
      .orient('bottom');
  }

  Chart.prototype = {
    o: {},
    n: null,
    m: null,
    data: null,
    defaults: {
      type: 'stacked',
      width: 1000,
      height: 500,
      margin: { top: 40, right: 10, bottom: 20, left: 10 },
      colorRange: { bottom: '#c74b43', top: '#ff5146' },
      xLabels: null
    },

    render: function(el) {
      var self = this;
      this.el = el;
      d3.select(this.el)
        .datum(this.data)
        .call(function(selection) {
          self.createChart(selection);
        });
    },

    createChart: function(selection) {
      var self = this;
      selection.each(function(data) {
        self.chart(data);
      });
    },

    chart: function(data) {
      var self = this
        , layers = this.data;

      var color = d3.scale.linear()
          .domain([0, this.n - 1])
          .range([this.o.colorRange.bottom, this.o.colorRange.top]);

      this.yAxis = d3.svg.axis()
          .scale(this.y)
          .tickSize(1)
          .tickPadding(0)
          .orient('left');

      this.svg = d3.select(this.el).append('svg')
          .attr('class', 'd3-chart d3-chart-bar')
          .attr('width', this.width + this.margin.left + this.margin.right)
          .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
      
      var layer = this.svg.selectAll('.d3-chart-layer')
          .data(this.data)
        .enter().append('g')
          .attr('class', 'd3-chart-layer')
          .style('fill', function(d, i) { return color(i); });

      this.rect = layer.selectAll('rect')
          .data(function(d) { return d; })
        .enter().append('rect') 
          .attr('data-value', function(d) { return d.y; });

      this.svg.append('g')
          .attr('class', 'd3-chart-x d3-chart-axis')
          .attr('transform', 'translate(0,' + this.height + ')')
          .call(function() { return self.xAxis; });

      this.setGrouped();
      return this;
    },

    setStacked: function() {
      var self = this;
      this.y.domain([0, this.yMax.stacked]);
      this.renderYAxis();

      this.rect
        .attr('x', function(d) { return self.x(d.x); })
        .attr('y', function(d) { return self.y(d.y0 + d.y); })
        .attr('width', self.x.rangeBand())
        .attr('height', function(d) { return self.y(d.y0) - self.y(d.y0 + d.y); });
    },

    setGrouped: function() {
      var self = this;
      this.y.domain([0, this.yMax.grouped]);
      
      this.renderYAxis();
      this.rect
          .attr('x', function(d, i, j) { return (self.x(d.x) + self.x.rangeBand() / self.n * j) + 10; })
          .attr('width', self.x.rangeBand() / self.n)
          .attr('y', function(d) { return self.y(d.y); })
          .attr('height', function(d) { return self.height - self.y(d.y); });
    },

    renderYAxis: function() {
      this.svg.selectAll('.d3-chart-y').remove();
      this.svg.append('g')
        .attr('class', 'd3-chart-y d3-chart-axis')
        .attr('transform', 'translate(' + this.o.margin.left + ', 0)')
        .call(this.yAxis);
    },
  }
  
  return new Chart(data, options);
}