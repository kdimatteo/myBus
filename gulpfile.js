var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var rjs = require('gulp-requirejs');
var useref = require('gulp-useref');


gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['dist'], cb);
});

gulp.task('requirejsBuild', ['clean'], function() {
    rjs({
        shim: {
            backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
	        },
	        underscore: {
	            exports: '_'
	        },
	        mustache: {
	            exports: "Mustache"
	        }
        },
       	name : 'main',
		optimize: 'none',
		baseUrl: "js",
		mainConfigFile: "js/config.js",
		out: "app.min.js",
		preserveLicenseComments: false,
		wrap:true,
		include: 'vendor/require.js'
	})
	.pipe(stripDebug())
	.pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('useref', ['clean'], function(){
	return gulp.src('index.html')
		.pipe(useref())
        .pipe(gulp.dest('dist'))
});

gulp.task('css', ['clean'], function(){
	return gulp.src('css/*')
		.pipe(gulp.dest('dist/css'))
});

gulp.task('images', ['clean'], function(){
	return gulp.src('i/*')
		.pipe(gulp.dest('dist/i'))
});


gulp.task('sftp', function () {
    return gulp.src('dist/*')
        .pipe(sftp({
            host: 'hauthaus.net',            
            auth: 'key1',
			remotePath: '/home/haut/hauthaus.net/bus',

        }));
});


gulp.task('default', ['requirejsBuild', 'css', 'images', 'useref']);
gulp.task('deploy', ['default', 'sftp']);
