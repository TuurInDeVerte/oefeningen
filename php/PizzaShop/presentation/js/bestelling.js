var winkelmandje = localStorage.getItem("winkelmandje");
winkelmandje = JSON.parse(winkelmandje);
winkelmandje = JSON.stringify(winkelmandje);

function toonVerbergLeveringDetails(){
	console.log('in toonVerbergLeveringDetails');
	var checkbox = event.target || event.srcElement;
	// var gemeenteVeld = document.getElementById("gemeenteVeld");
	// var adresVeld = document.getElementById("adresVeld");
	if(checkbox.checked){
		$("#gemeenteVeld").show();
		$("#adresVeld").show();
		// adresVeld.style.display = "block";
		// gemeenteVeld.style.display = "block";
	}
	else{
		$("#gemeenteVeld").hide();
		$("#adresVeld").hide();
		// adresVeld.style.display = "none";
		// gemeenteVeld.style.display = "none";
	}
}

// form validation
(function($, W, D)
{
	var JQUERY4 = {};
	JQUERY4.UTIL =
	{
		setupFormValidation: function()
		{
			// form validation rules
			$("#nieuweGebruikerForm").validate({
				debug: true,
				rules: {
					txtGebruikersnaam: "required",
					txtWachtwoord: {
						required: true,
						minlength: 6
					},
					txtHerhaalWachtwoord: {
						equalTo: "#wachtwoord"
					},
					txtEmailadres: {
						required: true,
						email: true
					},
					numberTelefoonnummer: {
						required: true
					},
					// indien "levering" aangevinkt
					selGemeente: {
						required: "#checkLevering:checked",
						required: function 
						//kijken op
						//http://stackoverflow.com/questions/14896854/jquery-select-box-validation
					},
					txtAdres: {
						required: "#checkLevering:checked"
					}
				},
				messages: {
					txtGebruikersnaam: " Gelieve een gebruikersnaam in te voeren",
					txtWachtwoord: {
						required: " Gelieve een wachtwoord in te voeren",
						minlength: " Het wachtwoord moet minstens 6 tekens lang zijn"
					},
					txtHerhaalWachtwoord: {
						equalTo: " De ingegeven waarde is niet identiek aan het gekozen wachtwoord"
					},
					txtEmailadres: {
						required: " Gelieve uw emailadres in te voeren",
						email: " Het ingegeven emailadres is niet correct"
					},
					numberTelefoonnummer: {
						required: " Gelieve uw telefoonnummer in te voeren"
					}
				},
				submitHandler: function(form) {
					form.submit();
				}
			});
		}
	}
	$(D).ready(function($){
		JQUERY4.UTIL.setupFormValidation();
	});

})(jQuery, window, document);

window.onload = function(){
	var eCheckLevering = document.getElementById("checkLevering");
		$("#gemeenteVeld").hide();
		$("#adresVeld").hide();
	eCheckLevering.addEventListener("change", toonVerbergLeveringDetails);
}