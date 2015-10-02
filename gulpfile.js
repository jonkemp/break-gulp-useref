/*global -$ */
'use strict';

//Require plugins from package.json
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var lazypipe = require('lazypipe');

var jspipeline = lazypipe()
  .pipe(gulp.dest,'');

var htmlpipeline = lazypipe()
  .pipe(gulp.dest,'concatenated-html' , { base: "./" });



/*
  This task concatenates all the files referenced in global_js, then consolidates the reference itself into a global_js_concat
*/

gulp.task('js-concat', function(){
  var assets = $.useref.assets();
  return gulp.src('index.html' , { base: "./" })
    .pipe($.plumber({
        handleError: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.js', jspipeline() ))
    .pipe($.if('*.html', htmlpipeline() ));
});