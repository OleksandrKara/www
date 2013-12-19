//basic fancybox setup
	function validateName(name) { 
		/*var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		*/
		var reg = /^[A-zа-яА-ЯёЁа-яіїєґ ]+$/;
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
					url: 'sendmessage.py',
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