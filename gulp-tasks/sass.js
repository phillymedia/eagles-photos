module.exports = function (gulp, plugins) {
      return function () {
         return gulp.src(['app/scss/**/*.scss']) // Gets all files ending with .scss in app/scss
           .pipe(plugins.sass())
           .pipe(gulp.dest('.tmp/css'))
           .pipe(plugins.browserSync.reload({
             stream: true
           }))
      };
  };
