d3.chart.stackedBar = function(options) {
  'use strict';

  var option
    , options = options || {} 
    , defaults = {
        width: 1000,
        height: 500,
        margin: { top: 40, right: 10, bottom: 20, left: 10 },
        colorRange: { bottom: '#aad', top: '#556' }
      };

  for (option in defaults) {
    if (!options[options]) options[option] = defaults[option];
  }
  
  function renderChart(data) {
    var n = data.length,
        m = data[0].length,
        stack = d3.layout.stack(),
        layers = stack(data),
        yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
        yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

      var margin = options.margin,
          width = options.width - margin.left - margin.right,
          height = options.height - margin.top - margin.bottom;

      var x = d3.scale.ordinal()
          .domain(d3.range(m))
          .rangeRoundBands([0, width], .08);

      var y = d3.scale.linear()
          .domain([0, yStackMax])
          .range([height, 0]);

      var color = d3.scale.linear()
          .domain([0, n - 1])
          .range([options.colorRange.bottom, options.colorRange.top]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .tickValues(options.xLabels)
          .tickSize(0)
          .tickPadding(6)
          .orient('bottom');

      var svg = d3.select(this)
          .attr('class', 'd3-chart d3-chart-bar')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      
      var layer = svg.selectAll('.d3-chart-layer')
          .data(layers)
        .enter().append('g')
          .attr('class', 'layer')
          .style('fill', function(d, i) { return color(i); });

      var rect = layer.selectAll('rect')
          .data(function(d) { return d; })
        .enter().append('rect')
          .attr('x', function(d) { return x(d.x); })
          .attr('y', height)
          .attr('width', x.rangeBand())
          .attr('height', 0);

      rect.transition()
          .delay(function(d, i) { return i * 10; })
          .attr('y', function(d) { return y(d.y0 + d.y); })
          .attr('height', function(d) { return y(d.y0) - y(d.y0 + d.y); });

      svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis);

      function transitionGrouped() {
        y.domain([0, yGroupMax]);

        rect.transition()
            .duration(500)
            .delay(function(d, i) { return i * 10; })
            .attr('x', function(d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
            .attr('width', x.rangeBand() / n)
          .transition()
            .attr('y', function(d) { return y(d.y); })
            .attr('height', function(d) { return height - y(d.y); });
      }

      function transitionStacked() {
        y.domain([0, yStackMax]);

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left');

        svg.append('g')
          .attr('class', 'y axis')
          .attr('transform', 'translate(' + margin.left + ',0)')
          .call(yAxis);

        rect.transition()
            .duration(500)
            .delay(function(d, i) { return i * 10; })
            .attr('y', function(d) { return y(d.y0 + d.y); })
            .attr('height', function(d) { return y(d.y0) - y(d.y0 + d.y); })
          .transition()
            .attr('x', function(d) { return x(d.x); })
            .attr('width', x.rangeBand());
      }
    }

  var chart = function(selection) {
    selection.each(renderChart);
  }

  chart.xLabels = function(labels) {
    options.xLabels = labels;
    return chart;
  }

  return chart;
}