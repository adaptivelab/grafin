describe('Graphin', function() {
  describe('D3.Chart.Bar (Stacked and grouped bar chart)', function() {
    var sandbox = document.createElement('div')
      , sandBoxAdded = false
      , data = formatData(somaData.data); // from helpers/utils

    beforeEach(function() {
      // This is so the DOM has loaded
      if (!sandBoxAdded) {
        sandbox.setAttribute('class', 'sandbox');
        sandbox.style.display = 'none';
        document.getElementsByTagName('body')[0].appendChild(sandbox);
      }
    });

    describe('Unit tests', function() {
      it ('#setData', function() {

      });

      it ('#setRanges', function() {

      });

      it ('#setMaxes', function() {

      });
      
      it ('#setAxes', function() {

      });

      it ('#setColors', function() {

      });

      it ('#setTo', function() {

      });
    });

    describe ('Integration tests', function() {
      it ('Should render a new Chart.Bar object', function() {
        var chart = d3.chart.bar(data).render(sandbox);
        expect((typeof chart).toLowerCase()).toBe('object');
      });

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
        var dateFormat = d3.time.format('%b %d')
          , labels = somaData.labels.map(function(d, i) { return dateFormat(new Date(d)) })
          , datumCount = data.length * data[0].length;

        var chart = d3.chart.bar(data, {
              type: 'grouped',
              xLabels: labels
            }).render(sandbox);

        expect(chart.barCount()).toBe(datumCount);
      });
    });
	});
})