// adds index to each item
// UI.registerHelper('indexedArray', function(context, options) {
//   if (context) {
//     return context.map(function(item, index) {
//       item._index = index;
//       return item;
//     });
//   }
// });

Meteor.autorun(function() {
  // Whenever this session variable changes, run this function.
  var displayMessage = Session.get('displayMessage');
  if (displayMessage) {
    var stringArray = displayMessage.split('&amp;');
    ui.notify(stringArray[0], stringArray[1])
      .effect('slide')
      .closable();

    Session.set('displayMessage', null);
  }

  if (Accounts._resetPasswordToken) {
    Session.set('resetPassword', Accounts._resetPasswordToken);
  }

  // if(Meteor.user()) console.log(Meteor.user().emails[0].address);
});