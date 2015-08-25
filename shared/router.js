Router.configure({
	layoutTemplate: 'layout',
	onBeforeAction: function () {
		if (!Meteor.user()) {
			if (Meteor.loggingIn()) {
			}
			else{
				Router.go('/login');
			}
		}
		this.next();
	}
});

Router.route('/', {
	template: 'home'
});

Router.route('/login', {
	onBeforeAction: function () {
		if (Meteor.user()) {
			Router.go('/');
		}
		this.next();
	}
});