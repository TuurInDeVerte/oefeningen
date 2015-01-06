var winkelmandje = new Array;
var totaalprijsMandje = 0;

function verwijderUitMandje(index){
	if(index != -1){
		winkelmandje.splice(index, 1);
		naarDeKassa(producten);
		updateMandje();
	}
}

function isInteger(possibleInteger) {
        return Object.prototype.toString.call(possibleInteger) !== "[object Array]" && /^[\d]+$/.test(possibleInteger);
}

function valideerAantal(){
	var inputFieldAantal = event.target || event.srcElement;
	var ingegevenAantal = inputFieldAantal.value;
	var winkelmandjeId = inputFieldAantal.getAttribute("data-winkelmandjeId");
	if(isInteger(ingegevenAantal) && ingegevenAantal > 0){
		winkelmandje[winkelmandjeId]['aantal'] = ingegevenAantal;
		var teWijzigenTotaal = document.getElementById("winkelmandjeId_" + winkelmandjeId);
		var totaalPerStuk = teWijzigenTotaal.getAttribute("data-totaalPerStuk");
		var nieuwTotaal = ingegevenAantal * totaalPerStuk;
		nieuwTotaal = parseFloat(nieuwTotaal);
		nieuwTotaal = nieuwTotaal.toFixed(2);
		teWijzigenTotaal.innerHTML = "€ " + nieuwTotaal;
		console.log(teWijzigenTotaal);
	}
	else {
		alert('Het ingegeven aantal is niet correct');
		inputFieldAantal.focus();
	}
}

function winkelmandjeLeegmaken(){
	var leegmaken = confirm("Wilt u het winkelmandje leegmaken?");
	if (leegmaken == true){
		while(winkelmandje.length > 0){
			winkelmandje.pop();
		}
		naarDeKassa();
	}
}


function naarDeKassa(producten){
	var eContentUitFocus = document.getElementById("productenlijst");
	var eFilterBoxUitFocus = document.getElementById("filterBox");
	var eWinkelmandje = document.getElementById("winkelmandje");
	var eTicketMandje = document.getElementById("ticketMandje");
	eTicketMandje.innerHTML = "";

	var eTitelMandje = document.createElement("h2");
	var tTitelMandje = document.createTextNode("Details Winkelmandje");
	eTitelMandje.setAttribute("id", "titelMandje");
	eTitelMandje.appendChild(tTitelMandje);
	eTicketMandje.appendChild(eTitelMandje);

	var eLinkMandjeLeegmaken = document.createElement("a");
	eLinkMandjeLeegmaken.setAttribute("id", "linkMandjeLeegmaken");
	eLinkMandjeLeegmaken.setAttribute("href", "#");
	eLinkMandjeLeegmaken.addEventListener("click", function(){winkelmandjeLeegmaken()});
	var tLinkMandjeLeegmaken = document.createTextNode("(winkelmandje leegmaken)");
	eLinkMandjeLeegmaken.appendChild(tLinkMandjeLeegmaken);
	eTicketMandje.appendChild(eLinkMandjeLeegmaken);


	var aantalProductenInMandje = winkelmandje.length;
	if(winkelmandje.length > 0){
		for(i=0; i<aantalProductenInMandje; i++){
			var nieuweRij = maakRij(producten, winkelmandje, i);
			eTicketMandje.appendChild(nieuweRij);
			eHorLijn = document.createElement("hr");
			eTicketMandje.appendChild(eHorLijn);
		}
		var eKnopTerug = document.createElement("button");
		eKnopTerug.className += " terugKnop";
		var tKnopTerug = document.createTextNode("Nog pizza's bestellen!");
		eKnopTerug.appendChild(tKnopTerug);
		eKnopTerug.addEventListener("click", function(){verderBestellen()});
		eTicketMandje.appendChild(eKnopTerug);

		var eKnopDoorgaan = document.createElement("button");
		eKnopDoorgaan.className += " bestellenKnop";
		var tKnopDoorgaan = document.createTextNode("Bestelling afrekenen");
		eKnopDoorgaan.appendChild(tKnopDoorgaan);
		eKnopDoorgaan.appendChild(document.createElement("br"));
		var eTotaalprijsKnopDoorgaan = document.createElement("small");
		var tTotaalprijsKnopDoorgaan = document.createTextNode("Totaalprijs: € " + totaalprijsMandje);
		eTotaalprijsKnopDoorgaan.appendChild(tTotaalprijsKnopDoorgaan);
		eKnopDoorgaan.appendChild(eTotaalprijsKnopDoorgaan);
		eKnopDoorgaan.addEventListener("click", function(){bestellingAfrekenen()});
		eTicketMandje.appendChild(eKnopDoorgaan);

		eContentUitFocus.className += " toBlur";
		eFilterBoxUitFocus.className += " toBlur";
		eWinkelmandje.style.display = "none";
		$('#ticketMandje').lightbox_me({
			closeClick: false,
			closeEsc: false
		});
	}
	else{
		verderBestellen();
	}
}

function bestellingAfrekenen(){
	if(typeof(Storage) !== "undefined"){
		console.log('geklikt');
		//var phpWinkelmandje = JSON.stringify(winkelmandje);
		$.cookie('Winkelmandje', JSON.stringify(winkelmandje));
		window.location.href = "toonbestelling.php";

		//localStorage.setItem("winkelmandje", JSON.stringify(winkelmandje));

		/*
		var phpWinkelmandje = JSON.stringify(winkelmandje);
		var url = "toonbestelling.php";
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", url, true);
		xmlhttp.send(phpWinkelmandje);
		*/

		/*$.ajax({
			url: 'toonalleproducten.php',
			type: 'GET',
			data: {"phpWinkelmandje" : JSON.stringify(winkelmandje)},
			succes: function(data) {
				window.location.href = "toonbestelling.php" + data;
				console.log('ajax ok');
				console.log(data);
			}
		})
*/


	}
	else {
		alert("U gebruikt een antieke browser. Update uw browser om het internet te kunnen blijven gebruiken!");
	}
}


