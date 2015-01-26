// array met weergegevens
var weergegevens2009 = [
	["temperatuur","neerslag"],
	["jan",0.7,62.9],
	["feb",3.6,57.1],
	["mar",6.7,68.2],
	["apr",12.5,47.1],
	["mei",14.4,43.1],
	["jun",16.6,64.5],
	["jul",18.7,73.1],
	["aug",19.4,34.7],
	["sep",15.8,29.1],
	["okt",11.3,105],
	["nov",9.7,98],
	["dec",2.9,80.8]
]

function Punt(x,y){
	// constructor function voor een punt object
	this.x = x;
	this.y = y;
}

/***** superClass Vorm *****/
function Vorm(lijnkleur, vulkleur, vullen){
	// constructor superClass Vorm
	// @lijnkleur & @vulkleur		geldige css kleur
	// @vullen						boolean, opvullen of enkel rand tekenen

	this.lijnkleur 		= lijnkleur;
	this.vulkleur 		= vulkleur;
	this.vullen			= vullen || false;

	this.teken = function(){};
}

function Balk(arrPunten, lijnkleur, vulkleur, vullen){
	// constructor voor Balk
	// @lijnkleur & @vulkleur		geldige css kleur
	// @vullen						boolean, opvullen of enkel rand tekenen
	// @arrPunten					array van punt objecten

	// call superclass constructor (Vorm)
	Vorm.call(this, lijnkleur, vulkleur, vullen);
	this.punten = arrPunten || [];

	this.teken = function(c){
		if(c){
			var ctx = c.getContext('2d');
			if(ctx){
				ctx.lineWidth = 2;
				ctx.strokeStyle = this.lijnkleur;
				ctx.fillStyle = this.vulkleur;
				ctx.beginPath();
				ctx.moveTo(this.punten[0].x, this.punten[0].y);
				for(var i = 1; i < this.punten.length; i++){
					ctx.lineTo(this.punten[i].x, this.punten[i].y)
				}
				ctx.closePath();
				if(vullen === true){
					ctx.fill();
				}
				ctx.stroke();
			}
		}
	}
}

function Lijn(beginpunt, eindpunt, kleur, vullen){
	// constructor voor Lijn
	// @lijnkleur & @vulkleur		geldige css kleur
	// @vullen						boolean, opvullen of enkel rand tekenen
	// @beginpunt & @eindpunt		punt objecten

	// call superclass constructor (Vorm)
	Vorm.call(this, kleur, kleur, vullen);

	this.beginpunt = beginpunt;
	this.eindpunt  = eindpunt;

	this.teken = function(c){
		if(c){
			var ctx = c.getContext('2d');
			if(ctx){
				ctx.lineWidth = 3;
				ctx.strokeStyle = this.lijnkleur;
				ctx.fillStyle = this.vulkleur;
				ctx.beginPath();
				ctx.moveTo(beginpunt.x, beginpunt.y);
				ctx.lineTo(eindpunt.x, eindpunt.y);
				ctx.closePath();
				ctx.stroke();
			}
		}
	}
}

function temperatuur(c){
	// teken lijnen adhv array weergevens2009
	var x = (800/12)/2;
	for(i = 1; i < weergegevens2009.length - 1; i++){
		var p1 = new Punt(x, 600 - weergegevens2009[i][1]*25);
		x += 800/12;
		var j = i + 1;
		var p2 = new Punt(x, 600 - weergegevens2009[j][1]*25);

		var v = new Lijn(p1, p2, "red", true);

		v.teken(c);
	}
}

function neerslag(c){
	// teken balken adhv array weergegevens2009
	var x = 0;
	for(i = 1; i < weergegevens2009.length; i++){
		var p1 = new Punt(x, 600);
		var p2 = new Punt(x, 600 - weergegevens2009[i][2]*5);
		x += 800/12;
		var p3 = new Punt(x, 600 - weergegevens2009[i][2]*5);
		var p4 = new Punt(x, 600);

		var v = new Balk([p1, p2, p3, p4], "blue", "grey", true);
		v.teken(c);
	}
}

window.onload = function(){
	neerslag(canvas);
	temperatuur(canvas);
}


