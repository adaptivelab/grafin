'use strict';

describe('Grafin', function() {
  it ('Should return a stacked bargraph for D3 useage', function() {
    var chart = d3.chart.stackedBar;
    expect((typeof chart).toLowerCase()).toBe('function');
  });

  it ('Should take in SoMA data and return the right data for D3 chart layout', function() {
    var modelStack = d3.layout.stack()
      , layerCount = data.labels.length
      , svg = d3.select('body').append('svg')
      , stack = d3.layout.stack()
          .values(function(d) {
            console.log(d);
            return d;
          });

    // prep model data
    modelData = d3.range(layerCount).map(function() { return modelData });
    
    // TODO: prep data
    


    // svg.selectAll('rect').data();
    // svg.selectAll('rect').data(stack(data));

  });
});

