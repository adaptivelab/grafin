d3.chart.bar = function(data, options) {
  'use strict';
  var options = options || {};

  var Chart = function(data, options) {
    var option;

    // set data
    for (option in this.defaults) {
      if (!options[options]) options[option] = this.defaults[option];
    }
    this.o = options;

    this.data = d3.layout.stack()(data);
    this.n = data.length;
    this.m = data[0].length;
    this.width = (this.o.width - this.o.margin.left - this.o.margin.right)
    this.height = (this.o.height - this.o.margin.top - this.o.margin.bottom);
    this.x = this.x();
    this.y = this.y();
    this.yMax = this.yMax();
    this.xAxis = this.xAxis();
  }

  Chart.prototype = {
    o: {},
    n: null,
    m: null,
    data: null,
    x: function() {
      return d3.scale.ordinal()
        .domain(d3.range(this.m))
        .rangeRoundBands([0, this.width], .08);
    },
    y: function() {
      return d3.scale.linear()
          .domain([0, this.yMax])
          .range([this.height, 0]);
    },
    yMax: function() {
      return d3.max(this.data, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });
    },
    xAxis: function() {
      return d3.svg.axis()
          .scale(this.x)
          .tickValues(this.o.xLabels)
          .tickSize(1)
          .tickPadding(10)
          .orient('bottom');
    },
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
        , layers = this.data
        , yGroupMax = d3.max(this.data, function(layer) { return d3.max(layer, function(d) { return d.y; }); });

      var color = d3.scale.linear()
          .domain([0, this.n - 1])
          .range([this.o.colorRange.bottom, this.o.colorRange.top]);

      var yAxis = d3.svg.axis()
          .scale(this.y)
          .tickSize(1)
          .tickPadding(0)
          .orient('left');

      var svg = d3.select(this.el).append('svg')
          .attr('class', 'd3-chart d3-chart-bar')
          .attr('width', this.width + this.o.margin.left + this.o.margin.right)
          .attr('height', this.height + this.o.margin.top + this.o.margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + this.o.margin.left + ',' + this.o.margin.top + ')');
      
      var layer = svg.selectAll('.d3-chart-layer')
          .data(this.data)
        .enter().append('g')
          .attr('class', 'd3-chart-layer')
          .style('fill', function(d, i) { return color(i); });

      var rect = layer.selectAll('rect')
          .data(function(d) { return d; })
        .enter().append('rect') 
          .attr('data-value', function(d) { return d.y; });

      svg.append('g')
          .attr('class', 'd3-chart-x d3-chart-axis')
          .attr('transform', 'translate(0,' + this.height + ')')
          .call(function() { return self.xAxis; });

      function setStacked() {
        self.y.domain([0, self.yMax]);
        renderYAxis();

        rect
          .attr('x', function(d) { return self.x(d.x); })
          .attr('y', function(d) { return self.y(d.y0 + d.y); })
          .attr('width', self.x.rangeBand())
          .attr('height', function(d) { return self.y(d.y0) - self.y(d.y0 + d.y); });
      }

      // function setGrouped() {
      //   y.domain([0, yGroupMax]);
        
      //   renderYAxis();
      //   rect
      //       .attr('x', function(d, i, j) { return (x(d.x) + x.rangeBand() / n * j) + options.axis.padding; })
      //       .attr('width', x.rangeBand() / n)
      //       .attr('y', function(d) { return y(d.y); })
      //       .attr('height', function(d) { return height - y(d.y); });
      // }

      function renderYAxis() {
        svg.selectAll('.d3-chart-y').remove();
        svg.append('g')
          .attr('class', 'd3-chart-y d3-chart-axis')
          .attr('transform', 'translate(' + self.o.margin.left + ', 0)')
          .call(yAxis);
      }

      setStacked();
      return this;
    }
  }
  
  return new Chart(data, options);
}