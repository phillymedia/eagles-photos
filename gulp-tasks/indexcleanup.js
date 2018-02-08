module.exports = function(gulp, plugins) {
    return function(done) {
        setTimeout(function() {
            return gulp.src('finals/**/*.html')
                .pipe(plugins.removeCode({
                    production: true
                }))
                .pipe(plugins.gulpIf('*.html', plugins.htmlmin({
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true,
                    preserveLineBreaks: true,
                    removeComments: true
                })))
                .pipe(gulp.dest('finals'));
        }, 1000);
        done(console.log("done"))

        // plugins.del.sync('dist/main.min.js');
        // plugins.del.sync('dist/styles.min.css');
    };
};
