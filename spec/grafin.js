'use strict';

describe('Grafin', function() {
  it ('Should return a stacked bargraph for D3 useage', function() {
    var chart = d3.chart.stackedBar;
    expect((typeof chart).toLowerCase()).toBe('function');
  });

  it ('Check SoMA data is converted to D3 stack data', function() {
    var stack = d3.layout.stack()
      , data = formatData(somaData.data); // from helpers/utils

    // test data is passed to the D3 stack layout okay
    try {
      stack(data);
    } catch(e) {
      throw new Error('Data not compatible with d3.layout.stack()');
    }
  });

  it ('should render a graph correctly', function() {
    var el = d3.selectAll('.specSummary')[0]
      , dateFormat = d3.time.format('%b %d')
      , labels = somaData.labels.map(function(d, i) { return dateFormat(new Date(d)) });
    
    el = el[this.id-1]; // Graphs are currently draw pre-spec, should be post

    var selection = d3.select(el).append('svg')
      , chart = d3.chart.stackedBar()
                  .xLabels(labels);

    selection
      .datum(formatData(somaData.data))
      .call(chart);
  });
});

