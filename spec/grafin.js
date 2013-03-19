'use strict';

describe('Grafin', function() {
  it ('Should return a stacked bargraph for D3 useage', function() {
    var chart = d3.chart.stackedBar;
    expect((typeof chart).toLowerCase()).toBe('function');
  });

  it ('Check SoMA data is converted to D3 stack data', function() {
    var stack = d3.layout.stack()
      , data = cleanData(somaData.data); // clean data (from helpers/utils)

    // test data is passed to the D3 stack layout okay
    try {
      stack(data);
    } catch(e) {
      throw new Error('Data not compatible with d3.layout.stack()');
    }
  });

  it ('should render a graph with the correct amount of bars', function() {
    var selection = d3.select('body').append('svg')
      , chart = d3.chart.stackedBar()
      , data = cleanData(somaData.data);

    selection.datum(data).call(chart);
  });
});