function verderBestellen(){
	var eContentUitFocus = document.getElementById("productenlijst");
	var eFilterBoxUitFocus = document.getElementById("filterBox");
	var eWinkelmandje = document.getElementById("winkelmandje");
	eContentUitFocus.classList.remove("toBlur");
	eFilterBoxUitFocus.classList.remove("toBlur");

	//eContentUitFocus.onclick = function(){return false;};
	//eFilterBoxUitFocus.onclick = function(){return false;};
	//eContentUitFocus.classList.remove("nietKlikbaar");
	//eFilterBoxUitFocus.classList.remove("nietKlikbaar");
	eWinkelmandje.style.display = "";
	$('#ticketMandje').trigger('close');
	updateMandje();
}

function maakRij(producten, winkelmandje, i){
	var eRij = document.createElement("div");
	eRij.className += " eRij cf";
	var eRijBeschrijving = document.createElement("div");
	eRijBeschrijving.className += " kolomLinks";
	var eRijNaam = document.createElement("div");
	eRijNaam.className += " naastElkaar duidelijker";
	var tRijNaam = document.createTextNode(producten[winkelmandje[i]['productId']]['naam']);
	eRijNaam.appendChild(tRijNaam);
	eRijBeschrijving.appendChild(eRijNaam);
	if(producten[winkelmandje[i]['productId']]['type'] == "pizza"){
		if(winkelmandje[i]['lijstToppingIds'] == "geen"){

			eRijTopping = document.createElement("div");
			eRijTopping.className += " naastElkaar kleiner";
			tRijTopping = document.createTextNode(" (zonder extra toppings)");
			eRijTopping.appendChild(tRijTopping);
			eRijBeschrijving.appendChild(eRijTopping);
		}
		else {
			//console.log('MET TOPPINGS');
			var eRijBeschrijvingPrijs = document.createElement("div");

			eRijBeschrijvingPrijs.className += " naastElkaar kleiner";
			if(producten[winkelmandje[i]['productId']]['inPromotie'] == 1){
				var tekstRijPrijs = producten[winkelmandje[i]['productId']]['eenheidsprijsKorting'];
				tekstRijPrijs = parseFloat(tekstRijPrijs);
				tekstRijPrijs = tekstRijPrijs.toFixed(2);
				tekstRijPrijs = " (€ " + tekstRijPrijs + ")";
			}
			else{
				var tekstRijPrijs = producten[winkelmandje[i]['productId']]['eenheidsprijsStandaard'];
				tekstRijPrijs = parseFloat(tekstRijPrijs);
				tekstRijPrijs = tekstRijPrijs.toFixed(2);
				tekstRijPrijs = " (€ " + tekstRijPrijs + ")";
			}
			var tRijBeschrijvingPrijs = document.createTextNode(tekstRijPrijs);
			eRijBeschrijvingPrijs.appendChild(tRijBeschrijvingPrijs);
			eRijBeschrijving.appendChild(eRijBeschrijvingPrijs);

			var eBr = document.createElement("br");
			eRijBeschrijving.appendChild(eBr);
			var aToppingIds = winkelmandje[i]['lijstToppingIds'];
			var totaalPrijsToppings = 0;
			for(j=0; j<aToppingIds.length; j++){
				var eToppingRij = document.createElement("div");
				//kolom links
				var eToppingRijNaam = document.createElement("div");
				eToppingRijNaam.className += " naastElkaar";
				var tToppingRijNaam = document.createTextNode("+ " + producten[aToppingIds[j]]['naam']);
				eToppingRijNaam.appendChild(tToppingRijNaam);
				eToppingRij.appendChild(eToppingRijNaam);
				//kolom midden
				var eToppingRijPrijs = document.createElement("div");
				eToppingRijPrijs.className += " naastElkaar kleiner";
				if (producten[aToppingIds[j]]['inPromotie'] == 1){
					var tekstToppingRijPrijs = producten[aToppingIds[j]]['eenheidsprijsKorting'];
					//console.log(tekstToppingRijPrijs);
					if (tekstToppingRijPrijs > 0){
						tekstToppingRijPrijs = parseFloat(tekstToppingRijPrijs);
						totaalPrijsToppings = totaalPrijsToppings + tekstToppingRijPrijs;
						tekstToppingRijPrijs = tekstToppingRijPrijs.toFixed(2);
						tekstToppingRijPrijsMetEuro = " (€ " + tekstToppingRijPrijs + ")";
					}
					else {
						tekstToppingRijPrijsMetEuro = " (GRATIS)"
					}
				}
				else {
					var tekstToppingRijPrijs = producten[aToppingIds[j]]['eenheidsprijsStandaard'];
					//console.log(tekstToppingRijPrijs);
					tekstToppingRijPrijs = parseFloat(tekstToppingRijPrijs);
					totaalPrijsToppings = totaalPrijsToppings + tekstToppingRijPrijs;
					tekstToppingRijPrijs = tekstToppingRijPrijs.toFixed(2);
					tekstToppingRijPrijsMetEuro = " (€ " + tekstToppingRijPrijs + ")";
				}
				var tToppingRijPrijs = document.createTextNode(tekstToppingRijPrijsMetEuro);
				eToppingRijPrijs.appendChild(tToppingRijPrijs);
				eToppingRij.appendChild(eToppingRijPrijs);
				//kolom rechts
/*				var eToppingRijLeeg = document.createElement("div");
				eToppingRijLeeg.className += "kolomRechts";
				eToppingRij.appendChild(eToppingRijLeeg);*/
				eRijBeschrijving.appendChild(eToppingRij);
			}
		}
	}
	eRij.appendChild(eRijBeschrijving);
/*	var eBr = document.createElement("br");
	eRij.appendChild(eBr);*/
	var eRijAantal = document.createElement("form");
	eRijAantal.className += " kolomMidden";

	var rijAantalContainer = document.createElement("div");
	var tRijAantal = document.createTextNode("Aantal: ");
	rijAantalContainer.className += " naastElkaar";
	rijAantalContainer.appendChild(tRijAantal);
	eRijAantal.appendChild(rijAantalContainer);

	var eRijAantalInput = document.createElement("input");
	eRijAantalInput.className += " breedte40 naastElkaar";
	eRijAantalInput.setAttribute("type", "number");
	eRijAantalInput.setAttribute("name", "aantal");
	eRijAantalInput.setAttribute("size", "1");
	eRijAantalInput.setAttribute("value", winkelmandje[i]['aantal']);
	eRijAantalInput.setAttribute("data-winkelmandjeId", i);
	eRijAantalInput.onblur = function(){valideerAantal()};
	eRijAantal.appendChild(eRijAantalInput);
/*	var tRijAantal = document.createTextNode("Aantal: " + winkelmandje[i]['aantal']);
	eRijAantal.appendChild(tRijAantal);*/
	eRij.appendChild(eRijAantal);


	var eRijPrijs = document.createElement("div");
	eRijPrijs.className += " kolomRechts";
	eRijPrijs.setAttribute("id", "winkelmandjeId_" + i);
	if(producten[winkelmandje[i]['productId']]['inPromotie'] == 1){
		var stukPrijs = producten[winkelmandje[i]['productId']]['eenheidsprijsKorting'];
	}
	else{
		var stukPrijs = producten[winkelmandje[i]['productId']]['eenheidsprijsStandaard'];
	}
	stukPrijs = parseFloat(stukPrijs);

	// hier totaalprijs pizza met toppings
	if(totaalPrijsToppings > 0){
		var totaalPerStuk = stukPrijs + totaalPrijsToppings;
	}
	else{
		var totaalPerStuk = stukPrijs;
	}

	tekstAantal = parseFloat(winkelmandje[i]['aantal']);
	tekstRijPrijs = totaalPerStuk * tekstAantal;
	tekstRijPrijs = tekstRijPrijs.toFixed(2);

	tekstRijPrijs = parseFloat(tekstRijPrijs);
	tekstRijPrijs = tekstRijPrijs.toFixed(2);
	var tRijPrijs = document.createTextNode("€ " + tekstRijPrijs);
	eRijPrijs.setAttribute("data-totaalPerStuk", totaalPerStuk);
	totaalprijsMandje = parseFloat(totaalprijsMandje) + parseFloat(tekstRijPrijs);
	totaalprijsMandje = totaalprijsMandje.toFixed(2);
	eRijPrijs.appendChild(tRijPrijs);
	eRij.appendChild(eRijPrijs);

	//knop om product te verwijderen
	var eKnopVerwijderen = document.createElement("img");
	eKnopVerwijderen.className += " vuilbakje";
	eKnopVerwijderen.src = "presentation/images/vuilbakje.png";

	eKnopVerwijderen.addEventListener("click", function(){verwijderUitMandje(i)});
	eRij.appendChild(eKnopVerwijderen);

	return eRij;
}


