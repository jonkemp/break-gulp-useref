var gulp = require('gulp'),
    mockGulpDest = require('mock-gulp-dest')(gulp);

// Load all slush generator tasks:
require('./gulpfile');

describe('gulpfile test', function() {
  it('should generate project files', function(done) {
    // Run the default task in the current slush generator:
    gulp.start('js-concat')
      .on('stop', function() {
        // Multiple files as array:
        mockGulpDest.assertDestContains([
          'index.html',
          'js/concat/combined-globals.js',
        ]);

        done();
      });
  });
});
