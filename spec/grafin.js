'use strict';

describe('Grafin', function() {
  it ('Should return a stacked bargraph for D3 useage', function() {
    var chart = d3.chart.stackedBar;
    expect((typeof chart).toLowerCase()).toBe('function');
  });

  it ('Check SoMA data is converted to D3 stack data', function() {
    var datum
      , preppedDatum
      , preppedValues = []
      , preppedData = []
      , svg = d3.select('body').append('svg')
      , stack = d3.layout.stack();
    
    // prep data
    for (datum in data.data) {
      preppedDatum = data.data[datum].values;
      preppedValues = preppedDatum.map(function(d, i) { return { x: i, y: d } });
      preppedData.push(preppedValues);
    }

    // test data is passed to the D3 stack layout okay
    data = preppedData;
    try {
      stack(data);
    } catch(e) {
      throw new Error('Data not compatible with d3.layout.stack()');
    }
  });

  it ('should render a graph with the correct amount of bars', function() {
    
  });
});

