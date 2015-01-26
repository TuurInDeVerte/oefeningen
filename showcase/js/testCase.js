
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
	$(".main_bg").show("slide", {direction: "down"}, 250);
		// in het juiste kleur
	setTimeout(function(){
		if(eTeTonenElementText == "home"){
			$("body").css('background-color', '#005BB7');
		}
		if(eTeTonenElementText == "about"){
			$("body").css('background-color', '#004080');
		}
		if(eTeTonenElementText == "portfolio"){
			$("body").css('background-color', '#8080C0');
		}
		if(eTeTonenElementText == "contact"){
			$("body").css('background-color', '#0080FF');
		}
		}, 250);
	setTimeout(function(){
		$(".mainText_h1").show("slide", {direction: "up"}, 250);
	}, 250);

		// toon tekst p1
	setTimeout(function(){
		$(".mainText_p1").show("slide", {direction: "left"}, 250);
	}, 250);
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
