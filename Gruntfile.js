module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    connect: {
      test: {
        options: {
          hostname: '127.0.0.1',
          port: 9001,
          keepalive: true
        }
      }
    },
    jasmine: {
      grafin: {
        src: 'src/**/*.js',
        options: {
          host: 'http://127.0.0.1:9001',
          vendor: [
            'components/d3/d3.js',
            'src/d3.chart/chart.js',
            'src/d3.chart/bar.js'
          ],
          helpers: [
            'spec/helpers/**/*.js',
            'spec/fixtures/**/*.js'
          ],
          specs: 'spec/**/*.js',
          outfile: 'SpecRunner.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['jasmine:grafin:build', 'connect']);
} 