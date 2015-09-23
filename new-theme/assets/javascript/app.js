(function() {

	(function($) {
		
		jQuery('.dropdown-toggle').dropdown();

		jQuery('#main-video').mediaelementplayer({
            success: function (mediaElement, domObject) {

            }
        });
		
	}(jQuery));

})();