function pizzaBestellen(){
	aantalBesteldePizza = aantalBesteldePizza + 1;
	var deKnop = event.target || event.srcElement;
	var pizzaIdTeBestellen = deKnop.getAttribute("data-pizzaid");
	var productIdTeBestellen = producten[pizzaIdTeBestellen]['productId'];
	var toppingContainer = document.getElementById("containerPizzaID_" + pizzaIdTeBestellen);
	var pizzaBestellenKnop = document.getElementById("pizzaBestellenKnop_" + pizzaIdTeBestellen);
	var pizzaMandje = document.getElementById("pizzaMandje");
	var eAantalPizza = document.getElementById("aantalPizza");
	var eWinkelmandje = document.getElementById("winkelmandje");
	eWinkelmandje.style.display = "";
	var bestelknopPizzaId = document.getElementById("bestelknopPizzaID_" + pizzaIdTeBestellen);
	var pizzaHeeftToppings = bestelknopPizzaId.getAttribute("data-topping");
	var besteldePizza = {};
	if (pizzaHeeftToppings === "geenTopping"){
		if(winkelmandje.length > 0){
			var nogNietInMandje = true;
			in_mandje:
			for(i=0; i<winkelmandje.length; i++){
				if(winkelmandje[i]["productId"] === pizzaIdTeBestellen && winkelmandje[i]['lijstToppingIds'] == "geen"){
					//console.log('nieuwe pizza zat al in mandje (aantal + 1)');
					winkelmandje[i]['aantal'] = winkelmandje[i]['aantal'] + 1;
					nogNietInMandje = false;
					break in_mandje;
				}
			}
			if(nogNietInMandje){
				//console.log('nieuwe pizza zat nog niet in mandje (in mandje stoppen)');
				besteldePizza['productId'] = pizzaIdTeBestellen;
				besteldePizza['databaseProductId'] = productIdTeBestellen;
				besteldePizza['aantal'] = 1;
				besteldePizza['lijstToppingIds'] = "geen";
				besteldePizza['lijstToppingDBids'] = "geen";
				winkelmandje.push(besteldePizza)
			}
		}
		else {
			//console.log('nog niets in mandje');
			besteldePizza['productId'] = pizzaIdTeBestellen;
			besteldePizza['databaseProductId'] = productIdTeBestellen;
			besteldePizza['aantal'] = 1;
			besteldePizza['lijstToppingIds'] = "geen";
			besteldePizza['lijstToppingDBids'] = "geen";
			winkelmandje.push(besteldePizza);
		}
	}
	if(pizzaHeeftToppings == "welTopping"){
		var lijstBesteldeToppings = [];
		var lijstDBidsBesteldeToppings = [];
		var toppingRijen = document.getElementById("toppingRijen_" + pizzaIdTeBestellen);
		var besteldeToppings = toppingRijen.childNodes;
		var aantalToppings = besteldeToppings.length;
		for (i=0; i<aantalToppings; i++) {
			var besteldeToppingId = besteldeToppings[i].getAttribute("data-toppingID");
			lijstDBidsBesteldeToppings.push(producten[besteldeToppingId]['productId']);
			lijstBesteldeToppings.push(besteldeToppingId);
		}
		lijstBesteldeToppings.sort();
		if(winkelmandje.length > 0){
			var nogNietInMandje = true;
			in_mandje:
			for(i=0; i<winkelmandje.length; i++){
				if(winkelmandje[i]['productId'] === pizzaIdTeBestellen){
					//console.log('wel al zelfde pizza (miss andere topping?)');
					var toppingsPizzaInMandje = winkelmandje[i]['lijstToppingIds'];
					if(toppingsPizzaInMandje.length == lijstBesteldeToppings.length){
						for(j=0; j<lijstBesteldeToppings.length; j++){
							if(toppingsPizzaInMandje[j] == lijstBesteldeToppings[j]){
								var dezelfdeToppings = true;
							}
							if(toppingsPizzaInMandje[j] != lijstBesteldeToppings[j]){
								var dezelfdeToppings = false;
							}
						}
					}
					if (dezelfdeToppings){
						//console.log('nieuwe pizza zat al in mandje (aantal + 1)');
						winkelmandje[i]['aantal'] = winkelmandje[i]['aantal'] + 1;
						nogNietInMandje = false;
						break in_mandje;
					}
				}
			}
			if(nogNietInMandje){
				//console.log('nieuwe pizza zat nog niet in mandje (in mandje stoppen)');
				besteldePizza['productId'] = pizzaIdTeBestellen;
				besteldePizza['databaseProductId'] = productIdTeBestellen;
				besteldePizza['aantal'] = 1;
				besteldePizza['lijstToppingIds'] = lijstBesteldeToppings;
				besteldePizza['lijstToppingDBids'] = lijstDBidsBesteldeToppings;
				besteldePizza['TEST']= "TEST";
				winkelmandje.push(besteldePizza)
			}
		}
		else {
			//console.log('nog niets in mandje');
			besteldePizza['productId'] = pizzaIdTeBestellen;
			besteldePizza['databaseProductId'] = productIdTeBestellen;
			besteldePizza['aantal'] = 1;
			besteldePizza['lijstToppingIds'] = lijstBesteldeToppings;
			besteldePizza['lijstToppingDBids'] = lijstDBidsBesteldeToppings;
			besteldePizza['TEST']= "TEST";
			winkelmandje.push(besteldePizza);
		}
	}
	var aantalBesteldePizza = 0;
		for(k=0; k<winkelmandje.length; k++){
			if(producten[winkelmandje[k]['productId']]['type'] == "pizza"){
				aantalBesteldePizza = aantalBesteldePizza + 1;
			}
		}

	pizzaMandje.setAttribute("data-aantalBesteldePizza", aantalBesteldePizza);

	$(toppingContainer).hide( "slide", { direction: "right" }, "slow" );
	$(pizzaMandje).hide("slide", { direction: "right" }, "slow");

	$(pizzaMandje).show( "bounce", { times: 3 }, "slow");
	setTimeout(function(){updateMandje()}, 500);

	pizzaBestellenKnop.innerHTML = "Nog zo'n pizza bestellen";
	pizzaBestellenKnop.setAttribute("data-besteld", 1);
}


