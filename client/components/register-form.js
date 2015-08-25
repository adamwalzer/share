var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
};

var isValidPassword = function(val) {
  if (val.length >= 6) {
    return true;
  } else {
    Session.set('displayMessage', 'Error &amp; Too short.')
    return false; 
  }
};

Template.registerForm.helpers({
	registerError: function() {
		return Session.get('registerError');
	}
});

Template.registerForm.events({
  'submit #register-form' : function(e, t) {
    e.preventDefault();
    var email = trimInput(t.find('#account-email').value)
      , password = trimInput(t.find('#account-password').value);

      // Trim and validate the input

    Accounts.createUser({email: email, password: password}, function(err){
      if (err) {
        // Inform the user that account creation failed
        // console.log(err);
        if(err.error === 403) {
        	Session.set('registerError',"An account for this email already exists.");
        }
      } else {
        // Success. Account has been created and the user
        // has logged in successfully.
        console.log("you're in");
        Meteor.call('updateNewUser');
      }
    });

    return false;
  }
});