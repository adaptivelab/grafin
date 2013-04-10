var dateFormat = dateFormat = d3.time.format('%b %d');
var labels = somaData.labels.map(function(d, i) { return dateFormat(new Date(d)) });
var el = d3.select('.chart')[0][0];
var data = formatData(somaData.data);

var chart = d3.chart.bar(data, {
  type: 'grouped',
  xLabels: labels
}).render(el);

d3.selectAll('[name="switch-bar-chart"]')[0].forEach(function(el, i) {
  el.onclick = function() {
    var chartType = this.value;
    chart.setTo(chartType);
  }
});