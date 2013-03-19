function cleanData(data) {
  var datum, preppedValues, preppedDatum, preppedData = [];
  for (datum in data) {
    preppedDatum = data[datum].values;
    preppedValues = preppedDatum.map(function(d, i) { return { x: i, y: d } });
    preppedData.push(preppedValues);
  }

  return preppedData;
}