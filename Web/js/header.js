// @ts-ignore
$(document).ready(function(){
	
    var showHeaderAt = 150;

    // @ts-ignore
    var win = $(window),
            // @ts-ignore
            body = $('body');

    // Show the fixed header only on larger screen devices

    if(win.width() > 400){

        // When we scroll more than 150px down, we set the
        // "fixed" class on the body element.

        // @ts-ignore
        win.on('scroll', function(e){

            if(win.scrollTop() > showHeaderAt) {
                body.addClass('fixed');
            }
            else {
                body.removeClass('fixed');
            }
        });

    }

});