function updateMandje(){
	var aantalBesteldePizza = 0;
	var aantalBesteldeDrank = 0;
		for(k=0; k<winkelmandje.length; k++){
			if(producten[winkelmandje[k]['productId']]['type'] == "pizza"){
				aantalBesteldePizza = parseFloat(aantalBesteldePizza);
				winkelmandje[k]['aantal'] = parseFloat(winkelmandje[k]['aantal']);
				aantalBesteldePizza = aantalBesteldePizza + winkelmandje[k]['aantal'];
			}
			if(producten[winkelmandje[k]['productId']]['type'] == "drank"){
				aantalBesteldeDrank = parseFloat(aantalBesteldeDrank);
				winkelmandje[k]['aantal'] = parseFloat(winkelmandje[k]['aantal']);
				aantalBesteldeDrank = aantalBesteldeDrank + winkelmandje[k]['aantal'];
			}
		}
	var eAantalPizza = document.getElementById("aantalPizza");
	var eAantalDrank = document.getElementById("aantalDrank");
	var eWinkelmandje = document.getElementById("winkelmandje");
	if(aantalBesteldeDrank == 0 && aantalBesteldePizza == 0){
		eWinkelmandje.style.display = "none";
	}
	if(aantalBesteldePizza == 0){
		eAantalPizza.innerHTML = "";
	}
	if(aantalBesteldePizza > 0){
		eAantalPizza.innerHTML = aantalBesteldePizza;
	}
	if(aantalBesteldeDrank == 0){
		eAantalDrank.innerHTML = "";
	}
	if(aantalBesteldeDrank > 0){
		eAantalDrank.innerHTML = aantalBesteldeDrank
	}
}



function drankBestellen(){
	deKnop = event.target || event.srcElement;
	var besteldeDrankId = deKnop.getAttribute("data-productID");
	var productIdTeBestellen = producten[besteldeDrankId]['productId'];
	var eWinkelmandje = document.getElementById("winkelmandje");
	var eDrankMandje = document.getElementById("drankMandje");
	var eDrankContainer = document.getElementById("arrayID_" + besteldeDrankId);
	var eAantalDrank = document.getElementById("aantalDrank");
	var besteldeDrank = {};

	if(winkelmandje.length > 0){
		var nogNietInMandje = true;
		in_mandje:
		for(i=0; i<winkelmandje.length; i++){
			if(winkelmandje[i]["productId"] === besteldeDrankId){
				winkelmandje[i]['aantal'] = winkelmandje[i]['aantal'] + 1;
				nogNietInMandje = false;
				break in_mandje;
			}
		}
		if(nogNietInMandje){
			besteldeDrank['productId'] = besteldeDrankId;
			besteldeDrank['databaseProductId'] = productIdTeBestellen;
			besteldeDrank['aantal'] = 1;
			besteldeDrank['lijstToppingIds'] = "geen";
			besteldePizza['lijstToppingDBids'] = "geen";
			winkelmandje.push(besteldeDrank)
		}
	}
	else {
		besteldeDrank['productId'] = besteldeDrankId;
		besteldeDrank['databaseProductId'] = productIdTeBestellen;
		besteldeDrank['aantal'] = 1;
		besteldeDrank['lijstToppingIds'] = "geen";
		besteldePizza['lijstToppingDBids'] = "geen";
		winkelmandje.push(besteldeDrank);
	}

	var aantalBesteldeDrank = 0;
	for(k=0; k<winkelmandje.length; k++){
		if(producten[winkelmandje[k]['productId']]['type'] == "drank"){
			aantalBesteldeDrank = aantalBesteldeDrank + 1;
		}
	}
	drankMandje.setAttribute("data-aantalBesteldeDrank", aantalBesteldeDrank);

	eWinkelmandje.style.display = "";
	$(eDrankContainer).hide( "slide", { direction: "right" }, "slow" );
	$(drankMandje).hide("slide", { direction: "right" }, "slow");

	$(drankMandje).show( "bounce", { times: 3 }, "slow");
	setTimeout(updateMandje(), 500);
	$(eDrankContainer).show( "slide", { direction: "left" }, "slow" );

	console.log(winkelmandje);
}


