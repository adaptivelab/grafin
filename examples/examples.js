(function() {
  window.onload = function() {
    var chartFrame = d3.select('.chart-frame')[0][0];

    d3.selectAll('.examples a')[0].forEach(function(el, i) {
      el.onclick = function(e) {
        var href = this.getAttribute('href');
        d3.html(href, function(html) {
          chartFrame.innerHTML = '';
          chartFrame.appendChild(html);
        });
        return false;
      }

      // click the first one
      if (i === 0) { el.click(); }
    });
  }
})()