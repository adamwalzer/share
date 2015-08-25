Template.conversation.created = function() {
	// console.log(this);
	// Meteor.call('getMessages', function(err, data) {
	// 	if(err)
	// 		console.log(err);
	// 	Session.set('messages', data);
	// });
};

var getTitle = function() {
	var conversation = Conversations.find({_id: this.conversationId}).fetch()[0];
	// if(!conversation) {
	// 	Meteor.call('closeConversation', this.conversationId);
	// }
	this.title = conversation?conversation.title:undefined;
	if(!this.title) {
		var self = this;
		_.each(conversation.users, function(i) {
			var u = Meteor.users.find({_id: i.userId}).fetch()[0];
			var name = u['display-name'] || u['first-name'] || u.emails[0].address;
			self.title = self.title?self.title+", "+name:name;
		});
	}
	return this.title;
}

Template.conversation.helpers({
	messages: function() {
		// return(Session.get('messages'));
		// console.log(Messages.find().fetch());
		return Messages.find({conversationId: this.conversationId});
	},
	conversationTitle: function() {
		return getTitle.apply(this);
	}
});

Template.conversation.events({
  'keydown input.message': function(e) {
    if (e.which == 13) { // 13 is the enter key event
      if (Meteor.user())
        var n = Meteor.user().emails[0].address;
      else
        var n = 'Anonymous';
      var $m = $(e.currentTarget);

      if ($m.val() != '') {
        Meteor.call('postMessage', {
        	conversationId: this.conversationId,
          name: n,
          message: $m.val(),
          time: Date.now(),
        });

        $m.val('');
      }
    } else if(e.which == 27) {
      $(e.currentTarget).val('');
    }
  },
  'click .close': function() {
  	var openConversations = Meteor.user().openConversations;
  	var i = openConversations.indexOf(this.conversationId);
  	openConversations.splice(i, 1);
  	var d = [{
  		name: 'openConversations',
  		value: openConversations
  	}];
  	Meteor.call('updateUser', d);
  },
  'click .title h3': function(e) {
  	$(e.currentTarget).parent().addClass('active').find('input').focus();
  },
  'keydown .title input': function(e) {
  	var $this = $(e.currentTarget);
    if (e.which == 13) { // 13 is the enter key event
    	this.title = $this.val();
    	Meteor.call('updateConversationTitle', {conversationId: this.conversationId, title: this.title});
    	if(!this.title) {this.title = getTitle.apply(this);}
    	$this.blur().parent().removeClass('active');
    } else if(e.which == 27) {
      if($this.val()!='') {
      	$this.val('');
      } else {
	      $this.val(this.title);
      }
    }
  },
  'blur .title input': function(e) {
  	$(e.currentTarget).parent().removeClass('active');
  }
});