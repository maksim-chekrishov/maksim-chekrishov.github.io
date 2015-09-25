var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    helpers = require('../helpers');

gulp.task('build-sneaker', function() {
    var sourceFile = './app/src/sneaker-core.js',
        destFolder = './app/dest',
        destFile = 'sneaker.js';

    return browserify(sourceFile)
        .bundle()
        .on('error', helpers.handleBrowserifyError)
        .pipe(source(destFile))
        //.pipe(uglify())
        .pipe(gulp.dest(destFolder));
});