$(document).ready(function() {

	$('.top_mnu ul li, .bottom_mnu ul li').click(function(){
		$('.top_mnu ul li').removeClass('active');
		$(this).addClass('active');
	});

});