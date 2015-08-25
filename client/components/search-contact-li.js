Template.searchContactLI.helpers({
	emailAddress: function() {
		return this.emails?this.emails[0].address:"no email";
	},
	displayName: function() {
		return this['display-name']||this['first-name']||this.emails[0].address||"no display name";
	},
	contactID: function() {
		return this._id;
	}
});

Template.searchContactLI.events({
	'click .add': function(e) {
		e.preventDefault();
		var $this = $(e.currentTarget);
		Meteor.call('addContact', $this.data('contact-id'), function() {
			console.log(Contacts.find().fetch());
			// this needs to be changed to a responsive subscription.
			Meteor.subscribe('users');
		});
	}
});