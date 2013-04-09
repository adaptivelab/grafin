d3.chart.bar = function(data, options) {
  'use strict';
  var options = options || {};

  var Chart = function(data, options) {
    this.setOptions(options);
    if (data) { this.setData(data); }
  }

  Chart.prototype = {
    opts: {},
    layerCount: 0,
    sectionsPerLayer: null,
    data: null,
    className: 'd3-chart-bar',
    defaults: {
      type: 'stacked',
      colorRange: { bottom: '#212121', top: '#555555' },
      xLabels: null
    },

    init: function() {

    },

    setData: function(data) {
      this.data = d3.layout.stack()(data);
      this.layerCount = data.length;
      this.sectionsPerLayer = data[0].length;

      // These are here as they can only be set once the data is set
      this.setRanges();
      this.setMaxes();
      this.setAxes();
      this.setColors();
    },

    setRanges: function() {
      this.x = d3.scale.ordinal()
        .domain(d3.range(this.sectionsPerLayer))
        .rangeRoundBands([0, this.width], .08);

      this.y = d3.scale.linear()
        .domain([0, this.yMax])
        .range([this.height, 0]);
    },

    setMaxes: function() {
      this.yMax = {
        stacked: d3.max(this.data, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); }),
        grouped: d3.max(this.data, function(layer) { return d3.max(layer, function(d) { return d.y; }); })
      }
    },

    setAxes: function() {
      this.xAxis = d3.svg.axis()
        .scale(this.x)
        .tickValues(this.opts.xLabels)
        .tickSize(1)
        .tickPadding(10)
        .orient('bottom');

      this.yAxis = d3.svg.axis()
        .scale(this.y)
        .tickSize(1)
        .tickPadding(2)
        .orient('left');
    },

    setColors: function() {
      this.color = d3.scale.linear()
        .domain([0, this.layerCount - 1])
        .range([this.opts.colorRange.bottom, this.opts.colorRange.top]);
    },

    render: function(el) {
      var self = this;
      this.el = el;

      // Comment code here (add D3 docs links)
      d3.select(this.el)
        .datum(this.data)
        .call(function(selection) {
          self.createChart(selection);
        });

      return this;
    },

    createChart: function(selection) {
      var self = this;
      selection.each(function(data) {
        self.chart(data);
      });
    },

    chart: function(data) {
      var self = this;

      this.svg = d3.select(this.el).append('svg')
        .attr('class', this.primaryClass + ' ' + this.className)
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

      this.layer = this.svg.selectAll('.d3-chart-layer')
          .data(this.data)
        .enter().append('g')
          .attr('class', 'd3-chart-layer')
          .style('fill', function(d, i) { return self.color(i); });

      this.rect = this.layer.selectAll('rect')
          .data(function(d) { return d; })
        .enter().append('rect') 
          .attr('data-value', function(d) { return d.y; });

      this.svg.append('g')
          .attr('class', 'd3-chart-x d3-chart-axis')
          .attr('transform', 'translate(0,' + this.height + ')')
          .call(this.xAxis);

      this.setTo(this.opts.type);
      return this;
    },

    setTo: function(opt) {
      this.opts.type = opt;
      this.setToOpts[opt].call(this);
    },

    setToOpts: {
      grouped: function() {
        var self = this;
        this.y.domain([0, this.yMax.stacked]);
        this.renderYAxis();

        this.rect
          .attr('x', function(d) { return self.x(d.x); })
          .attr('y', function(d) { return self.y(d.y0 + d.y); })
          .attr('width', self.x.rangeBand())
          .attr('height', function(d) { return self.y(d.y0) - self.y(d.y0 + d.y); });
      },
      
      stacked: function() {
        var self = this;
        this.y.domain([0, this.yMax.grouped]);
        
        this.renderYAxis();
        this.rect
            .attr('x', function(d, i, j) { return (self.x(d.x) + self.x.rangeBand() / self.layerCount * j) + 10; })
            .attr('width', self.x.rangeBand() / self.layerCount)
            .attr('y', function(d) { return self.y(d.y); })
            .attr('height', function(d) { return self.height - self.y(d.y); });
      }
    },

    renderYAxis: function() {
      this.svg.selectAll('.d3-chart-y').remove();
      this.svg.append('g')
        .attr('class', 'd3-chart-y d3-chart-axis')
        .attr('transform', 'translate(' + this.margin.left + ', 0)')
        .call(this.yAxis);
    },

    barCount: function() {
      return this.data.length * this.data[0].length;
    }
  }

  d3.chart.add(Chart);
  return new Chart(data, options);
}