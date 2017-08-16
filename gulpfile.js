const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

gulp.task('styles', function() {
  gulp.src('app/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 version']
      })
    ]))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('default', function() {
  gulp.watch('app/sass/**/*.scss', ['styles']);
});
