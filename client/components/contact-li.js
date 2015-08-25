Template.contactLI.created = function() {
	this.data.user = Meteor.users.find({_id: this.data.contactId}).fetch()[0];
};

Template.contactLI.helpers({
	class: function() {
		if(!this.user) this.user = Meteor.users.find({_id: this.contactId}).fetch()[0];
		if(Session.get('contactFilter')) {
			var r = new RegExp(Session.get('contactFilter'), 'i');
			if(!this.user.emails[0].address.match(r) && !this.user['display-name'].match(r)) {
				return "hide";
			}
		}
		return "show";
	},
	email: function() {
		if(!this.user) this.user = Meteor.users.find({_id: this.contactId}).fetch()[0];
		return this.user?this.user.emails[0].address:"no email";
	},
	nickname: function() {
		if(!this.user) this.user = Meteor.users.find({_id: this.contactId}).fetch()[0];
		return this.user?this.nickname || this.user['display-name'] || "no display name":this.nickname||"no display name";
	},
	displayName: function() {
		if(!this.user) this.user = Meteor.users.find({_id: this.contactId}).fetch()[0];
		return this.user?this.user['display-name'] || "no display name":"no display name";
	},
	firstName: function() {
		if(!this.user) this.user = Meteor.users.find({_id: this.contactId}).fetch()[0];
		return this.user?this.user['first-name'] || "no first name":"no first name";
	},
	lastName: function() {
		if(!this.user) this.user = Meteor.users.find({_id: this.contactId}).fetch()[0];
		return this.user?this.user['last-name'] || "no last name":"no last name";
	},
	contactID: function() {
		return this.contactId;
	},
	showConversations: function() {
		// return Session.get('showConversations'+this.contactId);
		return Conversations.find({$and: [{users: {$elemMatch: {userId: Meteor.user()._id}}},{users: {$elemMatch: {userId: this.contactId}}},{deleted: {$exists: false}}]})
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

Template.contactLI.events({
	'click .contact > .delete':function(e) {
		e.preventDefault();
		Meteor.call('deleteContact',this.contactId);
	},
	'click .conversation a': function(e) {
		e.preventDefault();
		var $this = $(e.currentTarget);
		var cid = $this.parent().data('conversation-id')
		Meteor.call('openConversation', cid, function(err, data) {
			if(err)
				console.log(err);
			Session.set('messages', data);
			$("html, body").animate({scrollTop: $('.convo-'+cid).offset().top},500);
		});
	},
	'click .contact-conversations .delete': function(e) {
		var $this = $(e.currentTarget);
		Meteor.call('deleteConversation', $this.parent().data('conversation-id'));
	},
	'click .start-conversation': function(e) {
		e.preventDefault();
		Meteor.call('createConversation', $(e.currentTarget).closest('.contact').data('contact-id'));
	},
	'click .show-conversations': function(e) {
		e.preventDefault();
		var $this = $(e.currentTarget);
		// var contactId = $this.parent().data('contact-id');
		$this.removeClass('show-conversations').addClass('hide-conversations').parent().find('.contact-conversations').addClass('active');
		// Meteor.call('showConversations', contactId, function(err, data) {
		// 	if (err)
		// 		console.log(err);
		// 	Session.set('showConversations'+contactId, data);
		// });
	},
	'click .hide-conversations': function(e) {
		e.preventDefault();
		var $this = $(e.currentTarget);
		$this.addClass('show-conversations').removeClass('hide-conversations').parent().find('.contact-conversations').removeClass('active');
		Session.set('showConversations'+this._id, null);
	},
	'click .show-profile': function(e) {
		e.preventDefault();
		$(e.currentTarget).removeClass('show-profile').addClass('hide-profile').parent().find('.profile').addClass('active');
	},
	'click .hide-profile': function(e) {
		e.preventDefault();
		$(e.currentTarget).removeClass('hide-profile').addClass('show-profile').parent().find('.profile').removeClass('active');
	},
	'submit .update-nickname': function(e) {
		e.preventDefault();
		var val = $(e.currentTarget).find('input').val();
		Meteor.call('updateContact', {
			contactId: this.contactId,
			nickname: val
		});
	}
});