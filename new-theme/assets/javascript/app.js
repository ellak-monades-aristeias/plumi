(function() {

	(function($) {
		jQuery('.dropdown-toggle').dropdown();

		jQuery('#main-video').mediaelementplayer({
            success: function (mediaElement, domObject) {

            }
        });

        jQuery('.show-more-text a').on("click", function(e){
            e.preventDefault();
            var a = jQuery(this).parent().parent();
            
            if( a.hasClass("show-the-text") ){
                a.find('.more-text').slideUp(300, function(){
                    a.toggleClass("show-the-text");
                });
            }
            else{
                a.find('.more-text').slideDown(300, function(){
                    a.toggleClass("show-the-text");
                });
            }
        });

        jQuery('.results-filter .dropdown-menu').on('click', function(event){
            var events = $._data(document, 'events') || {};
            events = events.click || [];
            for(var i = 0; i < events.length; i++) {
                if(events[i].selector) {

                    //Check if the clicked element matches the event selector
                    if($(event.target).is(events[i].selector)) {
                        events[i].handler.call(event.target, event);
                    }

                    // Check if any of the clicked element parents matches the 
                    // delegated event selector (Emulating propagation)
                    $(event.target).parents(events[i].selector).each(function(){
                        events[i].handler.call(this, event);
                    });
                }
            }
            event.stopPropagation(); //Always stop propagation
        });
        
	}(jQuery));

})();