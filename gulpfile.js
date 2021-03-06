'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require("browserify");
var esdoc = require("gulp-esdoc");

gulp.task('default', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './lib/index.js',
    debug: true,
  }).transform("babelify", {
    presets: ["es2015"],
    plugins: ["syntax-flow", "transform-flow-strip-types", "transform-es2015-modules-commonjs", "add-module-exports"]
  });

  return b.bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/'));
});

