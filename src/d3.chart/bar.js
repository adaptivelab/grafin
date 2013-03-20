d3.chart.bar = function(options, data) {
  // this is what I would like it to be
  var chart = d3.chart();
  chart
    .xMax(xMax)
    .yMax(yMax)
    .render({
      stacked: function() {},
      grouped: function() {}
    });

  /* Things that can be abstracted
  - chart SVG element drawing
  - xAxis
  - yAxis
  - xScale
  - yScale

  Things to set
  - xMax
  - yMax
  - Rendering
  */


  'use strict';

  var option
    , options = options || {} 
    , defaults = {
        width: 1000,
        height: 500,
        margin: { top: 40, right: 10, bottom: 20, left: 10 },
        colorRange: { bottom: '#C74B43', top: '#FF5146' }
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
          width = (options.width - margin.left - margin.right),
          height = (options.height - margin.top - margin.bottom);

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
          .tickSize(1)
          .tickPadding(10)
          .orient('bottom');

      var yAxis = d3.svg.axis()
          .scale(y)
          .tickSize(1)
          .tickPadding(0)
          .orient('left');

      var svg = d3.select(this)
          .attr('class', 'd3-chart d3-chart-bar')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      
      var layer = svg.selectAll('.d3-chart-layer')
          .data(layers)
        .enter().append('g')
          .attr('class', 'd3-chart-layer')
          .style('fill', function(d, i) { return color(i); });

      var rect = layer.selectAll('rect')
          .data(function(d) { return d; })
        .enter().append('rect') 
          .attr('data-value', function(d) { return d.y; });

      svg.append('g')
          .attr('class', 'd3-chart-x d3-chart-axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis);

      function setStacked() {
        y.domain([0, yStackMax]);
        
        renderYAxis();
        rect
          .attr('x', function(d) { return x(d.x); })
          .attr('y', function(d) { return y(d.y0 + d.y); })
          .attr('width', x.rangeBand())
          .attr('height', function(d) { return y(d.y0) - y(d.y0 + d.y); });
      }

      function setGrouped() {
        y.domain([0, yGroupMax]);
        
        renderYAxis();
        rect
            .attr('x', function(d, i, j) { return (x(d.x) + x.rangeBand() / n * j) + options.axis.padding; })
            .attr('width', x.rangeBand() / n)
            .attr('y', function(d) { return y(d.y); })
            .attr('height', function(d) { return height - y(d.y); });
      }

      function renderYAxis() {
        svg.selectAll('.d3-chart-y').remove();
        svg.append('g')
          .attr('class', 'd3-chart-y d3-chart-axis')
          .attr('transform', 'translate(' + margin.left + ', 0)')
          .call(yAxis);
      }

      setStacked();
      
      chart.setStacked = setStacked;
      chart.setGrouped = setGrouped;
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