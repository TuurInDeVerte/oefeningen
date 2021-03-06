var winkelmandje = localStorage.getItem("winkelmandje");
winkelmandje = JSON.parse(winkelmandje);
winkelmandje = JSON.stringify(winkelmandje);

function toonVerbergLeveringDetails(){
	console.log('in toonVerbergLeveringDetails');
	var checkbox = event.target || event.srcElement;
	if(checkbox.checked){
		$("#gemeenteVeld").show();
		$("#adresVeld").show();
	}
	else{
		$("#gemeenteVeld").hide();
		$("#adresVeld").hide();
	}
}


// form validation
/*(function($, W, D)
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
						checkLevering: true
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
					},
					// indien levering aangevinkt
					selGemeente: {
						checkLevering: " Kies uw gemeente"
					},
					txtAdres: {
						required: " Om uw pizza's thuis te kunnen leveren hebben we uw adres nodig..."
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

})(jQuery, window, document);*/
// end form validation

window.onload = function(){
	var eCheckLevering = document.getElementById("checkLevering");
		$("#gemeenteVeld").hide();
		$("#adresVeld").hide();
	eCheckLevering.addEventListener("change", toonVerbergLeveringDetails);
}

// validation checkbox
jQuery.validator.addMethod('checkLevering', function(value){
	if($("#checkLevering").prop("checked")){
		return(value != "notGood");
	}
	else{
		return(value == "notGood");
	}

}, "Kies uw gemeente");

