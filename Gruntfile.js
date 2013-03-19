module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    jasmine: {
      grafin: {
        src: 'src/**/*.js',
        options: {
          host: 'http://127.0.0.1:3000',
          vendor: [
            'components/d3/d3.js',
            'src/d3.chart/chart.js',
            'src/d3.chart/stacked-bar.js'
          ],
          helpers: ['spec/helpers/**/*.js', 'spec/fixtures/**/*.js'],
          specs: 'spec/**/*.js',
          outfile: 'test.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.registerTask('test', ['jasmine']);
} 