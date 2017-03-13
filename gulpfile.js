var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var minifyhtml = require('gulp-minify-html');
var uglifycss = require('gulp-uglifycss');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = ts.createProject('tsconfig.json');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var livereload = require('gulp-livereload');

gulp.task('clean_server', function(){
    return del(['server/*']);
});

gulp.task('clean_client', function(){
    return del(['client/*']);
});

gulp.task('compile_server', function(){
    return gulp.src('src/**/*.ts')
            .pipe(sourcemaps.init())
            .pipe(tsProject())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("./server"));
});

gulp.task('compile_client', function(){
    return gulp.src('angular/**/*.ts')
            .pipe(sourcemaps.init())
            .pipe(tsProject())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("./client"))
});

gulp.task('html', function(){
    return gulp.src('angular/**/*.html')
            .pipe(gulp.dest('client'))
});

gulp.task('css', function(){
    return gulp.src('angular/**/*.css')
            .pipe(gulp.dest('client'))
});

gulp.task('system', function(){
    return gulp.src("./angular/systemjs.config.js")
            .pipe(gulp.dest('./client'));
});

gulp.task('clean',['clean_server', 'clean_client']);
gulp.task('asset', ['html', 'css', 'system']);

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('angular/**/*.ts', ['compile_client']);
    gulp.watch('src/**/*.ts', ['compile_server']);
    gulp.watch('angular/**/*.html',['html']);
    gulp.watch('angular/**/*.css', ['css']);
    gulp.watch('angular/systemjs.config.js', ['system']);
    gulp.watch('client/**').on('change', livereload.changed);
    gulp.watch('server/**').on('change', livereload.changed);
});

gulp.task('default', runSequence('clean','compile_server','compile_client','asset'));
