'use strict';

describe('Grafin', function() {
  var el
    , selection
    , chart
    , callback
    , data = formatData(somaData.data); // from helpers/utils

  it ('Should return a stacked bargraph for D3 useage', function() {
    var chart = d3.chart.bar;
    expect((typeof chart).toLowerCase()).toBe('function');
  });

  it ('Check SoMA data is converted to D3 stack data', function() {
    var stack = d3.layout.stack();

    // test data is passed to the D3 stack layout okay
    try {
      stack(data);
    } catch(e) {
      throw new Error('Data not compatible with d3.layout.stack()');
    }
  });

  it ('Should render a graph with the correct amount of data bars', function() {
    var dateFormat = d3.time.format('%b %d')
      , labels = somaData.labels.map(function(d, i) { return dateFormat(new Date(d)) });

    chart = d3.chart.bar();
      // .xLabels(labels);

    callback = function(selection, chart) {
      expect(selection.selectAll('rect')[0].length).toBe(data.length * data[0].length);
    }
  });

  // If you set chart, it will be rendered
  // Then it will be know as renderedChart
  it ('Is looking for the last test graph to render'); // Hack
  beforeEach(function() {
    if (chart) {
      var renderedChart;
      
      el = d3.selectAll('.specSummary')[0];
      el = el[this.id-1];

      selection = d3.select(el).append('svg');
      renderedChart = selection
        .datum(data)
        .call(chart);

      if (callback) { callback(selection, chart); }
      chart = null;
      selection = null;
      callback = null;
    }
  });
});

