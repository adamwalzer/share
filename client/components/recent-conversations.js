Template.recentConversations.helpers({
	conversations: function() {
		// console.log(Conversations.find().fetch());
		// return Conversations.find();
		var conversations = [];
		var openConversations = Meteor.user().openConversations;
		_.each(openConversations, function(i) {
			conversations.push(Conversations.find({_id: i}).fetch()[0])
		});
		return conversations;
		// return Conversations.find({_id: {$in: openConversations||[]}});

	},
	conversationTitle: function() {
		var title = this.title;
		if(!title) {
			_.each(this.users, function(i) {
				var u = Meteor.users.find({_id: i.userId}).fetch()[0];
				var name = u['display-name'] || u['first-name'] || u.emails[0].address;
				title = title?title+", "+name:name;
			});
		}
		return title;
	}
});

Template.recentConversations.events({
	'click .close': function() {
  	var openConversations = Meteor.user().openConversations;
  	var i = Meteor.user().openConversations.indexOf(this._id);
  	openConversations.splice(i, 1);
  	var d = [{
  		name: 'openConversations',
  		value: openConversations
  	}];
  	Meteor.call('updateUser', d);
	},
	'click .open-conversation': function(e) {
		e.preventDefault();
		var cid = $(e.currentTarget).data('conversation-id');
		$("html, body").animate({scrollTop: $('.convo-'+cid).offset().top},500);
	}
});