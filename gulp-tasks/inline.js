module.exports = function(gulp, plugins) {
    return function(done) {
        setTimeout(function() {
            var fs = require('fs');
            var index = fs.readdirSync("finals");

            index.forEach(function(page) {

                fs.writeFile('finals/' + page + '/css-js.html', '<link rel="stylesheet" href="min-files/styles.min.css"> <script src="min-files/main.min.js"></script>', (err) => {
                    if (err) throw err;

                    return gulp.src('finals/' + page + '/css-js.html')
                        .pipe(plugins.inline({
                            base: 'finals/' + page + '/'
                        }))
                        .pipe(gulp.dest('finals/' + page + '/'));
                });
            })

        }, 3000);
        done(console.log("done"))
    };
};
