var data = require("gulp-data");

module.exports = function(gulp, plugins) {
    return function() {
        var photos = require("./../data/gallerydata.json");

        var NewsData = {};


            // photos.gallery.photo.forEach(row => {
            //     if (row.photo_group) {
            //         if (!NewsData[row.photo_group]) NewsData[row.photo_group] = [];
            //         NewsData[row.photo_group].push(row);
            //         return;
            //     } else if (!row.photo_group && row.photo_url) {
            //         if (!NewsData[row.photo_url]) NewsData[row.photo_url] = row;
            //     }
            // })


        return gulp.src('app/pages/*.+(html)')
        .pipe(data(function() {

                return {
                    data: photos.gallery
                }
            }))

            .pipe(plugins.nunjucksRender({
                path: ['app/templates']
            }))
            .pipe(plugins.removeCode({
                tmp: true
            }))
            .pipe(gulp.dest('.tmp'))
            .pipe(plugins.browserSync.reload({
                stream: true
            }))
    };
};
