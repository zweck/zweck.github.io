function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
	connect = require('gulp-connect'),
	exec = require('child_process').exec;

gulp.task('default', ['jekyll', 'js', 'connect', 'move', 'watch']);

gulp.task('jekyll', function (){
	exec('jekyll build', function(err, stdout, stderr) {
	    console.log(stdout);
	});
});

gulp.task('connect', function() {
  connect.server({
    root: '_site',
    livereload: true
  });
});

gulp.task('js', function(){
	browserify(['js/app.js'], {debug: true})
		.transform(babelify)
		.bundle()
    .on('error', handleError)
    .pipe(source('app.js'))
		.pipe(buffer())
		.pipe(gulp.dest('./_site/js'))
		.pipe(connect.reload());
});

gulp.task('move', function(){
	gulp.src('/examples')
	.pipe(gulp.dest('_site/examples'));
});

gulp.task('watch', function () {
  gulp.watch('./js/**/*.js', ['js']);
  gulp.watch(['./**/*.html', '!./_site/**/*.html'], ['jekyll']);
  gulp.watch(['./**/*.scss', '!./_site/**/*.scss'], ['jekyll']);
});
