const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

// Static Server + watching scss/html files
gulp.task('serve', function() {

  browserSync.init({
      server: "./"
  });

  gulp.watch("src/styles/**/*.scss", gulp.series('sass'));
  gulp.watch("./*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("src/styles/styles.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
});

gulp.task('default', gulp.series('serve', 'sass'));