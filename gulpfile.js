'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
    maps = require('gulp-sourcemaps');


gulp.task("concatScripts", function() {
    return gulp.src([
        "Base.js",
        "dom/selector.js",
        "animation/animation.js",
        "controller/events.js",
        "controller/http.js"
    ])
    .pipe(maps.init())
    .pipe(concat("base.js"))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("dist/js"));
});

gulp.task("watch", function() {
	gulp.watch(["./**/*.js"], ["concatScripts"]);
});
