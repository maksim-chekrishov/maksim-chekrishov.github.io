var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    notify = require('gulp-notify'),
    helpers = require('../helpers'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps');


gulp.task('build-example', function() {
    var sourceFile = './app/example/app.js',
        destFolder = './app/example/',
        destFile = 'app-bundle.js';

    return browserify(sourceFile, {debug: true})
        .bundle()
        .pipe(source(destFile))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .on('error', helpers.handleBrowserifyError)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(destFolder));
});