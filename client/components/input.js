Template.input.events({
  'keydown input#message': function(e) {
    if (e.which == 13) { // 13 is the enter key event
      if (Meteor.user())
        var n = Meteor.user().emails[0].address;
      else
        var n = 'Anonymous';
      var m = document.getElementById('message');

      if (m.value != '') {
        Meteor.call('postMessage', {
          name: n,
          message: m.value,
          time: Date.now(),
        });

        document.getElementById('message').value = '';
        m.value = '';
      }
    }
  }
});