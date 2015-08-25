Template.conversations.created = function() {
	// console.log(this);
	// Meteor.call('getMessages', function(err, data) {
	// 	if(err)
	// 		console.log(err);
	// 	Session.set('messages', data);
	// });
};

Template.conversations.helpers({
	openConversations: function() {
		return Meteor.user().openConversations;
	}
});