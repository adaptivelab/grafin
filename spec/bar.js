describe('Graphin', function() {
  
  describe('D3.Chart.Bar (Stacked and grouped bar chart)', function() {
    var data = formatData(somaData.data),
        sandbox = document.createElement('div'),
        sandBoxAdded = false;

    beforeEach(function() {
      // This is so the DOM has loaded
      if (!sandBoxAdded) {
        sandbox.setAttribute('class', 'sandbox');
        sandbox.style.display = 'none';
        document.getElementsByTagName('body')[0].appendChild(sandbox);
      }
      sandbox.innerHTML = ''; // empty the box out
    });

    describe('Unit tests', function() {
      var chart;
      beforeEach(function() {
        chart = d3.chart.bar();
      });

      // A lot of the set functions are jusr checking that they set what they're meant to
      // We could check that the variables are being set correctly
      // But i think this is more for D3

      it ('#setData', function() {
        chart.setData(data);
        expect(chart.data).not.toBeNull();
      });

      it ('#setRanges', function() {
        // We use this as Jasmine doesn't run the function in the correct scope
        var testFunc;
        testFunc = chart.setRanges.bind(chart);

        // Expect ranges not to work if there is no data
        expect(testFunc).toThrow();

        // Set the data
        chart.setData(data);
        expect(testFunc).not.toThrow();

        // Check the parameters are set
        expect(chart.x).not.toBeNull();
        expect(chart.y).not.toBeNull();
      });

      it ('#setMaxes', function() {
        // This is very similar to the #setRanges
        var testFunc;
        testFunc = chart.setMaxes.bind(chart);

        expect(testFunc).toThrow();
        chart.setData(data);
        expect(testFunc).not.toThrow();

        expect(chart.yMax).not.toBeNull();
      });
      
      it ('#setAxes', function() {
        // This is very similar to the #setRanges
        var testFunc;
        testFunc = chart.setAxes.bind(chart);
        
        expect(testFunc).toThrow();
        chart.setData(data);
        expect(testFunc).not.toThrow();

        expect(chart.xAxis).not.toBeNull();
        expect(chart.yAxis).not.toBeNull();
      });

      it ('#setColors', function() {
        // This is very similar to the #setRanges
        var testFunc;
        testFunc = chart.setColors.bind(chart);
        
        expect(testFunc).toThrow();
        chart.setData(data);
        expect(testFunc).not.toThrow();

        expect(chart.color).not.toBeNull();
      });

      it ('#setTo', function() {
        var defaultType = 'stacked',
            changedType = 'grouped';
        
        chart.setData(data).render(sandbox);

        expect(chart.opts.type).toEqual(defaultType);
        chart.setTo(changedType);
        expect(chart.opts.type).toEqual(changedType);
      });
    });

    describe ('Integration tests', function() {
      it ('Should render a new Chart.Bar object', function() {
        var chart = d3.chart.bar(data);
        expect(typeof chart).toBe('object');
      });

      it ('Should render a graph in the given element', function() {
        var chart = d3.chart.bar(data).render(sandbox),
            chartEl = sandbox.getElementsByTagName('svg')[0];

        // Check there's an element there
        expect(chartEl).not.toBeUndefined();

        // And make sure it's the right one
        expect(chartEl.getAttribute('class')).toBe([chart.primaryClassName, chart.className].join(' '));
      })

      it ('Check SoMA data is converted to D3 stack data', function() {
        var stack = d3.layout.stack();

        // If the data is wrong, D3 will throw an error
        // We don't want this as we are not testing D3, we are testing grafin
        // This is why we do it like this
        try {
          stack(data);
        } catch(e) {
          throw new Error('Data not compatible with d3.layout.stack()');
        }
      });

      it ('Should render a graph with the correct amount of data bars', function() {
        // test public interface and rendering
        var datumCount = data.length * data[0].length,
            chart = d3.chart.bar(data).render(sandbox);

        expect(chart.barCount()).toBe(datumCount);
      });
    });
	});
})