// function om de topping te tonen en te verbergen (knop "pizza bestellen")
function toggleToppings(objArray){
	var gekozenPizza = event.target || event.srcElement;
	if(gekozenPizza.className == "pizzaBestellenKnop"){
		var pizzaPrijs = gekozenPizza.getAttribute("data-pizzaPrijs");
		var pizzaId = gekozenPizza.getAttribute("data-productId");
		var eBestelknop = document.getElementById("bestelknopPizzaID_" + pizzaId);
		var eTotaalPrijs = document.getElementById("totaalprijsPizzaID_" + pizzaId);
		var tTotaalPrijs = eTotaalPrijs.getAttribute("data-totaalPrijs");
		var pizzaNaam = objArray[pizzaId]['naam'];
		var toppingContainer = document.getElementById("containerPizzaID_" + pizzaId);
		if(toppingContainer.style.display == "block"){
			toppingContainer.style.display = "none";
			var besteld = event.target.getAttribute("data-besteld");
			if(besteld == 1){
				event.target.innerHTML = "Nog zo'n pizza bestellen";
			}
			else {
				event.target.innerHTML = "Pizza bestellen";
			}
		}
		else {
			toppingContainer.style.display = "block";
			event.target.innerHTML = "Annuleren";
		}
	}
}

// function om topping toe te voegen aan pizza (knop "deze topping toevoegen aan pizza")
function toppingToevoegen(objArray, arrayID){
	var gekozenTopping = event.target || event.srcElement;
	var toppingId = gekozenTopping.getAttribute("data-toppingID");

	var toppingPrijs = gekozenTopping.getAttribute("data-toppingPrijs");
	toppingPrijs = parseFloat(toppingPrijs);

	var toppingStatus = gekozenTopping.getAttribute("data-toppingStatus");
	var pizzaId = gekozenTopping.getAttribute("data-pizzaId");
	var toppingNaam = objArray[toppingId]['naam'];

	var eTotaalprijsPizza = document.getElementById("totaalprijsPizzaID_" + pizzaId);
	var tTotaalprijsPizza = eTotaalprijsPizza.getAttribute("data-totaalPrijs");
	tTotaalprijsPizza = parseFloat(tTotaalprijsPizza);


	var eBlauwPrijsVeld = document.getElementById("totaalprijsPizzaID_" + pizzaId);
	console.log(eBlauwPrijsVeld);
	var tBlauwPrijsVeld = eBlauwPrijsVeld.lastChild;

	var eBestelknop = document.getElementById("bestelknopPizzaID_" + pizzaId);
	var tBestelknop = eBestelknop.lastChild;

	if (toppingStatus == "toevoegen"){
		gekozenTopping.innerHTML = "Topping VERWIJDEREN";
		gekozenTopping.setAttribute("data-toppingStatus", "verwijderen");
		var nieuwePrijs = tTotaalprijsPizza + toppingPrijs;
		if(eBestelknop.getAttribute("data-topping") == "geenTopping"){
			var eersteToppingRij = document.getElementById("toppingRijen_" + pizzaId);
			eersteToppingRij.innerHTML = "";
			var eExtraLijn = document.createElement("div");
			if (toppingPrijs == 0.00){
				tekstToppingPrijs = " (GRATIS)";
			}
			else {
				tekstToppingPrijs = " (€ " + toppingPrijs.toFixed(2) + ")";
			}
			var tExtraLijn = document.createTextNode("+ " + toppingNaam + tekstToppingPrijs);
			eExtraLijn.appendChild(tExtraLijn);
			eExtraLijn.setAttribute("id", "gekozenToppingID_" + toppingId);
			eExtraLijn.setAttribute("data-pizzaID", pizzaId);
			eExtraLijn.setAttribute("data-toppingID", toppingId);
			eersteToppingRij.appendChild(eExtraLijn);
			eBestelknop.setAttribute("data-topping", "welTopping");
		}
		else {
			var eersteToppingRij = document.getElementById("toppingRijen_" + pizzaId);
			var eExtraLijn = document.createElement("div");
			if (toppingPrijs == 0.00){
				tekstToppingPrijs = " (GRATIS)";
			}
			else {
				tekstToppingPrijs = " (€ " + toppingPrijs.toFixed(2) + ")";
			}
			var tExtraLijn = document.createTextNode("+ " + toppingNaam + tekstToppingPrijs);
			eExtraLijn.appendChild(tExtraLijn);
			eExtraLijn.setAttribute("id", "gekozenToppingID_" + toppingId);
			eExtraLijn.setAttribute("data-pizzaID", pizzaId);
			eExtraLijn.setAttribute("data-toppingID", toppingId);
			eersteToppingRij.appendChild(eExtraLijn);
			eBestelknop.setAttribute("data-topping", "welTopping");
		}
	}
	if (toppingStatus == "verwijderen"){
		var teWissenRij = document.getElementById("gekozenToppingID_" + toppingId);
		var eToppingRijen = document.getElementById("toppingRijen_" + pizzaId);
		teWissenRij.parentNode.removeChild(teWissenRij);
		if(!eToppingRijen.hasChildNodes()){
			eToppingRijen.innerHTML = "zonder extra topping";
			eBestelknop.setAttribute("data-topping", "geenTopping");
		}
		gekozenTopping.innerHTML = "Deze topping toevoegen aan pizza";
		gekozenTopping.setAttribute("data-toppingStatus", "toevoegen");
		var nieuwePrijs = tTotaalprijsPizza - toppingPrijs;
	}
	nieuwePrijs = nieuwePrijs.toFixed(2);
	eTotaalprijsPizza.setAttribute("data-totaalPrijs", nieuwePrijs);
	//eTotaalprijsPizza.innerHTML = "Totaalprijs pizza: € " + nieuwePrijs;
}




