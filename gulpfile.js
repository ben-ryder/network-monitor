const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const del = require('del');

const config = require('./config.json');


// Clean - gulp won't remove files if they are no longer present so this ensures that happens.
gulp.task('clean-dist', function(){
    return del(['dist/**', '!dist'], {force:true});
});


// Styles (Site theme and feature CSS)
gulp.task('build-scss', function() {
    return gulp.src('scss/main.scss')
        .pipe(sass()).on("error", sass.logError)
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('build-css', function() {
    return gulp.src('css/**/*.css')
        .pipe(gulp.dest('dist/css'))
});


// Javascript (Base and feature JS)
gulp.task('build-base-js', function() {
    return gulp.src('js/base/**/*.js')
        .pipe(concat('javascript.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('build-feature-js', function() {
    return gulp.src('js/feature/**/*.js')
        .pipe(gulp.dest('dist/js'))
});

// Images
gulp.task('build-images', function(){
    return gulp.src('img/*')
        .pipe(gulp.dest('dist/img'))
});


// General Tasks
gulp.task('build', gulp.series(
    'clean-dist',
    'build-scss',
    'build-css',
    'build-base-js',
    'build-feature-js',
    'build-images'
    )
);

gulp.task('watch', function(){
    gulp.watch('scss/**/*.scss', gulp.series('build-scss'));
    gulp.watch('css/**/*.css', gulp.series('build-css'));
    gulp.watch('js/base/**/*.js', gulp.series('build-base-js'));
    gulp.watch('js/feature/**/*.js', gulp.series('build-feature-js'));
    gulp.watch('img/', gulp.series('build-images'));
});


// nodemon & browser-sync [adapted from: https://gist.github.com/dennib/6f1f9aa9b59596710f62c1ef22a655f4]
gulp.task('nodemon', function (callback) {
    let started = false;
    return nodemon({
        script: 'app.js',
        ext: 'js html json',
    }).on('start', () => {
        if (!started) {
            callback();
            started = true;
        }
    });
});

gulp.task('browser-sync', gulp.series('nodemon', () => {
        browserSync.init(null, {
            proxy: `http://localhost:${config.port}`,
            files: ['./**/*.*', '!node_modules', "!dist"],
            port: config.browserSyncPort
        });
    })
);

// Main Development Task
gulp.task('develop', gulp.parallel('browser-sync', 'watch'));
