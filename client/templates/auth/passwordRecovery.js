if (Accounts._resetPasswordToken) {
    Session.set('resetPassword', Accounts._resetPasswordToken);
}

Template.passwordRecovery.helpers({
    resetPassword : function(t) {
      return Session.get('resetPassword');
    }
});

Template.passwordRecovery.events({
	'submit #recovery-form' : function(e, t) {
		e.preventDefault()
		var email = trimInput(t.find('#recovery-email').value)
		if (isNotEmpty(email) && isEmail(email)) {
			Session.set('loading', true);
			Accounts.forgotPassword({email: email}, function(err){
				if (err)
					Session.set('displayMessage', 'Error: Problem with forgotten password, please contact the admin.')
				else {
					Session.set('displayMessage', 'Success: Email Sent, please check your email.')
				}
					Session.set('loading', false);
			});
		}
		return false; 
	},

	'submit #new-password' : function(e, t) {
		e.preventDefault();
		var pw = t.find('#new-password-password').value;
		if (isNotEmpty(pw) && isValidPassword(pw)) {
			Session.set('loading', true);
			Accounts.resetPassword(Session.get('resetPassword'), pw, function(err){
				if (err)
					Session.set('displayMessage', 'Error: Problem with resetting password, please contact the admin.')
				else {
					Session.set('resetPassword', null);
				}
				Session.set('loading', false);
			});
		}
		return false; 
	}
  });