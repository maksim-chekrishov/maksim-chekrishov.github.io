var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    notify = require('gulp-notify'),
    helpers = require('../helpers');

gulp.task('browserify-example', function() {
    var sourceFile = './app/example/app.js',
        destFolder = './app/example/',
        destFile = 'app-bundle.js';

    return browserify(sourceFile, {debug: true})
        .bundle()
        .on('error', helpers.handleBrowserifyError)
        .pipe(source(destFile))
        .pipe(gulp.dest(destFolder));
});