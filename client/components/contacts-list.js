Template.contactsList.helpers({
	contacts: function () {
		// var list = ContactsLists.find().fetch()[0]?ContactsLists.find().fetch()[0].list:[];
		// var list = Contacts.find().fetch();
		// if(Session.get('contactFilter')) {
		// 	var r = new RegExp(Session.get('contactFilter'), 'i');
		// 	for(var i=0,n=list.length;i<n;i++) {
		// 		var u = Meteor.users.find({_id:list[i].contactId}).fetch()[0];
		// 		if(!list[i].displayName.match(r) && !u.emails[0].address.match(r) && !u['display-name'].match(r)) {
		// 			list.splice(i, 1);
		// 			i--;
		// 			n--;
		// 		}
		// 	}
		// }
		// return list;
		return Contacts.find().fetch();
	}
});

Template.contactsList.events({
	'keyup .contact-name': function(e) {
		e.preventDefault();
		contactFilter = $(e.currentTarget).val();
		contactFilter==''?Session.set('contactFilter', false):Session.set('contactFilter', contactFilter);
	}
});