// function om alle objecten in array te tellen
function getAantalItemsInArray(arr){
	var result = 0;
	for(var prop in arr){
		if(arr.hasOwnProperty(prop)){
			result++;
		}
	}
	return result;
}

// function om filterselectie te kennen
function welkeRadioSelectie(nameRadioButtonsGroup){
	var radio = document.getElementsByName(nameRadioButtonsGroup)
	var aantalRadios = radio.length;
	for(i=0; i<aantalRadios; i++){
		if(radio[i].checked){
			return radio[i].value;
			break;
		}
	}
}

// function om producten te tonen
function toonAlleProducten(objArray){
	var dataLightboxHelper = 0;
	var filter = welkeRadioSelectie('filter');														// welke filter is geselecteerd?
	var aantalObjectenInArray = getAantalItemsInArray(objArray);									// hoeveel objecten in array?
	var eProductenlijst = document.getElementById('productenlijst');								// selecteer section element met id productenlijst
	while(eProductenlijst.firstChild){																// wis alle producten in section productenlijst
		eProductenlijst.removeChild(eProductenlijst.firstChild);										// wis alle producten in section productenlijst
	}
	for (i=0; i<aantalObjectenInArray; i++) {													// DOORLOOP ALLE OBJECTEN IN ARRAY
		if(objArray[i]['type'] == 'pizza' || objArray[i]['type'] == 'drank'){
			var eProductContainer = document.createElement("div");											// maak 1 div per product
			eProductContainer.className += " productContainer zetInBox cf " + objArray[i]['type'];			// set className voor div
			eProductContainer.setAttribute("id", "arrayID_" + i);											// set id element op productId
			var eProductTitel = document.createElement("h2");												// maak h2 voor producttitel
			var tProductTitel = document.createTextNode(objArray[i]['naam']);								// set tekst voor h2 producttitel
			eProductTitel.appendChild(tProductTitel);														// set tekst voor h2 producttitel
			eProductContainer.appendChild(eProductTitel);													// zet h2 in div
			var eProductPrijs = document.createElement("div");												// maak div voor prijs
			eProductPrijs.className += "productPrijs";														// set className voor productprijs
				var eenheidsprijsStandaard = objArray[i]['eenheidsprijsStandaard'];						// zet prijzen in "valuta-formaat"
				eenheidsprijsStandaard = parseFloat(eenheidsprijsStandaard);
				eenheidsprijsStandaard = eenheidsprijsStandaard.toFixed(2);
				var eenheidsprijsKorting = objArray[i]['eenheidsprijsKorting'];
				eenheidsprijsKorting = parseFloat(eenheidsprijsKorting);
				eenheidsprijsKorting = eenheidsprijsKorting.toFixed(2);
			if(objArray[i]['inPromotie'] == 0){																// is product niet in promotie?
				var tProductPrijs = document.createTextNode("€ " + eenheidsprijsStandaard);						// set tekst voor div standaardprijs
				var tPizzaPrijs = eenheidsprijsStandaard;
			}
			if(objArray[i]['inPromotie'] == 1){																// is product wel in promotie?
				var eStandaardPrijs = document.createElement("strike");											// maak strike element (doorstreepte tekst) voor standaardprijs
				eStandaardPrijs.className += " inHetRood";
				var tStandaardPrijs = document.createTextNode("€ " + eenheidsprijsStandaard);
				eStandaardPrijs.appendChild(tStandaardPrijs);
				var eBr = document.createElement("br");
				eProductPrijs.appendChild(eStandaardPrijs);
				eProductPrijs.appendChild(eBr);
				var tProductPrijs = document.createTextNode("€ " + eenheidsprijsKorting); 						// set tekst voor div kortingprijs
				var tPizzaPrijs = eenheidsprijsKorting;
				eProductContainer.className += " promo";													// set className voor producten in promo
				// als product in promotie -> maak extra radio voor promoties
				if(!document.getElementById("promoFilter")){
					var eFilter = document.getElementById("filter");
					var eInputFilterPromo = document.createElement("input");
					eInputFilterPromo.setAttribute("class", "productFilter");
					eInputFilterPromo.setAttribute("id", "promoFilter");
					eInputFilterPromo.setAttribute("type", "radio");
					eInputFilterPromo.setAttribute("name", "filter");
					eInputFilterPromo.setAttribute("value", "promo");

					var eFilterBox = document.createElement("div");
					eFilterBox.className += " inHetRood naastElkaar";
					tInputFilterPromo = document.createTextNode("Promoties");
					eFilterBox.appendChild(tInputFilterPromo);
					eFilter.appendChild(eInputFilterPromo);
					eFilter.appendChild(eFilterBox);
				}
			}
			eProductPrijs.appendChild(tProductPrijs);														// set tekst voor div prijs
			eProductContainer.appendChild(eProductPrijs);													// zet div met prijs in div productcontainer
			var preAfbeeldingLink = "";
			var eProductImageLink = document.createElement("a");
			eProductImageLink.setAttribute("href", preAfbeeldingLink + objArray[i]['afbeelding']);
				eProductImageLink.setAttribute("data-lightbox", objArray[i]['naam'] + "_" + dataLightboxHelper);
				dataLightboxHelper++;
				eProductImageLink.setAttribute("data-title", objArray[i]['naam'] + "<br>" + objArray[i]['beschrijving']);
			var eProductImage = document.createElement("img");												// maak 1 img element voor image product
			eProductImage.className += " productImage";														// set className voor img product
			eProductImage.src = preAfbeeldingLink + objArray[i]['afbeelding'];													// set source voor img product element
			eProductImageLink.appendChild(eProductImage);
			eProductContainer.appendChild(eProductImageLink);													// zet img product element in div
			var eProductBeschrijving = document.createElement("p");											// maak p element voor productbeschrijving
			eProductBeschrijving.className += " productBeschrijving";										// set classname voor productbeschrijving
			var tProductBeschrijving = document.createTextNode(objArray[i]['beschrijving']);				// set tekst voor p element
			eProductBeschrijving.appendChild(tProductBeschrijving);											// set tekst voor p element
			eProductContainer.appendChild(eProductBeschrijving);											// zet p element met beschrijving in div productcontainer

			// voeg toppings toe indien product = pizza
			if(objArray[i]['type'] == "pizza"){																/* als product een pizza is, maak dan 2 div elementen:
																												1ste element: "kies extra topping(s)" is klikbaar en toont 2de div element
																												2de element: bevat lijst  met de toppings */
				var eToppingToevoegen = document.createElement("div");												// maak 1ste div element
				eToppingToevoegen.className += " toppingElement";															// set classname voor 1ste div element
				eToppingToevoegen.className += " toonTopping";																// set id voor 1ste div element
				var eToppingLink = document.createElement("button");														// maak een button element
				eToppingLink.className += "pizzaBestellenKnop";																// set className voor button
				eToppingLink.setAttribute("id", "pizzaBestellenKnop_" + i);
				eToppingLink.setAttribute("data-productId", i);																// maak data-productID
				eToppingLink.setAttribute("data-pizzaPrijs", tPizzaPrijs);
				var tToppingLink = document.createTextNode("Pizza bestellen");												// set tekst voor button element
				eToppingLink.appendChild(tToppingLink);																		// set tekst voor button element
				eToppingToevoegen.appendChild(eToppingLink);																// zet link element in topping element
				var eToppingContainer = document.createElement("div");														// maak 2de div element
				eToppingContainer.className += " toppingContainer zetInBox";															// set class 2de div element
				eToppingContainer.setAttribute("id", "containerPizzaID_" + i);
				eToppingContainer.style.display = "none";
				var eToppingContainerTitel = document.createElement("h3");
				eToppingContainerTitel.className += " toppingContainerTitel";
				var tToppingContainerTitel = document.createTextNode("Kies extra topping(s):");
				eToppingContainerTitel.appendChild(tToppingContainerTitel);
				eToppingContainer.appendChild(eToppingContainerTitel);

				// toon / verberg topping"menu"
				eToppingToevoegen.addEventListener("click", function(){toggleToppings(objArray)});

				// maak topping"menu"
				for (var j=0; j<aantalObjectenInArray; j++){
					if(objArray[j]['type'] == "topping"){

						var eToppingItem = document.createElement("div");
						eToppingItem.className += " toppingItem";

						var eToppingImageLink = document.createElement("a");
						eToppingImageLink.setAttribute("href", objArray[j]['afbeelding']);

						eToppingImageLink.setAttribute("data-lightbox", objArray[j]['naam'] + "_" + dataLightboxHelper);
						dataLightboxHelper++;
						eToppingImageLink.setAttribute("data-title", objArray[j]['beschrijving']);

						var eToppingTitel = document.createElement("h4");
						eToppingTitel.className += "toppingTitel";
						var tToppingTitel = document.createTextNode("+ " + objArray[j]['naam']);
						eToppingTitel.appendChild(tToppingTitel);
						eToppingImageLink.appendChild(eToppingTitel);
						eToppingItem.appendChild(eToppingImageLink);

						tToppingBeschrijving = document.createTextNode("  - " + objArray[j]['beschrijving']);
						eToppingItem.appendChild(tToppingBeschrijving);


						var eenheidsprijsStandaard = objArray[j]['eenheidsprijsStandaard'];						// zet prijzen in "valuta-formaat"
						eenheidsprijsStandaard = parseFloat(eenheidsprijsStandaard);
						eenheidsprijsStandaard = eenheidsprijsStandaard.toFixed(2);
						var eenheidsprijsKorting = objArray[j]['eenheidsprijsKorting'];						// zet prijzen in "valuta-formaat"
						eenheidsprijsKorting = parseFloat(eenheidsprijsKorting);
						eenheidsprijsKorting = eenheidsprijsKorting.toFixed(2);

						var eToppingPrijsContainer = document.createElement("div");
						eToppingPrijsContainer.className += " toppingPrijsContainer";

						if(objArray[j]['inPromotie'] == 0){
							var tToppingPrijs = "(+ € " + eenheidsprijsStandaard + ")";
							var deToppingPrijs = eenheidsprijsStandaard;
						}
						if(objArray[j]['inPromotie'] == 1){
							if(objArray[j]['eenheidsprijsKorting'] == 0){
								var tToppingPrijs = "GRATIS!";
								var deToppingPrijs = 0;
							}
							if(objArray[j]['eenheidsprijsKorting'] > 0){
								var tToppingPrijs = "(+ € " + eenheidsprijsKorting + ")";
								var deToppingPrijs = eenheidsprijsKorting;
							}
						}
						eToppingPrijs = document.createTextNode(" " + tToppingPrijs);
						eToppingPrijsContainer.appendChild(eToppingPrijs);
						eToppingItem.appendChild(eToppingPrijsContainer);

						eToppingBestelKnop = document.createElement("button");
						eToppingBestelKnop.className += " toppingBestelKnop";
						eToppingBestelKnop.setAttribute("data-toppingID", j);
						eToppingBestelKnop.setAttribute("data-toppingPrijs", deToppingPrijs);
						eToppingBestelKnop.setAttribute("data-pizzaID", i)
						eToppingBestelKnop.setAttribute("data-toppingStatus", "toevoegen");
						tToppingBestelKnop = document.createTextNode("Deze topping toevoegen aan pizza");
						eToppingBestelKnop.appendChild(tToppingBestelKnop);

						eToppingBestelKnop.addEventListener("click", function(){toppingToevoegen(objArray, j)});
						eToppingItem.appendChild(eToppingBestelKnop);

						// zet elk toppingItem in toppingContainer
						eToppingContainer.appendChild(eToppingItem);
					}

				}
				// totaalprijs pizza
				var ePrijsPizza = document.createElement("div");
				ePrijsPizza.className += " prijsPizza";
				ePrijsPizza.setAttribute("id", "totaalprijsPizzaID_" + i);
				if(objArray[i]['inPromotie'] == 0){
					var tPrijsPizza = objArray[i]['eenheidsprijsStandaard'];
				}
				if(objArray[i]['inPromotie'] == 1){
					var tPrijsPizza = objArray[i]['eenheidsprijsKorting'];
				}
				tPrijsPizza = parseFloat(tPrijsPizza);
				tPrijsPizza = tPrijsPizza.toFixed(2);
				ePrijsPizza.setAttribute("data-totaalPrijs", tPrijsPizza);
				tPrijsPizza = "€ " + tPrijsPizza;
				tPrijsPizza = document.createTextNode("Pizza \"" + objArray[i]['naam'] + "\" (€ " + tPizzaPrijs + ")");
				var extraDiv = document.createElement("div");
				extraDiv.appendChild(tPrijsPizza)
				ePrijsPizza.appendChild(extraDiv);

				/*var eBr = document.createElement("br");
				ePrijsPizza.appendChild(eBr);*/
				var eSmall = document.createElement("small");
				eSmall.setAttribute("id", "toppingRijen_" + i);
				eSmall.setAttribute("data-pizzaID", i);
				var tSmall = document.createTextNode("Zonder extra topping");
				eSmall.appendChild(tSmall);
				ePrijsPizza.appendChild(eSmall);

				eToppingContainer.appendChild(ePrijsPizza);

				// Bestelknop pizza + eventuele toppings
				var eBestelKnopPizza = document.createElement("button");
				var ePizzaPrijs = document.getElementById("pizzaBestellenKnop_" + i);
				//var pizzaPrijs = ePizzaPrijs.getAttribute("data-pizzaprijs");
				eBestelKnopPizza.className += " bestelKnopPizza";
				eBestelKnopPizza.setAttribute("id", "bestelknopPizzaID_" + i);
				eBestelKnopPizza.setAttribute("data-topping", "geenTopping");
				eBestelKnopPizza.setAttribute("data-pizzaID", i);
				var tBestelKnopPizza = document.createTextNode("Deze pizza toevoegen aan winkelmandje");
				//var tBestelKnopPizza = document.createTextNode("Pizza \"" + objArray[i]['naam'] + "\" (€ " + tPizzaPrijs + ") in winkelmandje");
				eBestelKnopPizza.appendChild(tBestelKnopPizza);
				eToppingContainer.appendChild(eBestelKnopPizza);
				eBestelKnopPizza.addEventListener("click", function(){pizzaBestellen()});

				eToppingToevoegen.appendChild(eToppingContainer);
				eProductContainer.appendChild(eToppingToevoegen);											// zet 2de div element in productcontainer
			} // einde toppings toevoegen product = pizza
			eProductenlijst.appendChild(eProductContainer);													// zet div met alle childs in section productenlijst

			if (objArray[i]['type'] == "drank"){
				var eDrankBestellenKnop = document.createElement("button");														// maak een button element
				eDrankBestellenKnop.className += "drankBestellenKnop";																// set className voor button
				eDrankBestellenKnop.setAttribute("id", "drankBestellenKnop_" + i);
				eDrankBestellenKnop.setAttribute("data-productId", i);																// maak data-productID
				//eDrankBestellenKnop.setAttribute("data-drankPrijs", tPizzaPrijs);
				var tDrankBestellenKnop = document.createTextNode("Toevoegen aan winkelmandje");												// set tekst voor button element
				eDrankBestellenKnop.addEventListener("click", function(){drankBestellen()});
				eDrankBestellenKnop.appendChild(tDrankBestellenKnop);
				eProductContainer.appendChild(eDrankBestellenKnop);
			}
		}
		}

	// --- FILTERS ---
	// als filter = ALLE -> verberg enkel toppings
	if(filter == "alle"){
		eProductFilter = document.querySelectorAll('.topping');
		for(i=0; i<eProductFilter.length; i++){
			eProductFilter[i].style.display = "none";
		}
	}
	// als filter = PIZZA -> verberg toppings en drank
	if(filter == "pizza"){
		eProductFilter = document.querySelectorAll('.topping');
		for(i=0; i<eProductFilter.length; i++){
			eProductFilter[i].style.display = "none";
		}
		eProductFilter = document.querySelectorAll('.drank');
		for(i=0; i<eProductFilter.length; i++){
			eProductFilter[i].style.display = "none";
		}
	}
	// als filter = DRANK -> verberg topping en pizza
	if(filter == "drank"){
		eProductFilter = document.querySelectorAll('.topping');
		for(i=0; i<eProductFilter.length; i++){
			eProductFilter[i].style.display = "none";
		}
		eProductFilter = document.querySelectorAll('.pizza');
		for(i=0; i<eProductFilter.length; i++){
			eProductFilter[i].style.display = "none";
		}
	}
	// als filter = PROMO -> verberg alle producten en toon producten in promotie (uitgezonderd toppings)
	if(filter == "promo"){
		eProductFilter = document.querySelectorAll('.pizza');
		for(i=0; i<eProductFilter.length; i++){
			eProductFilter[i].style.display = "none";
		}
		eProductFilter = document.querySelectorAll('.drank');
		for(i=0; i<eProductFilter.length; i++){
			eProductFilter[i].style.display = "none";
		}
		eProductFilter = document.querySelectorAll('.promo');
		for(i=0; i<eProductFilter.length; i++){
			eProductFilter[i].style.display = "";
		}
		eProductFilter = document.querySelectorAll('.topping');
		for(i=0; i<eProductFilter.length; i++){
			eProductFilter[i].style.display = "none";
		}
	} // --- EINDE FILTERS ---
}



window.onload = function(){

	// toon alle producten
	toonAlleProducten(producten);
	var eProductFilter = document.querySelectorAll('.productFilter');							// selecteer alle radiobuttons
	for(i=0; i<eProductFilter.length; i++){													// doorloop alle radiobuttons
		var eFilter = eProductFilter[i];														// selecteer 1 radiobutton
		eFilter.addEventListener("click", function(){toonAlleProducten(producten)});			// set eventlistener voor radiobutton
	}
	var eNaarDeKassa = document.getElementById("naarDeKassa");
	eNaarDeKassa.addEventListener("click", function(){naarDeKassa(producten)});

} // einde window.onload

