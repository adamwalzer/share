Meteor.methods({
	postMessage: function(post) {
	  Messages.insert(post);
	},
	addContact: function(contactId) {
		if(!Contacts.find({
			userId: this.userId,
			contactId: contactId
		}).fetch()[0]) {
			Contacts.insert({
				userId: this.userId,
				contactId: contactId
			});
		}
		// if(ContactsLists.find({userId: this.userId}).fetch()[0]) {
		// 	var list = ContactsLists.find({userId: this.userId}).fetch()[0].list;
		// 	var hasContact = false;
		// 	_.each(list, function(l) {
		// 		if(l.contactId===d.contactId) {
		// 			hasContact = true;
		// 			return;
		// 		}
		// 	});
		// 	if(!hasContact) {
		// 		list.push(d);
		// 		ContactsLists.update({userId: this.userId},{
		// 			$set: {list:list}
		// 		});
		// 	}
		// } else {
		// 	ContactsLists.insert({
		// 		userId: this.userId, 
		// 		list: [d]
		// 	});
		// }
	},
	updateContact: function(d) {
		Contacts.update({
			userId: this.userId,
			contactId: d.contactId
		}, {$set:{nickname:d.nickname}});
		// console.log(Contacts.find({
		// 	userId: this.userId,
		// 	contactId: d.contactId
		// }).fetch());
	},
	deleteContact: function(contactId) {
		Contacts.remove({
			userId: this.userId,
			contactId: contactId
		});
		// if(ContactsLists.find({userId: this.userId}).fetch()[0]) {
		// 	var list = ContactsLists.find({userId: this.userId}).fetch()[0].list;
		// 	var i = list.indexOf(d);
		// 	list.splice(i,1);
		// 	ContactsLists.update({userId: this.userId},{$set:{list:list}});
		// }
	},
	// showConversations: function(contactId) {
	// 	return Conversations.find({$and: [{users: {$elemMatch: {userId: this.userId}}},{users: {$elemMatch: {userId: contactId}}},{deleted: {$exists: false}}]}).fetch();
	// 	// if(Conversations.find({users: {$elemMatch: {userId: this.userId}}}).fetch()[0]) {
	// 	// 	console.log("found");
	// 	// } else {
	// 	// 	console.log("not");
	// 	// }
	// },
	insertProfilePicture: function(imageURL) {
    Meteor.users.update(this.userId, {$set: imageURL});
	},
	openConversation: function(conversationId) {
		// return Conversations.find({_id: conversationId}).fetch()[0];
		var openConversations = Meteor.users.find({_id:this.userId}, {fields:{openConversations:1}}).fetch()[0].openConversations||[];
		if(openConversations.indexOf(conversationId) == -1) {
			openConversations.push(conversationId);
			Meteor.users.update({_id:this.userId}, {$set:{openConversations: openConversations}});
		}
		return Messages.find({conversationId: {$in: openConversations}}).fetch();
		// Meteor.users.update({_id:this.userId}, {$set:{openConversation: conversationId}});
		// return Messages.find({conversationId: Meteor.user().openConversation}).fetch();
	},
	closeConversation: function(conversationId) {
		var openConversations = Meteor.user().openConversations;
		var i = openConversations.indexOf(conversationId);
  	openConversations.splice(i, 1);
  	var d = [{
  		name: 'openConversations',
  		value: openConversations
  	}];
  	Meteor.call('updateUser', d);
	},
	deleteConversation: function(conversationId) {
		Conversations.update({_id: conversationId},{$set:{deleted:true}});
  	Meteor.call('closeConversation', conversationId);
		// return Conversations.find({$and: [{users: {$elemMatch: {userId: this.userId}}},{users: {$elemMatch: {userId: d.contactId}}},{deleted: {$exists: false}}]}).fetch();
	},
	createConversation: function(contactId) {
		if(this.userId === contactId) {
			var users = [
				{userId: this.userId},
			];
		} else {
			var users = [
				{userId: this.userId},
				{userId: contactId}
			];
		}
		conversationId = Conversations.insert({
			users: users
		});
		Meteor.call('openConversation', conversationId);
		return conversationId;
		// if(Conversations.find({users: {$elemMatch: {userId: this.userId}}}).fetch()[0]) {
		// 	console.log("found");
		// } else {
		// 	console.log("not");
		// 	Conversations.insert({
		// 		users: [
		// 			{userId: this.userId},
		// 			{userId: contactId}
		// 		]
		// 	});
		// }
	},
	getMessages: function() {
		return Messages.find({conversationId: Meteor.user().openConversation}).fetch();
	},
	updateNewUser: function() {
		Meteor.users.update({_id:this.userId}, {$set:{'display-name':Meteor.user().emails[0].address}});
	},
	updateUser: function(d) {
		var sets = {};
		var empty = true;
		_.each(d,function(i) {
			if(i.value) {
				sets[i.name] = i.value;
				empty = false;
			}
		});
		// console.log(sets);
		// Accounts.loginServiceConfiguration._collection.update({userId: this.userId},{
		// 	$set: sets
		// });
		if(!empty) {
			Meteor.users.update({_id:this.userId}, {$set:sets});
		}
	},
	updateConversationTitle: function(d) {
		Conversations.update({_id: d.conversationId}, {$set:{title: d.title}});
	},
	getSearchResults: function(val) {
		// console.log(Meteor.users.find().fetch());
		// console.log(Meteor.users.find({$or: [{'emails.address':val},{'display-name':val}]}).fetch());
		// console.log(val);
		if(!!val) {
			val = new RegExp("^"+val+"$", "i");
			return Meteor.users.find({$or: [{'emails.address':val},{'display-name':val}]}).fetch();
		} else {
			return [];
		}
		// Session.set('searchResults', Meteor.users.find({$or: [{'emails.address':val},{'display-name':val}]}).fetch());
		// Meteor.publish('contacts', function() {
		// 	return Meteor.users.find({$or: [{'emails.address':val},{'display-name':val}]}).fetch()
		// 	// return Meteor.users.find({_id: {$in: ids}});
		// return Meteor.users.find({_id: {$in: ids}}, {fields: {emails:1}}).fetch();
		// });
	}
});