// var nunjucks = require("nunjucks");
var _ = require('lodash');
var Modernizr = require('./modernizr');


var data = require("./../../data/gallerydata.json")


// link to gallery: https://www.philly.com/templates/photoGalleryXML?galleryid=473349183
// link to xml --> json website: http://convertjson.com/xml-to-json.htm

var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

$(document).ready(function() {
    checksize();

    var getdate = $('.dateline').text().split("/");
    var getmonth = Number(getdate[0])-1;

    $(".dateline").html(monthNames[getmonth]+" "+getdate[1]+", "+getdate[2]);

    if ($(window).width() < 500) {
        $(".lazyload").each(function() {
            var getsrc = $(this).attr("src");
            $(this).attr("src", getsrc.replace("1200*800", "600*450"))
        })
    }


    var lastScrollTop = 0;
    $(window).scroll(_.throttle(slowscroll, 500));

    function slowscroll() {
        checksize();

        $(".lazyload").each(function(){
            var $this = $(this);
            var datasrc = $this.attr('data-src');
            var phototop = $this.offset().top;
            var windowtop = $(window).scrollTop();

            if (phototop <= windowtop + ($(window).height() * 1.8) && $this.attr("src") == "#") {
                $this.attr("src",datasrc);
            }


        })

        var st = $(this).scrollTop();
        if ($(window).scrollTop() > $(window).height()) {
            if (st > lastScrollTop) {
                if ($(".header").attr("class").includes("scrollIn")) {
                    $(".header").addClass('scrollOut');
                    setTimeout(function() {
                        $(".header").removeClass("scrollIn").removeClass('scrollOut');
                    }, 500);
                }
            } else {
                if (lastScrollTop - st > 120) {
                    $(".header").addClass("scrollIn")
                }
            }
        }
        lastScrollTop = st;
    }

    var photorows = $(".photoRow");

    $(".photoRow").each(function() {
    var index = photorows.index($(this))
    if (index == 2) {
        $(this).after('<div class="adUnitWrapper containerMedia" alignment="true"><div class="adUnit" alignment="true"><div id="div-gpt-ad-mrec-21" alignment="true"><script alignment="true" type="text/javascript">cX.callQueue.push(["invoke", function() {googletag.cmd.push(function() {googletag.display("div-gpt-ad-mrec-21");});}]);</script></div></div></div>')
    }
    if (index == 5) {
        $(this).after('<div class="adUnitWrapper containerMedia" alignment="true"><div class="adUnit" alignment="true"><div id="div-gpt-ad-mrec-22" alignment="true"><script alignment="true" type="text/javascript">cX.callQueue.push(["invoke", function() {googletag.cmd.push(function() {googletag.display("div-gpt-ad-mrec-22");});}]);</script></div></div></div>')
    }
    if (index == 8) {
        $(this).after('<div class="adUnitWrapper containerMedia" alignment="true"><div class="adUnit" alignment="true"><div id="div-gpt-ad-mrec-23" alignment="true"><script alignment="true" type="text/javascript">cX.callQueue.push(["invoke", function() {googletag.cmd.push(function() {googletag.display("div-gpt-ad-mrec-23");});}]);</script></div></div></div>')
    }
})
});

var checksize = function() {
    $(".photoRow").each(function() {
        var $this = $(this);
        $this.find(".flexContent").removeClass("fullSize").removeClass("floatLeft").removeClass("vertical");
        $this.find("img").css("max-height", "").css("width", "");
        var getHeight = $this.find("img").height();
        var getWidth = $this.find("img").width();

        var windowHeight = $(window).height();
        var windowWidth = $(window).width();

        if (getHeight < windowHeight - 10 && getWidth > getHeight) {
            $this.find(".flexContent").addClass("fullSize")
            return;
        }
        if (getHeight > getWidth && getHeight > windowHeight - 60) {
            $this.find("img").css("max-height", windowHeight - 20).css("width", "auto");
            $this.find(".flexContent").addClass("floatLeft vertical")
            return;
        } else {
            $this.find("img").css("max-height", windowHeight - 60).css("width", "auto");
            $this.find(".flexContent").addClass("floatLeft")
        }
    })
}


