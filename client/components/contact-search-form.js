Template.contactSearchForm.helpers({
  searchResults: function() {
    return Session.get('searchResults');
    // return Meteor.users.find();
  }
});

Template.contactSearchForm.events({
  'keyup .contact-name': function(e) {
    e.preventDefault();
    $this = $(e.currentTarget);
    if(e.keyCode == 27) $this.val("");
    val = $this.val();
    Meteor.call('getSearchResults', val, function(err, data) {
      if (err)
        console.log(err);

      Session.set('searchResults', data);
    });
  },
  'click .clear-contact-name': function(e) {
    e.preventDefault();
    $(e.currentTarget).closest('form').find('.contact-name').val("").keyup();
  },
  'submit form': function(e) {
    e.preventDefault();
  }
});