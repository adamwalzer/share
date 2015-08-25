Meteor.subscribe("users", function() {
	Session.set('usersLoaded',true);
});
Meteor.subscribe("messages");
Meteor.subscribe("contacts-lists");
Meteor.subscribe("contacts");
Meteor.subscribe("search-results");
Meteor.subscribe("conversations");
Meteor.subscribe("profile-pictures");