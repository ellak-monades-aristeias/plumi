(function() {

    (function($) {

        jQuery('.dropdown-toggle').dropdown();

        jQuery('#main-video').mediaelementplayer({
            success: function(mediaElement, domObject) {

            }
        });

        jQuery('.show-more-text a').on("click", function(e) {
            e.preventDefault();
            var a = jQuery(this).parent().parent();

            if (a.hasClass("show-the-text")) {
                a.find('.more-text').slideUp(300, function() {
                    a.toggleClass("show-the-text");
                });
            } else {
                a.find('.more-text').slideDown(300, function() {
                    a.toggleClass("show-the-text");
                });
            }
        });

    }(jQuery));

})();
