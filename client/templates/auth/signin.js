Template.signin.rendered = function(){
	$('.ui.checkbox').checkbox();
}

Template.signin.events({
	'submit #signin-form' : function(e, t){
		e.preventDefault();
		var trimInput = function(val) {
			return val.replace(/^\s*|\s*$/g, "");
		}
		// retrieve the input field values
		var email = trimInput(t.find('#email').value);
		var password = t.find('#password').value;

		// If validation passes, supply the appropriate fields to the
		// Meteor.loginWithPassword() function.
		Meteor.loginWithPassword(email, password, function(err){
			if (err){
				// The user might not have been found, or their passwword
				// could be incorrect. Inform the user that their
				// login attempt has failed. 
				console.log('error', err)
				Session.set('displayMessage', 'Error: Invalid login attempt, please try again.')
			}
			else{
				Meteor.subscribe("userData", Meteor.userId());
				Router.go('/')
			}
			
		});
		return false; 
	}
});