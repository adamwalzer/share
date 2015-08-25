Template.account.helpers({
	emailPlaceholder: function() {
		return Meteor.user().emails[0].address || "email";
	},
	firstNamePlaceholder: function() {
		return Meteor.user()['first-name'] || "first name";
	},
	lastNamePlaceholder: function() {
		return Meteor.user()['last-name'] || "last name";
	},
	displayNamePlaceholder: function() {
		return Meteor.user()['display-name'] || "display name";
	}
});

Template.account.events({
	"submit form": function(e) {
		e.preventDefault();
		// console.log($(e.currentTarget).serializeArray());
		Meteor.call('updateUser', $(e.currentTarget).serializeArray());
	},
	'change .profile-picture-input': function(e, t) {
		FS.Utility.eachFile(e, function(file) {
			console.log(file);
	    ProfilePictures.insert(file, function (err, fileObj) {
	      if (err){
	        // handle error
	      } else {
	          // handle success depending what you need to do
	        var imagesURL = {
	          "profile.image": "/cfs/files/profile-pictures/" + fileObj._id
	        };
					Meteor.call('insertProfilePicture',imagesURL);
	      }
	    });
		});
  },
});