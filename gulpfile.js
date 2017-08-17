const gulp = require('gulp');
const slim = require("gulp-slim");
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const posthtml = require('gulp-posthtml');
const obfuscate = require('posthtml-obfuscate');
const htmlnano = require('gulp-htmlnano');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
})

gulp.task('templates', function() {
  gulp.src('src/slim/*.slim')
    .pipe(slim())
    .pipe(posthtml([obfuscate()]))
    .pipe(htmlnano({
      collapseWhitespace: 'conservative'
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

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

gulp.task('default', ['browserSync', 'templates', 'styles'], function() {
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('src/slim/*.slim', ['templates']);
});
