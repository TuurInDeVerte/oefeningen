var winkelmandje = [
];
var aantalBesteldePizza = 0;

function pizzaBestellen(){
	aantalBesteldePizza = aantalBesteldePizza + 1;
	deKnop = event.target;
	var pizzaIdTeBestellen = deKnop.getAttribute("data-pizzaid");
	var toppingContainer = document.getElementById("containerPizzaID_" + pizzaIdTeBestellen);
	var pizzaBestellenKnop = document.getElementById("pizzaBestellenKnop_" + pizzaIdTeBestellen);
	var pizzaMandje = document.getElementById("pizzaMandje");
	var eAantalPizza = document.getElementById("aantalPizza");
	var bestelknopPizzaId = document.getElementById("bestelknopPizzaID_" + pizzaIdTeBestellen);
	var pizzaHeeftToppings = bestelknopPizzaId.getAttribute("data-topping");
	var besteldePizza = [];
	besteldePizza.push(pizzaIdTeBestellen);

	var toppingRijen = document.getElementById("toppingRijen_" + pizzaIdTeBestellen);
	if(pizzaHeeftToppings == "welTopping"){
		var besteldeToppings = toppingRijen.childNodes;
		var aantalToppings = besteldeToppings.length;
		for (i=0; i<aantalToppings; i++) {
			var besteldeToppingId = besteldeToppings[i].getAttribute("data-toppingID");
			besteldePizza.push(besteldeToppingId);
		};
	}
	winkelmandje.push(besteldePizza);
	pizzaMandje.setAttribute("data-aantalBesteldePizza", aantalBesteldePizza);


	$(toppingContainer).hide( "slide", { direction: "right" }, "slow" );
	$(pizzaMandje).hide("slide", { direction: "right" }, "slow");

	$(pizzaMandje).show( "bounce", { times: 3 }, "slow");
	setTimeout(function(){eAantalPizza.innerHTML = aantalBesteldePizza;}, 500);

	pizzaBestellenKnop.innerHTML = "Nog zo'n pizza bestellen";
	pizzaBestellenKnop.setAttribute("data-besteld", 1);


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
			var tExtraLijn = document.createTextNode("+ " + toppingNaam + " (€ " + toppingPrijs.toFixed(2) + ")");
			eExtraLijn.appendChild(tExtraLijn);
			eExtraLijn.setAttribute("id", "gekozenToppingID_" + toppingId);
			eExtraLijn.setAttribute("data-pizzaID", pizzaId);
			eExtraLijn.setAttribute("data-toppingID", toppingId);
			tBestelknop.appendChild(eExtraLijn);
			eBestelknop.setAttribute("data-topping", "welTopping");
		}
		else {
			var eExtraLijn = document.createElement("div");
			var tExtraLijn = document.createTextNode("+ " + toppingNaam + " (€ " + toppingPrijs.toFixed(2) + ")");
			eExtraLijn.appendChild(tExtraLijn);
			eExtraLijn.setAttribute("id", "gekozenToppingID_" + toppingId);
			eExtraLijn.setAttribute("data-pizzaID", pizzaId);
			eExtraLijn.setAttribute("data-toppingID", toppingId);
			tBestelknop.appendChild(eExtraLijn);
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
	eTotaalprijsPizza.innerHTML = "Totaalprijs pizza: € " + nieuwePrijs;
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
	for(var i=0; i<aantalRadios; i++){
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
	for (var i=0; i<aantalObjectenInArray; i++) {													// DOORLOOP ALLE OBJECTEN IN ARRAY
		if(objArray[i]['type'] == 'pizza' || objArray[i]['type'] == 'drank'){
			var eProductContainer = document.createElement("div");											// maak 1 div per product
			eProductContainer.className += " productContainer zetInBox cf " + objArray[i]['type'];			// set className voor div
			eProductContainer.setAttribute("id", "arrayID_" + i);									// set id element op productId
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
					tInputFilterPromo = document.createTextNode("Promoties");
					eFilter.appendChild(eInputFilterPromo);
					eFilter.appendChild(tInputFilterPromo);
				}
			}
			eProductPrijs.appendChild(tProductPrijs);														// set tekst voor div prijs
			eProductContainer.appendChild(eProductPrijs);													// zet div met prijs in div productcontainer
			var eProductImage = document.createElement("img");												// maak 1 img element voor image product
			eProductImage.className += " productImage";														// set className voor img product
			eProductImage.src = objArray[i]['afbeelding'];													// set source voor img product element
			eProductContainer.appendChild(eProductImage);													// zet img product element in div
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
				tPrijsPizza = document.createTextNode("Totaalprijs pizza: " + tPrijsPizza);
				ePrijsPizza.appendChild(tPrijsPizza);
				eToppingContainer.appendChild(ePrijsPizza);


				// Bestelknop pizza + eventuele toppings
				var eBestelKnopPizza = document.createElement("button");
				var ePizzaPrijs = document.getElementById("pizzaBestellenKnop_" + i);
				//var pizzaPrijs = ePizzaPrijs.getAttribute("data-pizzaprijs");
				eBestelKnopPizza.className += " bestelKnopPizza";
				eBestelKnopPizza.setAttribute("id", "bestelknopPizzaID_" + i);
				eBestelKnopPizza.setAttribute("data-topping", "geenTopping");
				eBestelKnopPizza.setAttribute("data-pizzaID", i);
				var tBestelKnopPizza = document.createTextNode("Bestel pizza \"" + objArray[i]['naam'] + "\" (€ " + tPizzaPrijs + ")");
				eBestelKnopPizza.appendChild(tBestelKnopPizza);
				var eBr = document.createElement("br");
				eBestelKnopPizza.appendChild(eBr);
				var eSmall = document.createElement("small");
				eSmall.setAttribute("id", "toppingRijen_" + i);
				eSmall.setAttribute("data-pizzaID", i);
				var tSmall = document.createTextNode("Zonder extra topping");
				eSmall.appendChild(tSmall);
				eBestelKnopPizza.appendChild(eSmall);
				eToppingContainer.appendChild(eBestelKnopPizza);
				eBestelKnopPizza.addEventListener("click", function(){pizzaBestellen()});

				eToppingToevoegen.appendChild(eToppingContainer);
				eProductContainer.appendChild(eToppingToevoegen);											// zet 2de div element in productcontainer
			} // einde toppings toevoegen product = pizza


			eProductenlijst.appendChild(eProductContainer);													// zet div met alle childs in section productenlijst
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


} // einde window.onload

