Tracker.autorun(function() {
	// Whenever this session variable changes, run this function.
	var message = Session.get('displayMessage');
	if(message){
		var msgArray = message.split(':');
		var type = msgArray[0];
		var msg = msgArray[1];

		toastr.options = {
		  "closeButton": false,
		  "debug": false,
		  "progressBar": false,
		  "positionClass": "toast-bottom-right",
		  "onclick": null,
		  "showDuration": "300",
		  "hideDuration": "1000",
		  "timeOut": "5000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		}

		if(type.toLowerCase() == 'warning')
			toastr.warning(msg);
		if(type.toLowerCase() == 'success')
			toastr.success(msg);
		if(type.toLowerCase() == 'error')
			toastr.error(msg);
		if(type.toLowerCase() == 'log')
			toastr.log(msg);

		Session.set('displayMessage', null);
	}
});

Template.signup.rendered = function(){
	$('.ui.checkbox').checkbox();
	$('.ui.accordion').accordion();
}

Template.signup.events({
	'submit #signup-form': function(e, t){
		
		e.preventDefault();
		
		var trimInput = function(val) {
			return val.replace(/^\s*|\s*$/g, "");
		}

		var isValidPassword = function(val) {
			if (val.length >= 6) {
				return true;
			} else {
				Session.set('displayMessage', 'Error: Password length is too short.')
				return false; 
			}
		}

      	var email = trimInput(t.find('#email').value);
        var password = t.find('#password').value;

        if(isValidPassword(password)){
			Accounts.createUser({email: email, password : password}, function(err){
				if (err) {
					console.log("createUser error: ", err);
	                Session.set('displayMessage', "Error: " + err);
				} else {
					Session.set('displayMessage', "Success: New account created successfully! Sign in to get started!");
					Router.go('/signin');
				}

			});
        }
		return false;
    },
	'click #terms-of-service-link': function(){
		$('#terms-of-service').toggleClass('hidden');
	},
	'click #agree-button': function(){
		$('.ui.checkbox #terms-of-service-link').checkbox('check');
		window.scrollTo(0,0);
		$('#email').focus();
	}
});

Template.termsofservice.renedered = function(){
	$('.ui.accordion').accordion();
}