var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer');
	browserSync = require('browser-sync').create();

gulp.task('sass', function() {
	return gulp.src('./scss/styles.scss')
	.pipe(sass.sync().on('error', sass.logError))
	.pipe(sass({includePaths: ['./scss']}))
	.pipe(gulp.dest('./css'));
});

gulp.task('autoprefix', ['sass'], function() {
	return gulp.src('./css/styles.css')
	.pipe(autoprefixer())
	.pipe(gulp.dest('./css/'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });
    gulp.watch(["./css/*.css", "./index.html"]).on("change", browserSync.reload);
  });

gulp.task('watch-files', function() {
	gulp.watch('./scss/**/*', ['autoprefix']);
});

gulp.task('default', ['autoprefix', 'watch-files', 'browser-sync']);