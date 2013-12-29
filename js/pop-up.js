//basic fancybox setup
	function validateName(name) { 
		var reg = /^[A-ZА-ЯІЇЄҐ]{1}[a-zа-яіїєґ]{3,}(\s{1}[A-ZА-ЯІЇЄҐ]{1}[a-zа-яіїєґ]{3,}){0,2}$/;
	    return reg.test(name);
	}

	
	
	$(document).ready(function() {
		$(".modalbox").fancybox();
		$("#contact").submit(function() { return false; });

		
		$("#send").on("click", function(){
			var nameval  = $("#name").val();
			var phoneval = $("#user_phone").val();
			var phonelen = phoneval.length;
			var namevalid = validateName(nameval);
			
			if(namevalid == false) {
				$("#name").addClass("error");
			}
			else if(namevalid == true){
				$("#name").removeClass("error");
			}
			
			if(phonelen < 10) {
				$("#user_phone").addClass("error");
			}
			else if(phonelen >= 10){
				$("#user_phone").removeClass("error");
			}
			
			if(namevalid == true && phonelen >= 10) {
				// if both validate we attempt to send the e-mail
				// first we hide the submit btn so the user doesnt click twice
				$("#send").replaceWith("<em>отправка...</em>");
				
				$.ajax({
					type: 'POST',
					url: 'http://localhost:8888/send_mail/',
					crossDomain: true,
					data: $("#contact").serialize(),
					success: function(data) {
						if(data == "true") {
							$("#contact").fadeOut("fast", function(){
								$(this).before("<p><strong>Спасибо. С вами свяжуться в течении часа.</strong></p>");
								setTimeout("$.fancybox.close()", 1000);
							});
						}
					}
				});
			}
		});
	});