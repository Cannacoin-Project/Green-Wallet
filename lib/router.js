//Iron router configuration
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return [
            Meteor.subscribe('userData'),
            Meteor.subscribe('transactions'),
            Meteor.subscribe('accounts'),
            Meteor.subscribe('network')
        ];
    },
    data: function() {
        return Meteor.users.findOne({
            _id: this.params._id
        });
    },
    action: function() {
        if (this.ready()) {
            this.render();
        }
    }
});

//Define all of our route onBeforeActions
OnBeforeActions = {
    loginRequired: function() {
        if (!Meteor.userId()) {
            this.render('/signin');
        } else {
            this.next();
        }
    }
};

//Force login for all but specified routes.
Router.onBeforeAction(OnBeforeActions.loginRequired, {
    except: [
        'signin',
        'signup',
        'passwordRecovery',
    ]
});

//Individual route definition
Router.route('/', function () {
  this.render('wallet');
});
Router.route('/send');
Router.route('/receive');
Router.route('/signup');
Router.route('/signin');
Router.route('/passwordRecovery');
Router.route('/settings');
