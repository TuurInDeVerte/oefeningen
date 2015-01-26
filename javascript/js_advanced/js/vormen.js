/***** FUNCTIES *****/
function enumerate(obj){
	// overloop alle eigenschappen van een object
	// return string
	var strProps = "";
	for(var key in obj){
		if(typeof obj[key] === "object"){
			strProps += enumerate(obj[key]);
		}
		else{
			strProps += key + "(" + typeof obj[key] + "): " + obj[key] + "\n";
		}
	}
	return strProps;
} // end function enumerate


/* ================ DOM ready ==================== */
window.onload = function(){
	var eOutput = document.querySelector("#output");



/***** Vorm Class *****/
function Vorm(naam, type){
	this.naam = naam;
	this.type = type;
	this.tekst = "Hallo, ik ben " + this.naam + ", ik ben een " + this.type;
	this.spreek = function(){
		eOutput.innerHTML += "<br>" + this.tekst;
	};
	this.schrijf = function(){
		console.log(enumerate(this));
	};
	this.oppervlakte = function(){};
	this.omtrek = function(){};
}

/***** Cirkel Class *****/
function Cirkel(naam, type, straal){
	// call superclass constructor (Vorm)
	Vorm.call(this, naam, type);

	this.oppervlakte = function(){
		var opp = straal * straal * Math.PI;
		return opp;
	}();
	this.omtrek = function(){
		var omtr = 2 * straal * Math.PI;
		return omtr;
	}();

	this.straal = straal;
	this.tekst += " - Ik heb een straal van: " + straal + "cm, een omtrek van: " + this.omtrek + "cm en een oppervlakte van: " + this.oppervlakte + "cm";


}

/***** Veelhoek Class *****/
function Veelhoek(naam, type, aantalHoeken){
	// call superclass constructor (Vorm)
	Vorm.call(this, naam, type);
	this.aantalHoeken = aantalHoeken;
	this.tekst += " - Ik heb " + aantalHoeken + " hoeken";
}

/***** Driehoek Class *****/
function Driehoek(naam, type, aantalHoeken, arrZijden){
	// call superclass constructor (Veelhoek)
	Veelhoek.call(this, naam, type, aantalHoeken);

	this.zijden = arrZijden;
	var zijde1 = arrZijden[0];
	var zijde2 = arrZijden[1];
	var zijde3 = arrZijden[2];

	this.omtrek = function(){
		var omtr = zijde1 + zijde2 + zijde3;
		return omtr;
	}();
	this.oppervlakte = function(){
		var halveOmtrek = (zijde1 + zijde2 + zijde3) / 2;
		var opp = Math.sqrt(halveOmtrek * (halveOmtrek - zijde1) * (halveOmtrek - zijde2) * (halveOmtrek - zijde3));
		return opp;
	}();
	this.tekst += ", een omtrek van: " + this.omtrek + "cm en een oppervlakte van: " + this.oppervlakte + "cm";
}

/***** Vierhoek Class *****/
function Vierhoek(naam, type, aantalHoeken, lengte, breedte){
	// call superclass constructor (Veelhoek)
	Veelhoek.call(this, naam, type, aantalHoeken);

	this.lengte = lengte;
	this.breedte = breedte;

	this.omtrek = function(){
		var omtr = (lengte * 2) + (breedte * 2);
		return omtr;
	}();
	this.oppervlakte = function(){
		var opp = lengte * breedte;
		return opp;
	}();
	this.tekst += ", een omtrek van: " + this.omtrek + "cm en een oppervlakte van: " + this.oppervlakte + "cm";
}

/***** Vierkant Class *****/
function Vierkant(naam, type, aantalHoeken, zijde){
	// call superclass constructor (Vierhoek)
	Vierhoek.call(this, naam, type, aantalHoeken, zijde, zijde);
}

// Instanties
var eersteCirkel = new Cirkel("Rondje", "cirkel", 5);
eersteCirkel.spreek();
eersteCirkel.schrijf();

var eersteVeelhoek = new Veelhoek("Octagon", "achthoek", 8);
eersteVeelhoek.spreek();
eersteVeelhoek.schrijf();

var eersteDriehoek = new Driehoek("Piramide", "driehoek", 3, [9, 5, 6]);
eersteDriehoek.spreek();
eersteDriehoek.schrijf();

var eersteVierhoek = new Vierhoek("Kader", "vierhoek", 4, 8, 4);
eersteVierhoek.spreek();
eersteVierhoek.schrijf();

var eersteVierkant = new Vierkant("GelijkzijdigeVierhoek", "vierkant", 4, 5);
eersteVierkant.spreek();
eersteVierkant.schrijf();

} // einde window onload