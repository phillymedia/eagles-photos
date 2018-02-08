module.exports = function(gulp, plugins) {
    return function(done) {
        var fs = require('fs');
        var index = fs.readdirSync("app/pages");

        index.forEach(function(page) {
            var path = page.replace(".html", "");
            return gulp.src(['.tmp/' + page])
                .pipe(plugins.useref())
                .pipe(plugins.gulpIf('*.css', plugins.cssnano()))
                .pipe(gulp.dest('finals/' + path));
        })
        done(console.log("done"))
    };
};
