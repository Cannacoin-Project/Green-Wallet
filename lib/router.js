OnBeforeActions = {
    loginRequired: function() {
        if (!Meteor.userId()) {
            this.render('/signin');
        } else {
            this.next();
        }
    }
}

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    except: [
    'signin', 
    'signup', 
    'passwordRecovery', 
    ]
});

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return Meteor.subscribe('userData');
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

Router.route('/', function () {
  this.render('wallet');
});
Router.route('/send');
Router.route('/receive');
Router.route('/signup');
Router.route('/signin');
Router.route('/passwordRecovery');
Router.route('/settings');
