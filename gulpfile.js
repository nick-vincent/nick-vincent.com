const gulp = require("gulp");

const browserSync = require("browser-sync");
const cleanCSS = require("gulp-clean-css");
const htmlnano = require("gulp-htmlnano");
const obfuscate = require("posthtml-obfuscate");
const posthtml = require("gulp-posthtml");
const sass = require("gulp-dart-sass");
const slim = require("gulp-slim");

const server = browserSync.create();

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: { baseDir: "dist" },
  });
  done();
}

function templates() {
  return gulp
    .src("src/slim/*.slim")
    .pipe(slim())
    .pipe(posthtml([obfuscate()]))
    .pipe(
      htmlnano({
        collapseWhitespace: "conservative",
      })
    )
    .pipe(gulp.dest("./dist/"));
}

function styles() {
  return gulp
    .src("src/scss/styles.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/css/"))
    .pipe(server.stream());
}

function watch() {
  gulp.watch("src/slim/*.slim", gulp.series(templates, reload));
  gulp.watch("src/scss/**/*.scss", styles);
}

gulp.task(
  "default",
  gulp.series(gulp.parallel(templates, styles), serve, watch)
);
