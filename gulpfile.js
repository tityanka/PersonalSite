"use strict";
var gulp = require('gulp');
var server = require('gulp-server-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    wiredep = require('wiredep').stream,
    concatCss = require('gulp-concat-css'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    uncss = require('gulp-uncss'),
    del = require('del'),
    pug = require('gulp-pug');





//Server
gulp.task('server', function() {
    gulp.src('app')
        .pipe(server({
            livereload: true,
            defaultFile: 'index.html',
            open: true
        }));
});

//Bower
gulp.task('bower', function() {
    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app'));
});

//Styles
gulp.task('styles', function() {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(concatCss('main.css'))
        .pipe(uncss({
            html: ['app/**/*.html']
        }))
        .pipe(gulp.dest('app/css'));

});

//HTML
gulp.task('html', function(){
    return gulp.src('app/html/**/*.pug')
    .pipe(pug({
            pretty: true
        }))
    .pipe(gulp.dest('app'));

});


//Images
gulp.task('images', function() {
    return gulp.src('app/img/**/*')
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 7
        }))
        .pipe(gulp.dest('build/img'));
});

//Clean
gulp.task('clean', function(){
    return del.sync('build');
});

//Build
gulp.task('build', ['images', 'clean'], function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulp.dest('./build'));
});


//Watch
gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.sass', ['styles']);
    gulp.watch('bower.json', ['bower']);
    gulp.watch('app/html/**/*.pug', ['html']);
    gulp.watch('app/*.html', server.livereload);




});

//Default
gulp.task('default', ['server', 'watch']);
