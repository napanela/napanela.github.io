const gulp = require('gulp');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');

gulp.task('build:css', () => {
  return gulp.src('./src/style/*.css')
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./css/'));
});

gulp.task('build:pug', () => {
  return gulp.src('./src/view/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./'));
});

gulp.task('build:js', () => {
  return gulp.src('./src/script/*.js')
    .pipe(gulp.dest('./js'));
});

gulp.task('build', ['build:css', 'build:js', 'build:pug']);

gulp.task('watch', ['build'], () => {
  gulp.watch('./src/style/*.css', ['build:css']);
  gulp.watch('./src/view/*.pug', ['build:pug']);
  gulp.watch('./src/script/*.js', ['build:js']);
});
