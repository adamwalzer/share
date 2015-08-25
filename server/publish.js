// Meteor.publish('publicLists', function() {
//   return Lists.find({userId: {$exists: false}});
// });

// Meteor.publish('privateLists', function() {
//   if (this.userId) {
//     return Lists.find({userId: this.userId});
//   } else {
//     this.ready();
//   }
// });

// Meteor.publish('todos', function(listId) {
//   check(listId, String);

//   return Todos.find({listId: listId});
// });

Meteor.publish('contacts-lists', function() {
	return ContactsLists.find({userId: this.userId});
	// return ContactsLists.find();
});

Meteor.publish('contacts', function() {
	return Contacts.find({userId: this.userId});
});

Meteor.publish('users', function() {
  // check(email, String);
  // return Users;
	ids = [this.userId];
  i = Contacts.find({userId: this.userId}).fetch()
	_.each(i, function(j) {
		ids.push(j.contactId);
	});
  // if(u = ContactsLists.find({userId: this.userId}).fetch()[0]) {
		// _.each(u.list, function(i) {
		// 	ids.push(i.contactId);
		// });
  // }
  return Meteor.users.find({_id: {$in: ids}},{fields:{services:0}});
  // return Meteor.users.find({_id: {$in: ids}}, {fields: {emails:1}});
});

Meteor.publish('conversations', function() {
	// console.log(Conversations.find().fetch());
	return Conversations.find({$and: [{users: {$elemMatch: {userId: this.userId}}}, {deleted: {$exists: false}}]});
});

Meteor.publish('messages', function() {
	return Messages.find({}, { sort: { time: 1}});
	// return Messages.find();
});

Meteor.publish("profile-pictures", function(){
  return ProfilePictures.find();
});