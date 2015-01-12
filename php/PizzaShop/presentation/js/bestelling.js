var winkelmandje = localStorage.getItem("winkelmandje");
winkelmandje = JSON.parse(winkelmandje);
winkelmandje = JSON.stringify(winkelmandje);


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
				debug: false,
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
					txtTelefoonnummer: {
						required: true,

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
						required: " Gelieve een emailadres in te voeren",
						email: " Het ingegeven emailadres is niet correct"
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