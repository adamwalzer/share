var resize = function() {
	var $this = $('.welcome');
	$this.find('.profile-image-container').css({'left': $this.width() - $this.find('img').width()});
};

Template.welcome.rendered = function() {
	$('.welcome').imagesLoaded(function() {
		resize();
	});
	$(window).on('resize', resize);
};

Template.welcome.helpers({
	name: function(currentUser) {
		var u = currentUser.hash.currentUser;
		return u['display-name']||u['first-name']||u.emails[0].address;
	},
	profileImage: function() {
		return Meteor.user().profile?Meteor.user().profile.image:"profile.jpg";
	}
});

Template.welcome.events({
	'click a[href="account"]': function(e) {
		e.preventDefault();
		$('.account').toggleClass('active');
	},
	'click a[href="logout"]': function(e) {
		e.preventDefault();
		Meteor.logout(function() {
			Router.go("/login");
		});
	},
	'click img': function(e) {
		console.log("img");
		$(e.currentTarget).parent().toggleClass('active').parent().find('.account').removeClass('active');
	}
});