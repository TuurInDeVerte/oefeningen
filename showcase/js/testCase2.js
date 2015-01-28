
// set main class & sidebar class to fit window
$(function(){
  $('.sidebar, .main, .main_bg').css({ height: $(window).innerHeight() });
  $(window).resize(function(){
    $('.sidebar, .main, .main_bg').css({ height: $(window).innerHeight() });
  });
  	console.log($(window).innerHeight());
	console.log($(window).innerWidth());
});

// toon en verberg main containers (navigation)
function toonVerberg(eTeTonenElementText){
	// variabelen
	var buttonShadowActive = "1px 0px 5px black";
	var buttonShadowInactive = "inset -5px 0px 25px black";
	// colors
	var bgColor_home = $("#main_bg_home").css("background-color");
	var bgColor_about = $("#main_bg_about").css("background-color");
	var bgColor_portfolio = $("#main_bg_portfolio").css("background-color");
	var bgColor_contact = $("#main_bg_contact").css("background-color");

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
	$(".imageHolder").hide();

	// toon
	$(".imgageHolder_logo").effect("shake");
		// verander button
	if(eTeTonenElementText == "home"){
		$("#navButton_home").css('box-shadow', buttonShadowActive);
		$("#navButton_about, #navButton_portfolio, #navButton_contact").css('box-shadow', buttonShadowInactive);
	}
	if(eTeTonenElementText == "about"){
		$("#navButton_about").css('box-shadow', buttonShadowActive);
		$("#navButton_home, #navButton_portfolio, #navButton_contact").css('box-shadow', buttonShadowInactive);
	}
	if(eTeTonenElementText == "portfolio"){
		$("#navButton_portfolio").css('box-shadow', buttonShadowActive);
		$("#navButton_home, #navButton_about, #navButton_contact").css('box-shadow', buttonShadowInactive);
	}
	if(eTeTonenElementText == "contact"){
		$("#navButton_contact").css('box-shadow', buttonShadowActive);
		$("#navButton_home, #navButton_about, #navButton_portfolio").css('box-shadow', buttonShadowInactive);
	}
		// toon achtergrond
	$(".main_bg").show("slide", {direction: "right"});
		// in het juiste kleur
		if(eTeTonenElementText == "home"){
			$("body").css('background-color', bgColor_home);
		}
		if(eTeTonenElementText == "about"){
			$("body").css('background-color', bgColor_about);
		}
		if(eTeTonenElementText == "portfolio"){
			$("body").css('background-color', bgColor_portfolio);
		}
		if(eTeTonenElementText == "contact"){
			$("body").css('background-color', bgColor_contact);
		}

		// toon titel h1
		$(".mainText_h1").show("slide", {direction: "up"});

		// toon tekst p1
		$(".mainText_p1").show("slide", {direction: "up"});

		// toon watermark
		$(".imageHolder").show("slide", {direction: "right"});

}


// START WINDOW ONLOAD
window.onload = function(){
	// colors
	var bgColor_home = $("#main_bg_home").css("background-color");
	var bgColor_about = $("#main_bg_about").css("background-color");
	var bgColor_portfolio = $("#main_bg_portfolio").css("background-color");
	var bgColor_contact = $("#main_bg_contact").css("background-color");

	// set buttons in juiste kleur
	$("#navButton_home").css('background-color', bgColor_home);
	$("#navButton_about").css('background-color', bgColor_about);
	$("#navButton_portfolio").css('background-color', bgColor_portfolio);
	$("#navButton_contact").css('background-color', bgColor_contact);
	// set body in juiste kleur (1ste load)
	$("body").css('background-color', bgColor_home);

	// show & hide main elements
	$("#main_home").show();
	$("#main_about").hide();
	$("#main_portfolio").hide();
	$("#main_contact").hide();

	$("#navButton_home").click(function(){toonVerberg("home")});
	$("#navButton_about").click(function(){toonVerberg("about")});
	$("#navButton_portfolio").click(function(){toonVerberg("portfolio")});
	$("#navButton_contact").click(function(){toonVerberg("contact")});

	$("input").focus(function(){
		$(this).parent().addClass("focusFormField");
	});
	$("input").blur(function(){
		$(this).parent().removeClass("focusFormField");
	});
	$("textarea").focus(function(){
		$(this).parent().addClass("focusFormField");
	});
	$("textarea").blur(function(){
		$(this).parent().removeClass("focusFormField");
	});

} // END WINDOW ONLOAD
