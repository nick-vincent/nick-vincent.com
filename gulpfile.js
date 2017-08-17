const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
})

gulp.task('styles', function() {
  gulp.src('src/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 version']
      })
    ]))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('default', ['browserSync', 'styles'], function() {
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('dist/*.html', browserSync.reload);
});