var advance = function(gallery, direction) {
    gallery.find(".noNext").removeClass("noNext");
    if (gallery.find(".next").attr("class").includes("galleryPreview")) {
        gallery.find(".galleryPreview").css("display", "none");
        gallery.find(".galleryPreview .seemoretext").remove();
        gallery.find(".galleryPreview").removeClass("galleryPreview");
        // gallery.find(".galleryPreview").remove();
        // gallery.find(".imagewrapper").append('<div class="seemore next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>')
    }

    var $caption = gallery.find(".caption");
    var $credit = gallery.find(".credit");
    var current = gallery.find(".galleryphoto.active");
    var images = gallery.find(".galleryphoto", gallery);
    var index = images.index(current);

    var getID = gallery.attr("id")

    if (direction == "right") {
        var next = $(images[index + 1]);
        var afterNext = $(images[index + 2]);
    } else {
        var next = $(images[index - 1]);
        var afterNext = $(images[index - 2]);
    }

    if (images.index(afterNext) < 0) {
        var getDirection;
        if (direction == "right") {
            getDirection = "next";
        } else {
            getDirection = "prev";
        }
        var getClass = "." + getDirection;
        gallery.find(getClass).addClass("noNext");

    } else {
        gallery.find(".noNext").removeClass("noNext");
    }

    if (images.index(next) < 0) return;

    gallery.find(".imagewrapper").css("opacity", "0");

    var nextimg;
    nextimg = next.attr("photo-src")

    next.addClass("active");
    current.removeClass("active");

    setTimeout(function() {
        gallery.find(".imagewrapper img").attr("src", "http://media.philly.com/storage/year-in-pictures-2017-philadelphia/" + nextimg);
        gallery.find(".next").css("display", "");
    }, 300)

    setTimeout(function() {
        gallery.find(".imagewrapper").css("opacity", "");
    }, 400);

    $caption.html(next.attr("photo-caption"))
    $credit.html(next.attr("photo-credit"))

    var $twittertext = gallery.find(".twittershare").html();
    var $facebooktext = gallery.find(".facebookshare").html();

    var currentUrl = current.attr("photo-src").replace(".jpg", "");
    var nextUrl = next.attr("photo-src").replace(".jpg", "")


    gallery.find(".twittershare").html($twittertext.replace(currentUrl, nextUrl));
    gallery.find(".facebookshare").html($facebooktext.replace(currentUrl, nextUrl));


    for (var i = 0; i < NewsData[getID].length; i++) {
        if (NewsData[getID][i].photo_caption == next.attr("photo-caption") && NewsData[getID][i].related_link) {
            $caption.append(`<br><a href="${NewsData[getID][i].related_link}">Read more <i class="fa fa-angle-right" aria-hidden="true"></i></a>`)
        }

    }

}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
$(window).load(function() {

    $(".photoGallery").each(function() {
        var $this = $(this);
        var photo = $(this).find(".imagewrapper img").attr("src");
        var caption = $(this).find(".caption");
        var credit = $(this).find(".credit");

        var getID = $this.attr("id");

        // for (var i = 0; i < NewsData[getID].length; i++) {
        //     if(NewsData[getID][i].photo_caption == next.attr("photo-caption") && NewsData[getID][i].related_link) {
        //         $caption.append(`<br><a href="${NewsData[getID][i].related_link}">Read more <i class="fa fa-angle-right" aria-hidden="true"></i></a>`)
        //     }
        // }

        $this.find(".seemore").click(function() {
            var direction = $(this).attr("class");
            advance($this, direction.includes("next") ? "right" : "left");
        })
    })


    var allRows = $(".photoRow");

})

$(window).resize(function() {
    checksize();
})
