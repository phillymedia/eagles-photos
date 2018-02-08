var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var runSequence = require('run-sequence');

plugins.sass = require('gulp-sass');
plugins.useref = require('gulp-useref');
plugins.uglify = require('gulp-uglify');
plugins.gulpIf = require('gulp-if');
plugins.cssnano = require('gulp-cssnano');
plugins.browserSync = require('browser-sync').create();
plugins.del = require('del');
plugins.sass = require('gulp-sass');
plugins.nunjucksRender = require('gulp-nunjucks-render');
plugins.gutil = require('gulp-util');
plugins.removeCode = require('gulp-remove-code');
plugins.inline = require('gulp-inline');
plugins.htmlmin = require('gulp-htmlmin');



gulp.task('copyjs', function() {
    return gulp.src(['app/js/pages/*.js'])
      .pipe(gulp.dest('.tmp/js/pages'))
      .pipe(plugins.browserSync.reload({
        stream: true
      }))
});

function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins);
}

gulp.task('sass', getTask('sass'));
gulp.task('browserSync', getTask('browserSync'));
gulp.task('clean:dist', getTask('clean'));
gulp.task('nunjucks', getTask('nunjucks'));
gulp.task('nunjucks-build', getTask('nunjucks-build'));
gulp.task('browserify', getTask('browserify'));
gulp.task('browserify-build', getTask('browserify-build'));
gulp.task('useref', getTask('useref'));
gulp.task('indexcleanup',['inline'], getTask('indexcleanup'));
gulp.task('sass-build', getTask('sass-build'));
gulp.task('inline', getTask('inline'));

gulp.task('dummy', getTask('dummypages'));



gulp.task('watch', ['browserSync', 'sass', 'nunjucks'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/*.html', ['nunjucks']);
  gulp.watch('app/js/pages/*.js', ['copyjs']);
  gulp.watch('app/js/*.+(js|html)',['browserify']);
});

gulp.task('default', function(callback) {
  runSequence(['sass','browserify','copyjs','nunjucks', 'browserSync', 'watch'],
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence('clean:dist', 'browserify-build',
    ['sass','nunjucks-build','copyjs'],'useref','inline','indexcleanup',
    callback
  )
})
