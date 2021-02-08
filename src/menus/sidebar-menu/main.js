jQuery(function ($) {
	if ($(window).width() < 960) {
				$(".main-sidebar-menu").removeClass("toggled");
				$("#wrapper").removeClass("sidebar-open");
	} else {
		$("#wrapper").addClass("sidebar-open");
	}
	
	$(".dropdown > a").click(function() {
		$(".dropdown-menu").slideUp(200);
		if ($(this).parent().hasClass("active")) {
			$(".dropdown").removeClass("active");
			$(this).parent().removeClass("active");
		} else {
			$(".dropdown").removeClass("active");
			$(this).next(".dropdown-menu").slideDown(200);
			$(this).parent().addClass("active");
		}
	});

	$("#close-sidebar").click(function() {
		$(".main-sidebar-menu").removeClass("toggled");
		$("#wrapper").removeClass("sidebar-open");
	});
	$("#show-sidebar").click(function() {
		$(".main-sidebar-menu").addClass("toggled");
		$("#wrapper").addClass("sidebar-open");
	});

});
