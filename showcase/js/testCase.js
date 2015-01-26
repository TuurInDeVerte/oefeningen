
// set main class & sidebar class to fit window
$(function(){
  $('.sidebar, .main').css({ height: $(window).innerHeight() });
  $(window).resize(function(){
    $('.sidebar, .main').css({ height: $(window).innerHeight() });
  });
});

// toon en verberg main containers (navigation)
function toonVerberg(eTeTonenElementText){
	// selecteer te tonen element
	var eTeTonenElement = document.getElementById("main_" + eTeTonenElementText);

	// verberg alle containers
	$("#main_home").hide();
	$("#main_about").hide();
	$("#main_portfolio").hide();
	$("#main_contact").hide();

	// toon het te tonen element
	$(eTeTonenElement).show();

	// verberg zijn children en toon ze opnieuw (met effect)
	// verberg
	$(".main_bg").hide();
	$(".mainText_h1").hide();
	$(".mainText_p1").hide();

	// toon
		// toon achtergrond
	$(".main_bg").show("slide", {direction: "right"}, 250);
		// in het juiste kleur
	setTimeout(function(){
		if(eTeTonenElementText == "home"){
			$("body").css('background-color', '#005BB7');
			$("#navButton_home").css('box-shadow', 'inset -10px 0px 15px darkgrey');
			$("#navButton_about, #navButton_portfolio, #navButton_contact").css('box-shadow', 'none');
		}
		if(eTeTonenElementText == "about"){
			$("body").css('background-color', '#004080');
			$("#navButton_about").css('box-shadow', 'inset -10px 0px 15px darkgrey');
			$("#navButton_home, #navButton_portfolio, #navButton_contact").css('box-shadow', 'none');
		}
		if(eTeTonenElementText == "portfolio"){
			$("body").css('background-color', '#8080C0');
			$("#navButton_portfolio").css('box-shadow', 'inset -10px 0px 15px darkgrey');
			$("#navButton_home, #navButton_about, #navButton_contact").css('box-shadow', 'none');
		}
		if(eTeTonenElementText == "contact"){
			$("body").css('background-color', '#0080FF');
			$("#navButton_contact").css('box-shadow', 'inset -10px 0px 15px darkgrey');
			$("#navButton_home, #navButton_about, #navButton_portfolio").css('box-shadow', 'none');
		}
		}, 250);
	setTimeout(function(){
		$(".mainText_h1").show("slide", {direction: "up"}, 250);
	}, 250);

		// toon tekst p1
	setTimeout(function(){
		$(".mainText_p1").show("slide", {direction: "up"}, 250);
	}, 500);
}


// START WINDOW ONLOAD
window.onload = function(){
	// show & hide main elements
	$("#main_home").show();
	$("#main_about").hide();
	$("#main_portfolio").hide();
	$("#main_contact").hide();

	$("#navButton_home").click(function(){toonVerberg("home")});
	$("#navButton_about").click(function(){toonVerberg("about")});
	$("#navButton_portfolio").click(function(){toonVerberg("portfolio")});
	$("#navButton_contact").click(function(){toonVerberg("contact")});
} // END WINDOW ONLOAD
