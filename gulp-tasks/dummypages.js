module.exports = function(gulp, plugins) {
    return function(done) {
        var newsphotos = require("./../data/news.json");
        var sportsphotos = require("./../data/sports.json");
        var entphotos = require("./../data/entertainment.json");
        var peoplephotos = require("./../data/people.json");
        var allphotos = newsphotos.concat(sportsphotos, entphotos, peoplephotos);

        var getURL =  {
            "News": "http://www.philly.com/philly/news/year-in-pictures-2017-philadelphia-news.html",
            "Entertainment": "http://www.philly.com/philly/entertainment/year-in-pictures-2017-philadelphia-entertainment.html",
            "Sports": "http://www.philly.com/philly/sports/year-in-pictures-2017-philadelphia-sports.html",
            "People": "http://www.philly.com/philly/news/year-in-pictures-2017-philadelphia-people.html"
        }
        var getTitle =  {
            "News": "Pictures that made news in Philly in 2017",
            "Entertainment": "Philadelphia's best entertainment photos of 2017",
            "Sports": "Philadelphia's best sports photography of 2017",
            "People": "The people of Philadelphia – in pictures"
        }
        var getText =  {
            "News": "This photojournalism may be depressing, elating, or disturbing. But rest assured, it’s the genuine, authentic news of Philly’s life and times in 2017",
            "Entertainment": "2017 proved Philly knows how to party — in lots of ways and voices",
            "Sports": "The Philly sports year presented nuance and depth, from the Eagles' surprising rise to the shocking death of Roy Halladay",
            "People": "What makes a city beloved are its people. What makes its people interesting are its characters"
        }
        setTimeout(function() {
            var fs = require('fs');
            var index = fs.readdirSync("finals");
            var dir = 'finals/dummies';

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }

            allphotos.forEach(function(photo) {
                fs.writeFile('finals/dummies/' + photo.photo_url.replace('.jpg', "").replace(".JPG", "") + '.html', `<html>
                <head>
                    <title>${getTitle[photo.page]}</title>
                    <meta property="og:site_name" content="Philly.com" />
                    <meta name="publication" content="Philly.com" />
                    <meta name="twitter:site" content="@phillydotcom">
                    <meta name="twitter:title" content="${getTitle[photo.page]}">
                    <meta name="contenttitle" property="og:title" content="${getTitle[photo.page]}" />
                    <meta name="contenttype" content="Article" />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content="${getURL[photo.page]}">
                    <meta name="twitter:url" content="${getURL[photo.page]}">

                    <link rel="image_src" href="http://media.philly.com/storage/year-in-pictures-2017-philadelphia/${photo.photo_url}?philly" />
                    <meta name="photourl" property="og:image" content="http://media.philly.com/storage/year-in-pictures-2017-philadelphia/${photo.photo_url}?philly" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="801" />
                    <meta name="twitter:image" content="http://media.philly.com/storage/year-in-pictures-2017-philadelphia/${photo.photo_url}?philly">
                    <meta name="description" content="${getText[photo.page]}" />
                    <meta name="twitter:description" content="${getText[photo.page]}">
                    <meta name="twitter:card" content="summary_large_image">
                    <meta http-equiv="refresh" content="2;url=${getURL[photo.page]}" />
                    <script type="text/javascript">
                        location.replace("${getURL[photo.page]}");
                    </script>
                    <style>
                        body {
                            background: black;
                        }
                    </style>
                </head>

                <body>See the photos of the year here: <a href="${getURL[photo.page]}">${getTitle[photo.page]}</a>.</body>
                </html>`, (err) => {
                    if (err) throw err;
                });

            })
        }, 3000);

    };
};
