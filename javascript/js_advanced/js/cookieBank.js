var cookieBank = (function($){
	// private
	var me 			= "cookieBank";
	var dNu 		= new Date();
	var oViews 		= {
							welkom: {
									elements:{
											"root"				: $('#view_welkom'),
											"titel"				: $('#view_welkom > h4'),
											"intro"				: $('#view_welkom .intro'),
										  	"well"				: $('#view_welkom .well'),
										  	"form"				: $('#view_welkom form'),
										  	"btnInschrijven"	: $('#btnInschrijven'),
										  	"inputVoornaam"		: $('input[name=voornaam]'),
										  	"inputFamilienaam"	: $('input[name=familienaam]'),
										  	"inputEmail"		: $('input[name=email]'),
										  	"inputWachtwoord"	: $('input[name=wachtwoord]'),
										  	"btnSubmit"			: $('#btnSubmit'),
											"boodschapBox"		: $('#view_welkom div.alert')
										  }
									},
							klant: {
									elements:{
										  	"root"				: $('#view_klant'),
										  	"titel"				: $('#view_klant > h4'),
										  	"intro"				: $('#view_klant .intro'),
											"well"				: $('#view_klant  .well'),
										  	"form"				: $('#view_klant form'),
										  	"inputSaldo"		: $('input[name=saldo]'),
											"inputBedrag"		: $('input[name=bedrag]'),
										  	"btnStorten"		: $('#btnStorten'),
										  	"btnAfhalen"		: $('#btnAfhalen'),
										  	"btnRekSluiten"		: $('#btnRekSluiten'),
											"boodschapBox"		: $('#view_klant div.alert')
										  }

							},
							exit: {
									elements:{
										  	"root"				: $('#view_exit'),
										  	"titel"				: $('#view_exit > h4'),
											"boodschapBox"		: $('#view_exit div.alert'),
											"welleen"			: $('#view_exit  .well.een'),
											"welltwee"			: $('#view_exit  .well.twee'),
											"btnTerug"			: $('#btnTerug'),
											"btnBevestigRekSluiten"		: $('#btnBevestigRekSluiten'),
											"btnGaDoor"			: $('#btnGaDoor')
									}
							}
						};
	var oKlant		= { }; // data klant
	var oSettings 	= {
		defaultView : oViews.welkom,
		currentView : oViews.welkom,
		adminKosten : {
			verrichting: 1,
			afsluiten: 5
		},
		startKapitaal: 100
	} // standaardinstellingen
	var init = function(opties){
		var tijd = dNu.toLocaleTimeString();
		// console.log($.fn.jquery);
		appController();
		return me + " opgestart op " + tijd;
	}


/***** Cookie Functies *****/
	var leesCookie = function(){
		// leest JSON cookie, return boolean
		if($.cookie('klant')){
			var oCookie = $.cookie('klant');
			// populate oKlant object
			oKlant.voornaam = oCookie.voornaam;
			oKlant.familienaam = oCookie.familienaam;
			oKlant.email = oCookie.email;
			oKlant.wachtwoord = oCookie.wachtwoord;
			oKlant.saldo = oCookie.saldo;
			// console.log("oKlant: " + oKlant);
			return true;
		}
		else {
			// console.log('cookie niet gevonden');
			return false;
		}
	}
	var schrijfCookie = function(oKoekie){
		// schrijft JSON cookie
		var jsonKoekie = JSON.stringify(oKoekie);
			// console.log("oKoekie: " + oKoekie);
		$.cookie('klant', jsonKoekie);
			// console.log('cookie geschreven: ' + jsonKoekie);
	}
	var verwijderCookie = function(){
		// delete JSON cookie
		$.removeCookie('klant');
	}

/***** ===== AppControler ===== *****/
var appController = function(){
	// delegeert naar viewcontrollers
	if($.isEmptyObject(oKlant)){
		// oKlant ingevuld: klantView
		klantController.init(oViews.klant);
	}
	else{
		// geen oKlant
		var antw = leesCookie();
		if(antw === false){
			// geen cookie
			welkomController.init(oViews.welkom);
		}
		else{
			// terugkerende klant
			klantController.init(oViews.klant);
		}
	}
}
/***** ===== CONTROLLERS ===== *****/
var Controller = function(name){
	this.name = name;			// enkel voor debug
	this.view = undefined 		// een controller heeft één view
	this.boodschappen = {};		// object voor boodschappen
}

Controller.prototype.init = function(){}; 		// abstract
Controller.prototype.updateView = function(){}; // abstract
Controller.prototype.debug = function(){
	var txt = "Controller " + this.name + " opgestart met view " + this.view.elements.root.attr('id');
	console.log(txt);
};
Controller.prototype.showView = function(){
	// verberg andere view indien verschillend
	if(oSettings.currentView = this.view){
		oSettings.currentView.elements.root.hide();
	}
	// toon deze view
	this.view.elements.root.show(300);		// JQ
	oSettings.currentView = this.view;
};
Controller.prototype.hideView = function(){
	this.view.rootE1.hide();				// JQ
};

Controller.prototype.toonBoodschappen = function(type){
	// toont de boodschapcontainer
	// @type = Bootstrap class: alert-error, alert-succes, alert-info, alert-block

	if( $.isEmptyObject(this.boodschappen)){
		// lus doorheen alle berichten en produceer een unordered list
		var str = "";
		for (var key in this.boodschappen){
			str += "<li>" + this.boodschappen[key] + "</li>";
		}
		$foutboks = this.view.elements.boodschapBox;
		$foutboks.removeClass("alert-error alert-succes alert-info alert-block").addClass(type); // Bootstrap class
		$foutboks.find("ul").html(str);
		$foutboks.show();
	}
};

Controller.prototype.verbergBoodschappen = function(){
	// verberg boodschap container
	this.view.elements.boodschapBox.hide();
};

Controller.prototype.zetBoodschap = function(oBericht){
	// voeg boodschap toe aan object boodschappen volgens zijn key: op die manier nooit tweemaal dezelfde
	for(var j in oBericht){
		this.boodschappen[j] = oBericht[j]; // bestaande keys worden overschreven
	}
};

Controller.prototype.clearBoodschappen = function(){
	// verwijder alle boodschappen
	this.boodschappen = {};
};

Controller.prototype.validateBedrag = function(el){
	var sBedrag = el.val();
	// vervang Belgische comma's
	var re = /,/;
	sBedrag = sBedrag.replace(re, '.');
	if($.isNumeric(sBedrag)){
		// OK
		return parseFloat(sBedrag);
	}
	else {
		// NIET OK
		var oBericht = {};
		var sleutel = "numeric_" + el.attr('name');
		oBericht[sleutel] = "<strong>" + el.attr('name') + "</strong>: u moet een correct bedrag ingeven";
		this.zetBoodschap(oBericht);
		return false;
	}
};

Controller.prototype.validateTekst = function(el){
	var sTekst = el.val();
	if(sTekst == ""){
		// NIET OK
		var oBericht = {};
		var sleutel = "text_" + el.attr('name');
		oBericht[sleutel] = "<strong>" + el.attr('name') + "</strong>: u moet een geldige tekst ingeven";
		this.zetBoodschap(oBericht);
		return false;
	}
	else {
		// OK
		return sTekst;
	}
};

Controller.prototype.validateEmail = function(el){
	var sTekst = el.val();
	var emailReg = /^[a-z0-9 #$ '*+/=?^_ {|} .-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
	if(sTekst == "" || emailReg.test(sTekst)){
		// NIET OK
		var oBericht = {};
		var sleutel = "email_" + el.attr('name');
		oBericht[sleutel] = "<strong>" + el.attr('name') + "</strong>: dit is geen geldig emailadres";
		this.zetBoodschap(oBericht); 		// post de boodschap
		return false;
	}
	else {
		// OK
		return sTekst;
	}
};

// +++++ welkomController +++++
var welkomController = new Controller("welkomController");
/* behandelt de beginsituatie (zonder cookies) en het opstarten van de rekening */
welkomController.init = function(view){
	var me = this; 	// delegation voor eventhandlers
	this.view = view;
	this.debug();
	var els = this.view.elements;		//shortcut

	// event handler 'open rekening' knop
	els.btnInschrijven.on("click", function(){
		els.well.show('slow');
	});
	// event handler 'bevestigen' knop
	els.btnSubmit.on("click", function(){
		// alles ok: save data, maak cookie
		// eerste maal?
		var voornaam 		= me.validateTekst(els.inputVoornaam);
		var familienaam 	= me.validateTekst(els.inputFamilienaam);
		var email 			= me.validateEmail(els.inputEmail);
		var wachtwoord 		= me.validateTekst(els.inputWachtwoord);

		if(voornaam == false ||	familienaam == false ||	email == false || wachtwoord == false){
			oKlant.voornaam = voornaam;
			oKlant.familienaam = familienaam;
			oKlant.email = email;
			oKlant.wachtwoord = wachtwoord;
			oKlant.saldo = oSettings.startKapitaal;

			schrijfCookie(oKlant);
			appController(); // terug naar boven
		}
		else{
			me.toonBoodschappen("alert-error");
			return;
		}
	});

	// dynamische startboodschap
	var sWelkom = "Nu een rekening openen = " + oSettings.startKapitaal + " &euro; startkapitaal ontvangen!";
	els.intro.html(sWelkom);

	this.showView();
};

// +++++ klantController +++++
var klantController = new Controller("klantController");
/* behandelt alle financiële verrichtingen van de rekening */
klantController.init = function(view){
	var me = this; // delegation voor eventhandlers
	this.view = view;
	this.debug();
	var els = this.view.elements;			// shortcut
	this.showView();
}

// +++++ exitController +++++
var exitController = new Controller("exitController");
/* behandelt het afsluiten van de rekening */
exitController.init = function(view){
	var me = this;		// delegation voor eventhandlers
	this.view = view;
	this.debug();
	var els = this.view.elements; 		// shortcut
	this.showView();
};

	// het return object = public
	return {
		init: init
	};
}(jQuery));