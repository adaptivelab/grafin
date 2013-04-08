describe('Graphin', function() {
  describe('D3.Chart.Bar (Stacked and grouped bar chart)', function() {
    var el
      , selection
      , chart
      , callback
      , data = formatData(somaData.data); // from helpers/utils

    beforeEach(function() {
      el = d3.selectAll('.specSummary')[0];
      el = el[this.id-1];
      // TODO: This doesn't seem to work for the first one.
      // eed to revise this so that it renders post test
    });

    it ('Should render a new Chart.Bar object', function() {
      var chart = d3.chart.bar(data).render(el);
      expect((typeof chart).toLowerCase()).toBe('object');
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

      var chart = d3.chart.bar(data, {
        type: 'grouped',
        xLabels: labels
      }).render(el);

      callback = function(selection, chart) {
        expect(selection.selectAll('rect')[0].length).toBe(data.length * data[0].length);
      }
    });
	});
})