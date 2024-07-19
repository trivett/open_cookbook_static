'use strict';

var $ = window.jQuery;

$.fn.kalePinterestShare = function( options ) {

	var defaults = {
		pinterestIcon : kale_pinterest.fontawesome_icon
	};

	var options = $.extend( {}, defaults, options );

	var url           = encodeURIComponent(document.URL),
	    pinterestIcon = options.pinterestIcon;

	this.each(function(){

		if ( ( $(this).width() < 350 ) && ( document.documentElement.clientWidth > 769 ) ) {
			return true;
		}

		var src       = $(this).attr('src');
		var permalink = $(this).data('kale-share-url');

		if ( typeof permalink == 'undefined' ) {
			permalink = window.location.href;
		}

		var img = new Image();
		img.src = src;

		if ( $(this).attr("data-kale-share-title") != null ) {
			var description = $(this).data('kale-share-title');
		} else {
			var description = $(this).attr("alt");
		}

		var featured = encodeURIComponent(src);

		var link = 'https://www.pinterest.com/pin/create/button/';
			link += '?url=' + permalink;
			link += '&media=' + featured;
			link += '&description=' + description;

		$(this).after('<a href="' + link + '" class="kale-pin-button" target="_blank" rel="nofollow noopener">' + pinterestIcon + '</a>');

		$('.kale-pin-button').click(function(){
			var w    = 700,
			    h    = 400;
			var left = (screen.width/2)-(w/2);
			var top  = (screen.height/2)-(h/2);
			var popupWindow = window.open(this.href, kale_pinterest.popup_window_title, 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=700, height=400');

			popupWindow.moveTo(left, top);
			return false;
		});
	});
}

$(document).ready(function() {
	if ( $('.kale-pinterest-share img').length ) {
		$('.kale-pinterest-share img').each( function() {
			var $permalink = window.location.href;
			var $alt = $('.entry-title').html();

			$(this)
				.attr('data-kale-share-url', $permalink)
				.attr('data-kale-share-title', $alt)
				.wrap( "<div class='pinterest-share'></div>" );
		});
	}

	$('.entry-thumb img, .internal-banner img, .pinterest-share img').kalePinterestShare();

}); //end of document ready