var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
// var minifyhtml = require('gulp-minify-html');
var minifyhtml = require('gulp-htmlmin');
var minifycss = require('gulp-minify-css');
var uglifycss = require('gulp-uglifycss');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var tsProject = ts.createProject({
		'module': 'commonjs',
		'target': 'es6',
		'noImplicitAny': false,
		'sourceMap': true,
		'experimentalDecorators': true,
		'emitDecoratorMetadata': true,
		'typeRoots' : ['../node_modules/@types'],
		'types' : ['core-js']
});

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
						.pipe(gulp.dest("./server"))
						.pipe(livereload());
});

gulp.task('compile_client', function(){
		return gulp.src('angular/**/*.ts')
						.pipe(sourcemaps.init())
						.pipe(tsProject())
						.pipe(sourcemaps.write())
						.pipe(gulp.dest("./client"))
						.pipe(livereload());
});

gulp.task('html', function(){
		return gulp.src('angular/**/*.html')
						// .pipe(minifyhtml())
						.pipe(gulp.dest('client'))
						.pipe(livereload());
});

gulp.task('css', function(){
		return gulp.src('angular/**/*.css')
						.pipe(minifycss({keepBreakes: true}))
						.pipe(gulp.dest('client'))
						.pipe(livereload());
});

gulp.task('system', function(){
		return gulp.src("./angular/systemjs.config.js")
						.pipe(gulp.dest('./client'))
						.pipe(livereload());
});

gulp.task('clean',['clean_server', 'clean_client']);
gulp.task('asset', ['html', 'css', 'system']);

gulp.task('nodemon', function(){
		return nodemon({
				script: 'server/server.js',
				watch : 'server/server.js'
		}).on('restart', function(){
				gulp.src('server/server.js')
						.pipe(livereload())
						.pipe(notify('Reloading page, please wait...'));
		})
});


gulp.task('watch', function(){
		livereload.listen();
		gulp.watch('angular/**/*.ts', ['compile_client']);
		gulp.watch('src/**/*.ts', ['compile_server']);
		gulp.watch('angular/**/*.html',['html']);
		gulp.watch('angular/**/*.css', ['css']);
		gulp.watch('angular/systemjs.config.js', ['system']);
});



gulp.task('default', runSequence('clean','compile_server','compile_client','asset','nodemon','watch'));
