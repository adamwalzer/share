Template.loginForm.created = function () {
  if(Meteor.user()) {
    Router.go("/");
  }
};

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

Template.loginForm.helpers({
  loginError: function() {
    return Session.get('loginError');
  }
});

Template.loginForm.events({
  'submit #login-form' : function(e, t) {
    e.preventDefault();
    // retrieve the input field values
    var email = trimInput(t.find('#login-email').value)
      , password = trimInput(t.find('#login-password').value);

    if(isValidPassword(password)) {
      Meteor.loginWithPassword(email, password, function(err){
	      if (err) {
	        // The user might not have been found, or their passwword
	        // could be incorrect. Inform the user that their
	        // login attempt has failed.
	        // console.log(err);
          if(err.error === 403) {
            Session.set('loginError',"These credentials do not match an user in our database.");
          }
	      } else {
	        // The user has been logged in.
	        // console.log("you're in");
          Router.go("/");
	      }
	    });
	    return false; 
    }
  }
});